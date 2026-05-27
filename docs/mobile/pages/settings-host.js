document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('settings-logout-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      sessionStorage.removeItem(window.MOCK_SESSION_KEY || 'mock_authed');
      window.location.href = 'login.html';
    });
  }
});
