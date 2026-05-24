(function () {
  function loadSidemenu() {
    var sidebar = document.querySelector('aside.sidebar');
    if (!sidebar) return;
    fetch('sidemenu/sidemenu.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        sidebar.innerHTML = html;
        var page = location.pathname.split('/').pop().replace('.html', '');
        var active = sidebar.querySelector('[data-page="' + page + '"]');
        if (active) active.classList.add('nav-link--active');
      });
  }

  function loadHeader() {
    var header = document.querySelector('header.header');
    if (!header) return;
    var title = header.dataset.title || '';
    var tag = header.dataset.tag || '';
    fetch('header/header.html')
      .then(function (r) { return r.text(); })
      .then(function (html) {
        header.innerHTML = html.replace('{{TITLE}}', title).replace('{{TAG}}', tag);
        var logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('mock_authed');
            window.location.href = 'login.html';
          });
        }
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadSidemenu();
    loadHeader();
  });
})();
