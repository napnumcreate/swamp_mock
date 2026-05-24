# Codex 委任ワークフロー（原則）

実装委任の実行手順は `.claude/commands/codex-exec.md`（`/codex-exec` Command）が正本です。
このファイルは委任に関する **原則** を定めます。

## 委任の基本原則

- 実装委任の標準入口は `/codex-exec` Command である
- Codex への指示は `.codex-prompt.tmp.md` に一本化する
- Required reading は必要最小限にする（Codex に広範囲な探索をさせない）
- Edit scope を具体的なファイル・ディレクトリで明示する
- 通常案件では `docs/` を編集対象、`samples/` は参照のみとする
- Codex への追加口頭指示は行わない

## プロンプト作成の指針

`.claude/templates/codex-prompt.template.md` を基準にプロンプトを組み立てる。

- `Required reading` は必要な画面・CSS のみ列挙する（全サンプルを毎回読ませない）
- `Edit scope` には `docs/` と `samples/` の区別を明記する
- `Must not do` でスコープ外変更を明示的に禁止する

## 実装後の確認原則

- Codex が返した `.codex-report.tmp.json` と実ファイルの両方を確認する
- レポートだけで判断しない
- `implementation-review.md` の観点に従いレビューする
- 変更内容の確認は Git 差分ではなく実ファイル確認と Codex レポートで行う（`git diff` は使わない）
- Git 操作が必要な場合はユーザーに案内し、自分では実行しない
