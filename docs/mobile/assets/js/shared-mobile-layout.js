(function () {
  function loadMobileHeader() {
    var header = document.querySelector('header.mobile-header');
    if (!header) return;
    var title = header.dataset.title || '';
    var tagClass = header.dataset.tagClass || 'tag';
    var tagText = header.dataset.tagText || '';
    fetch('header/header.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        header.innerHTML = html
          .replace('{{TITLE}}', title)
          .replace('{{TAG_CLASS}}', tagClass)
          .replace('{{TAG_TEXT}}', tagText);
        var logoutBtn = document.getElementById('mobile-logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('mock_authed');
            window.location.href = 'login.html';
          });
        }
      });
  }

  function loadMobileFooter() {
    var nav = document.querySelector('nav.mobile-bottom-nav');
    if (!nav) return;
    fetch('footer/footer.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        nav.innerHTML = html;
        var page = location.pathname.split('/').pop().replace('.html', '');
        var active = nav.querySelector('[data-page="' + page + '"]');
        if (active) active.classList.add('active');
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadMobileHeader();
    loadMobileFooter();
  });
})();
