# BOE print sales — test integration

This Worker is deliberately limited to **Stripe test payments**. Its source contains no print-order creation endpoint. Setting either `SALES_MODE` to anything except `test`, or `FULFILLMENT_MODE` to anything except `disabled`, blocks requests. A payment cannot cause an order with Cloudprinter.

## Files

- `worker.mjs`: Cloudflare Worker, no package dependency.
- `schema.sql`: D1 tables for quotes, test orders, webhook deduplication and rate limits.
- `wrangler.jsonc`: deployment configuration for the existing `boe-sales-test` Worker and EU D1 database, compatible with free Workers quotas.
- `worker.test.mjs`: integration tests using Node's native SQLite and mocked provider responses.

Run the tests with Node 24: `node --test`.

## Configuration

Bindings and non-secret variables:

| Name | Required value |
|---|---|
| `DB` | D1 binding after applying `schema.sql` |
| `SALES_MODE` | `test` |
| `FULFILLMENT_MODE` | `disabled` |
| `STRIPE_PRICE_ID` | Existing one-time **test** price for EUR 3500 cents |
| `BOOK_CONFIG_JSON` | Exact verified product/options from the historical Cloudprinter order, see below |

Secrets must be stored as Worker secrets, never in the public repository, frontend or this document:

| Name | Purpose |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_…` or suitable `rk_test_…` key; live keys are refused |
| `STRIPE_WEBHOOK_SECRET` | Signing secret `whsec_…` from this Worker endpoint's Stripe **test** event destination |
| `CLOUDPRINTER_API_KEY` | Existing API interface key used only for a price quote; preferably the existing sandbox interface |
| `RATE_LIMIT_SALT` | Optional independent secret salt; otherwise the webhook secret or Cloudprinter key is used without disclosure |

Confirmed `BOOK_CONFIG_JSON`, recovered from historical Cloudprinter order `3009261`, reference `qo-BOE_2-1792018505839`, and catalogue product `1031`:

```json
{
  "verified": true,
  "product": "textbook_cw_a5_p_fc",
  "options": [
    { "type": "pageblock_130mcs", "count": "174" },
    { "type": "cover_130mcg", "count": "1" },
    { "type": "cover_finish_gloss", "count": "1" },
    { "type": "total_pages", "count": "174" }
  ],
  "name": "Bibliothèque Ouverte d’Égyptologie — édition imprimée 2026"
}
```

The configuration preserves the tested volume: Textbook CW A5 P FC TNR, 174 pages, pageblock 130 gsm machine coated silk, cover 130 gsm machine coated gloss, gloss cover finish. The source PDFs' MD5 values also match order `3009261` (`book-verified.json` records those values). This quote integration does not accept replacement print files or file URLs and needs no new upload.

The code uses `https://boegyptologie.github.io` as the only allowed browser origin. The `SITE_ORIGIN` variable in the template documents that setting; changing the variable alone does not broaden access in the code.

## API

### `GET /api/health`

Reports `mode: "test"`, `fulfillment: "disabled"`, EUR 3500 cents and configuration-presence flags. Flags report local configuration, **not successful remote authentication**. No credentials or customer details are returned.

### `POST /api/shipping-quotes`

Request:

```json
{
  "name": "Test Reader",
  "email": "reader@example.org",
  "phone": "",
  "locale": "fr",
  "address": {
    "line1": "1 test street",
    "line2": "",
    "postalCode": "75001",
    "city": "Paris",
    "state": "",
    "country": "FR"
  }
}
```

Response:

```json
{
  "quoteId": "UUID",
  "expiresAt": "ISO-8601 timestamp",
  "bookAmount": 3500,
  "currency": "EUR",
  "mode": "test",
  "shippingOptions": [
    { "id": "shipping_1", "label": "Carrier — Standard", "amount": 500, "currency": "EUR" }
  ]
}
```

Cloudprinter Core API v1.0 quote input supports country and state; that documented quote request does not use street or postal code. The complete delivery address is retained with the quote and bound to the Stripe Customer's shipping address. The code never invents postcode-specific rates.

Only the country, state, exact product/options and a server-side API key are sent to Cloudprinter at quote time. Shipping amount is the sum of **price + VAT amount** for every shipment, rounded once to euro cents using exact decimal arithmetic. The response's root production `price` is not added to shipping or charged in addition to the EUR 35 book price. Missing VAT, non-EUR currency, inconsistent items or insufficient provider quote duration block checkout.

If the provider returns several shipping choices per shipment, all combinations are calculated, capped at 50. Quote hashes remain on the server. Quotes last 20 minutes. Checkout sessions expire 60 minutes after the quote was created, complying with Stripe's 30-minute minimum at session creation and remaining within the original provider quote duration.

### `POST /api/checkout`

Request: `{ "quoteId": "UUID", "shippingOptionId": "shipping_1" }`.

Response: `{ "url": "https://checkout.stripe.com/…", "mode": "test" }`.

The stored quote decides all amounts and customer delivery information. Amounts supplied by a browser are ignored. The existing Stripe price is retrieved and must be active, one-time, in test mode, EUR 3500 cents. Checkout requests EUR 3500 + the selected stored shipping amount, invoice creation enabled and a fixed delivery method. The API version is pinned to `2026-09-30.endive` on price retrieval, customer creation and Checkout creation, matching the connected tests and avoiding future account-default version drift. This version selects dynamic payment methods from the test Dashboard configuration; no deprecated `payment_method_types` parameter is sent. Stripe must return the same total, EUR, a `cs_test_…` ID and `livemode: false`.

The initial delivery choice is locked during checkout preparation. Repeating the request for the same choice uses deterministic Stripe idempotency keys and returns the existing session. To change delivery after preparation, create a new quote.

The customer may enter a billing address in Checkout. Shipping is fixed from the server-side quote; no shipping-address collection control is enabled in Checkout. Actual tax treatment and invoice legal identity require BOMA's confirmed accounting setup before any later production release.

Return URLs:

- `/fr/edition-imprimee.html?payment=success&session_id={CHECKOUT_SESSION_ID}`
- `/en/printed-edition.html?payment=success&session_id={CHECKOUT_SESSION_ID}`
- The same paths with `?payment=cancelled` after cancellation.

A success return URL is not proof of payment; only a verified webhook changes the test order status.

### `POST /api/stripe/webhook`

Configure a Stripe **test** event destination with `checkout.session.completed` and `checkout.session.async_payment_succeeded`. Set its signing secret as `STRIPE_WEBHOOK_SECRET`.

The raw body is verified using HMAC-SHA256, all v1 signing candidates and a five-minute timestamp tolerance. Both event and session must be in test mode. Session ID, quote ID, selected shipping option, currency and exact total must match the stored order. A paid test order becomes `test_paid`, always with `fulfillment_status: "disabled"`.

Events are deduplicated by ID. Failed processing remains retryable, including the case where a webhook arrives before the order write has completed. No raw webhook or customer data is logged.

## Privacy and abuse controls

- Requests capped at 12 KiB; webhook body capped at 256 KiB.
- Browser quote and checkout calls require the exact BOE origin.
- At the Cloudflare edge, each endpoint is limited to eight requests per IP per minute using salted short-lived IP hashes; raw IPs are not stored.
- Quote records contain customer details and are purged after two days by the daily scheduled handler. Old rate-limit rows and webhook IDs are also purged. Test orders retain only identifiers, amounts and statuses.
- Worker observability remains enabled, matching the configured Cloudflare monitoring. The code does not log credentials, provider responses, form bodies or exceptions.

## Before a real purchase flow could be implemented

Production requires a separate reviewed change. This test-only source intentionally lacks the Cloudprinter order endpoint, file references/checksums, fulfillment retry state machine and tracking callbacks. An explicit user agreement is required before any paid print order or real charge. Merely adding live keys or changing an environment variable does not enable production in this source.

## Official sources used

- [Cloudprinter Core API v1.0](https://docs.cloudprinter.com/client/cloudprinter-core-api-v1-0/)
- [Cloudprinter integration testing](https://docs.cloudprinter.com/client/how-to-test-the-integration)
- [Stripe Checkout Session creation](https://docs.stripe.com/api/checkout/sessions/create)
- [Stripe test environments](https://docs.stripe.com/testing)
- [Stripe dynamic payment methods](https://docs.stripe.com/payments/payment-methods/dynamic-payment-methods)
- [Stripe receipts and paid invoices](https://docs.stripe.com/receipts)
