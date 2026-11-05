(() => {
  const footer = document.querySelector('[data-boe-audience]');
  if (!footer || location.hostname !== 'boegyptologie.github.io') return;

  const service = 'https://boegyptologie.goatcounter.com';
  const preference = 'boe-audience-disabled';
  const path = footer.dataset.boeAudience;
  const pdfEvent = path.slice(1) + 'pdf';
  const choice = document.querySelector('#boe-audience-choice');
  const browserOptOut = navigator.globalPrivacyControl === true || navigator.doNotTrack === '1';
  let optedOut;
  try {
    optedOut = browserOptOut || localStorage.getItem(preference) === '1';
  } catch {
    optedOut = true;
  }

  const counters = [...footer.querySelectorAll('[data-boe-views]')];
  if (choice) {
    choice.checked = optedOut;
    choice.disabled = browserOptOut;
    choice.addEventListener('change', () => {
      try {
        if (choice.checked) localStorage.setItem(preference, '1');
        else localStorage.removeItem(preference);
      } catch {
        choice.checked = true;
      }
      optedOut = choice.checked;
      if (optedOut) counters.forEach(counter => { counter.hidden = true; });
    });
  }
  if (optedOut) return;

  const request = { credentials: 'omit', referrerPolicy: 'no-referrer' };

  function count(key, event = false) {
    if (optedOut) return;
    const params = new URLSearchParams({ p: key });
    if (event) params.set('e', 'true');
    fetch(service + '/count?' + params, {
      ...request, mode: 'no-cors', cache: 'no-store', keepalive: true,
    }).catch(() => {});
  }

  count(path);

  function recordPdfClick(event) {
    if (event.type === 'auxclick' && event.button !== 1) return;
    if (event.target.closest('a[data-boe-pdf]')) count(pdfEvent, true);
  }

  if (footer.querySelector('[data-boe-views="pdf"]')) {
    document.addEventListener('click', recordPdfClick);
    document.addEventListener('auxclick', recordPdfClick);
  }

  async function showCount(counter) {
    const key = counter.dataset.boeViews === 'pdf' ? pdfEvent : path;
    try {
      const url = service + '/counter/' + encodeURIComponent(key) + '.json?start=year';
      const response = await fetch(url, request);
      if (!response.ok || optedOut) return;
      const result = await response.json();
      const total = Number(String(result.count ?? '').replaceAll(',', ''));
      if (!Number.isSafeInteger(total) || total < 1 || optedOut) return;
      counter.querySelector('span').textContent = new Intl.NumberFormat(document.documentElement.lang).format(total);
      counter.hidden = false;
    } catch {
      // The measurement service is optional for reading and navigation.
    }
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      if (!optedOut) counters.forEach(showCount);
    });
    observer.observe(footer);
  } else {
    counters.forEach(showCount);
  }
})();
