# /codex-exec

## Purpose

A Command in which ClaudeCode, based on the user's instructions, prepares a Codex implementation prompt, delegates implementation to Codex, and reviews the result.
Use this Command whenever you delegate implementation, fixes, refactoring, or cleanup under `docs/` to Codex.

The user invokes it as:

```
/codex-exec [concrete instruction for implementation / fix / cleanup under docs/]
```

## Arguments

Treat `$ARGUMENTS` as the user's instruction for this run.

- If `$ARGUMENTS` is empty or insufficient as an implementation instruction, do not infer; ask the user for what is missing.
- Minor rewording for clarity is allowed.
- Do not infer specifications, requirements, or screen structure.

## Files to read

### Before implementation (before Steps 1-4)

```
.claude/rules/static-mockup-workflow.md
.claude/rules/codex-workflow.md
.claude/templates/codex-prompt.template.md
```

### Just before review (before Step 7)

```
.claude/rules/implementation-review.md
```

### Read only when needed

```
.codex/codex-report.schema.json
```

## Procedure

### Step 1: Confirm the user's instruction
Read `$ARGUMENTS` as this run's instruction.
- Identify the target screens / fix targets / purpose / tentative spec / design hint.
- If essential information is missing, ask the user (do not infer).

### Step 2: Present a Plan to the user (conditional)
Present a Plan and get confirmation only when one of the following applies; otherwise proceed to Step 3.
- New screen addition (broad Edit scope or screen-structure judgment needed)
- Instructions spanning multiple files, where mismatch risk is high
- The user explicitly asked "confirm before proceeding"

When presenting a Plan, show briefly:
- Target files / Edit scope
- Outline of the implementation

### Step 3: Create `.codex-prompt.tmp.md`
Fill in the following sections per `.claude/templates/codex-prompt.template.md`:
- Required reading
- Goal
- User instruction summary
- Edit scope
- Implementation requirements
- Must not do
- Acceptance criteria
- Report requirement

Note: `.codex-prompt.tmp.md` may still contain the previous task's content. Read it first to check the current state before overwriting (Claude Code's Write requires a prior Read on existing files).

### Step 4: Run `codex exec`

```
codex exec --skip-git-repo-check -s workspace-write "$(cat .codex-prompt.tmp.md)"
```

- `--skip-git-repo-check`: so that the run does not fail in a non-Git template workspace.
- `-s workspace-write`: so that Codex can write to the target files.
- Run this via the Bash tool. For PowerShell, replace `"$(cat .codex-prompt.tmp.md)"` with `(Get-Content -Raw .codex-prompt.tmp.md)`.

### Step 5: Check `.codex-report.tmp.json`
- Check `status` (completed / blocked / partial).
- Use `files_changed` to identify what changed.
- Report `open_questions` to the user if any.

### Step 6: Read the files Codex changed
Do not judge from the report alone. Read each changed file directly to confirm content.

### Step 7: Review per `.claude/rules/implementation-review.md`
Review against the 8 points and judge OK / Fix needed / On hold.

### Step 8: Report to the user
Report:
- Implementation summary
- Changed files
- Review result (OK / Fix needed / On hold)
- If Fix needed, the concrete issues
- Whether the work is ready to proceed

## Failure handling

If Codex returns `blocked` or `partial`:
1. Organize what was missing or unclear.
2. Confirm with the user as needed (do not infer).
3. Update `.codex-prompt.tmp.md` and rerun from Step 4.

## Prohibited

- Adding requirements / screens not stated by the user.
- Adding customer review points on your own.
- Inferring business requirements.
- Inflating into production (API, DB, real auth, business logic).
- Running any Git command, including read-only ones (`git status` / `git diff` / `git log` etc.).
- Using `git diff` for post-Codex verification (use actual file reads and the Codex report instead).
- Judging Codex output from the report alone (always read the actual files too).
