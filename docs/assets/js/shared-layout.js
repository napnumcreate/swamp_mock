(function () {
  var isRoot = !location.pathname.match(/\/pages\//);
  var base = isRoot ? 'pages/' : '';

  function loadSidemenu() {
    var sidebar = document.querySelector('aside.sidebar');
    if (!sidebar) return;
    fetch(base + 'sidemenu/sidemenu.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        sidebar.innerHTML = html;
        if (isRoot) {
          sidebar.querySelectorAll('a[href]').forEach(function (a) {
            var href = a.getAttribute('href');
            if (href.indexOf('../') === 0) {
              a.setAttribute('href', href.slice(3));
            } else {
              a.setAttribute('href', 'pages/' + href);
            }
          });
        }
        var page = location.pathname.split('/').pop().replace('.html', '');
        if (page === 'index' || page === '') page = 'dashboard';
        var active = sidebar.querySelector('[data-page="' + page + '"]');
        if (active) active.classList.add('nav-link--active');
      });
  }

  function loadHeader() {
    var header = document.querySelector('header.header');
    if (!header) return;
    var title = header.dataset.title || '';
    var tag = header.dataset.tag || '';
    fetch(base + 'header/header.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        header.innerHTML = html.replace('{{TITLE}}', title).replace('{{TAG}}', tag);
        var logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem(window.MOCK_SESSION_KEY || 'mock_authed');
            window.location.href = base + 'login.html';
          });
        }
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadSidemenu();
    loadHeader();
  });
})();
