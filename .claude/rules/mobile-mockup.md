---
description: ClaudeCode policy for mobile mockup work
paths:
  - "docs/mobile/**"
  - "samples/mobile-basic/**"
---

# Mobile mockup policy

## When to apply

When the user's instruction involves mobile screens, smartphone navigation, or mobile-first verification, include the following as Required reading candidates:

- `docs/mobile/assets/css/mobile.css`
- `samples/mobile-basic/pages/home.html` (app-shell reference)
- (Add a specific sample page when the target screen is clear)

Do not force-load `docs/mobile/` or mobile samples for non-mobile work.

## Implementation scope

- Mobile implementation target is `docs/mobile/`.
- Prefer the shared style `docs/mobile/assets/css/mobile.css` for mobile.
- Reference `samples/mobile-basic/` as needed.
- Stay within static mockup scope (do not inflate into production features).

## Role color theme (confirmed spec)

Mobile screens differ in accent color between ホスト向け and 内勤向け. Switch via a role modifier class on `.mobile-shell`.

| Role | Class | Accent color |
|---|---|---|
| ホスト向け | `.mobile-shell--host` | Purple `#7C3AED` |
| 内勤向け | `.mobile-shell--staff` | Blue `#2563EB` |

- CSS variables (`--color-accent` / `--color-accent-hover` / `--color-accent-light` / `--color-accent-text` / `--color-accent-shadow` / `--color-accent-shadow-hover`) are overridden under `.mobile-shell--host` and `.mobile-shell--staff`.
- All child elements that reference these variables (header, footer, buttons, etc.) automatically render in the role color.
- For ホスト向け screens use `<div class="mobile-shell mobile-shell--host">`, for 内勤向け use `mobile-shell--staff`.

## Shared header / role-specific footer (confirmed spec)

- Header: `docs/mobile/pages/header/header.html` is fetched in common for all roles.
  - Placeholders `{{TITLE}}` / `{{TAG_CLASS}}` / `{{TAG_TEXT}}` are substituted by the loader JS.
- Footer: a separate file per role.
  - ホスト向け: `docs/mobile/pages/footer/footer-host.html`
  - 内勤向け: `docs/mobile/pages/footer/footer-staff.html`
- `docs/mobile/assets/js/shared-mobile-layout.js` handles header/footer fetch, injection, and logout.

## Post-login redirect spec (confirmed)

`docs/mobile/pages/login.js` redirects to `attendance-host.html` on successful login.
The login screen has no ホスト/内勤 selector. This behavior is intentional; do not propose changes.
