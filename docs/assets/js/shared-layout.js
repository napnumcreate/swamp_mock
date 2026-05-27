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
        var closeBtn = sidebar.querySelector('#sidebar-close-btn');
        if (closeBtn) {
          closeBtn.addEventListener('click', function () {
            sidebar.classList.remove('sidebar--open');
            var overlay = document.getElementById('sidebar-overlay');
            if (overlay) overlay.classList.remove('sidebar-overlay--visible');
          });
        }
        var overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.id = 'sidebar-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function () {
          var sidebar = document.querySelector('.sidebar');
          if (sidebar) sidebar.classList.remove('sidebar--open');
          overlay.classList.remove('sidebar-overlay--visible');
        });
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
        var menuBtn = document.getElementById('menu-btn');
        if (menuBtn) {
          menuBtn.addEventListener('click', function () {
            var sidebar = document.querySelector('.sidebar');
            var overlay = document.getElementById('sidebar-overlay');
            if (sidebar) sidebar.classList.toggle('sidebar--open');
            if (overlay) overlay.classList.toggle('sidebar-overlay--visible');
          });
        }
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadSidemenu();
    loadHeader();
  });
})();
