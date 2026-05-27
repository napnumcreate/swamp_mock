# Static mockup workflow

## Principle

The user's explicit instructions are the sole starting point of production.
ClaudeCode does not invent production requirements; its job is to shape the user's instructions into something Codex can execute.

## ClaudeCode role boundary

### Do

- Read the user's instructions and structure them into a Codex implementation prompt.
- Organize background premises so the implementer does not get lost.
- If anything is unclear, ask the user (do not infer or fill in).

### Do not

- Invent screens.
- Add customer review points on your own.
- Fill in specifications the user did not state.
- Inflate scope by guessing business requirements.
- Restructure significantly under the excuse of "this is the usual way".
- Send dead links, unimplemented buttons, or placeholder UI elements to Codex as "deletion candidates" or "cleanup candidates" on your own. The user may be intentionally keeping them as future-implementation placeholders. Always confirm with the user first.

## Sections of a Codex prompt

When passing instructions to Codex, always organize the following.

| Section | Content |
|---|---|
| Goal | What this implementation aims to achieve (1-2 sentences). |
| User instruction summary | The user's instructions, faithful to the original. |
| Required reading | Files Codex must read before implementation (minimal). |
| Edit scope | Files / directories that may be changed (explicit). |
| Implementation requirements | Concrete list of what to implement. |
| Must not do | Explicit list of what must not be implemented. |
| Acceptance criteria | Completion criteria for review. |

## Handling unclear instructions

- If essential implementation information is missing, ask the user.
- Do not fill in by guess.
- Minor placeholder choices (tentative texts, dummy data) are allowed as long as you state "this is a tentative value".

## JS / mock data usage policy

When the user's instructions involve login flow, post-auth navigation, or display of dummy data, include the following as Required reading when relevant:

- `docs/assets/js/auth.js` (auth / session key management)
- `samples/auth/login.html` (login UI reference)

If the work can be done in static HTML only, do not introduce JS unnecessarily.

When mock data is needed, list the relevant files under `docs/assets/mock/` in Required reading (e.g. `hosts.js` / `staff.js` / `customer.js` / `salary.js` / `attendance.js` / `sales-report.js` / `auth-config.js`).

## Stay within static mockup scope

- Implementation is limited to static HTML/CSS for "showing the customer what the screen will look like".
- Do not inflate into production (API, DB, real auth, business logic).
- Review clarity, but do not let ClaudeCode change the structure or requirements themselves.

## Audit and cleanup output rule

When you find "deletion candidates" during an audit or cleanup task, output findings in three confidence tiers.
Do not delegate deletion to Codex on your own; for [WARN] and [INFO], always seek user judgment.

| Tier | Description | Examples |
|---|---|---|
| [OK] Clearly unnecessary | Zero references, clearly duplicated, deletion does not affect display or behavior | Orphaned files, fully duplicated code, unreferenced imports |
| [WARN] Cleanup candidate, requires user confirmation | Removable, but intent is unclear | Dead links, placeholder UI, unimplemented buttons, suspicious-looking sidemenu items |
| [INFO] Information only | Specification judgment belongs to the user; do not touch in a cleanup task | Mock data integrity, id/name mismatch, string/number type mixing, hardcoded values |

- Do not bundle [WARN] or [INFO] into the same Codex task as [OK] items.
- Include only [OK] in the cleanup task.
- [WARN] is delegated to Codex only when the user explicitly says "you may delete it", as a separate task.
- [INFO] involves spec changes; act only when the user instructs it as a new requirement.

This tier rule exists because, in a past audit, an item the user was keeping as a future-implementation placeholder was deleted by mistake.

## Screen navigation premise

In this project, `docs/index.html` is the PC admin dashboard (KPI cards, store status, attendance, etc.; protected by `requireAuth`).
Navigation to the screens is concentrated in:

- PC side: `docs/pages/sidemenu/sidemenu.html` (sidebar menu)
- Mobile side: `docs/mobile/pages/footer/footer-host.html` and `footer-staff.html` (role-based bottom nav)

### Navigation rule when adding new pages

- For new PC screens, add a nav link to `docs/pages/sidemenu/sidemenu.html` when appropriate.
- For new mobile screens, add a nav link to the role footer file.
- Do not change the existing dashboard structure of `docs/index.html` (KPI cards, tables, calendar etc.) unless explicitly instructed.
- If the user explicitly says "no navigation link needed", follow that instruction.

## `docs/` and `samples/` handling

- For project mockups, edit `docs/`.
  - Place new pages under `docs/pages/`.
  - Reference shared styles in `docs/assets/css/`.
- `samples/` is reference material, not the deliverable.
  - Use `samples/basic-admin/` as a reference for layout / expression / design direction.
  - May be included in Codex Required reading when relevant.
  - Do not always load all samples; list only the screen / CSS actually needed.
  - Do not include `samples/` in Edit scope unless the user explicitly says so.
