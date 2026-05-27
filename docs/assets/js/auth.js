import { ACCESS_CODE, PASSWORD } from '../mock/auth-config.js';

// 静的モック専用の軽量認証表現ユーティリティです。
const SESSION_KEY = 'mock_authed';
const LOGIN_PATH = 'login.html';
const DEFAULT_REDIRECT = 'index.html';

export function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function login(code, password) {
  if (code === ACCESS_CODE && password === PASSWORD) {
    sessionStorage.setItem(SESSION_KEY, 'true');
    return true;
  }

  return false;
}

export function logout(redirectPath = LOGIN_PATH) {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = redirectPath;
}

export function requireAuth(redirectPath = LOGIN_PATH) {
  if (isAuthenticated()) {
    document.body.style.visibility = 'visible';
    return;
  }

  const currentPath = `${window.location.pathname}${window.location.search}`;
  const redirectUrl = new URL(redirectPath, window.location.href);
  redirectUrl.searchParams.set('redirect', currentPath || DEFAULT_REDIRECT);
  window.location.href = redirectUrl.href;
}

window.MOCK_SESSION_KEY = SESSION_KEY;
