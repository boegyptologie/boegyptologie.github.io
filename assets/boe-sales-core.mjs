export const BOOK_AMOUNT = 3500;
export const SITE_COUNTRY_CODES = Object.freeze("AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" "));

const sourceObject = value => value && typeof value === "object" && !Array.isArray(value);
const sourceText = (value, maximum) => typeof value === "string" && value.length <= maximum;

export function validatedShippingReference(value) {
  if (!sourceObject(value) || value.schemaVersion !== 1 || typeof value.version !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value.version) || !Array.isArray(value.countries) || !sourceObject(value.regionsByCountry) || !Number.isInteger(value.countryCount) || value.countryCount < 1 || value.countryCount > 300 || value.countryCount !== value.countries.length || !Number.isInteger(value.regionCount) || value.regionCount < 0 || value.regionCount > 10000) throw new Error("shipping_reference_unavailable");
  const supported = new Set(SITE_COUNTRY_CODES);
  const countryCodes = new Set();
  const countries = [];
  let totalRegions = 0;
  for (const country of value.countries) {
    if (!sourceObject(country) || !/^[A-Z]{2}$/.test(country.country_reference || "") || countryCodes.has(country.country_reference) || !sourceText(country.note, 1000) || ![0, 1].includes(country.require_state)) throw new Error("shipping_reference_unavailable");
    const code = country.country_reference;
    countryCodes.add(code);
    const source = value.regionsByCountry[code];
    if (!sourceObject(source) || source.status !== "ok" || !Array.isArray(source.regions) || source.regions.length > 1000 || (country.require_state === 1 && !source.regions.length)) throw new Error("shipping_reference_unavailable");
    const references = new Set();
    const regions = source.regions.map(region => {
      if (!sourceObject(region) || !sourceText(region.state_reference, 200) || !region.state_reference.trim() || references.has(region.state_reference) || !sourceText(region.note, 2000)) throw new Error("shipping_reference_unavailable");
      references.add(region.state_reference);
      return Object.freeze({ reference: region.state_reference, note: region.note });
    });
    totalRegions += regions.length;
    // AN and XK require a separate payment-country decision before being offered.
    if (supported.has(code) && code !== "AN" && code !== "XK") countries.push(Object.freeze({ code, note: country.note, requiresRegion: country.require_state === 1, regions: Object.freeze(regions) }));
  }
  if (Object.keys(value.regionsByCountry).length !== countryCodes.size || Object.keys(value.regionsByCountry).some(code => !countryCodes.has(code)) || totalRegions !== value.regionCount || !countries.length) throw new Error("shipping_reference_unavailable");
  return Object.freeze({ version: value.version, countryCount: value.countryCount, regionCount: totalRegions, countries: Object.freeze(countries) });
}

export function cloudprinterRegionValue(reference, countryCode, rawValue) {
  const country = reference?.countries?.find(entry => entry.code === countryCode);
  if (!country) throw new Error("unsupported_country");
  if (typeof rawValue !== "string") throw new Error("invalid_cloudprinter_region");
  if (!country.requiresRegion) {
    if (rawValue !== "") throw new Error("invalid_cloudprinter_region");
    return "";
  }
  if (!rawValue) throw new Error("cloudprinter_region_required");
  if (!country.regions.some(region => region.reference === rawValue)) throw new Error("invalid_cloudprinter_region");
  return rawValue;
}

export function configuredSalesMode(value) {
  return value === "test" || value === "live" ? value : null;
}

export function validatedOrderServiceHealth(value, expectedMode) {
  if (!configuredSalesMode(expectedMode) || !sourceObject(value) || value.mode !== expectedMode || value.bookAmount !== BOOK_AMOUNT || value.currency !== "EUR" || !(expectedMode === "test" ? ["disabled", "sandbox"] : ["disabled", "automatic"]).includes(value.fulfillment)) throw new Error("sales_mode_mismatch");
  return expectedMode;
}

export function validatedSalesHealth(value, expectedMode) {
  validatedOrderServiceHealth(value, expectedMode);
  if (value.ready === false || (expectedMode === "live" && value.fulfillment !== "automatic")) throw new Error("sales_mode_mismatch");
  return expectedMode;
}

export function validatedLegalConfiguration(config, health, locale) {
  if (config?.mode !== "live") return null;
  if (typeof config.legalVersion !== "string" || !config.legalVersion.trim() || config.legalVersion.length > 100 || health?.legalVersion !== config.legalVersion) throw new Error("legal_configuration_required");
  try {
    const url = new URL(config.termsUrls?.[locale]);
    if (url.protocol !== "https:" || url.origin !== "https://boegyptologie.github.io" || url.username || url.password || url.search || url.hash || url.pathname === "/") throw new Error("legal_configuration_required");
    return Object.freeze({ version: config.legalVersion, url: url.href });
  } catch { throw new Error("legal_configuration_required"); }
}

export function cloudprinterCustomerIdentificationValue(countryCode, rawValue, expectedMode, fulfillment = "disabled") {
  if (countryCode !== "BR") return "";
  if (typeof rawValue !== "string") throw new Error("invalid_customer_identification");
  const digits = rawValue.replace(/[.\-\s]/g, "");
  if (!digits && expectedMode === "test" && fulfillment !== "sandbox") return "";
  if (!/^[0-9]{11}$/.test(digits)) throw new Error("invalid_customer_identification");
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

export function validatedOrderCapability(value, expectedMode = "live") {
  if (!configuredSalesMode(expectedMode) || !value || value.mode !== expectedMode || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(value.orderId || "") || typeof value.statusToken !== "string" || !/^[a-f0-9]{64}$/.test(value.statusToken)) throw new Error("invalid_checkout");
  return { mode: expectedMode, orderId: value.orderId, statusToken: value.statusToken };
}

export function orderCapabilityFromFragment(fragment, expectedMode) {
  if (typeof fragment !== "string" || fragment.length > 400) throw new Error("invalid_checkout");
  const params = new URLSearchParams(fragment.replace(/^#/, ""));
  const fields = ["order_id", "status_token", "mode"];
  if ([...params.keys()].some(key => !fields.includes(key)) || fields.some(key => params.getAll(key).length !== 1)) throw new Error("invalid_checkout");
  return validatedOrderCapability({ orderId: params.get("order_id"), statusToken: params.get("status_token"), mode: params.get("mode") }, expectedMode);
}

function safeHttpsLink(value, hosts) {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port || (hosts && !hosts.includes(url.hostname))) return null;
    return url.href;
  } catch { return null; }
}

export function validatedOrderStatus(value, expectedMode) {
  if (!configuredSalesMode(expectedMode) || !sourceObject(value) || value.mode !== expectedMode || !["paid", "pending", "failed"].includes(value.paymentStatus) || typeof value.fulfillmentStatus !== "string" || !value.fulfillmentStatus || value.fulfillmentStatus.length > 100) throw new Error("invalid_order_status");
  return {
    paymentStatus: value.paymentStatus,
    fulfillmentStatus: value.fulfillmentStatus,
    withdrawalStatus: typeof value.withdrawalStatus === "string" && /^[a-z_]{1,50}$/.test(value.withdrawalStatus) ? value.withdrawalStatus : "",
    invoiceUrl: safeHttpsLink(value.invoiceUrl, ["invoice.stripe.com", "pay.stripe.com"]),
    trackingUrl: safeHttpsLink(value.tracking?.url),
    trackingCode: typeof value.tracking?.tracking === "string" && value.tracking.tracking.length <= 200 ? value.tracking.tracking : ""
  };
}

export function withdrawalDeclaration(firstName, lastName, email) {
  const name = value => typeof value === "string" && value.trim() && value.length <= 75 && !/[\u0000-\u001f\u007f]/.test(value);
  if (!name(firstName) || !name(lastName) || typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) throw new Error("withdrawal_confirmation_required");
  return { firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() };
}

export function withdrawalTextReceipt(text, reference) {
  if (typeof text !== "string" || !text.trim() || text.length > 65536 || !/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(reference || "")) throw new Error("invalid_withdrawal_response");
  return { text, filename: `BOE-retractation-${reference}.txt`, mediaType: "text/plain;charset=utf-8" };
}

export function validatedWithdrawal(value) {
  if (!sourceObject(value) || value.received !== true || typeof value.receivedAt !== "string" || !/^\d{4}-\d{2}-\d{2}T/.test(value.receivedAt) || !Number.isFinite(Date.parse(value.receivedAt)) || !sourceObject(value.receipt) || value.receipt.mediaType !== "text/plain;charset=utf-8") throw new Error("invalid_withdrawal_response");
  return { receipt: withdrawalTextReceipt(value.receipt.text, value.requestId), notificationStatus: value.notificationStatus === "not_sent" ? "not_sent" : "unconfirmed" };
}

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

export function validatedQuote(value, now = Date.now(), expectedMode = "test") {
  if (!configuredSalesMode(expectedMode) || !value || typeof value !== "object" || value.mode !== expectedMode || value.currency !== "EUR" || value.bookAmount !== BOOK_AMOUNT) throw new Error("invalid_quote");
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

export function checkoutUrl(value, expectedMode = "test") {
  if (!configuredSalesMode(expectedMode) || !value || value.mode !== expectedMode || typeof value.url !== "string") throw new Error("invalid_checkout");
  try {
    const url = new URL(value.url);
    if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com" || url.username || url.password || url.port) throw new Error("invalid_checkout");
    return url.href;
  } catch {
    throw new Error("invalid_checkout");
  }
}
