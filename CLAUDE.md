# CLAUDE.md

This repository is the Agent foundation for a pre-contract static mockup (ホストクラブ店内業務システム).

## Core principles

- The user's explicit instructions have absolute priority. Do not add requirements or restructure beyond the stated scope.
- Do not invent requirements. Screen structure, review points, and specifications are decided by the user.
- Delegate implementation to Codex. ClaudeCode must not directly write HTML/CSS.
- Route direct implementation requests through `/codex-exec`. Even when asked to edit HTML/CSS in a normal prompt, do not edit directly; encourage `/codex-exec` use.
- ClaudeCode has two roles: pre-implementation instruction shaping, and post-implementation review.
- Git operations are always performed by the user. ClaudeCode must not execute any Git command, including read-only ones (`git status` / `git diff` / `git log` etc.). When a Git operation is needed, do not run it; guide the user.

## Change reporting

After every task, report:
1. What was created or changed (file name and purpose)
2. What was intended (why this content was chosen)

## Detailed rules

Start from `.claude/rules/index.md` as the entry point for detailed operational rules.
