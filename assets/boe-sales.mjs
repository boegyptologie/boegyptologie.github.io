import { BOOK_AMOUNT, configuredApiBase, validatedQuote, checkoutUrl } from "./boe-sales-core.mjs";

const locale = document.documentElement.lang === "en" ? "en" : "fr";
const messages = {
  fr: {
    chooseCountry: "Choisir un pays", notConfigured: "Le paiement de test n’est pas encore disponible.",
    calculating: "Calcul des frais de livraison…", chooseShipping: "Choisissez un mode de livraison pour continuer.", redirecting: "Ouverture du paiement fictif Stripe…",
    unavailable: "Aucune livraison disponible pour cette destination. Vérifiez l’adresse ou contactez BOMA.",
    expired: "Ce devis a expiré. Veuillez recalculer la livraison.",
    invalid: "Le devis n’a pas pu être confirmé. Veuillez réessayer.",
    network: "Connexion interrompue. Veuillez réessayer.",
    address: "Vérifiez les coordonnées, le code postal et la région de livraison.",
    service: "Service momentanément indisponible. Veuillez réessayer.",
    checkout: "Le paiement fictif n’a pas pu être ouvert. Veuillez réessayer.",
    toCalculate: "À calculer", select: "À choisir", expires: "Devis valable jusqu’à", cancel: "Paiement interrompu. Vous pouvez recalculer la livraison pour reprendre.",
    returned: "Retour du paiement fictif. Aucune impression n’a été commandée."
  },
  en: {
    chooseCountry: "Choose a country", notConfigured: "Test checkout is not available yet.",
    calculating: "Calculating delivery costs…", chooseShipping: "Choose a delivery option to continue.", redirecting: "Opening secure Stripe test checkout…",
    unavailable: "Delivery is unavailable for this destination. Check the address or contact BOMA.",
    expired: "This quote has expired. Please calculate delivery again.",
    invalid: "The quote could not be confirmed. Please try again.",
    network: "Connection interrupted. Please try again.",
    address: "Check the contact details, postal code and state or region.",
    service: "Service temporarily unavailable. Please try again.",
    checkout: "Test checkout could not be opened. Please try again.",
    toCalculate: "To be calculated", select: "Choose an option", expires: "Quote valid until", cancel: "Checkout interrupted. You can calculate delivery again to continue.",
    returned: "Returned from test checkout. No print order has been placed."
  }
}[locale];

const config = window.BOE_SALES_CONFIG;
const apiBase = config?.mode === "test" ? configuredApiBase(config.apiBaseUrl) : null;
const form = document.getElementById("destination-form");
const quoteButton = document.getElementById("quote-button");
const payButton = document.getElementById("pay-button");
const status = document.getElementById("sales-status");
const shippingSection = document.getElementById("shipping-section");
const shippingChoices = document.getElementById("shipping-choices");
const shippingAmount = document.getElementById("shipping-amount");
const totalAmount = document.getElementById("total-amount");
const expiresNote = document.getElementById("quote-expiry");
const country = document.getElementById("country");
const money = amount => new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-IE", { style: "currency", currency: "EUR" }).format(amount / 100);
const countryCodes = "AD AE AF AG AI AL AM AO AQ AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" ");
let regionNames;
try { regionNames = new Intl.DisplayNames([locale], { type: "region" }); } catch { regionNames = null; }
const countries = countryCodes.map(code => ({ code, label: regionNames?.of(code) || code }));
countries.sort((a, b) => a.label.localeCompare(b.label, locale));
const placeholder = document.createElement("option");
placeholder.value = "";
placeholder.textContent = messages.chooseCountry;
country.append(placeholder);
for (const entry of countries) {
  const option = document.createElement("option");
  option.value = entry.code;
  option.textContent = entry.label;
  country.append(option);
}

let quote = null;
let selectedOption = null;
let currentController = null;
let expiryTimer;
let revision = 0;
let busy = false;

function showStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
  status.setAttribute("role", isError ? "alert" : "status");
}

function updateButtons() {
  quoteButton.disabled = !apiBase || busy;
  payButton.disabled = !apiBase || busy || !quote || !selectedOption || quote.expiresAt <= Date.now();
  form.setAttribute("aria-busy", String(busy));
}

function invalidateQuote(showMessage = false) {
  revision += 1;
  currentController?.abort();
  currentController = null;
  clearTimeout(expiryTimer);
  busy = false;
  quote = null;
  selectedOption = null;
  shippingSection.hidden = true;
  shippingChoices.replaceChildren();
  expiresNote.textContent = "";
  shippingAmount.textContent = messages.toCalculate;
  totalAmount.textContent = "—";
  if (apiBase) showStatus(showMessage ? messages.expired : "", showMessage);
  updateButtons();
}

function errorMessage(error, stage) {
  const code = error?.message;
  if (code === "quote_expired" || code === "QUOTE_EXPIRED") return messages.expired;
  if (["shipping_unavailable", "SHIPPING_UNAVAILABLE", "no_shipping_options"].includes(code)) return messages.unavailable;
  if (["invalid_address", "INVALID_ADDRESS", "invalid_destination", "invalid_request", "VALIDATION_ERROR"].includes(code)) return messages.address;
  if (["test_mode_required", "book_not_configured", "storage_not_configured", "cloudprinter_not_configured", "stripe_test_key_required", "stripe_price_required", "webhook_not_configured"].includes(code)) return messages.notConfigured;
  if (code === "invalid_quote") return messages.invalid;
  if (error?.name === "AbortError" || error instanceof TypeError) return messages.network;
  return stage === "checkout" ? messages.checkout : messages.service;
}

async function post(path, body, controller) {
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(apiBase + path, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
      signal: controller.signal, credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer"
    });
    const data = await response.json();
    if (!response.ok) {
      const code = typeof data?.error === "string" ? data.error : data?.error?.code;
      throw new Error(typeof code === "string" ? code : "service_error");
    }
    return data;
  } finally { clearTimeout(timeout); }
}

function destination() {
  const values = new FormData(form);
  const value = key => String(values.get(key) || "").trim();
  return {
    name: value("name"), email: value("email"), phone: value("phone"), locale,
    address: { line1: value("line1"), line2: value("line2"), city: value("city"), postalCode: value("postalCode"), state: value("state"), country: value("country") }
  };
}

function renderShipping() {
  shippingChoices.replaceChildren();
  for (const [index, option] of quote.shippingOptions.entries()) {
    const label = document.createElement("label");
    label.className = "option";
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "shippingOption";
    radio.value = option.id;
    radio.id = `shipping-option-${index}`;
    const description = document.createElement("span");
    description.className = "option-label";
    description.textContent = option.label;
    const price = document.createElement("span");
    price.className = "option-price";
    price.textContent = money(option.amount);
    label.append(radio, description, price);
    radio.addEventListener("change", () => {
      if (!quote || quote.expiresAt <= Date.now()) return invalidateQuote(true);
      selectedOption = option;
      shippingAmount.textContent = money(option.amount);
      totalAmount.textContent = money(BOOK_AMOUNT + option.amount);
      showStatus("");
      updateButtons();
    });
    shippingChoices.append(label);
  }
  shippingSection.hidden = false;
  shippingAmount.textContent = messages.select;
  expiresNote.textContent = `${messages.expires} ${new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(quote.expiresAt)}.`;
  expiryTimer = setTimeout(() => invalidateQuote(true), Math.min(quote.expiresAt - Date.now(), 2147483647));
}

form.addEventListener("input", () => invalidateQuote());
form.addEventListener("change", () => invalidateQuote());
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!apiBase || busy || !form.reportValidity()) return;
  invalidateQuote();
  busy = true;
  updateButtons();
  showStatus(messages.calculating);
  const requestRevision = revision;
  const controller = new AbortController();
  currentController = controller;
  try {
    const response = await post("/api/shipping-quotes", destination(), controller);
    if (requestRevision !== revision) return;
    quote = validatedQuote(response);
    renderShipping();
    showStatus(messages.chooseShipping);
    shippingChoices.querySelector("input")?.focus();
  } catch (error) {
    if (requestRevision === revision) showStatus(errorMessage(error, "quote"), true);
  } finally {
    if (currentController === controller) { currentController = null; busy = false; updateButtons(); }
  }
});

payButton.addEventListener("click", async () => {
  if (!apiBase || busy || !quote || !selectedOption) return;
  if (quote.expiresAt <= Date.now()) return invalidateQuote(true);
  busy = true;
  updateButtons();
  showStatus(messages.redirecting);
  const requestRevision = revision;
  const controller = new AbortController();
  currentController = controller;
  try {
    const result = await post("/api/checkout", { quoteId: quote.quoteId, shippingOptionId: selectedOption.id, locale }, controller);
    if (requestRevision !== revision) return;
    window.location.assign(checkoutUrl(result));
  } catch (error) {
    if (requestRevision === revision) showStatus(errorMessage(error, "checkout"), true);
  } finally {
    if (currentController === controller) { currentController = null; busy = false; updateButtons(); }
  }
});

invalidateQuote();
if (!apiBase) showStatus(messages.notConfigured);
else {
  const paymentState = new URLSearchParams(window.location.search).get("payment");
  if (paymentState === "cancelled") showStatus(messages.cancel);
  if (paymentState === "success") showStatus(messages.returned);
}

function updateMobileMenuSeparators() {
  const links = Array.from(document.querySelectorAll('nav a'));
  let previousTop = null;
  links.forEach((link, index) => {
    link.classList.remove('row-start');
    const currentTop = link.offsetTop;
    if (index === 0 || currentTop > previousTop) {
      link.classList.add('row-start');
    }
    previousTop = currentTop;
  });
}
window.addEventListener('load', updateMobileMenuSeparators);
window.addEventListener('resize', updateMobileMenuSeparators);
if (document.fonts) document.fonts.ready.then(updateMobileMenuSeparators);
