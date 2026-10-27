/* BOE workflow submission transport.
 * Replace the URL after deploying the new Apps Script web app.
 */
(function () {
  'use strict';
  const BOE_WORKFLOW_URL = 'https://script.google.com/macros/s/AKfycbzmGb9xCPv8fCmQ322E_IcpxlNHgP0Ly-2zF06jjppxwoWoFTZ8famPPqGjhRz69KtM/exec';
  const MAX_FILE_BYTES = 10 * 1024 * 1024;
  const form = document.getElementById('submit-form');
  if (!form) return;

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function value(id) { return document.getElementById(id)?.value.trim() || ''; }
  function keywords(prefix) {
    return [1, 2, 3, 4, 5, 6].map(i => value(`kw-${prefix}-${i}`)).filter(Boolean);
  }
  function requestId() {
    if (window.crypto?.randomUUID) return window.crypto.randomUUID().replace(/-/g, '');
    const bytes = new Uint8Array(24); window.crypto.getRandomValues(bytes);
    return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  }
  function fail(message) {
    const upload = document.getElementById('f-uploading');
    if (upload) upload.style.display = 'none';
    const box = document.getElementById('msg-error');
    if (box) { box.style.display = 'block'; box.textContent = message; box.scrollIntoView({behavior:'smooth'}); }
    const button = document.getElementById('btn-submit');
    if (button) button.disabled = false;
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (BOE_WORKFLOW_URL.startsWith('PASTE_')) {
      fail('The BOE workflow endpoint has not yet been configured.'); return;
    }

    const lang = value('f-lang');
    const abstractEn = value('f-abstract-en');
    const abstractFr = value('f-abstract-fr');
    const abstractOriginal = value('f-abstract-lang');
    const kwEn = keywords('en'), kwFr = keywords('fr'), kwOriginal = keywords('lang');
    const pdf = document.getElementById('f-pdf')?.files[0];
    const editable = document.getElementById('f-editable')?.files[0];
    const problems = [];
    if (!value('f-name')) problems.push('Full name');
    if (!value('f-email')) problems.push('Email address');
    if (!value('f-title')) problems.push('Title');
    if (!lang) problems.push('Language');
    if (abstractEn.length < 450 || abstractEn.length > 1500) problems.push('English abstract (450–1,500 characters)');
    if (lang === 'French' && (abstractFr.length < 450 || abstractFr.length > 1500)) problems.push('French abstract (450–1,500 characters)');
    if (lang !== 'English' && lang !== 'French' && (abstractOriginal.length < 450 || abstractOriginal.length > 1500)) problems.push('Abstract in the manuscript language');
    if (kwEn.length !== 6) problems.push('Exactly six English keywords');
    if (lang === 'French' && kwFr.length !== 6) problems.push('Exactly six French keywords');
    if (lang !== 'English' && lang !== 'French' && kwOriginal.length !== 6) problems.push('Exactly six keywords in the manuscript language');
    if (!pdf) problems.push('Anonymized PDF');
    if (!editable) problems.push('Editable original');
    if (!document.getElementById('f-legal')?.checked) problems.push('Copyright declaration');
    if (pdf && pdf.size > MAX_FILE_BYTES) problems.push('PDF must be 10 MB or smaller');
    if (editable && editable.size > MAX_FILE_BYTES) problems.push('Editable file must be 10 MB or smaller');
    if (problems.length) { alert('Please correct:\n\n• ' + problems.join('\n• ')); return; }

    const button = document.getElementById('btn-submit');
    const uploading = document.getElementById('f-uploading');
    button.disabled = true; uploading.style.display = 'block';
    const id = requestId();
    try {
      const payload = {
        action: 'publicSubmission',
        client_request_id: id,
        honeypot: value('hp'),
        author_name: value('f-name'), author_email: value('f-email'),
        affiliation: value('f-affil'), orcid: value('f-orcid'),
        article_title: value('f-title'), manuscript_language: lang,
        abstract_en: abstractEn, abstract_fr: abstractFr, abstract_original: abstractOriginal,
        keywords_en: kwEn, keywords_fr: kwFr, keywords_original: kwOriginal,
        statements: value('f-statements'), copyright_accepted: true,
        files: [
          {kind:'anonymized_pdf', name:pdf.name, type:pdf.type || 'application/pdf', data:await readFile(pdf)},
          {kind:'editable_original', name:editable.name, type:editable.type || 'application/octet-stream', data:await readFile(editable)}
        ]
      };

      const frame = document.createElement('iframe');
      frame.name = 'boe-submit-' + id; frame.hidden = true;
      const transport = document.createElement('form');
      transport.method = 'POST'; transport.action = BOE_WORKFLOW_URL; transport.target = frame.name; transport.hidden = true;
      const input = document.createElement('input'); input.type = 'hidden'; input.name = 'payload'; input.value = JSON.stringify(payload);
      transport.appendChild(input); document.body.append(frame, transport);

      const timeout = window.setTimeout(() => { cleanup(); fail('No confirmation was received. Please contact BOE before submitting again.'); }, 120000);
      function cleanup() { window.clearTimeout(timeout); window.removeEventListener('message', receive); transport.remove(); frame.remove(); }
      function receive(message) {
        const trusted = message.origin === 'https://script.google.com' || message.origin.endsWith('.googleusercontent.com');
        if (!trusted || message.data?.source !== 'BOE_WORKFLOW' || message.data?.requestId !== id) return;
        cleanup();
        if (!message.data.success) { fail(message.data.message || 'Submission failed.'); return; }
        form.style.display = 'none'; uploading.style.display = 'none';
        const ok = document.getElementById('msg-success');
        ok.style.display = 'block';
        const first = ok.querySelector('p');
        if (first) first.textContent = '✓ Submission ' + message.data.submissionId + ' has been successfully received.';
        ok.scrollIntoView({behavior:'smooth',block:'center'});
      }
      window.addEventListener('message', receive);
      transport.submit();
    } catch (error) { fail('The files could not be prepared: ' + error.message); }
  }, true);
})();

