// Test-only integration. This source deliberately contains no Cloudprinter order API.
const SITE_ORIGIN = 'https://boegyptologie.github.io';
const BOOK_AMOUNT = 3500;
const QUOTE_TTL = 20 * 60;
const SESSION_TTL = 60 * 60;
const MAX_BODY_BYTES = 12_288;
const MAX_SHIPPING_AMOUNT = 100_000;
const CLOUDPRINTER_QUOTE_URL = 'https://api.cloudprinter.com/cloudcore/1.0/orders/quote';
const STRIPE_API = 'https://api.stripe.com/v1';
const STRIPE_API_VERSION = '2026-09-30.endive';

export class AppError extends Error {
  constructor(status, code, message) { super(message); this.status = status; this.code = code; }
}
const fail = (status, code, message) => { throw new AppError(status, code, message); };
const seconds = () => Math.floor(Date.now() / 1000);
const hex = bytes => [...new Uint8Array(bytes)].map(n => n.toString(16).padStart(2, '0')).join('');
const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer' };

function response(data, status = 200, origin) {
  const headers = { ...jsonHeaders };
  if (origin === SITE_ORIGIN) { headers['Access-Control-Allow-Origin'] = origin; headers.Vary = 'Origin'; }
  return new Response(JSON.stringify(data), { status, headers });
}

function safeMode(env) {
  if (env.SALES_MODE !== 'test' || env.FULFILLMENT_MODE !== 'disabled') {
    fail(503, 'test_mode_required', 'La vente réelle et les commandes imprimeur sont désactivées.');
  }
}

function requireDb(env) {
  if (!env.DB?.prepare || !env.DB?.batch) fail(503, 'storage_not_configured', 'Le stockage des tests doit être configuré.');
}

function bookConfig(env) {
  let book;
  try { book = JSON.parse(env.BOOK_CONFIG_JSON || 'null'); } catch { /* fail closed below */ }
  if (!book || book.verified !== true || !/^[a-zA-Z0-9._-]{1,150}$/.test(book.product || '') || !Array.isArray(book.options) || book.options.length < 1 || book.options.length > 30) {
    fail(503, 'book_not_configured', 'Les caractéristiques du volume testé doivent être confirmées.');
  }
  const options = book.options.map(option => {
    if (!/^[a-zA-Z0-9._-]{1,150}$/.test(option?.type || '') || !/^\d{1,6}$/.test(String(option?.count ?? ''))) {
      fail(503, 'book_not_configured', 'Les options d’impression ne sont pas valides.');
    }
    return { type: option.type, count: String(option.count) };
  });
  return { product: book.product, options, name: (typeof book.name === 'string' && book.name.trim().slice(0, 160)) || 'Bibliothèque Ouverte d’Égyptologie — édition imprimée' };
}

function stringField(value, name, { max = 150, optional = false } = {}) {
  if (value === undefined || value === null || value === '') {
    if (optional) return '';
    fail(400, 'invalid_destination', `Champ requis : ${name}.`);
  }
  if (typeof value !== 'string' || value.trim().length > max || /[\u0000-\u001f\u007f]/.test(value)) fail(400, 'invalid_destination', `Champ non valide : ${name}.`);
  const result = value.trim();
  if (!optional && !result) fail(400, 'invalid_destination', `Champ requis : ${name}.`);
  return result;
}

export function validateDestination(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body) || !body.address || typeof body.address !== 'object' || Array.isArray(body.address)) fail(400, 'invalid_destination', 'Adresse de livraison requise.');
  const country = stringField(body.address.country, 'pays', { max: 2 }).toUpperCase();
  // Country codes accepted by providers are validated again by Cloudprinter and Stripe.
  if (!/^[A-Z]{2}$/.test(country)) fail(400, 'invalid_destination', 'Le pays doit être un code ISO à deux lettres.');
  const email = stringField(body.email, 'courriel', { max: 254 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fail(400, 'invalid_destination', 'Adresse courriel non valide.');
  const customer = {
    name: stringField(body.name, 'nom'), email,
    phone: stringField(body.phone, 'téléphone', { max: 40, optional: true }),
    locale: body.locale === 'en' ? 'en' : 'fr',
    address: {
      line1: stringField(body.address.line1, 'adresse'),
      line2: stringField(body.address.line2, 'complément', { optional: true }),
      city: stringField(body.address.city, 'ville', { max: 100 }),
      postalCode: stringField(body.address.postalCode, 'code postal', { max: 20, optional: ['AE', 'HK', 'MO'].includes(country) }),
      state: stringField(body.address.state, 'région', { max: 100, optional: true }),
      country
    }
  };
  if (['US', 'CA'].includes(country) && !customer.address.state) fail(400, 'invalid_destination', 'Une région est requise pour cette destination.');
  return customer;
}

async function readLimitedText(message, limit, errors = {}) {
  const { overflowStatus = 413, overflowCode = 'body_too_large', overflowMessage = 'Requête trop volumineuse.', invalidStatus = 400, invalidCode = 'invalid_json', invalidMessage = 'Corps UTF-8 non valide.' } = errors;
  const length = Number(message.headers.get('content-length'));
  if (Number.isFinite(length) && length > limit) fail(overflowStatus, overflowCode, overflowMessage);
  const reader = message.body?.getReader();
  if (!reader) return '';
  let size = 0; const chunks = [];
  while (true) {
    const { value, done } = await reader.read(); if (done) break;
    size += value.length;
    if (size > limit) {
      try { await reader.cancel(); } catch { /* cancellation failure must not resume reading */ }
      fail(overflowStatus, overflowCode, overflowMessage);
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  try { return new TextDecoder('utf-8', { fatal: true }).decode(bytes); }
  catch { fail(invalidStatus, invalidCode, invalidMessage); }
}

async function readBody(request) {
  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') fail(415, 'json_required', 'Une requête JSON est requise.');
  const text = await readLimitedText(request, MAX_BODY_BYTES);
  try { return JSON.parse(text); }
  catch { fail(400, 'invalid_json', 'JSON non valide.'); }
}

export function decimalMicros(value) {
  if (typeof value !== 'string' || !/^\d{1,8}(?:\.\d{1,6})?$/.test(value)) fail(502, 'invalid_shipping_quote', 'Montant de livraison non valide reçu de l’imprimeur.');
  const [whole, fraction = ''] = value.split('.');
  return BigInt(whole) * 1_000_000n + BigInt(fraction.padEnd(6, '0'));
}
const microsToCents = value => Number((value + 5_000n) / 10_000n);

export function normalizeCloudprinterQuote(data, now = seconds()) {
  if (!data || data.currency !== 'EUR' || !Array.isArray(data.shipments) || data.shipments.length < 1 || data.shipments.length > 5) fail(502, 'invalid_shipping_quote', 'L’imprimeur n’a pas renvoyé de livraison en euros.');
  const providerExpiresAt = Math.floor(Date.parse(data.expire_date) / 1000);
  if (!Number.isFinite(providerExpiresAt) || providerExpiresAt < now + SESSION_TTL) fail(502, 'invalid_shipping_quote', 'La durée de validité du devis est insuffisante.');
  let combinations = [{ micros: 0n, providerQuotes: [], labels: [] }];
  for (const [shipmentIndex, shipment] of data.shipments.entries()) {
    if (!Array.isArray(shipment.items) || shipment.items.length < 1 || shipment.items.some(item => item.reference !== 'boe') || !Array.isArray(shipment.quotes) || shipment.quotes.length < 1 || shipment.quotes.length > 20) fail(502, 'invalid_shipping_quote', 'Les colis du devis ne correspondent pas au volume.');
    const choices = shipment.quotes.map(quote => {
      if (quote.currency !== 'EUR' || typeof quote.quote !== 'string' || !/^[a-zA-Z0-9._:-]{1,250}$/.test(quote.quote)) fail(502, 'invalid_shipping_quote', 'Référence ou devise de livraison non valide.');
      const service = stringFromProvider(quote.service);
      const level = stringFromProvider(quote.shipping_level);
      const shippingOption = stringFromProvider(quote.shipping_option);
      return {
        micros: decimalMicros(quote.price) + decimalMicros(quote.vat),
        label: [...new Set([service, shippingOption].filter(Boolean))].join(' — ') || 'Livraison Cloudprinter',
        source: { shipmentIndex, quote: quote.quote, service, shippingLevel: level, shippingOption }
      };
    });
    if (combinations.length * choices.length > 50) fail(502, 'too_many_shipping_options', 'Le devis contient trop de combinaisons de livraison.');
    combinations = combinations.flatMap(combination => choices.map(choice => ({
      micros: combination.micros + choice.micros,
      providerQuotes: [...combination.providerQuotes, choice.source],
      labels: [...combination.labels, choice.label]
    })));
  }
  const options = combinations.map((combination, index) => {
    const amount = microsToCents(combination.micros);
    if (!Number.isSafeInteger(amount) || amount < 0 || amount > MAX_SHIPPING_AMOUNT) fail(502, 'invalid_shipping_quote', 'Montant de livraison hors limites.');
    return { id: `shipping_${index + 1}`, label: [...new Set(combination.labels)].join(' + ').slice(0, 200), amount, currency: 'EUR', providerQuotes: combination.providerQuotes };
  }).sort((a, b) => a.amount - b.amount);
  return { options, providerExpiresAt };
}

function stringFromProvider(value) { return typeof value === 'string' ? value.replace(/[\u0000-\u001f\u007f]/g, '').slice(0, 100) : ''; }

async function providerFetch(url, init, code) {
  let result;
  // Workers supports manual/follow; refuse redirects without following them or forwarding credentials.
  try { result = await fetch(url, { ...init, signal: AbortSignal.timeout(20_000), redirect: 'manual' }); }
  catch { fail(502, code, 'Le service externe est temporairement indisponible.'); }
  if (!result.ok) fail(502, code, `Le service externe a refusé la requête de test (HTTP ${result.status}).`);
  const text = await readLimitedText(result, 512_000, { overflowStatus: 502, overflowCode: code, overflowMessage: 'Réponse externe trop volumineuse.', invalidStatus: 502, invalidCode: code, invalidMessage: 'Réponse externe non valide.' });
  try { return JSON.parse(text); } catch { fail(502, code, 'Réponse externe non valide.'); }
}

async function cloudprinterQuote(env, customer, book) {
  if (typeof env.CLOUDPRINTER_API_KEY !== 'string' || env.CLOUDPRINTER_API_KEY.length < 10) fail(503, 'cloudprinter_not_configured', 'L’accès aux devis imprimeur doit être configuré.');
  const payload = {
    apikey: env.CLOUDPRINTER_API_KEY, country: customer.address.country,
    currency: 'EUR', items: [{ reference: 'boe', product: book.product, count: '1', options: book.options }]
  };
  if (customer.address.state) payload.state = customer.address.state;
  const data = await providerFetch(CLOUDPRINTER_QUOTE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) }, 'cloudprinter_quote_failed');
  return normalizeCloudprinterQuote(data);
}

function stripeKey(env) {
  if (typeof env.STRIPE_SECRET_KEY !== 'string' || !/^(?:sk|rk)_test_[a-zA-Z0-9]{12,}$/.test(env.STRIPE_SECRET_KEY)) fail(503, 'stripe_test_key_required', 'Une clé Stripe de test est requise.');
  return env.STRIPE_SECRET_KEY;
}

async function stripeRequest(env, path, parameters, idempotencyKey) {
  const key = stripeKey(env);
  const requestCode = path === '/customers' ? 'stripe_customer_request_failed' : path === '/checkout/sessions' ? 'stripe_checkout_request_failed' : 'stripe_request_failed';
  const data = await providerFetch(`${STRIPE_API}${path}`, {
    method: 'POST', headers: { Authorization: `Bearer ${key}`, 'Stripe-Version': STRIPE_API_VERSION, 'Content-Type': 'application/x-www-form-urlencoded', 'Idempotency-Key': idempotencyKey },
    body: new URLSearchParams(parameters).toString()
  }, requestCode);
  if (data.livemode !== false) fail(502, 'stripe_not_test', 'Stripe n’a pas confirmé le mode test.');
  return data;
}

async function stripePrice(env) {
  if (!/^price_[a-zA-Z0-9]{8,100}$/.test(env.STRIPE_PRICE_ID || '')) fail(503, 'stripe_price_required', 'Le prix Stripe de test doit être configuré.');
  const price = await providerFetch(`${STRIPE_API}/prices/${env.STRIPE_PRICE_ID}`, {
    method: 'GET', headers: { Authorization: `Bearer ${stripeKey(env)}`, 'Stripe-Version': STRIPE_API_VERSION, Accept: 'application/json' }
  }, 'stripe_price_request_failed');
  if (price.id !== env.STRIPE_PRICE_ID || price.livemode !== false || price.active !== true || price.unit_amount !== BOOK_AMOUNT || price.currency !== 'eur' || price.type !== 'one_time' || price.recurring) fail(503, 'stripe_price_invalid', 'Le prix Stripe doit être un paiement unique de test à 35 € en euros.');
  return price.id;
}

async function throttle(request, env, endpoint) {
  const ip = request.headers.get('CF-Connecting-IP');
  if (!ip) return; // Local tests have no edge-supplied address.
  const now = seconds(); const minute = Math.floor(now / 60);
  const salt = env.RATE_LIMIT_SALT || env.STRIPE_WEBHOOK_SECRET || env.CLOUDPRINTER_API_KEY;
  if (!salt) fail(503, 'rate_limit_not_configured', 'La protection des tests doit être configurée.');
  const hash = hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}:${minute}`)));
  const bucket = `${endpoint}:${hash}`;
  const row = await env.DB.prepare('INSERT INTO rate_limits (bucket, count, expires_at) VALUES (?, 1, ?) ON CONFLICT(bucket) DO UPDATE SET count = count + 1 RETURNING count').bind(bucket, now + 180).first();
  if (!row || row.count > 8) fail(429, 'rate_limited', 'Trop de tentatives. Réessaie dans une minute.');
}

async function createQuote(request, env) {
  const book = bookConfig(env); const customer = validateDestination(await readBody(request));
  await throttle(request, env, 'quote');
  const { options, providerExpiresAt } = await cloudprinterQuote(env, customer, book);
  const now = seconds(); const expiresAt = Math.min(now + QUOTE_TTL, providerExpiresAt - SESSION_TTL);
  if (expiresAt <= now) fail(502, 'quote_expired', 'Le devis de livraison doit être recalculé.');
  const id = crypto.randomUUID();
  await env.DB.prepare('INSERT INTO quotes (id, created_at, expires_at, provider_expires_at, customer_json, shipping_options_json, currency, book_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)').bind(id, now, expiresAt, providerExpiresAt, JSON.stringify(customer), JSON.stringify(options), 'EUR', BOOK_AMOUNT).run();
  return { quoteId: id, expiresAt: new Date(expiresAt * 1000).toISOString(), bookAmount: BOOK_AMOUNT, currency: 'EUR', mode: 'test', shippingOptions: options.map(({ providerQuotes, ...option }) => option) };
}

function stripeCustomerParameters(customer, quoteId) {
  const result = { name: customer.name, email: customer.email, 'metadata[boe_quote_id]': quoteId, 'shipping[name]': customer.name };
  if (customer.phone) { result.phone = customer.phone; result['shipping[phone]'] = customer.phone; }
  for (const [key, value] of Object.entries(customer.address)) {
    if (value) result[`shipping[address][${key === 'postalCode' ? 'postal_code' : key}]`] = value;
  }
  return result;
}

export function sessionParameters(quote, option, customer, book, stripeCustomerId, priceId) {
  const language = customer.locale === 'en' ? 'en' : 'fr';
  const returnPath = language === 'en' ? '/en/printed-edition.html' : '/fr/edition-imprimee.html';
  const expiresAt = quote.created_at + SESSION_TTL;
  return {
    mode: 'payment', customer: stripeCustomerId, locale: language,
    'line_items[0][price]': priceId, 'line_items[0][quantity]': '1',
    'shipping_options[0][shipping_rate_data][type]': 'fixed_amount',
    'shipping_options[0][shipping_rate_data][fixed_amount][amount]': String(option.amount),
    'shipping_options[0][shipping_rate_data][fixed_amount][currency]': 'eur',
    'shipping_options[0][shipping_rate_data][display_name]': option.label,
    'invoice_creation[enabled]': 'true',
    'invoice_creation[invoice_data][description]': `${book.name} — test`,
    'billing_address_collection': 'required',
    'metadata[boe_quote_id]': quote.id, 'metadata[shipping_option_id]': option.id,
    'metadata[boe_mode]': 'test', 'payment_intent_data[metadata][boe_quote_id]': quote.id,
    'payment_intent_data[description]': `${book.name} — test`,
    success_url: `${SITE_ORIGIN}${returnPath}?payment=success&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE_ORIGIN}${returnPath}?payment=cancelled`,
    expires_at: String(expiresAt), client_reference_id: quote.id
  };
}

async function createCheckout(request, env) {
  stripeKey(env); const book = bookConfig(env); const body = await readBody(request);
  if (!/^[a-f0-9-]{36}$/.test(body?.quoteId || '') || !/^shipping_\d{1,2}$/.test(body?.shippingOptionId || '')) fail(400, 'invalid_quote', 'Le devis ou le mode de livraison n’est pas valide.');
  await throttle(request, env, 'checkout');
  let quote = await env.DB.prepare('SELECT * FROM quotes WHERE id = ?').bind(body.quoteId).first();
  if (!quote) fail(404, 'quote_not_found', 'Le devis de livraison est introuvable.');
  const now = seconds();
  if (quote.checkout_option_id && quote.checkout_option_id !== body.shippingOptionId) fail(409, 'shipping_option_locked', 'Un paiement a déjà été préparé avec un autre mode de livraison. Recalcule un devis pour changer.');
  if (quote.checkout_url && quote.checkout_expires_at > now) return { url: quote.checkout_url, mode: 'test' };
  if (quote.expires_at <= now || quote.created_at + SESSION_TTL < now + 30 * 60 || quote.provider_expires_at < quote.created_at + SESSION_TTL) fail(409, 'quote_expired', 'Le devis de livraison a expiré. Recalcule les frais.');
  const option = JSON.parse(quote.shipping_options_json).find(item => item.id === body.shippingOptionId);
  if (!option || quote.book_amount !== BOOK_AMOUNT || quote.currency !== 'EUR') fail(409, 'invalid_quote', 'Le devis doit être recalculé.');
  const priceId = await stripePrice(env);
  await env.DB.prepare('UPDATE quotes SET checkout_option_id = ? WHERE id = ? AND (checkout_option_id IS NULL OR checkout_option_id = ?)').bind(option.id, quote.id, option.id).run();
  quote = await env.DB.prepare('SELECT * FROM quotes WHERE id = ?').bind(quote.id).first();
  if (quote.checkout_option_id !== option.id) fail(409, 'shipping_option_locked', 'Un autre mode de livraison a déjà été retenu.');
  const customer = JSON.parse(quote.customer_json);
  let customerId = quote.stripe_customer_id;
  if (!customerId) {
    const stripeCustomer = await stripeRequest(env, '/customers', stripeCustomerParameters(customer, quote.id), `boe-customer-${quote.id}`);
    if (!/^cus_[a-zA-Z0-9]+$/.test(stripeCustomer.id || '')) fail(502, 'stripe_response_invalid', 'Réponse Stripe non valide.');
    customerId = stripeCustomer.id;
    await env.DB.prepare('UPDATE quotes SET stripe_customer_id = ? WHERE id = ?').bind(customerId, quote.id).run();
  }
  const session = await stripeRequest(env, '/checkout/sessions', sessionParameters(quote, option, customer, book, customerId, priceId), `boe-checkout-${quote.id}-${option.id}`);
  if (!/^cs_test_[a-zA-Z0-9]+$/.test(session.id || '') || !Number.isInteger(session.expires_at) || session.amount_total !== BOOK_AMOUNT + option.amount || session.currency !== 'eur') fail(502, 'stripe_response_invalid', 'Le montant du paiement de test ne correspond pas au devis.');
  let checkoutUrl;
  try { checkoutUrl = new URL(session.url); } catch { fail(502, 'stripe_response_invalid', 'Lien Stripe non valide.'); }
  if (checkoutUrl.protocol !== 'https:' || checkoutUrl.hostname !== 'checkout.stripe.com' || checkoutUrl.username || checkoutUrl.password) fail(502, 'stripe_response_invalid', 'Lien Stripe non valide.');
  await env.DB.batch([
    env.DB.prepare('UPDATE quotes SET stripe_session_id = ?, checkout_url = ?, checkout_expires_at = ? WHERE id = ?').bind(session.id, session.url, session.expires_at, quote.id),
    env.DB.prepare('INSERT INTO orders (id, quote_id, stripe_session_id, shipping_option_id, total_amount, currency, created_at) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(stripe_session_id) DO NOTHING').bind(crypto.randomUUID(), quote.id, session.id, option.id, BOOK_AMOUNT + option.amount, 'EUR', now)
  ]);
  return { url: session.url, mode: 'test' };
}

export async function verifyStripeSignature(payload, signatureHeader, secret, now = seconds()) {
  if (typeof secret !== 'string' || !secret.startsWith('whsec_') || !signatureHeader) return false;
  const parts = signatureHeader.split(',').map(part => part.trim().split('='));
  const timestamps = parts.filter(([key]) => key === 't');
  const signatures = parts.filter(([key, value]) => key === 'v1' && /^[a-f0-9]{64}$/.test(value || '')).map(([, value]) => value);
  if (timestamps.length !== 1 || !/^\d{10}$/.test(timestamps[0][1] || '') || signatures.length < 1 || signatures.length > 10) return false;
  const timestamp = Number(timestamps[0][1]);
  if (Math.abs(now - timestamp) > 300) return false;
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  const signed = new TextEncoder().encode(`${timestamp}.${payload}`);
  for (const signature of signatures) {
    const bytes = new Uint8Array(signature.match(/../g).map(pair => parseInt(pair, 16)));
    if (await crypto.subtle.verify('HMAC', key, bytes, signed)) return true;
  }
  return false;
}

async function webhook(request, env) {
  if (!env.STRIPE_WEBHOOK_SECRET) fail(503, 'webhook_not_configured', 'Le webhook de test doit être configuré.');
  const payload = await readLimitedText(request, 256_000, { overflowMessage: 'Webhook trop volumineux.' });
  if (!(await verifyStripeSignature(payload, request.headers.get('stripe-signature'), env.STRIPE_WEBHOOK_SECRET))) fail(400, 'invalid_signature', 'Signature du webhook non valide.');
  let event; try { event = JSON.parse(payload); } catch { fail(400, 'invalid_json', 'Webhook non valide.'); }
  if (event.livemode !== false) fail(400, 'live_event_rejected', 'Les événements de paiement réel sont refusés.');
  if (!/^evt_[a-zA-Z0-9]+$/.test(event.id || '') || typeof event.type !== 'string') fail(400, 'invalid_event', 'Événement Stripe non valide.');
  const receivedAt = seconds();
  await env.DB.prepare('INSERT INTO stripe_events (id, type, received_at) VALUES (?, ?, ?) ON CONFLICT(id) DO NOTHING').bind(event.id, event.type, receivedAt).run();
  const stored = await env.DB.prepare('SELECT processed_at FROM stripe_events WHERE id = ?').bind(event.id).first();
  if (stored?.processed_at) return { received: true, mode: 'test', duplicate: true };
  if (['checkout.session.completed', 'checkout.session.async_payment_succeeded'].includes(event.type)) {
    const session = event.data?.object;
    if (!session || session.livemode !== false || !/^cs_test_[a-zA-Z0-9]+$/.test(session.id || '') || session.metadata?.boe_mode !== 'test') fail(400, 'invalid_test_session', 'Session de test non valide.');
    const order = await env.DB.prepare('SELECT * FROM orders WHERE stripe_session_id = ?').bind(session.id).first();
    // A webhook can race the session creation write; request retry rather than lose it.
    if (!order) fail(409, 'order_not_ready', 'La commande de test n’est pas encore enregistrée.');
    if (session.amount_total !== order.total_amount || session.currency !== 'eur' || session.metadata.boe_quote_id !== order.quote_id || session.metadata.shipping_option_id !== order.shipping_option_id) fail(400, 'payment_mismatch', 'Le paiement ne correspond pas à la commande.');
    if (session.payment_status === 'paid') {
      const intent = typeof session.payment_intent === 'string' && /^pi_[a-zA-Z0-9]+$/.test(session.payment_intent) ? session.payment_intent : null;
      await env.DB.batch([
        env.DB.prepare("UPDATE orders SET status = 'test_paid', fulfillment_status = 'disabled', paid_at = COALESCE(paid_at, ?), stripe_payment_intent_id = COALESCE(stripe_payment_intent_id, ?) WHERE stripe_session_id = ?").bind(receivedAt, intent, session.id),
        env.DB.prepare('UPDATE stripe_events SET processed_at = ? WHERE id = ?').bind(receivedAt, event.id)
      ]);
      return { received: true, mode: 'test', fulfillment: 'disabled' };
    }
  }
  await env.DB.prepare('UPDATE stripe_events SET processed_at = ? WHERE id = ?').bind(receivedAt, event.id).run();
  return { received: true, mode: 'test', fulfillment: 'disabled' };
}

export async function handleRequest(request, env) {
  const origin = request.headers.get('origin');
  try {
    safeMode(env);
    const url = new URL(request.url);
    if (url.pathname === '/api/health' && request.method === 'GET') {
      let bookReady = false; try { bookConfig(env); bookReady = true; } catch { /* no config details exposed */ }
      let stripeReady = false; try { stripeKey(env); stripeReady = true; } catch { /* no key details exposed */ }
      return response({ mode: 'test', fulfillment: 'disabled', bookAmount: BOOK_AMOUNT, currency: 'EUR', configured: { storage: Boolean(env.DB), book: bookReady, cloudprinter: Boolean(env.CLOUDPRINTER_API_KEY), stripe: stripeReady, price: /^price_[a-zA-Z0-9]{8,100}$/.test(env.STRIPE_PRICE_ID || ''), webhook: Boolean(env.STRIPE_WEBHOOK_SECRET) } }, 200, origin);
    }
    requireDb(env);
    if (url.pathname === '/api/stripe/webhook' && request.method === 'POST') return response(await webhook(request, env));
    if (!['/api/shipping-quotes', '/api/checkout'].includes(url.pathname)) fail(404, 'not_found', 'Adresse inconnue.');
    if (origin !== SITE_ORIGIN) fail(403, 'origin_not_allowed', 'Origine du site non autorisée.');
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...jsonHeaders, 'Access-Control-Allow-Origin': SITE_ORIGIN, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '600', Vary: 'Origin' } });
    if (request.method !== 'POST') fail(405, 'method_not_allowed', 'Méthode non autorisée.');
    if (url.pathname === '/api/shipping-quotes') return response(await createQuote(request, env), 200, origin);
    return response(await createCheckout(request, env), 200, origin);
  } catch (error) {
    if (error instanceof AppError) return response({ error: { code: error.code, message: error.message }, mode: 'test' }, error.status, origin);
    // Do not log raw exceptions: provider errors and request bodies may contain PII or credentials.
    return response({ error: { code: 'internal_error', message: 'Le service de test est temporairement indisponible.' }, mode: 'test' }, 500, origin);
  }
}

export default {
  fetch: handleRequest,
  async scheduled(_controller, env) {
    safeMode(env); requireDb(env); const now = seconds();
    await env.DB.batch([
      env.DB.prepare('DELETE FROM quotes WHERE created_at < ?').bind(now - 2 * 86400),
      env.DB.prepare('DELETE FROM rate_limits WHERE expires_at < ?').bind(now),
      env.DB.prepare('DELETE FROM stripe_events WHERE received_at < ?').bind(now - 31 * 86400)
    ]);
  }
};
