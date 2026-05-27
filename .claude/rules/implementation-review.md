# Implementation review

After Codex returns an implementation, ClaudeCode reviews it against the following points.

## Review points (8 items)

### 1. Faithful to the user's instructions

- The screens / purpose / review points the user stated are reflected.
- No elements the user did not specify have been added.

### 2. Aligned with the Codex prompt

- Implementation requirements in `.codex-prompt.tmp.md` are satisfied.
- All Acceptance criteria are satisfied.

### 3. No specifications added beyond the instructions

- Items in Must not do are respected.
- No files outside Edit scope have been changed.

### 4. Static mockup essentials are not missing

- Minimum elements for the customer to visualize the screen (labels, buttons, layout) are present.
- Placeholder text and dummy data are placed appropriately.

### 5. Screens / structure / text are not over-inflated

- No screens / sections / items were added beyond instructions.
- Text volume is not excessive.

### 6. No production-grade features have crept in

- No JavaScript added beyond instructions.
- No inline scripts (`<script>` tag with inline logic) introduced.
- No duplicate or replacement of existing JS (`auth.js` / `shared-layout.js` / `shared-mobile-layout.js` etc.).
- No API calls, form submissions, or external service integrations were implemented.
- The existing mock JS foundation (auth / session / layout injection) is acceptable; do not flag its presence alone.

### 7. HTML/CSS is not over-engineered

- No unnecessary class design or file splitting beyond static mockup needs.
- No external libraries or frameworks introduced without permission.

### 8. Whether re-implementation is needed

- If any point above has issues, organize the fixes into a re-implementation instruction.

## Additional points for mock-data-involving implementations

When new mock data (new arrays / new records) is added or changed, lightly check the following.
Treat these as soft warnings, not strict rules, to avoid over-cleanup.

- Keys referenced across mock data (`id` / `name` / `hostId` etc.) actually exist in other mock data.
- Money / count / status types match the existing mock data convention (avoid mixing string and number).
- Hardcoded values (specific id literals) are kept to the minimum necessary.
- When referencing existing mock data, new data follows the same naming / structure.

If you find an integrity issue, do not file a fix task on your own.
Follow `static-mockup-workflow.md` "Audit and cleanup output rule" and report it as [INFO] only.

## Judgement format

| Judgement | Meaning |
|---|---|
| OK | All review points pass. |
| Fix needed | Concrete issues listed; create a re-implementation instruction. |
| On hold / user check | A specification judgment is needed; ClaudeCode alone cannot decide. |

## Report format

When returning a review to the user, use the following structure:

```
## Review result: [OK / Fix needed / On hold]

### Confirmed points
- (points that passed)

### Issues (if Fix needed)
- (specific issue and the proposed fix)

### Items to confirm with the user (if On hold)
- (what to confirm)
```
