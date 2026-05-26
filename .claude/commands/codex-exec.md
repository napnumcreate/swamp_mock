# /codex-exec

## 目的

ユーザーが指定した指示をもとに、ClaudeCode が Codex 実装用プロンプトを作成し、Codex に実装を委任し、実装結果をレビューする Command です。
新規画面制作・既存実装の修正・リファクタリング・整理など、`docs/` 配下の実装・修正・整理を Codex に委任する場合に使用します。

ユーザーは以下の形式で実行します。

```
/codex-exec [docs/ 配下の実装・修正・整理に関する具体指示]
```

## 引数

`$ARGUMENTS` を今回のユーザー指示として扱う。

- `$ARGUMENTS` が空、または実装指示として明らかに不足している場合は、勝手に要件を補完せず、不足している情報を明示してユーザーに確認を求めること
- 軽微な表現の整理（言い回しの補正など）は行ってよい
- 仕様・要件・画面構成の補完は行わない

## 実行前に読むファイル

### 実装前（Step 1〜4 実行前）に読む

```
.claude/rules/static-mockup-workflow.md
.claude/rules/codex-workflow.md
.claude/templates/codex-prompt.template.md
```

### レビュー直前（Step 7 実行前）に読む

```
.claude/rules/implementation-review.md
```

### 必要な場合のみ確認

```
.codex/codex-report.schema.json
```

## 実行手順

### Step 1: ユーザー指示を確認する
`$ARGUMENTS` を今回の指示として読む。
- 作るべき画面・修正対象・目的・仮仕様・デザイン希望を把握する
- 不足情報があればユーザーに確認する（推測で補完しない）

### Step 2: Plan をユーザーへ提示する（条件付き）
以下のいずれかに該当する場合のみ Plan を提示して確認を取る。それ以外は Step 3 へ進む。
- 新規画面の追加（Edit scope が広い、または画面構成の判断が必要）
- 指示が複数ファイルにまたがり、方針のズレが生じやすい
- ユーザーが「確認してから進めて」と明示した

Plan 提示の場合は以下を簡潔に示す：
- 対象ファイル / Edit scope
- 主な実装内容の概要

### Step 3: `.codex-prompt.tmp.md` を作成する
`.claude/templates/codex-prompt.template.md` に沿って以下のセクションを埋める。
- Required reading
- Goal
- User instruction summary
- Edit scope
- Implementation requirements
- Must not do
- Acceptance criteria
- Report requirement

### Step 4: `codex exec` を実行する

```
codex exec --skip-git-repo-check -s workspace-write "$(cat .codex-prompt.tmp.md)"
```

- `--skip-git-repo-check`：Git 未初期化のテンプレート整備ワークスペースでも詰まらないようにするため
- `-s workspace-write`：Codex が編集対象ファイルを書き換えられるようにするため

### Step 5: `.codex-report.tmp.json` を確認する
- `status` を確認（completed / blocked / partial）
- `files_changed` で変更ファイルを把握する
- `open_questions` があればユーザーへ報告する

### Step 6: Codex が変更した実ファイルを確認する
レポートだけで判断せず、実装されたファイルを直接 Read して内容を確認すること。

### Step 7: `.claude/rules/implementation-review.md` に沿ってレビューする
8観点でレビューし、OK / 要修正 / 保留 のいずれかで判断する。

### Step 8: ユーザーへ報告する
以下を報告する。
- 実装概要
- 変更ファイル
- レビュー結果（OK / 要修正 / 保留）
- 要修正がある場合はその具体的な内容
- 次に進める状態かどうか

## 失敗時の対応

Codex が `blocked` または `partial` を返した場合：
1. 何が不足・不明だったかを整理する
2. 必要に応じてユーザーに確認する（推測で補完しない）
3. `.codex-prompt.tmp.md` を更新して再度 Step 4 から実行する

## 禁止事項

- ユーザー指示にない要件・画面の追加
- 勝手な顧客確認ポイントの追加
- 業務要件の推測補完
- 本番実装（API・DB・認証・ビジネスロジック）への膨らませ
- Git コマンドの実行（`git status` / `git diff` / `git log` などの読み取り系を含む、Git に関するコマンド全般）
- Codex 実装後の確認で `git diff` を使うこと（実ファイル確認とレポート確認で行う）
- Codex の実装結果をレポートだけで判断すること（必ず実ファイルも確認する）
