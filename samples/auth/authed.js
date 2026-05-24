import { requireAuth, logout } from '../../docs/assets/js/auth.js';

requireAuth('login.html');

document.getElementById('logout-btn')?.addEventListener('click', () => {
  logout('login.html');
});
