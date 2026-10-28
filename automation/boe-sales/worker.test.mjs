import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import worker, { handleRequest, normalizeCloudprinterQuote, validateDestination, verifyStripeSignature } from './worker.mjs';

const ORIGIN = 'https://boegyptologie.github.io';
const NOW = () => Math.floor(Date.now() / 1000);
const destination = { name: 'Lecteur Test', email: 'boe-test@example.org', locale: 'fr', address: { line1: '1 rue de test', line2: '', city: 'Paris', postalCode: '75001', country: 'FR' } };
const sampleQuote = () => ({
  price: '99.0000', vat: '19.0000', currency: 'EUR', expire_date: new Date(Date.now() + 48 * 3600_000).toISOString(),
  shipments: [{ items: [{ reference: 'boe' }], quotes: [
    { quote: 'provider_quote_standard', service: 'Carrier', shipping_level: 'Standard', price: '4.1234', vat: '0.8766', currency: 'EUR' },
    { quote: 'provider_quote_express', service: 'Carrier', shipping_level: 'Express', price: '8.1234', vat: '1.8766', currency: 'EUR' }
  ] }]
});

class TestD1 {
  constructor() { this.sql = new DatabaseSync(':memory:'); this.sql.exec(readFileSync(new URL('./schema.sql', import.meta.url), 'utf8')); }
  prepare(query) {
    const statement = this.sql.prepare(query); let args = [];
    const result = {
      bind(...values) { args = values; return result; },
      first() { return statement.get(...args) || null; },
      run() { const info = statement.run(...args); return { success: true, meta: { changes: info.changes } }; }
    };
    return result;
  }
  batch(statements) {
    this.sql.exec('BEGIN');
    try { const output = []; for (const statement of statements) output.push(statement.run()); this.sql.exec('COMMIT'); return output; }
    catch (error) { this.sql.exec('ROLLBACK'); throw error; }
  }
}

function environment() {
  return { SALES_MODE: 'test', FULFILLMENT_MODE: 'disabled', DB: new TestD1(),
    BOOK_CONFIG_JSON: JSON.stringify({ verified: true, product: 'tested_book_product', options: [{ type: 'total_pages', count: '174' }], name: 'BOE 2026' }),
    STRIPE_SECRET_KEY: ['sk', 'test', '0'.repeat(24)].join('_'), STRIPE_PRICE_ID: 'price_test00000000', STRIPE_WEBHOOK_SECRET: ['whsec', 'test', 'only', 'secret'].join('_'), CLOUDPRINTER_API_KEY: 'test_only_cloudprinter_key' };
}

function request(path, body, extraHeaders = {}) {
  return new Request(`https://worker.example${path}`, { method: 'POST', headers: { Origin: ORIGIN, 'Content-Type': 'application/json', ...extraHeaders }, body: JSON.stringify(body) });
}

async function withProviders(run, overrides = {}) {
  const priorFetch = globalThis.fetch; const calls = []; const idempotency = new Map();
  globalThis.fetch = async (url, options = {}) => {
    assert.ok(!url.includes('/orders/add'), 'A paid print order must never be sent');
    calls.push({ url, options });
    const override = overrides[url];
    if (override) {
      const output = await override(options);
      return output instanceof Response ? output : new Response(JSON.stringify(output), { status: 200 });
    }
    if (url === 'https://api.cloudprinter.com/cloudcore/1.0/orders/quote') return new Response(JSON.stringify(sampleQuote()));
    if (url.startsWith('https://api.stripe.com/v1/prices/')) return new Response(JSON.stringify({ id: 'price_test00000000', livemode: false, active: true, unit_amount: 3500, currency: 'eur', type: 'one_time', recurring: null }));
    if (url === 'https://api.stripe.com/v1/customers') {
      const key = options.headers['Idempotency-Key'];
      if (!idempotency.has(key)) idempotency.set(key, { id: 'cus_TestCustomer000', livemode: false });
      return new Response(JSON.stringify(idempotency.get(key)));
    }
    if (url === 'https://api.stripe.com/v1/checkout/sessions') {
      const params = new URLSearchParams(options.body); const key = options.headers['Idempotency-Key'];
      if (!idempotency.has(key)) idempotency.set(key, { id: 'cs_test_TestCheckout000', livemode: false, amount_total: 3500 + Number(params.get('shipping_options[0][shipping_rate_data][fixed_amount][amount]')), currency: 'eur', expires_at: Number(params.get('expires_at')), url: 'https://checkout.stripe.com/c/pay/cs_test_TestCheckout000' });
      return new Response(JSON.stringify(idempotency.get(key)));
    }
    throw new Error(`Unexpected provider URL ${url}`);
  };
  try { return await run(calls); } finally { globalThis.fetch = priorFetch; }
}

async function quoteFor(env) {
  const result = await handleRequest(request('/api/shipping-quotes', destination), env);
  assert.equal(result.status, 200, await result.clone().text()); return result.json();
}

async function prepareCheckout(env) {
  const quote = await quoteFor(env);
  const result = await handleRequest(request('/api/checkout', { quoteId: quote.quoteId, shippingOptionId: quote.shippingOptions[0].id }), env);
  assert.equal(result.status, 200, await result.clone().text()); return { quote, checkout: await result.json() };
}

async function signedWebhook(event, env, timestamp = NOW()) {
  const payload = JSON.stringify(event);
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.STRIPE_WEBHOOK_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const bytes = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${timestamp}.${payload}`));
  const signature = [...new Uint8Array(bytes)].map(n => n.toString(16).padStart(2, '0')).join('');
  return new Request('https://worker.example/api/stripe/webhook', { method: 'POST', headers: { 'Content-Type': 'application/json', 'stripe-signature': `t=${timestamp},v1=${signature}` }, body: payload });
}

function paymentEvent(quote, overrides = {}) {
  return { id: 'evt_TestEvent0001', type: 'checkout.session.completed', livemode: false, data: { object: {
    id: 'cs_test_TestCheckout000', livemode: false, amount_total: 4000, currency: 'eur', payment_status: 'paid', payment_intent: 'pi_TestPayment000',
    metadata: { boe_mode: 'test', boe_quote_id: quote.quoteId, shipping_option_id: 'shipping_1' }, ...overrides
  } } };
}

test('Shipping calculation adds VAT amounts, every shipment, and rounds only the complete total', () => {
  const data = sampleQuote();
  data.shipments = [
    { items: [{ reference: 'boe' }], quotes: [{ quote: 'quoteA', service: 'A', shipping_level: 'Standard', price: '3.3333', vat: '0.6667', currency: 'EUR' }] },
    { items: [{ reference: 'boe' }], quotes: [{ quote: 'quoteB', service: 'B', shipping_level: 'Standard', price: '2.1250', vat: '0.0000', currency: 'EUR' }] }
  ];
  const normalized = normalizeCloudprinterQuote(data);
  assert.equal(normalized.options[0].amount, 613);
  assert.equal(normalized.options[0].providerQuotes.length, 2);
  assert.ok(!normalized.options[0].amount.toString().includes('99'));
});

test('Invalid currency, negative amount, missing VAT, wrong item and insufficient expiry fail closed', () => {
  for (const mutate of [
    q => { q.currency = 'USD'; },
    q => { q.shipments[0].quotes[0].currency = 'USD'; },
    q => { q.shipments[0].quotes[0].price = '-1.00'; },
    q => { delete q.shipments[0].quotes[0].vat; },
    q => { q.shipments[0].items[0].reference = 'other'; },
    q => { q.expire_date = new Date(Date.now() + 60_000).toISOString(); }
  ]) { const q = sampleQuote(); mutate(q); assert.throws(() => normalizeCloudprinterQuote(q)); }
});

test('Provider HTTP status is visible in a constant message without exposing the error body', async () => {
  const env = environment(); const previousFetch = globalThis.fetch;
  globalThis.fetch = async () => new Response(JSON.stringify({ error: 'private provider error', apikey: env.CLOUDPRINTER_API_KEY, email: destination.email }), { status: 400 });
  try {
    const result = await handleRequest(request('/api/shipping-quotes', destination), env);
    assert.equal(result.status, 502);
    const text = await result.text(); const data = JSON.parse(text);
    assert.equal(data.error.code, 'cloudprinter_quote_failed');
    assert.equal(data.error.message, 'Le service externe a refusé la requête de test (HTTP 400).');
    assert.ok(!text.includes(env.CLOUDPRINTER_API_KEY)); assert.ok(!text.includes(destination.email)); assert.ok(!text.includes('private provider error'));
  } finally { globalThis.fetch = previousFetch; }
});

test('Worker provider fetch uses supported manual redirects and rejects a 3xx without forwarding credentials', async () => {
  const env = environment(); const previousFetch = globalThis.fetch; let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++; assert.equal(url, 'https://api.cloudprinter.com/cloudcore/1.0/orders/quote');
    assert.equal(options.redirect, 'manual');
    return new Response('private provider redirect body', { status: 302, headers: { Location: 'https://untrusted.example/private?secret=never-forward' } });
  };
  try {
    const result = await handleRequest(request('/api/shipping-quotes', destination), env);
    assert.equal(result.status, 502); const text = await result.text();
    assert.equal(JSON.parse(text).error.message, 'Le service externe a refusé la requête de test (HTTP 302).');
    assert.equal(calls, 1);
    for (const value of [env.CLOUDPRINTER_API_KEY, 'untrusted.example', 'never-forward', 'private provider redirect body']) assert.ok(!text.includes(value));
  } finally { globalThis.fetch = previousFetch; }
});

test('Destination validates email, field bounds and required US state without inventing a destination', () => {
  assert.equal(validateDestination(destination).address.country, 'FR');
  assert.throws(() => validateDestination({ ...destination, email: 'wrong' }));
  assert.throws(() => validateDestination({ ...destination, name: 'x'.repeat(151) }));
  assert.throws(() => validateDestination({ ...destination, address: { ...destination.address, country: 'US' } }));
  assert.equal(validateDestination({ ...destination, address: { ...destination.address, country: 'US', state: 'CA' } }).address.state, 'CA');
});

test('Live mode, print fulfillment flags, foreign Origin and missing Origin reject before provider calls', async () => {
  await withProviders(async calls => {
    for (const change of [{ SALES_MODE: 'live' }, { FULFILLMENT_MODE: 'sandbox' }, { FULFILLMENT_MODE: undefined }]) {
      const env = { ...environment(), ...change };
      assert.equal((await handleRequest(request('/api/shipping-quotes', destination), env)).status, 503);
    }
    const env = environment();
    assert.equal((await handleRequest(request('/api/shipping-quotes', destination, { Origin: 'https://evil.example' }), env)).status, 403);
    assert.equal((await handleRequest(new Request('https://worker.example/api/checkout', { method: 'POST' }), env)).status, 403);
    assert.equal(calls.length, 0);
  });
});

test('Quote endpoint sends only country/state and book configuration to Cloudprinter; public output hides quote hashes and production cost', async () => {
  const env = environment();
  await withProviders(async calls => {
    const quote = await quoteFor(env);
    assert.equal(quote.mode, 'test'); assert.equal(quote.bookAmount, 3500); assert.equal(quote.shippingOptions[0].amount, 500);
    assert.equal(quote.currency, 'EUR'); assert.ok(Date.parse(quote.expiresAt) > Date.now());
    assert.ok(!JSON.stringify(quote).includes('provider_quote'));
    const sent = JSON.parse(calls[0].options.body);
    assert.deepEqual(sent.items, [{ reference: 'boe', product: 'tested_book_product', count: '1', options: [{ type: 'total_pages', count: '174' }] }]);
    assert.equal(sent.country, 'FR'); assert.equal(sent.currency, 'EUR');
    assert.ok(!JSON.stringify(sent).includes(destination.email));
    assert.ok(!JSON.stringify(sent).includes(destination.address.line1));
  });
});

test('Checkout verifies stored Stripe price, ignores client amounts, locks shipping, and retries idempotently', async () => {
  const env = environment();
  await withProviders(async calls => {
    const quote = await quoteFor(env);
    const body = { quoteId: quote.quoteId, shippingOptionId: 'shipping_1', bookAmount: 1, shippingAmount: 0 };
    const result = await handleRequest(request('/api/checkout', body), env);
    assert.equal(result.status, 200, await result.clone().text());
    const checkout = await result.json();
    assert.equal(checkout.url, 'https://checkout.stripe.com/c/pay/cs_test_TestCheckout000');
    const sessionCall = calls.find(call => call.url.endsWith('/checkout/sessions'));
    const stripeCalls = calls.filter(call => call.url.startsWith('https://api.stripe.com/v1/'));
    assert.equal(stripeCalls.length, 3);
    assert.ok(stripeCalls.every(call => call.options.headers['Stripe-Version'] === '2026-09-30.endive'));
    const params = new URLSearchParams(sessionCall.options.body);
    assert.equal(params.get('line_items[0][price]'), env.STRIPE_PRICE_ID);
    assert.equal(params.get('line_items[0][quantity]'), '1');
    assert.equal(params.get('shipping_options[0][shipping_rate_data][fixed_amount][amount]'), '500');
    assert.equal(params.get('invoice_creation[enabled]'), 'true');
    // Current Stripe API selects dynamic methods from the test Dashboard configuration.
    assert.ok(![...params.keys()].some(key => key.startsWith('payment_method_types')));
    assert.ok(Number(params.get('expires_at')) >= NOW() + 30 * 60);
    assert.ok(!params.has('shipping_address_collection[allowed_countries][0]'));
    const customerCall = calls.find(call => call.url.endsWith('/customers'));
    assert.equal(new URLSearchParams(customerCall.options.body).get('shipping[address][postal_code]'), '75001');
    const initialCallCount = calls.length;
    const retry = await handleRequest(request('/api/checkout', body), env);
    assert.equal(retry.status, 200); assert.equal((await retry.json()).url, checkout.url); assert.equal(calls.length, initialCallCount);
    const changed = await handleRequest(request('/api/checkout', { quoteId: quote.quoteId, shippingOptionId: 'shipping_2' }), env);
    assert.equal(changed.status, 409); assert.equal(calls.length, initialCallCount);
    assert.equal(env.DB.sql.prepare('SELECT count(*) AS n FROM orders').get().n, 1);
  });
});

test('Expired quotes and live Stripe keys never create a session', async () => {
  const env = environment();
  await withProviders(async calls => {
    const quote = await quoteFor(env);
    env.STRIPE_SECRET_KEY = ['sk', 'live', '0'.repeat(24)].join('_');
    const result = await handleRequest(request('/api/checkout', { quoteId: quote.quoteId, shippingOptionId: 'shipping_1' }), env);
    assert.equal(result.status, 503); assert.equal(calls.length, 1);
    env.STRIPE_SECRET_KEY = ['sk', 'test', '0'.repeat(24)].join('_');
    env.DB.sql.prepare('UPDATE quotes SET expires_at = ? WHERE id = ?').run(NOW() - 1, quote.quoteId);
    assert.equal((await handleRequest(request('/api/checkout', { quoteId: quote.quoteId, shippingOptionId: 'shipping_1' }), env)).status, 409);
    assert.equal(calls.length, 1);
  });
});

test('A changed Stripe price and an unexpected live response are rejected', async () => {
  const env = environment();
  await withProviders(async calls => {
    const quote = await quoteFor(env);
    const result = await handleRequest(request('/api/checkout', { quoteId: quote.quoteId, shippingOptionId: 'shipping_1' }), env);
    assert.equal(result.status, 503);
    assert.equal(calls.filter(call => call.url.endsWith('/checkout/sessions')).length, 0);
  }, { 'https://api.stripe.com/v1/prices/price_test00000000': () => ({ id: env.STRIPE_PRICE_ID, livemode: false, active: true, unit_amount: 1, currency: 'eur', type: 'one_time' }) });
  const other = environment();
  await withProviders(async () => {
    const quote = await quoteFor(other);
    const result = await handleRequest(request('/api/checkout', { quoteId: quote.quoteId, shippingOptionId: 'shipping_1' }), other);
    assert.equal(result.status, 502); assert.equal((await result.json()).error.code, 'stripe_not_test');
    assert.equal(other.DB.sql.prepare('SELECT count(*) AS n FROM orders').get().n, 0);
  }, { 'https://api.stripe.com/v1/customers': () => ({ id: 'cus_live', livemode: true }) });
});

test('Stripe HTTP failures identify price, customer or Checkout stage without exposing provider bodies', async () => {
  for (const [url, code] of [
    ['https://api.stripe.com/v1/prices/price_test00000000', 'stripe_price_request_failed'],
    ['https://api.stripe.com/v1/customers', 'stripe_customer_request_failed'],
    ['https://api.stripe.com/v1/checkout/sessions', 'stripe_checkout_request_failed']
  ]) {
    const env = environment();
    await withProviders(async () => {
      const quote = await quoteFor(env);
      const result = await handleRequest(request('/api/checkout', { quoteId: quote.quoteId, shippingOptionId: 'shipping_1' }), env);
      assert.equal(result.status, 502);
      const text = await result.text(); const data = JSON.parse(text);
      assert.equal(data.error.code, code);
      assert.equal(data.error.message, 'Le service externe a refusé la requête de test (HTTP 400).');
      assert.ok(!text.includes('private_stripe_error')); assert.ok(!text.includes(env.STRIPE_SECRET_KEY));
    }, { [url]: () => new Response(JSON.stringify({ private_stripe_error: env.STRIPE_SECRET_KEY }), { status: 400 }) });
  }
});

test('Parallel identical checkout requests use Stripe idempotency and persist one order', async () => {
  const env = environment();
  await withProviders(async () => {
    const quote = await quoteFor(env); const payload = { quoteId: quote.quoteId, shippingOptionId: 'shipping_1' };
    const results = await Promise.all([handleRequest(request('/api/checkout', payload), env), handleRequest(request('/api/checkout', payload), env)]);
    // TestD1 serializes statements; both concurrent requests must resolve safely.
    assert.ok(results.every(result => result.status === 200), await Promise.all(results.map(result => result.clone().text())));
    assert.equal(env.DB.sql.prepare('SELECT count(*) AS n FROM orders').get().n, 1);
  });
});

test('Stripe signatures reject tampering, stale/future timestamps and accept key rotation signatures', async () => {
  const env = environment(); const event = paymentEvent({ quoteId: crypto.randomUUID() }); const req = await signedWebhook(event, env);
  const text = await req.text(); const signature = req.headers.get('stripe-signature');
  assert.equal(await verifyStripeSignature(text, signature, env.STRIPE_WEBHOOK_SECRET), true);
  assert.equal(await verifyStripeSignature(text + ' ', signature, env.STRIPE_WEBHOOK_SECRET), false);
  assert.equal(await verifyStripeSignature(text, signature, env.STRIPE_WEBHOOK_SECRET, NOW() + 301), false);
  assert.equal(await verifyStripeSignature(text, `v1=${'0'.repeat(64)},${signature}`, env.STRIPE_WEBHOOK_SECRET), true);
});

test('Signed paid webhook is idempotent and records only a test payment; no fulfillment request occurs', async () => {
  const env = environment();
  await withProviders(async calls => {
    const { quote } = await prepareCheckout(env); const event = paymentEvent(quote); const before = calls.length;
    const result = await handleRequest(await signedWebhook(event, env), env);
    assert.equal(result.status, 200, await result.clone().text()); assert.equal((await result.json()).fulfillment, 'disabled');
    const order = env.DB.sql.prepare('SELECT * FROM orders').get();
    assert.equal(order.status, 'test_paid'); assert.equal(order.fulfillment_status, 'disabled'); assert.ok(order.paid_at);
    const repeat = await handleRequest(await signedWebhook(event, env), env);
    assert.equal(repeat.status, 200); assert.equal((await repeat.json()).duplicate, true); assert.equal(calls.length, before);
  });
});

test('Webhook rejects live events and mismatched paid amount; failed processing remains retryable', async () => {
  const env = environment();
  await withProviders(async () => {
    const { quote } = await prepareCheckout(env);
    const liveEvent = { ...paymentEvent(quote), livemode: true };
    assert.equal((await handleRequest(await signedWebhook(liveEvent, env), env)).status, 400);
    const wrong = paymentEvent(quote, { amount_total: 1 });
    assert.equal((await handleRequest(await signedWebhook(wrong, env), env)).status, 400);
    assert.equal(env.DB.sql.prepare('SELECT processed_at FROM stripe_events').get().processed_at, null);
    assert.equal((await handleRequest(await signedWebhook(paymentEvent(quote), env), env)).status, 200);
    assert.equal(env.DB.sql.prepare('SELECT status FROM orders').get().status, 'test_paid');
  });
});

test('A valid webhook arriving before its order returns a retryable status', async () => {
  const env = environment(); const quote = { quoteId: crypto.randomUUID() };
  const result = await handleRequest(await signedWebhook(paymentEvent(quote), env), env);
  assert.equal(result.status, 409); assert.equal((await result.json()).error.code, 'order_not_ready');
  assert.equal(env.DB.sql.prepare('SELECT processed_at FROM stripe_events').get().processed_at, null);
});

test('Edge rate limiting prevents unbounded quote calls and does not persist raw IP', async () => {
  const env = environment();
  await withProviders(async calls => {
    for (let i = 0; i < 8; i++) assert.equal((await handleRequest(request('/api/shipping-quotes', destination, { 'CF-Connecting-IP': '192.0.2.1' }), env)).status, 200);
    assert.equal((await handleRequest(request('/api/shipping-quotes', destination, { 'CF-Connecting-IP': '192.0.2.1' }), env)).status, 429);
    assert.equal(calls.length, 8);
    assert.ok(!JSON.stringify(env.DB.sql.prepare('SELECT * FROM rate_limits').all()).includes('192.0.2.1'));
  });
});

test('Oversized JSON is rejected and health response never contains credentials', async () => {
  const env = environment();
  const tooLarge = await handleRequest(request('/api/shipping-quotes', { ...destination, extra: 'x'.repeat(13000) }), env);
  assert.equal(tooLarge.status, 413);
  const health = await handleRequest(new Request('https://worker.example/api/health'), env);
  const text = await health.text(); assert.equal(health.status, 200);
  assert.ok(!text.includes(env.STRIPE_SECRET_KEY)); assert.ok(!text.includes(env.CLOUDPRINTER_API_KEY)); assert.ok(text.includes('disabled'));
});

test('Unsigned oversized webhook streams stop at the byte limit without trusting Content-Length', async () => {
  for (const contentLength of [null, '2']) {
    const env = environment(); let emitted = 0; let cancelled = false;
    const stream = new ReadableStream({
      pull(controller) { emitted++; controller.enqueue(new Uint8Array(64_000)); if (emitted === 20) controller.close(); },
      cancel() { cancelled = true; }
    });
    const headers = { 'Content-Type': 'application/json' };
    if (contentLength) headers['Content-Length'] = contentLength;
    const request = new Request('https://worker.example/api/stripe/webhook', { method: 'POST', headers, body: stream, duplex: 'half' });
    const response = await handleRequest(request, env);
    assert.equal(response.status, 413); assert.equal((await response.json()).error.code, 'body_too_large');
    assert.equal(cancelled, true); assert.ok(emitted <= 6, `Read ${emitted} chunks instead of stopping at the limit`);
    assert.equal(env.DB.sql.prepare('SELECT count(*) AS n FROM stripe_events').get().n, 0);
  }
});

test('Public shipping labels use the provider option rather than internal shipping-level codes', () => {
  const data = sampleQuote();
  data.shipments[0].quotes[0].shipping_level = 'cp_ground';
  data.shipments[0].quotes[0].shipping_option = 'Tracked Parcel';
  const quote = normalizeCloudprinterQuote(data);
  assert.equal(quote.options[0].label, 'Carrier — Tracked Parcel');
  assert.ok(!quote.options[0].label.includes('cp_ground'));
  assert.equal(quote.options[0].providerQuotes[0].shippingLevel, 'cp_ground');
});

test('Scheduled cleanup removes expired quotes and limiter entries without deleting test orders', async () => {
  const env = environment();
  await withProviders(async () => {
    await prepareCheckout(env);
    env.DB.sql.prepare('UPDATE quotes SET created_at = ?').run(NOW() - 3 * 86400);
    env.DB.sql.prepare('INSERT INTO rate_limits VALUES (?, ?, ?)').run('expired-bucket', 1, NOW() - 1);
    await worker.scheduled({}, env);
    assert.equal(env.DB.sql.prepare('SELECT count(*) AS n FROM quotes').get().n, 0);
    assert.equal(env.DB.sql.prepare('SELECT count(*) AS n FROM rate_limits').get().n, 0);
    assert.equal(env.DB.sql.prepare('SELECT count(*) AS n FROM orders').get().n, 1);
  });
});
