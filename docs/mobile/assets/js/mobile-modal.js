(function () {
  var overlay = null;

  function init() {
    overlay = document.querySelector('.mobile-modal-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    var closeBtn = overlay.querySelector('.mobile-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', close);

    document.querySelectorAll('[data-modal-trigger]').forEach(function (el) {
      el.addEventListener('click', function () {
        open(this.dataset.modalTitle || '');
      });
    });
  }

  function open(title) {
    if (!overlay) return;
    var titleEl = overlay.querySelector('.mobile-modal-title');
    if (titleEl && title) titleEl.textContent = title;
    overlay.classList.add('is-open');
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
  }

  window.MobileModal = { open: open, close: close };
  document.addEventListener('DOMContentLoaded', init);
})();
