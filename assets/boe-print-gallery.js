(() => {
  const gallery = document.querySelector('.print-gallery');
  const dialog = document.querySelector('.print-photo-dialog');
  if (typeof dialog?.showModal !== 'function') return;

  const preview = dialog.querySelector('img');
  const caption = dialog.querySelector('figcaption');
  let currentPhoto;

  gallery.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (!link || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;

    const thumbnail = link.querySelector('img');
    preview.alt = thumbnail.alt;
    preview.src = link.href;
    caption.textContent = link.nextElementSibling.textContent;
    currentPhoto = link;
    dialog.showModal();
    event.preventDefault();
  });

  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => currentPhoto?.focus({ preventScroll: true }));
})();
