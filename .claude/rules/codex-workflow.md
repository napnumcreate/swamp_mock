# Codex delegation workflow (principles)

The authoritative procedure for delegation is `.claude/commands/codex-exec.md` (`/codex-exec` Command).
This file defines the principles of delegation.

## Delegation principles

- The standard entry for implementation delegation is the `/codex-exec` Command.
- All instructions to Codex are consolidated into `.codex-prompt.tmp.md`.
- Keep Required reading minimal (do not let Codex explore widely).
- Specify Edit scope as concrete files and directories.
- For ordinary work, edit `docs/`; treat `samples/` as reference-only.
- Do not add verbal instructions to Codex outside the prompt.

## Prompt construction

Build the prompt based on `.claude/templates/codex-prompt.template.md`.

- List only the screens / CSS actually needed in Required reading.
- Distinguish `docs/` (editable) and `samples/` (reference) in Edit scope.
- Use Must not do to explicitly forbid out-of-scope changes.

## Post-implementation verification

- Check both `.codex-report.tmp.json` and the actual files.
- Do not judge from the report alone.
- Review against `implementation-review.md`.
- Verify changes by reading actual files and the Codex report; do not use `git diff`.
- If a Git operation is needed, guide the user to do it; do not run it yourself.
