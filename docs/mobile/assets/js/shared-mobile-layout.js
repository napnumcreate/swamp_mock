(function () {
  var HOST_PAGES = ['attendance-host', 'sales', 'customer', 'settings-host'];
  var STAFF_PAGES = ['attendance-staff', 'store-status', 'order', 'settings-staff'];

  function getLayoutType() {
    var page = location.pathname.split('/').pop().replace('.html', '');
    if (HOST_PAGES.includes(page)) return 'host';
    if (STAFF_PAGES.includes(page)) return 'staff';
    return null;
  }

  function loadMobileHeader(layoutType) {
    var header = document.querySelector('header.mobile-header');
    if (!header) return;
    var title = header.dataset.title || '';
    var tagClass = header.dataset.tagClass || 'tag';
    var tagText = header.dataset.tagText || '';
    fetch('header/header-' + layoutType + '.html')
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

  function loadMobileFooter(layoutType) {
    var nav = document.querySelector('nav.mobile-bottom-nav');
    if (!nav) return;
    fetch('footer/footer-' + layoutType + '.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        nav.innerHTML = html;
        var page = location.pathname.split('/').pop().replace('.html', '');
        var active = nav.querySelector('[data-page="' + page + '"]');
        if (active) active.classList.add('active');
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var layoutType = getLayoutType();
    if (!layoutType) return;
    loadMobileHeader(layoutType);
    loadMobileFooter(layoutType);
  });
})();
