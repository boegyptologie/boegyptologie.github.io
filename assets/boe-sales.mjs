import { BOOK_AMOUNT, configuredApiBase, configuredSalesMode, validatedOrderServiceHealth, validatedSalesHealth, validatedLegalConfiguration, validatedQuote, checkoutUrl, validatedShippingReference, cloudprinterRegionValue, cloudprinterCustomerIdentificationValue, validatedOrderCapability, orderCapabilityFromFragment, validatedOrderStatus, withdrawalDeclaration, withdrawalTextReceipt, validatedWithdrawal } from "./boe-sales-core.mjs?v=7";

const locale = document.documentElement.lang === "en" ? "en" : "fr";
const messages = {
  fr: {
    chooseCountry: "Choisir un pays", notConfigured: "Le paiement n’est pas encore disponible.",
    calculating: "Calcul des frais de livraison…", chooseShipping: "Choisissez un mode de livraison pour continuer.", redirecting: "Ouverture du paiement fictif Stripe…",
    unavailable: "Aucune livraison disponible pour cette destination. Vérifiez l’adresse ou contactez BOMA.",
    expired: "Ce devis a expiré. Veuillez recalculer la livraison.",
    quoteAuthorization: "Ce devis ne peut plus être utilisé pour le paiement. Veuillez recalculer la livraison.",
    invalid: "Le devis n’a pas pu être confirmé. Veuillez réessayer.",
    network: "Connexion interrompue. Veuillez réessayer.",
    address: "Vérifiez les coordonnées, le code postal et la région de livraison.",
    service: "Service momentanément indisponible. Veuillez réessayer.",
    checkout: "Le paiement fictif n’a pas pu être ouvert. Veuillez réessayer.",
    toCalculate: "À calculer", select: "À choisir", expires: "Devis valable jusqu’à", cancel: "Paiement interrompu. Vous pouvez recalculer la livraison pour reprendre.",
    returned: "Retour du paiement fictif. Aucune fabrication ni expédition réelles.",
    referenceLoading: "Chargement des destinations…", referenceUnavailable: "Les destinations de livraison sont indisponibles. Veuillez réessayer.",
    chooseRegion: "Choisir une zone de livraison", regionHint: "Consultez les indications postales de chaque zone avant de la choisir.",
    regionRequired: "Veuillez choisir une zone de livraison pour ce pays.", invalidRegion: "La zone choisie ne correspond pas au pays. Veuillez la sélectionner à nouveau.",
    brazilPostalCodeInvalid: "Veuillez saisir un code postal brésilien (CEP) de huit chiffres, au format 00000-000.",
    brazilPostalCodeUnavailable: "Ce CEP ne correspond à aucune zone du référentiel de livraison. Veuillez vérifier le code postal ou contacter BOMA.",
    brazilPostalRegionMismatch: "La zone de livraison choisie ne correspond pas à ce code postal brésilien. Veuillez vérifier le CEP et la zone.",
    brazilStateInvalid: "Veuillez saisir un code d’État brésilien (UF) valide à deux lettres, ou laisser ce champ facultatif vide.",
    brazilStateRegionMismatch: "L’État indiqué (UF) ne correspond pas au code postal ou à la zone de livraison. Veuillez vérifier ces informations.",
    brazilTariffUnavailable: "La livraison vers le Brésil est momentanément indisponible. Veuillez réessayer ultérieurement ou contacter BOMA.",
    unsupportedCountry: "La livraison n’est pas disponible pour ce pays.", stateOptional: "État, province ou région (facultatif)", stateRequired: "État ou province (obligatoire)",
    liveLabel: "Commande imprimée.", liveDescription: "Le paiement déclenche l’impression et l’expédition de votre exemplaire. Le total inclut la livraison choisie.",
    livePay: "Commander et payer avec Stripe", liveRedirecting: "Ouverture du paiement sécurisé Stripe…", liveCheckoutError: "Le paiement n’a pas pu être ouvert. Veuillez réessayer.",
    modeMismatch: "Le paiement n’est pas disponible. Le service doit être vérifié.", returnedLive: "Retour de Stripe. Le statut du paiement doit être confirmé avant le suivi de la commande.",
    cpfError: "Veuillez vérifier le CPF du destinataire. Le format attendu est 000.000.000-00.", cpfNote: "Ce numéro est demandé par Cloudprinter pour l’expédition au Brésil. Format : 000.000.000-00.", cpfTestNote: "Le CPF peut rester vide pour ce paiement fictif. Pour une expédition réelle au Brésil, Cloudprinter demande le format 000.000.000-00.", cpfSandboxNote: "Pour cette commande d’essai au Brésil, veuillez utiliser uniquement un CPF fictif valide. Format : 000.000.000-00.",
    trackingChecking: "Vérification du paiement et de la commande…", trackingUnavailable: "Le suivi n’est pas accessible dans cette session. Veuillez réessayer ou contacter BOMA.",
    trackingPending: "Le paiement est en cours de vérification. Veuillez patienter.", trackingFailed: "Le paiement n’a pas été confirmé. Vous pouvez reprendre votre commande.",
    trackingPreparing: "Paiement confirmé. Votre exemplaire est en cours de préparation.", trackingReview: "Paiement confirmé. La préparation de votre commande est en cours de vérification.",
    trackingShipped: "Votre exemplaire a été expédié.", trackingDelivered: "Votre exemplaire a été livré.",
    termsRequired: "Veuillez lire et accepter les conditions générales de vente avant le paiement.", legalUnavailable: "Les conditions de vente doivent être vérifiées. Veuillez actualiser la page.",
    sandboxDescription: "Paiement fictif et commande d’essai complète, sans fabrication ni expédition réelles. Veuillez utiliser uniquement des coordonnées fictives.", trackingConfirmed: "Paiement confirmé. Le suivi de votre exemplaire sera actualisé ici.", trackingSandboxComplete: "Commande d’essai confirmée, sans fabrication ni expédition réelles.", trackingReference: "Référence de suivi :",
    salesPaused: "Les nouvelles commandes sont momentanément indisponibles. Le suivi des commandes reste accessible.", withdrawalHold: "Votre déclaration est enregistrée. La préparation est en pause pour traitement par BOMA.", withdrawalRecorded: "Votre déclaration est enregistrée pour traitement par BOMA. Vous pouvez télécharger l’accusé de réception.", withdrawalSending: "Enregistrement de votre déclaration…", withdrawalError: "L’enregistrement de la déclaration n’a pas pu être confirmé. Veuillez réessayer ou contacter BOMA.", withdrawalFields: "Veuillez vérifier vos prénom, nom et adresse e-mail avant de confirmer.", withdrawalNoEmail: "L’envoi d’un courriel n’est pas confirmé sur cette page. Veuillez conserver l’accusé téléchargeable.", withdrawalNotificationUnconfirmed: "L’accusé est disponible en téléchargement. Aucun envoi de courriel n’est confirmé ici.", withdrawalReceiptLoading: "Préparation de l’accusé de réception…", withdrawalReceiptReady: "L’accusé de réception est prêt à être conservé sur votre appareil.", withdrawalReceiptError: "L’accusé de réception n’a pas pu être téléchargé. Veuillez réessayer ou contacter BOMA."
  },
  en: {
    chooseCountry: "Choose a country", notConfigured: "Checkout is not available yet.",
    calculating: "Calculating delivery costs…", chooseShipping: "Choose a delivery option to continue.", redirecting: "Opening secure Stripe test checkout…",
    unavailable: "Delivery is unavailable for this destination. Check the address or contact BOMA.",
    expired: "This quote has expired. Please calculate delivery again.",
    quoteAuthorization: "This quote can no longer be used for checkout. Please calculate delivery again.",
    invalid: "The quote could not be confirmed. Please try again.",
    network: "Connection interrupted. Please try again.",
    address: "Check the contact details, postal code and state or region.",
    service: "Service temporarily unavailable. Please try again.",
    checkout: "Test checkout could not be opened. Please try again.",
    toCalculate: "To be calculated", select: "Choose an option", expires: "Quote valid until", cancel: "Checkout interrupted. You can calculate delivery again to continue.",
    returned: "Returned from test checkout. No real production or shipping.",
    referenceLoading: "Loading delivery destinations…", referenceUnavailable: "Delivery destinations are unavailable. Please try again.",
    chooseRegion: "Choose a delivery zone", regionHint: "Check the postal information for each zone before choosing it.",
    regionRequired: "Please choose a delivery zone for this country.", invalidRegion: "The delivery zone does not match the country. Please select it again.",
    brazilPostalCodeInvalid: "Enter a Brazilian postal code (CEP) with eight digits, in the format 00000-000.",
    brazilPostalCodeUnavailable: "This Brazilian postal code does not match any available delivery zone. Check the CEP or contact BOMA.",
    brazilPostalRegionMismatch: "The selected delivery zone does not match this Brazilian postal code. Check the CEP and delivery zone.",
    brazilStateInvalid: "Enter a valid two-letter Brazilian state code (UF), or leave this optional field blank.",
    brazilStateRegionMismatch: "The state code (UF) does not match the postal code or delivery zone. Check these details.",
    brazilTariffUnavailable: "Delivery to Brazil is temporarily unavailable. Please try again later or contact BOMA.",
    unsupportedCountry: "Delivery is unavailable for this country.", stateOptional: "State, province or region (optional)", stateRequired: "State or province (required)",
    liveLabel: "Printed book order.", liveDescription: "Payment starts printing and shipping your copy. The total includes the delivery option you select.",
    livePay: "Order and pay with Stripe", liveRedirecting: "Opening secure Stripe checkout…", liveCheckoutError: "Checkout could not be opened. Please try again.",
    modeMismatch: "Checkout is unavailable. The service needs to be checked.", returnedLive: "Returned from Stripe. Payment status must be confirmed before tracking the order.",
    cpfError: "Please check the recipient’s CPF. The expected format is 000.000.000-00.", cpfNote: "Cloudprinter requires this number for delivery in Brazil. Format: 000.000.000-00.", cpfTestNote: "CPF may be left blank for this test checkout. For a real delivery in Brazil, Cloudprinter requires the format 000.000.000-00.", cpfSandboxNote: "For this test order in Brazil, please use a valid fictitious CPF only. Format: 000.000.000-00.",
    trackingChecking: "Checking payment and order status…", trackingUnavailable: "Order status is unavailable in this session. Please try again or contact BOMA.",
    trackingPending: "Payment is being checked. Please wait.", trackingFailed: "Payment has not been confirmed. You can try ordering again.",
    trackingPreparing: "Payment confirmed. Your copy is being prepared.", trackingReview: "Payment confirmed. Your order is being checked before preparation.",
    trackingShipped: "Your copy has been shipped.", trackingDelivered: "Your copy has been delivered.",
    termsRequired: "Please read and accept the terms of sale before paying.", legalUnavailable: "The terms of sale need to be checked. Please reload the page.",
    sandboxDescription: "Simulated payment and complete test order, with no real production or shipping. Please use fictitious contact details only.", trackingConfirmed: "Payment confirmed. Tracking for your copy will be updated here.", trackingSandboxComplete: "Test order confirmed, with no real production or shipping.", trackingReference: "Tracking reference:",
    salesPaused: "New orders are temporarily unavailable. Existing orders can still be tracked.", withdrawalHold: "Your declaration has been recorded. Preparation is on hold for review by BOMA.", withdrawalRecorded: "Your declaration has been recorded for review by BOMA. You can download the acknowledgement.", withdrawalSending: "Recording your declaration…", withdrawalError: "Your declaration could not be confirmed as recorded. Please try again or contact BOMA.", withdrawalFields: "Please check your first name, last name and email address before confirming.", withdrawalNoEmail: "Email sending is not confirmed on this page. Please save the downloadable acknowledgement.", withdrawalNotificationUnconfirmed: "The acknowledgement is available to download. No email delivery is confirmed here.", withdrawalReceiptLoading: "Preparing the acknowledgement…", withdrawalReceiptReady: "The acknowledgement is ready to save on your device.", withdrawalReceiptError: "The acknowledgement could not be downloaded. Please try again or contact BOMA."
  }
}[locale];

const config = window.BOE_SALES_CONFIG;
const expectedMode = configuredSalesMode(config?.mode);
const apiBase = expectedMode ? configuredApiBase(config.apiBaseUrl) : null;
const orderStorageKey = orderId => `boe:order-status:${orderId}`;
const incomingOrderLink = capturePrivateOrderLink();

function capturePrivateOrderLink() {
  const fragment = window.location.hash || "";
  const params = new URLSearchParams(fragment.replace(/^#/, ""));
  if (!params.has("status_token") && !params.has("order_id")) return null;
  let capability = null;
  try { capability = orderCapabilityFromFragment(fragment, expectedMode); } catch { /* Invalid links never authenticate an order. */ }
  // Remove the private fragment before any request, storage or interface update.
  const cleanUrl = new URL(window.location.href);
  cleanUrl.hash = "";
  if (capability) cleanUrl.searchParams.set("order_id", capability.orderId);
  try { window.history.replaceState(window.history.state, "", cleanUrl.pathname + cleanUrl.search); }
  catch { window.location.replace(cleanUrl.href); return { capability: null }; }
  if (capability) {
    try { window.sessionStorage.setItem(orderStorageKey(capability.orderId), JSON.stringify(capability)); }
    catch { /* The private link can still be used for this visit without storage. */ }
  }
  return { capability };
}

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
const civilState = document.getElementById("state");
const civilStateLabel = document.getElementById("state-label");
const regionField = document.getElementById("cloudprinter-region-field");
const regionSelect = document.getElementById("cloudprinter-region");
const regionNote = document.getElementById("cloudprinter-region-note");
const referenceRetry = document.getElementById("reference-retry");
const modeLabel = document.getElementById("sales-mode-label");
const modeDescription = document.getElementById("sales-mode-description");
const identificationField = document.getElementById("customer-identification-field");
const identificationInput = document.getElementById("customer-identification");
const identificationNote = document.getElementById("customer-identification-note");
const orderStatusSection = document.getElementById("order-status-section");
const orderStatusMessage = document.getElementById("order-status-message");
const orderStatusRefresh = document.getElementById("order-status-refresh");
const orderInvoiceLink = document.getElementById("order-invoice-link");
const orderTrackingLink = document.getElementById("order-tracking-link");
const orderTrackingReference = document.getElementById("order-tracking-reference");
const termsField = document.getElementById("terms-field");
const termsAccepted = document.getElementById("terms-accepted");
const termsLink = document.getElementById("terms-link");
const withdrawalSection = document.getElementById("withdrawal-section");
const withdrawalOrderReference = document.getElementById("withdrawal-order-reference");
const withdrawalOpen = document.getElementById("withdrawal-open");
const withdrawalForm = document.getElementById("withdrawal-form");
const withdrawalFirstName = document.getElementById("withdrawal-first-name");
const withdrawalLastName = document.getElementById("withdrawal-last-name");
const withdrawalEmail = document.getElementById("withdrawal-email");
const withdrawalClose = document.getElementById("withdrawal-close");
const withdrawalConfirmation = document.getElementById("withdrawal-confirmation");
const withdrawalReview = document.getElementById("withdrawal-review");
const withdrawalConfirm = document.getElementById("withdrawal-confirm");
const withdrawalEdit = document.getElementById("withdrawal-edit");
const withdrawalStatus = document.getElementById("withdrawal-status");
const withdrawalReceiptButton = document.getElementById("withdrawal-receipt");
const withdrawalNotification = document.getElementById("withdrawal-notification");
const money = amount => new Intl.NumberFormat(locale === "fr" ? "fr-FR" : "en-IE", { style: "currency", currency: "EUR" }).format(amount / 100);
let regionNames;
try { regionNames = new Intl.DisplayNames([locale], { type: "region" }); } catch { regionNames = null; }
let shippingReference = null;
let referenceLoading = false;
let serverModeVerified = false;
let salesAvailable = false;
let serverFulfillment = null;
let legalConfiguration = null;
let orderCapability = null;
let orderStatusBusy = false;
let orderStatusTimer;
let pendingStatusPolls = 0;
let latestOrderStatus = null;
let withdrawalDraft = null;
let withdrawalReceipt = null;
let withdrawalBusy = false;

function rememberOrderCapability(result) {
  if (expectedMode === "test" && result.orderId === undefined && result.statusToken === undefined) return;
  const capability = validatedOrderCapability(result, expectedMode);
  // This capability contains no address, telephone or customer identification.
  try { window.sessionStorage.setItem(orderStorageKey(capability.orderId), JSON.stringify(capability)); }
  catch { /* The durable private invoice link can restore status in a later visit. */ }
}

function renderOrderStatus(result) {
  latestOrderStatus = result;
  orderInvoiceLink.hidden = true;
  orderTrackingLink.hidden = true;
  orderTrackingReference.hidden = true;
  if (result.fulfillmentStatus === "withdrawal_hold") orderStatusMessage.textContent = messages.withdrawalHold;
  else if (result.paymentStatus === "pending") orderStatusMessage.textContent = messages.trackingPending;
  else if (result.paymentStatus === "failed") orderStatusMessage.textContent = messages.trackingFailed;
  else {
    if (result.fulfillmentStatus === "sandbox_complete") orderStatusMessage.textContent = messages.trackingSandboxComplete;
    else if (result.fulfillmentStatus === "delivered") orderStatusMessage.textContent = messages.trackingDelivered;
    else if (["shipped", "delivery_started"].includes(result.fulfillmentStatus)) orderStatusMessage.textContent = messages.trackingShipped;
    else if (["awaiting_payment", "retry_wait", "submission_uncertain", "blocked", "error", "canceled", "delivery_failed", "disabled"].includes(result.fulfillmentStatus)) orderStatusMessage.textContent = messages.trackingReview;
    else if (["queued", "preparing", "submitting", "accepted", "producing", "produced", "packed"].includes(result.fulfillmentStatus)) orderStatusMessage.textContent = messages.trackingPreparing;
    else orderStatusMessage.textContent = messages.trackingConfirmed;
  }
  if (result.paymentStatus === "paid") {
    if (result.invoiceUrl) { orderInvoiceLink.href = result.invoiceUrl; orderInvoiceLink.hidden = false; }
    if (result.trackingUrl) { orderTrackingLink.href = result.trackingUrl; orderTrackingLink.hidden = false; }
    if (result.trackingCode) { orderTrackingReference.textContent = `${messages.trackingReference} ${result.trackingCode}`; orderTrackingReference.hidden = false; }
  }
  renderWithdrawalAvailability();
}

function canAccessWithdrawal() {
  return config?.features?.withdrawal === true && Boolean(apiBase && serverModeVerified && orderCapability && latestOrderStatus) && (expectedMode === "live" || serverFulfillment === "sandbox");
}

function hasWithdrawalRequest() {
  return Boolean(withdrawalReceipt || latestOrderStatus?.withdrawalStatus);
}

function showWithdrawalStatus(message, isError = false) {
  withdrawalStatus.textContent = message;
  withdrawalStatus.setAttribute("role", isError ? "alert" : "status");
}

function renderWithdrawalAvailability() {
  const available = canAccessWithdrawal();
  withdrawalSection.hidden = !available;
  if (!available) return;
  withdrawalOrderReference.textContent = orderCapability.orderId;
  withdrawalOpen.hidden = hasWithdrawalRequest() || !withdrawalForm.hidden || !withdrawalConfirmation.hidden;
  withdrawalOpen.disabled = withdrawalBusy;
  withdrawalConfirm.disabled = withdrawalBusy;
  withdrawalEdit.disabled = withdrawalBusy;
  withdrawalClose.disabled = withdrawalBusy;
  withdrawalReceiptButton.disabled = withdrawalBusy;
  withdrawalReceiptButton.hidden = !hasWithdrawalRequest();
  if (hasWithdrawalRequest()) {
    withdrawalForm.hidden = true;
    withdrawalConfirmation.hidden = true;
    withdrawalNotification.hidden = false;
    if (!withdrawalNotification.textContent) withdrawalNotification.textContent = messages.withdrawalNotificationUnconfirmed;
    if (!withdrawalBusy) showWithdrawalStatus(messages.withdrawalRecorded);
  }
}

function clearWithdrawalDraft() {
  withdrawalDraft = null;
  withdrawalFirstName.value = "";
  withdrawalLastName.value = "";
  withdrawalEmail.value = "";
  withdrawalReview.textContent = "";
}

function downloadWithdrawalReceipt(receipt) {
  const blobUrl = URL.createObjectURL(new Blob([receipt.text], { type: receipt.mediaType }));
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = receipt.filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

withdrawalOpen.addEventListener("click", () => {
  if (!canAccessWithdrawal() || hasWithdrawalRequest() || withdrawalBusy) return;
  withdrawalForm.hidden = false;
  withdrawalConfirmation.hidden = true;
  showWithdrawalStatus("");
  renderWithdrawalAvailability();
  withdrawalFirstName.focus();
});

withdrawalClose.addEventListener("click", () => {
  if (withdrawalBusy) return;
  withdrawalForm.hidden = true;
  withdrawalConfirmation.hidden = true;
  clearWithdrawalDraft();
  showWithdrawalStatus("");
  renderWithdrawalAvailability();
  withdrawalOpen.focus();
});

withdrawalForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!canAccessWithdrawal() || hasWithdrawalRequest() || withdrawalBusy || !withdrawalForm.reportValidity()) return;
  try { withdrawalDraft = withdrawalDeclaration(withdrawalFirstName.value, withdrawalLastName.value, withdrawalEmail.value); }
  catch { showWithdrawalStatus(messages.withdrawalFields, true); return; }
  withdrawalReview.textContent = `${withdrawalDraft.firstName} ${withdrawalDraft.lastName}\n${withdrawalDraft.email}`;
  withdrawalForm.hidden = true;
  withdrawalConfirmation.hidden = false;
  showWithdrawalStatus("");
  renderWithdrawalAvailability();
  withdrawalConfirm.focus();
});

withdrawalEdit.addEventListener("click", () => {
  if (withdrawalBusy) return;
  withdrawalDraft = null;
  withdrawalReview.textContent = "";
  withdrawalForm.hidden = false;
  withdrawalConfirmation.hidden = true;
  renderWithdrawalAvailability();
  withdrawalFirstName.focus();
});

withdrawalConfirm.addEventListener("click", async () => {
  if (!canAccessWithdrawal() || hasWithdrawalRequest() || !withdrawalDraft || withdrawalConfirmation.hidden || withdrawalBusy) return;
  withdrawalBusy = true;
  renderWithdrawalAvailability();
  showWithdrawalStatus(messages.withdrawalSending);
  const controller = new AbortController();
  try {
    const result = validatedWithdrawal(await post("/api/orders/withdrawal", { orderId: orderCapability.orderId, ...withdrawalDraft, confirm: true }, controller, { Authorization: `Bearer ${orderCapability.statusToken}` }));
    withdrawalReceipt = result.receipt;
    clearWithdrawalDraft();
    withdrawalNotification.textContent = result.notificationStatus === "not_sent" ? messages.withdrawalNoEmail : messages.withdrawalNotificationUnconfirmed;
    showWithdrawalStatus(messages.withdrawalRecorded);
    await refreshOrderStatus();
  } catch { showWithdrawalStatus(messages.withdrawalError, true); }
  finally { withdrawalBusy = false; renderWithdrawalAvailability(); }
});

withdrawalReceiptButton.addEventListener("click", async () => {
  if (!canAccessWithdrawal() || !hasWithdrawalRequest() || withdrawalBusy) return;
  withdrawalBusy = true;
  renderWithdrawalAvailability();
  showWithdrawalStatus(messages.withdrawalReceiptLoading);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  let failure = false;
  try {
    if (!withdrawalReceipt) {
      const url = new URL(apiBase + "/api/orders/withdrawal/receipt");
      url.searchParams.set("order_id", orderCapability.orderId);
      const response = await fetch(url.href, { headers: { Accept: "text/plain", Authorization: `Bearer ${orderCapability.statusToken}` }, signal: controller.signal, credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer" });
      if (!response.ok || response.headers.get("Content-Type")?.split(";")[0].trim().toLowerCase() !== "text/plain") throw new Error("receipt_not_available");
      withdrawalReceipt = withdrawalTextReceipt(await response.text(), orderCapability.orderId);
    }
    downloadWithdrawalReceipt(withdrawalReceipt);
  } catch { failure = true; }
  finally {
    clearTimeout(timeout);
    withdrawalBusy = false;
    renderWithdrawalAvailability();
    showWithdrawalStatus(failure ? messages.withdrawalReceiptError : messages.withdrawalReceiptReady, failure);
  }
});

async function refreshOrderStatus(automatic = false) {
  if (!apiBase || !serverModeVerified || !orderCapability || orderStatusBusy) return;
  clearTimeout(orderStatusTimer);
  if (!automatic) pendingStatusPolls = 0;
  orderStatusBusy = true;
  orderStatusRefresh.disabled = true;
  orderStatusMessage.textContent = messages.trackingChecking;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const url = new URL(apiBase + "/api/orders/status");
    url.searchParams.set("order_id", orderCapability.orderId);
    const response = await fetch(url.href, { headers: { Accept: "application/json", Authorization: `Bearer ${orderCapability.statusToken}` }, signal: controller.signal, credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer" });
    if (!response.ok) throw new Error("invalid_order_status");
    const result = validatedOrderStatus(await response.json(), expectedMode);
    renderOrderStatus(result);
    if (result.paymentStatus === "pending" && pendingStatusPolls < 5) {
      pendingStatusPolls += 1;
      orderStatusTimer = setTimeout(() => refreshOrderStatus(true), 6000);
    }
  } catch { orderStatusMessage.textContent = messages.trackingUnavailable; }
  finally { clearTimeout(timeout); orderStatusBusy = false; orderStatusRefresh.disabled = false; }
}

function initializeOrderTracking() {
  const params = new URLSearchParams(window.location.search);
  const orderId = incomingOrderLink?.capability?.orderId || params.get("order_id");
  const paymentReturn = params.get("payment");
  if (!orderId && !paymentReturn && !incomingOrderLink) return;
  orderStatusSection.hidden = false;
  if (expectedMode === "test" && serverFulfillment !== "sandbox") {
    orderStatusMessage.textContent = messages.returned;
    return;
  }
  if (incomingOrderLink && !incomingOrderLink.capability) { orderStatusMessage.textContent = messages.trackingUnavailable; return; }
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(orderId || "")) {
    orderStatusMessage.textContent = messages.trackingUnavailable;
    return;
  }
  try {
    const stored = incomingOrderLink?.capability || JSON.parse(window.sessionStorage.getItem(orderStorageKey(orderId)) || "null");
    orderCapability = validatedOrderCapability(stored, expectedMode);
    if (orderCapability.orderId !== orderId) throw new Error("invalid_order_status");
  } catch {
    orderCapability = null;
    orderStatusMessage.textContent = messages.trackingUnavailable;
    return;
  }
  orderStatusRefresh.hidden = false;
  refreshOrderStatus();
}

function showVerifiedSalesMode(health) {
  if (expectedMode === "live") {
    modeLabel.textContent = messages.liveLabel;
    modeDescription.textContent = health.fulfillment === "disabled" || health.ready === false ? messages.salesPaused : messages.liveDescription;
    payButton.textContent = messages.livePay;
  } else if (health.fulfillment === "sandbox") {
    modeDescription.textContent = messages.sandboxDescription;
  }
}

function placeholderOption(label) {
  const option = document.createElement("option");
  option.value = "";
  option.textContent = label;
  return option;
}

function populateCountries() {
  country.replaceChildren(placeholderOption(messages.chooseCountry));
  const countries = shippingReference?.countries.map(entry => ({ code: entry.code, label: regionNames?.of(entry.code) || entry.note || entry.code })) || [];
  countries.sort((a, b) => a.label.localeCompare(b.label, locale));
  for (const entry of countries) {
    const option = document.createElement("option");
    option.value = entry.code;
    option.textContent = entry.label;
    country.append(option);
  }
  country.disabled = !shippingReference;
}

function renderCountryRegion() {
  const selectedCountry = shippingReference?.countries.find(entry => entry.code === country.value);
  regionSelect.replaceChildren(placeholderOption(messages.chooseRegion));
  regionSelect.value = "";
  regionSelect.required = Boolean(selectedCountry?.requiresRegion);
  regionSelect.disabled = !selectedCountry?.requiresRegion;
  regionField.hidden = !selectedCountry?.requiresRegion;
  regionNote.textContent = messages.regionHint;
  if (selectedCountry?.requiresRegion) {
    for (const region of selectedCountry.regions) {
      const option = document.createElement("option");
      option.value = region.reference;
      option.textContent = region.note ? `${region.reference} — ${region.note}` : region.reference;
      regionSelect.append(option);
    }
  }
  civilState.required = ["US", "CA"].includes(country.value);
  civilStateLabel.textContent = civilState.required ? messages.stateRequired : messages.stateOptional;
  identificationField.hidden = country.value !== "BR";
  identificationInput.disabled = country.value !== "BR";
  identificationInput.required = country.value === "BR" && (expectedMode === "live" || serverFulfillment === "sandbox");
  identificationNote.textContent = expectedMode === "live" ? messages.cpfNote : serverFulfillment === "sandbox" ? messages.cpfSandboxNote : messages.cpfTestNote;
}

async function loadShippingReference() {
  if (!apiBase || referenceLoading) return;
  invalidateQuote();
  referenceLoading = true;
  serverModeVerified = false;
  salesAvailable = false;
  serverFulfillment = null;
  legalConfiguration = null;
  termsAccepted.checked = false;
  termsField.hidden = true;
  shippingReference = null;
  populateCountries();
  renderCountryRegion();
  referenceRetry.hidden = true;
  updateButtons();
  showStatus(messages.referenceLoading);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const health = await fetch(apiBase + "/api/health", { headers: { Accept: "application/json" }, signal: controller.signal, credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer" });
    if (!health.ok) throw new Error("sales_mode_mismatch");
    const healthData = await health.json();
    validatedOrderServiceHealth(healthData, expectedMode);
    serverModeVerified = true;
    serverFulfillment = healthData.fulfillment;
    showVerifiedSalesMode(healthData);
    if (healthData.ready === false || (config.fulfillment !== undefined && config.fulfillment !== serverFulfillment) || (expectedMode === "live" && serverFulfillment !== "automatic")) throw new Error("new_sales_unavailable");
    validatedSalesHealth(healthData, expectedMode);
    legalConfiguration = validatedLegalConfiguration(config, healthData, locale);
    if (legalConfiguration) { termsLink.href = legalConfiguration.url; termsField.hidden = false; }
    const response = await fetch(apiBase + "/api/shipping-reference", { headers: { Accept: "application/json" }, signal: controller.signal, credentials: "omit", cache: "no-store", referrerPolicy: "no-referrer" });
    if (!response.ok) throw new Error("shipping_reference_unavailable");
    shippingReference = validatedShippingReference(await response.json());
    salesAvailable = true;
    populateCountries();
    renderCountryRegion();
    showStatus("");
  } catch (error) {
    salesAvailable = false;
    shippingReference = null;
    populateCountries();
    renderCountryRegion();
    referenceRetry.hidden = false;
    showStatus(error?.message === "new_sales_unavailable" ? messages.salesPaused : error?.message === "sales_mode_mismatch" ? messages.modeMismatch : error?.message === "legal_configuration_required" ? messages.legalUnavailable : messages.referenceUnavailable, true);
  } finally {
    clearTimeout(timeout);
    referenceLoading = false;
    updateButtons();
    if (serverModeVerified) initializeOrderTracking();
  }
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
  quoteButton.disabled = !apiBase || !salesAvailable || !shippingReference || referenceLoading || busy;
  payButton.disabled = !apiBase || !salesAvailable || busy || !quote || !selectedOption || quote.expiresAt <= Date.now() || (expectedMode === "live" && (!legalConfiguration || !termsAccepted.checked));
  referenceRetry.disabled = referenceLoading;
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
  if (code === "checkout_authorization_required") return messages.quoteAuthorization;
  if (code === "shipping_reference_unavailable") return messages.referenceUnavailable;
  if (code === "sales_mode_mismatch") return messages.modeMismatch;
  if (code === "unsupported_country") return messages.unsupportedCountry;
  if (code === "cloudprinter_region_required") return messages.regionRequired;
  if (code === "invalid_cloudprinter_region") return messages.invalidRegion;
  if (code === "invalid_brazil_postal_code") return messages.brazilPostalCodeInvalid;
  if (code === "brazil_postal_code_unavailable") return messages.brazilPostalCodeUnavailable;
  if (code === "brazil_region_postal_mismatch") return messages.brazilPostalRegionMismatch;
  if (code === "invalid_brazil_state") return messages.brazilStateInvalid;
  if (code === "brazil_state_region_mismatch") return messages.brazilStateRegionMismatch;
  if (code === "brazil_tariff_metadata_unavailable") return messages.brazilTariffUnavailable;
  if (code === "terms_acceptance_required") return messages.termsRequired;
  if (["legal_configuration_required", "legal_version_mismatch", "legal_not_configured"].includes(code)) return messages.legalUnavailable;
  if (["invalid_customer_identification", "customer_identification_required", "invalid_cloudprinter_customer_identification"].includes(code)) return messages.cpfError;
  if (["shipping_unavailable", "SHIPPING_UNAVAILABLE", "no_shipping_options"].includes(code)) return messages.unavailable;
  if (["invalid_address", "INVALID_ADDRESS", "invalid_destination", "invalid_request", "VALIDATION_ERROR"].includes(code)) return messages.address;
  if (["test_mode_required", "book_not_configured", "storage_not_configured", "cloudprinter_not_configured", "stripe_test_key_required", "stripe_price_required", "webhook_not_configured"].includes(code)) return messages.notConfigured;
  if (code === "invalid_quote") return messages.invalid;
  if (error?.name === "AbortError" || error instanceof TypeError) return messages.network;
  return stage === "checkout" ? (expectedMode === "live" ? messages.liveCheckoutError : messages.checkout) : messages.service;
}

async function post(path, body, controller, headers = {}) {
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(apiBase + path, {
      method: "POST", headers: { "Content-Type": "application/json", ...headers }, body: JSON.stringify(body),
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
    firstName: value("firstName"), lastName: value("lastName"), name: `${value("firstName")} ${value("lastName")}`.trim(), email: value("email"), phone: value("phone"), locale,
    cloudprinterRegion: cloudprinterRegionValue(shippingReference, value("country"), String(values.get("cloudprinterRegion") || "")),
    cloudprinterCustomerIdentification: cloudprinterCustomerIdentificationValue(value("country"), String(values.get("cloudprinterCustomerIdentification") || ""), expectedMode, serverFulfillment),
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
country.addEventListener("change", () => { civilState.value = ""; identificationInput.value = ""; renderCountryRegion(); });
regionSelect.addEventListener("change", () => {
  const selectedCountry = shippingReference?.countries.find(entry => entry.code === country.value);
  const selectedRegion = selectedCountry?.regions.find(region => region.reference === regionSelect.value);
  regionNote.textContent = selectedRegion?.note || messages.regionHint;
});
referenceRetry.addEventListener("click", () => loadShippingReference());
orderStatusRefresh.addEventListener("click", () => refreshOrderStatus());
termsAccepted.addEventListener("change", () => updateButtons());
form.addEventListener("submit", async event => {
  event.preventDefault();
  if (!apiBase || !salesAvailable || !shippingReference || referenceLoading || busy || !form.reportValidity()) return;
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
    quote = validatedQuote(response, Date.now(), expectedMode);
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
  if (!apiBase || !salesAvailable || busy || !quote || !selectedOption) return;
  if (expectedMode === "live" && (!legalConfiguration || !termsAccepted.checked)) { showStatus(messages.termsRequired, true); return; }
  if (quote.expiresAt <= Date.now()) return invalidateQuote(true);
  busy = true;
  updateButtons();
  showStatus(expectedMode === "live" ? messages.liveRedirecting : messages.redirecting);
  const requestRevision = revision;
  const controller = new AbortController();
  currentController = controller;
  try {
    const body = { quoteId: quote.quoteId, checkoutToken: quote.checkoutToken, shippingOptionId: selectedOption.id, locale };
    if (expectedMode === "live") { body.termsAccepted = true; body.legalVersion = legalConfiguration.version; }
    const result = await post("/api/checkout", body, controller);
    if (requestRevision !== revision) return;
    const url = checkoutUrl(result, expectedMode);
    rememberOrderCapability(result);
    window.location.assign(url);
  } catch (error) {
    if (requestRevision === revision) {
      const message = errorMessage(error, "checkout");
      if (error?.message === "checkout_authorization_required") invalidateQuote();
      showStatus(message, true);
    }
  } finally {
    if (currentController === controller) { currentController = null; busy = false; updateButtons(); }
  }
});

populateCountries();
renderCountryRegion();
invalidateQuote();
if (!apiBase) showStatus(messages.notConfigured);
else {
  loadShippingReference();
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
