(function () {
  const lightbox = document.querySelector('#lightbox');
  if (!lightbox) return;

  const image = lightbox.querySelector('.lightbox__image');
  const caption = lightbox.querySelector('.lightbox__caption');
  const closeButton = lightbox.querySelector('.lightbox__close');
  const closeTargets = lightbox.querySelectorAll('[data-lightbox-close]');
  const triggers = document.querySelectorAll('[data-lightbox]');

  if (!image || !caption || !closeButton || !triggers.length) return;

  let lastFocusedElement = null;

  function openLightbox(trigger) {
    const src = trigger.getAttribute('data-lightbox-src');
    const alt = trigger.getAttribute('data-lightbox-alt') || '';
    const captionText = trigger.getAttribute('data-lightbox-caption') || '';

    if (!src) return;

    lastFocusedElement = document.activeElement;

    image.src = src;
    image.alt = alt;
    caption.textContent = captionText;
    caption.hidden = !captionText;

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');

    closeButton.focus();
  }

  function closeLightbox() {
    if (!lightbox.classList.contains('is-open')) return;

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');

    image.src = '';
    image.alt = '';
    caption.textContent = '';
    caption.hidden = true;

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openLightbox(trigger));
  });

  closeTargets.forEach((target) => {
    target.addEventListener('click', closeLightbox);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });
})();
