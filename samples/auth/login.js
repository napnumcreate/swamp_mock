import { login } from '../../docs/assets/js/auth.js';

const form = document.getElementById('login-form');
const error = document.getElementById('login-error');
const accessCode = document.getElementById('access-code');
const password = document.getElementById('password');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (login(accessCode.value, password.value)) {
    window.location.href = 'authed.html';
    return;
  }

  error.hidden = false;
});
