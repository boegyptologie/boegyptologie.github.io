(() => {
  const reader = document.getElementById('boe-reader');
  const contents = reader.querySelector('.boe-plan');
  const contentsToggle = contents.querySelector('summary');
  const margin = reader.querySelector('.boe-margin');
  const landscapeQuery = '(orientation: landscape) and (max-width: 1000px) and (max-height: 500px)';
  const landscape = matchMedia(landscapeQuery);
  const compact = matchMedia('(max-width: 660px), ' + landscapeQuery);
  const touch = matchMedia('(hover: none) and (pointer: coarse)');
  const endmatter = reader.querySelector('.boe-endmatter');
  const nav = contents.querySelector('nav');
  const tocLinks = [...nav.querySelectorAll('a')];
  const outline = new Map(tocLinks.map(link => [
    document.getElementById(link.hash.slice(1)), link,
  ]));
  const passages = [...outline.keys()];
  const pdfMarks = [...reader.querySelectorAll('[data-pdf-page]')];
  const pdfLink = reader.querySelector('.boe-current-pdf');
  const pdfLabel = pdfLink.querySelector('span');
  const pdfUrl = pdfLink.href.split('#')[0];
  const pdfPageLabel = pdfLink.dataset.pageLabel;
  const isFrench = document.documentElement.lang.startsWith('fr');
  let activePassage = null;
  let activePage = null;
  let updatePending = false;

  const tocDepth = link => link?.classList.contains('boe-outline-detail') ? 3 :
    link?.classList.contains('boe-outline-sub') ? 2 : 1;
  const outlineTree = document.createDocumentFragment();
  const branches = [outlineTree];
  const sectionStartLabel = isFrench ? 'Début de la section' : 'Section start';
  for (const [index, link] of tocLinks.entries()) {
    const depth = tocDepth(link);
    branches.length = Math.min(depth, branches.length);
    const parent = branches.at(-1);
    if (tocDepth(tocLinks[index + 1]) <= depth) {
      parent.append(link);
      continue;
    }

    const group = document.createElement('details');
    group.className = 'boe-toc-group';
    const heading = document.createElement('summary');
    heading.className = 'boe-toc-heading';
    heading.title = link.title;
    heading.append(...link.childNodes);
    const children = document.createElement('div');
    children.className = 'boe-toc-children';
    link.classList.add('boe-toc-start');
    link.setAttribute('aria-label', sectionStartLabel + ' · ' + link.title);
    link.textContent = sectionStartLabel;
    children.append(link);
    group.append(heading, children);
    parent.append(group);
    branches.push(children);
  }
  nav.replaceChildren(outlineTree);

  function openLinkedBranch() {
    const link = outline.get(document.getElementById(location.hash.slice(1)));
    for (let group = link?.closest('.boe-toc-group'); group; group = group.parentElement.closest('.boe-toc-group')) {
      group.open = true;
    }
    queueReadingUpdate();
  }

  function atReadingLine(items, offset) {
    for (let index = items.length - 1; index >= 0; index--) {
      if (items[index].getBoundingClientRect().top <= offset) return items[index];
    }
    return items[0];
  }

  function updateReadingMarks() {
    const bar = compact.matches ? margin.getBoundingClientRect() : null;
    if (bar && contents.open) {
      const below = window.innerHeight - bar.bottom;
      const above = bar.top;
      const opensAbove = below < Math.min(window.innerHeight * .55, above);
      contents.classList.toggle('boe-plan-up', opensAbove);
      nav.style.setProperty('--boe-toc-space', Math.max(0, (opensAbove ? above : below) - 6) + 'px');
    }
    const offset = bar
      ? Math.max(landscape.matches ? 70 : 95, bar.height + 20)
      : 46;
    const passage = endmatter.getBoundingClientRect().top > offset ? atReadingLine(passages, offset) : null;
    if (passage !== activePassage) {
      outline.get(activePassage)?.removeAttribute('aria-current');
      const link = outline.get(passage);
      if (link) {
        link.setAttribute('aria-current', 'location');
        if (!compact.matches && contents.open && !nav.matches(':hover, :focus-within')) {
          let row = link;
          for (let group = link.closest('.boe-toc-group'); group; group = group.parentElement.closest('.boe-toc-group')) {
            if (!group.open) row = group.firstElementChild;
          }
          const item = row.getBoundingClientRect();
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
  landscape.addEventListener('change', fitContents);
  fitContents();
  openLinkedBranch();
  contents.addEventListener('toggle', queueReadingUpdate);
  contents.addEventListener('click', event => {
    if (compact.matches && event.target.closest('a')) contents.open = false;
  });
  window.addEventListener('hashchange', openLinkedBranch);
  document.fonts.ready.then(queueReadingUpdate);
  window.addEventListener('load', queueReadingUpdate, { once: true });

  const tooltip = reader.querySelector('#boe-note-tooltip');
  const noteCard = tooltip.querySelector('.boe-note-card');
  const noteClose = tooltip.querySelector('.boe-note-close');
  const noteTitle = tooltip.querySelector('strong');
  const noteText = tooltip.querySelector('p');
  let noteLink = null;
  let hideTimer;

  function hidePreview(restoreFocus = false) {
    clearTimeout(hideTimer);
    if (!noteLink) return;
    const trigger = noteLink;
    noteLink = null;
    tooltip.hidden = true;
    trigger.removeAttribute('aria-describedby');
    if (noteCard.hasAttribute('href')) {
      noteCard.removeAttribute('href');
      tooltip.setAttribute('role', 'tooltip');
      tooltip.removeAttribute('aria-labelledby');
      tooltip.removeAttribute('aria-describedby');
      noteClose.hidden = true;
      if (restoreFocus) trigger.focus({ preventScroll: true });
    }
  }

  function showPreview(link, interactive = false) {
    hidePreview();
    const note = document.getElementById(link.hash.slice(1));
    const words = note.querySelector('.boe-note-body').textContent.trim().replace(/\s+/g, ' ');
    const characters = Array.from(words);
    const excerpt = characters.slice(0, 170).join('');
    noteTitle.textContent = link.getAttribute('aria-label') + ' · p. ' + note.dataset.pdfPage;
    noteText.textContent = characters.length > 170 ? excerpt.replace(/\s+\S*$/, '') + '…' : words;
    noteLink = link;
    if (interactive) {
      noteCard.href = link.hash;
      tooltip.setAttribute('role', 'dialog');
      tooltip.setAttribute('aria-labelledby', noteTitle.id);
      tooltip.setAttribute('aria-describedby', noteText.id);
      noteClose.hidden = false;
    } else {
      link.setAttribute('aria-describedby', tooltip.id);
    }
    tooltip.hidden = false;
    const anchor = link.getBoundingClientRect();
    const box = tooltip.getBoundingClientRect();
    const field = reader.querySelector('.boe-article').getBoundingClientRect();
    const left = Math.max(field.left + 4, Math.min(anchor.left, field.right - box.width - 4));
    const below = anchor.bottom + 6;
    const top = below + box.height <= window.innerHeight - 10 ? below : Math.max(10, anchor.top - box.height - 6);
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    if (interactive) noteCard.focus({ preventScroll: true });
  }

  function dismissAfterPointerLeaves() {
    clearTimeout(hideTimer);
    if (noteCard.hasAttribute('href')) return;
    hideTimer = setTimeout(() => {
      if (!tooltip.matches(':hover') && !noteLink?.matches(':hover, :focus-visible')) hidePreview();
    }, 160);
  }

  for (const link of reader.querySelectorAll('a[role="doc-noteref"]')) {
    link.addEventListener('pointerenter', event => {
      if (!compact.matches && !touch.matches && (event.pointerType === 'mouse' || event.pointerType === 'pen')) showPreview(link);
    });
    link.addEventListener('pointerleave', dismissAfterPointerLeaves);
    link.addEventListener('focus', () => {
      if (!compact.matches && !touch.matches && link.matches(':focus-visible')) showPreview(link);
    });
    link.addEventListener('blur', dismissAfterPointerLeaves);
    link.addEventListener('click', event => {
      const modified = event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey;
      if (modified || (!compact.matches && !touch.matches && event.pointerType !== 'touch')) {
        hidePreview();
        return;
      }
      event.preventDefault();
      if (noteLink === link && noteCard.hasAttribute('href')) hidePreview(true);
      else showPreview(link, true);
    });
  }
  noteCard.addEventListener('click', () => requestAnimationFrame(() => hidePreview()));
  noteClose.addEventListener('click', () => hidePreview(true));
  document.addEventListener('pointerdown', event => {
    if (noteCard.hasAttribute('href') && !tooltip.contains(event.target) && !noteLink.contains(event.target)) hidePreview();
    if (compact.matches && contents.open && !contents.contains(event.target)) contents.open = false;
  });
  tooltip.addEventListener('pointerenter', () => clearTimeout(hideTimer));
  tooltip.addEventListener('pointerleave', dismissAfterPointerLeaves);
  reader.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || event.target.closest('.boe-image-view')) return;
    if (noteLink) {
      event.preventDefault();
      hidePreview(true);
    } else if (compact.matches && contents.open) {
      event.preventDefault();
      contents.open = false;
      contentsToggle.focus({ preventScroll: true });
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

  const figures = reader.querySelectorAll('.boe-figure > img');
  const imageView = document.createElement('dialog');
  if (figures.length && typeof imageView.showModal === 'function') {
    imageView.className = 'boe-image-view';
    imageView.setAttribute('aria-label', isFrench ? 'Figure agrandie' : 'Enlarged figure');
    const close = document.createElement('button');
    close.className = 'boe-image-close';
    close.type = 'button';
    close.autofocus = true;
    close.setAttribute('aria-label', isFrench ? 'Fermer la figure' : 'Close figure');
    close.textContent = '×';
    close.addEventListener('click', () => imageView.close());
    const enlarged = document.createElement('img');
    imageView.append(close, enlarged);
    reader.append(imageView);
    imageView.addEventListener('click', event => {
      if (event.target === imageView) imageView.close();
    });

    const enlargeLabel = isFrench ? 'Agrandir la figure' : 'Enlarge figure';
    for (const image of figures) {
      const trigger = document.createElement('button');
      trigger.className = 'boe-figure-trigger';
      trigger.type = 'button';
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-label', image.alt ? enlargeLabel + ' · ' + image.alt : enlargeLabel);
      const width = Number(image.getAttribute('width'));
      const height = Number(image.getAttribute('height'));
      const ratio = width > 0 && height > 0 ? width / height : null;
      if (ratio) {
        trigger.style.inlineSize = `min(${width}px, calc(var(--boe-figure-height) * ${ratio}))`;
        trigger.style.aspectRatio = String(ratio);
      }
      image.replaceWith(trigger);
      trigger.append(image);
      trigger.addEventListener('click', () => {
        hidePreview();
        enlarged.alt = image.alt;
        enlarged.style.inlineSize = ratio
          ? `min(${1.5 * width}px, calc(var(--boe-image-view-height) * ${ratio}))`
          : '';
        enlarged.src = image.currentSrc || image.src;
        imageView.showModal();
      });
    }
  }
})();
