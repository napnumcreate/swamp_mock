# Goal

<!-- One or two sentences stating what this implementation achieves.
Example: "Create static HTML mocks for the login screen and list screen, at a quality suitable for customer review." -->

# User instruction summary

<!-- Faithful summary of the user's instruction.
Do not include ClaudeCode's interpretation or additions.
Example:
- Screens: login, user list
- Purpose: pre-contract customer review
- Customer review points: navigation position, table column count
- Tentative spec: company name "株式会社サンプル", 3 dummy users
- Design: clean SaaS-like, blue accent -->

# Required reading

<!-- Files Codex must read before implementation. Keep minimal.
Example:
- AGENTS.md
- (target file path when modifying an existing file)
- (only when layout / expression reference is needed) samples/basic-admin/pages/dashboard.html

Do not include unnecessary files. Do not let Codex explore widely.
Even when sampling samples, list only the screen / CSS actually needed.
For auth-based mocks, list `docs/assets/js/auth.js` and `samples/auth/` as needed.
For mock data, list relevant files under `docs/assets/mock/` (e.g. `hosts.js` / `staff.js` / `customer.js` / `salary.js` / `attendance.js` / `sales-report.js` / `auth-config.js`).
List domain-specific files (Docker / mobile etc.) only when needed. -->

# Edit scope

<!-- Files / directories that may be changed.
Files not listed here must not be touched.
Example (ordinary case):
- Create: `docs/pages/login.html`, `docs/pages/user-list.html`
- Editable: `docs/assets/css/` (only when existing styles are insufficient)
- Forbidden: all files under `samples/`
- Forbidden: all files not listed above

Include `samples/` in Edit scope only when the user explicitly asked to improve samples. -->

# Implementation requirements

<!-- Concrete list of what to implement.
For each screen / element, write "what / how".
Example:
- login.html: email field, password field, login button
- user-list.html: header nav (logo, menu), user list table (3 dummy rows)
- style.css: shared styles (font / color / button)
- No JavaScript -->

# Must not do

<!-- Explicit list of what must not be implemented.
Example:
- Adding JavaScript
- Writing inline `<script>` logic in HTML (any JS must go into an external file)
- API calls / form submission
- Auth / session handling
- Editing files outside Edit scope
- Git operations
- Adding screens or features not in the user's instructions -->

# Acceptance criteria

<!-- Completion criteria to check during review.
Example:
- Opening login.html in a browser shows the login form
- Opening user-list.html in a browser shows a 3-row table
- Works as static files only (no server needed)
- No JavaScript errors
- For a new PC screen, a navigation link is added to `docs/pages/sidemenu/sidemenu.html`
- For a new mobile screen, a navigation link is added to the role footer at `docs/mobile/pages/footer/footer-host.html` or `footer-staff.html` -->

# Report requirement

After implementation, write `.codex-report.tmp.json`.

- Follow the schema in `.codex/codex-report.schema.json`.
- Set `status` to one of `completed` / `blocked` / `partial`.
- List all changed / created files in `files_changed`.
- Record undecided points or items to confirm with the user in `open_questions`.
