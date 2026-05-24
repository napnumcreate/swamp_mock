import { login } from '../assets/js/auth.js';

const form = document.getElementById('login-form');
const error = document.getElementById('login-error');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const code = document.getElementById('access-code').value;
  const pass = document.getElementById('password').value;
  if (login(code, pass)) {
    window.location.href = 'customer-management.html';
    return;
  }
  error.hidden = false;
});
