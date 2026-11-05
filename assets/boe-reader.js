(() => {
  const reader = document.getElementById('boe-reader');
  const contents = reader.querySelector('.boe-plan');
  const margin = reader.querySelector('.boe-margin');
  const compact = matchMedia('(max-width: 660px)');
  const endmatter = reader.querySelector('.boe-endmatter');
  const outline = new Map([...contents.querySelectorAll('nav a')].map(link => [
    document.getElementById(link.hash.slice(1)), link,
  ]));
  const passages = [...outline.keys()];
  const pdfMarks = [...reader.querySelectorAll('[data-pdf-page]')];
  const pdfLink = reader.querySelector('.boe-current-pdf');
  const pdfLabel = pdfLink.querySelector('span');
  const pdfUrl = pdfLink.href.split('#')[0];
  const pdfPageLabel = pdfLink.dataset.pageLabel;
  const nav = contents.querySelector('nav');
  let activePassage = null;
  let activePage = null;
  let updatePending = false;

  function atReadingLine(items, offset) {
    for (let index = items.length - 1; index >= 0; index--) {
      if (items[index].getBoundingClientRect().top <= offset) return items[index];
    }
    return items[0];
  }

  function updateReadingMarks() {
    const offset = compact.matches ? Math.max(95, margin.getBoundingClientRect().height + 20) : 46;
    const passage = endmatter.getBoundingClientRect().top > offset ? atReadingLine(passages, offset) : null;
    if (passage !== activePassage) {
      outline.get(activePassage)?.removeAttribute('aria-current');
      const link = outline.get(passage);
      if (link) {
        link.setAttribute('aria-current', 'location');
        if (!compact.matches) {
          const item = link.getBoundingClientRect();
          const rail = nav.getBoundingClientRect();
          if (item.top < rail.top) nav.scrollTop += item.top - rail.top;
          if (item.bottom > rail.bottom) nav.scrollTop += item.bottom - rail.bottom;
        }
      }
      activePassage = passage;
    }
    const page = atReadingLine(pdfMarks, offset).dataset.pdfPage;
    if (page !== activePage) {
      pdfLink.href = pdfUrl + '#page=' + page;
      pdfLabel.textContent = 'PDF p. ' + page;
      pdfLink.setAttribute('aria-label', pdfPageLabel.replace('{page}', page));
      activePage = page;
    }
  }

  function queueReadingUpdate() {
    if (updatePending) return;
    updatePending = true;
    requestAnimationFrame(() => {
      updatePending = false;
      updateReadingMarks();
    });
  }

  function fitContents() {
    contents.open = !compact.matches;
    queueReadingUpdate();
  }
  compact.addEventListener('change', fitContents);
  fitContents();
  contents.addEventListener('click', event => {
    if (compact.matches && event.target.closest('a')) contents.open = false;
  });
  window.addEventListener('hashchange', queueReadingUpdate);
  document.fonts.ready.then(queueReadingUpdate);
  window.addEventListener('load', queueReadingUpdate, { once: true });

  const tooltip = reader.querySelector('#boe-note-tooltip');
  const noteTitle = tooltip.querySelector('strong');
  const noteText = tooltip.querySelector('p');
  let noteLink = null;
  let hideTimer;

  function hidePreview() {
    clearTimeout(hideTimer);
    if (!noteLink) return;
    noteLink.removeAttribute('aria-describedby');
    noteLink = null;
    tooltip.hidden = true;
  }

  function showPreview(link) {
    hidePreview();
    const note = document.getElementById(link.hash.slice(1));
    const words = note.querySelector('.boe-note-body').textContent.trim().replace(/\s+/g, ' ');
    const characters = Array.from(words);
    const excerpt = characters.slice(0, 170).join('');
    noteTitle.textContent = link.getAttribute('aria-label') + ' · p. ' + note.dataset.pdfPage;
    noteText.textContent = characters.length > 170 ? excerpt.replace(/\s+\S*$/, '') + '…' : words;
    tooltip.hidden = false;
    noteLink = link;
    noteLink.setAttribute('aria-describedby', tooltip.id);
    const anchor = link.getBoundingClientRect();
    const box = tooltip.getBoundingClientRect();
    const field = reader.querySelector('.boe-article').getBoundingClientRect();
    const left = Math.max(field.left + 4, Math.min(anchor.left, field.right - box.width - 4));
    const below = anchor.bottom + 6;
    const top = below + box.height <= window.innerHeight - 10 ? below : Math.max(10, anchor.top - box.height - 6);
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }

  function dismissAfterPointerLeaves() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!tooltip.matches(':hover') && !noteLink?.matches(':hover, :focus-visible')) hidePreview();
    }, 160);
  }

  for (const link of reader.querySelectorAll('a[role="doc-noteref"]')) {
    link.addEventListener('pointerenter', event => {
      if (event.pointerType === 'mouse' || event.pointerType === 'pen') showPreview(link);
    });
    link.addEventListener('pointerleave', dismissAfterPointerLeaves);
    link.addEventListener('focus', () => { if (link.matches(':focus-visible')) showPreview(link); });
    link.addEventListener('blur', dismissAfterPointerLeaves);
    link.addEventListener('click', hidePreview);
  }
  tooltip.addEventListener('pointerenter', () => clearTimeout(hideTimer));
  tooltip.addEventListener('pointerleave', dismissAfterPointerLeaves);
  reader.addEventListener('keydown', event => {
    if (event.key === 'Escape' && noteLink) {
      event.preventDefault();
      hidePreview();
    }
  });
  window.addEventListener('scroll', () => {
    hidePreview();
    queueReadingUpdate();
  }, { passive: true });
  window.addEventListener('resize', () => {
    hidePreview();
    queueReadingUpdate();
  });
})();
