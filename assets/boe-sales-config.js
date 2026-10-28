/* Public settings only. Never add an API key or a secret here. */
window.BOE_SALES_CONFIG = Object.freeze({
  apiBaseUrl: "https://boe-sales-staging.editionsboma.workers.dev",
  mode: "test",
  fulfillment: "sandbox",
  features: Object.freeze({ withdrawal: true })
});
