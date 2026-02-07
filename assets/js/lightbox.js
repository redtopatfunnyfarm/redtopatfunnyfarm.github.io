(() => {
  const overlay = document.getElementById("image-modal-overlay");
  const modal = document.getElementById("image-modal");
  const closeButton = document.getElementById("image-modal-close");
  const modalImg = document.getElementById("image-modal-img");
  const triggers = Array.from(document.querySelectorAll("[data-lightbox]"));

  if (!overlay || !modal || !closeButton || !modalImg || triggers.length === 0) {
    return;
  }

  let lastTrigger = null;
  let hideOverlayTimer = null;

  const openModal = (trigger) => {
    if (!trigger) {
      return;
    }

    if (hideOverlayTimer) {
      window.clearTimeout(hideOverlayTimer);
      hideOverlayTimer = null;
    }

    lastTrigger = trigger;
    const src = trigger.getAttribute("data-lightbox") || trigger.getAttribute("src") || "";
    const alt = trigger.getAttribute("data-lightbox-alt") || trigger.getAttribute("alt") || "";

    modalImg.src = src;
    modalImg.alt = alt;

    overlay.hidden = false;
    overlay.classList.add("is-open");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    closeButton.focus();
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    overlay.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    hideOverlayTimer = window.setTimeout(() => {
      overlay.hidden = true;
      hideOverlayTimer = null;
    }, 220);

    if (lastTrigger) {
      lastTrigger.focus();
    }
  };

  const handleTriggerKeydown = (event, trigger) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(trigger);
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("click", () => openModal(trigger));
    trigger.addEventListener("keydown", (event) => handleTriggerKeydown(event, trigger));
  });

  overlay.addEventListener("click", closeModal);
  closeButton.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
})();
