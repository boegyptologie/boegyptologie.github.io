export const BOOK_AMOUNT = 3500;

export function configuredApiBase(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) return null;
    return url.href.replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function validatedQuote(value, now = Date.now()) {
  if (!value || typeof value !== "object" || value.mode !== "test" || value.currency !== "EUR" || value.bookAmount !== BOOK_AMOUNT) throw new Error("invalid_quote");
  if (typeof value.quoteId !== "string" || !value.quoteId || value.quoteId.length > 256) throw new Error("invalid_quote");
  const expiry = Date.parse(value.expiresAt);
  if (!Number.isFinite(expiry) || expiry <= now) throw new Error("quote_expired");
  if (!Array.isArray(value.shippingOptions) || !value.shippingOptions.length || value.shippingOptions.length > 50) throw new Error("shipping_unavailable");
  const ids = new Set();
  const shippingOptions = value.shippingOptions.map(option => {
    if (!option || typeof option.id !== "string" || !option.id || option.id.length > 256 || ids.has(option.id) || typeof option.label !== "string" || !option.label.trim() || option.label.length > 300 || option.currency !== "EUR" || !Number.isSafeInteger(option.amount) || option.amount < 0 || !Number.isSafeInteger(option.amount + BOOK_AMOUNT)) throw new Error("invalid_quote");
    ids.add(option.id);
    return { id: option.id, label: option.label, amount: option.amount, currency: "EUR" };
  });
  return { quoteId: value.quoteId, expiresAt: expiry, shippingOptions };
}

export function checkoutUrl(value) {
  if (!value || typeof value.url !== "string") throw new Error("invalid_checkout");
  try {
    const url = new URL(value.url);
    if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com" || url.username || url.password || url.port) throw new Error("invalid_checkout");
    return url.href;
  } catch {
    throw new Error("invalid_checkout");
  }
}
