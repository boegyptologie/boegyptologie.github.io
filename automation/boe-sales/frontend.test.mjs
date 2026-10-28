import test from "node:test";
import assert from "node:assert/strict";
import { configuredApiBase, validatedQuote, checkoutUrl } from "../../assets/boe-sales-core.mjs";

const now = Date.parse("2026-10-28T10:00:00Z");
const quote = () => ({ quoteId: "quote_123", expiresAt: "2026-10-28T10:15:00Z", mode: "test", currency: "EUR", bookAmount: 3500, shippingOptions: [{ id: "normal", label: "Standard", amount: 640, currency: "EUR" }] });

test("no configured API means no API base; reject secrets and non-HTTPS URLs", () => {
  for (const value of [undefined, "", "/", "http://localhost:8787", "javascript:alert(1)", "https://user:secret@example.com", "https://example.com?key=secret"]) assert.equal(configuredApiBase(value), null);
  assert.equal(configuredApiBase("https://sales.example.workers.dev/"), "https://sales.example.workers.dev");
});
test("accept a current EUR test quote with the fixed book price", () => {
  const value = validatedQuote(quote(), now);
  assert.equal(value.shippingOptions[0].amount, 640);
  assert.equal(value.expiresAt, now + 15 * 60_000);
});
test("reject live, tampered and expired quotes", () => {
  for (const changes of [{ mode: "live" }, { currency: "USD" }, { bookAmount: 3499 }, { quoteId: "" }, { expiresAt: "2026-10-28T09:59:00Z" }]) {
    assert.throws(() => validatedQuote({ ...quote(), ...changes }, now));
  }
});
test("reject duplicate, fractional, negative or mismatched shipping prices", () => {
  for (const changes of [{ amount: -1 }, { amount: 1.1 }, { amount: Infinity }, { currency: "USD" }, { id: "" }]) {
    const value = quote(); value.shippingOptions = [{ ...value.shippingOptions[0], ...changes }];
    assert.throws(() => validatedQuote(value, now));
  }
  const value = quote(); value.shippingOptions.push({ ...value.shippingOptions[0] });
  assert.throws(() => validatedQuote(value, now));
});
test("support the server's maximum of 50 shipping combinations", () => {
  const value = quote();
  value.shippingOptions = Array.from({ length: 50 }, (_, index) => ({ id: `shipping_${index + 1}`, label: `Service ${index + 1}`, amount: index, currency: "EUR" }));
  assert.equal(validatedQuote(value, now).shippingOptions.length, 50);
  value.shippingOptions.push({ id: "shipping_51", label: "Too many", amount: 51, currency: "EUR" });
  assert.throws(() => validatedQuote(value, now));
});
test("checkout redirects stay on the genuine HTTPS Stripe checkout host", () => {
  assert.equal(checkoutUrl({ url: "https://checkout.stripe.com/c/pay/cs_test_123" }), "https://checkout.stripe.com/c/pay/cs_test_123");
  for (const url of ["javascript:alert(1)", "http://checkout.stripe.com/x", "https://checkout.stripe.com.attacker.test/x", "https://user:pass@checkout.stripe.com/x", "https://checkout.stripe.com:444/x", "/relative"]) assert.throws(() => checkoutUrl({ url }));
});
