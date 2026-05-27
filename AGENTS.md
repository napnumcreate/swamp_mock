# AGENTS.md

This file is the project instruction read by Codex.

## Project purpose

This is a repository for pre-contract static mockups (ホストクラブ店内業務システム).
Codex implements according to the prompt prepared by ClaudeCode in `.codex-prompt.tmp.md`.

## Directory roles

| Directory | Role |
|---|---|
| `docs/` | Customer-facing mockup (GitHub Pages publish source) |
| `docs/assets/css/` | Shared CSS design system (used by all mockups) |
| `docs/assets/js/` | Lightweight JS foundation for mockups (auth representation etc.) |
| `docs/assets/mock/` | Mock records / options data |
| `docs/pages/` | PC screens for the project |
| `docs/mobile/` | Mobile mockup publish area |
| `docker/` | Local preview via Docker / nginx (not used for screen implementation) |
| `samples/` | Reference samples (not published on Pages) |
| `samples/basic-admin/` | BtoB admin reference (Dashboard / List / Detail / Form) |
| `samples/auth/` | Auth representation reference |
| `samples/mobile-basic/` | Mobile mockup reference (app-shell, bottom nav) |

## `docs/` and `samples/` policy

- The implementation target for project mockups is `docs/`.
  - Place new pages under `docs/pages/`.
  - Prefer the existing CSS under `docs/assets/css/`.
- `samples/` is reference-only. Do not edit unless the user explicitly asks.
  - You may consult `samples/basic-admin/` for reference.
  - Do not blindly copy samples; restructure under `docs/` per the user's instructions.

## Entry procedure

At task start, first read `.codex-prompt.tmp.md`. That is the primary instruction for this task; everything follows from it.

## Codex behavior

### Do

- Implement faithfully what ClaudeCode wrote in the prompt.
- Change only files within the declared Edit scope.
- Stay within HTML/CSS suitable for a static mockup.
- For auth or data display, prefer the existing files under `docs/assets/js/` and `docs/assets/mock/`.
- For mobile work, `docs/mobile/` is the implementation area.
- After implementation, write `.codex-report.tmp.json` following `.codex/codex-report.schema.json`.

### Do not

- Add requirements the user did not request.
- Fill in specifications by guess.
- Modify files outside the Edit scope.
- Implement API calls, DB access, real auth, or production features.
- Add JavaScript without explicit instruction.
- Inflate JS beyond minimum for a static mockup.
- Inflate Docker / nginx into production infrastructure.
- Execute any Git command, including read-only ones (`git status` / `git diff` / `git log` etc.). If a Git check seems needed, do not run it; report it as an open question.
- Add screens or features not stated in `.codex-prompt.tmp.md`.

## Screen navigation premise

In this project, `docs/index.html` is the PC admin dashboard screen (KPI cards, store status, attendance, etc., protected by `requireAuth`).
Navigation to other screens is concentrated in:

- PC side: `docs/pages/sidemenu/sidemenu.html` (sidebar menu)
- Mobile side: `docs/mobile/pages/footer/footer-host.html` and `footer-staff.html` (role-based bottom nav)

### Navigation rule when adding new pages

- For new PC screens, add a nav link to `docs/pages/sidemenu/sidemenu.html` when appropriate.
- For new mobile screens, add a nav link to the corresponding role footer file.
- Do not change the existing dashboard structure of `docs/index.html` (KPI cards, tables, calendar etc.) unless explicitly instructed.
- Do not delete dead links or placeholder links in existing navigation files. The user may be keeping them as future-implementation placeholders.

## Report requirement

After implementation, write `.codex-report.tmp.json` following `.codex/codex-report.schema.json`.
