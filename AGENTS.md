# AGENTS.md

このファイルは **Codex** が読むプロジェクト指示です。

## このプロジェクトの目的

契約前の静的画面モック制作に使うリポジトリです。
Codex は ClaudeCode が作成した実装指示プロンプト（`.codex-prompt.tmp.md`）に従って実装を行います。

## ディレクトリの役割

| ディレクトリ | 役割 |
|---|---|
| `docs/` | 顧客向け公開モックを作る場所（GitHub Pages 公開元）|
| `docs/assets/css/` | 共通 CSS デザインシステム（全モックで共有） |
| `docs/assets/js/` | モック用の軽量 JS 基盤（認証表現など） |
| `docs/assets/mock/` | mock レコード・options データ置き場 |
| `docs/pages/` | 案件ごとの画面ファイルを配置する |
| `docs/mobile/` | 実案件 mobile モックの公開領域 |
| `docker/` | ローカル確認用の Docker / nginx 設定（画面実装では不要） |
| `samples/` | 制作時の参照サンプル置き場（Pages 非公開） |
| `samples/basic-admin/` | BtoB 管理画面の完成見本（Dashboard / List / Detail / Form） |
| `samples/auth/` | 認証表現の参考サンプル |
| `samples/mobile-basic/` | mobile モックの参照サンプル（app-shell・bottom nav） |

## `docs/` と `samples/` の運用ルール

- **実案件モックの実装先は原則 `docs/` 配下**
  - 新規ページは `docs/pages/` に作成する
  - 共通スタイルは `docs/assets/css/` の既存 CSS を優先的に活用する
- **`samples/` は参照用であり、ユーザーから明示指定がない限り編集禁止**
  - 必要に応じて `samples/basic-admin/` を参照してよい
  - ただし、サンプルを無思考に丸ごとコピーせず、ユーザー指示に合わせて `docs/` 配下へ再構成する

## 実行時の基本手順

実行開始時、まず `.codex-prompt.tmp.md` を読むこと。これが今回タスクの一次指示であり、すべての作業はその内容に従う。

## Codex の行動原則

### やること
- ClaudeCode が作成した実装指示を忠実に実装する
- 指定された Edit scope の範囲内のみ変更する
- 静的モックとして必要な HTML/CSS の範囲内で実装する
- 認証表現やデータ表示が必要な場合、`docs/assets/js/` と `docs/assets/mock/` の既存ファイルを優先活用する
- mobile モック制作が必要な場合、`docs/mobile/` を実装対象にできる
- 実装完了後は `.codex-report.tmp.json` を作成し、`.codex/codex-report.schema.json` に従った JSON レポートを返す

### やってはいけないこと
- ユーザー指示にない要件の追加
- 勝手な仕様の補完・推測
- Edit scope 外のファイル変更
- API 通信・DB 接続・認証処理・本番機能の実装
- JavaScript の追加（明示的な指示がない限り）
- JS を本番実装レベルに膨らませる（静的モックに必要な最小限に留める）
- Docker / nginx を本番インフラ用途に膨らませる
- Git コマンドの実行（`git status` / `git diff` / `git log` などの読み取り系を含む、Git に関するコマンド全般）。Git 確認が必要に見える場合は、自分で実行せずレポート上でユーザー確認事項として返す
- `.codex-prompt.tmp.md` に記載がない画面・機能の追加

## `docs/index.html` の導線ルール

- 実案件で複数ページのモックを作る場合、原則として `docs/index.html` に主要ページへのリンクを追加する
- ただし、ユーザーが「個別ページURLを直接渡す」「index は更新しない」と明示した場合はその指示を優先する
- `docs/index.html` は顧客が最初に見る可能性があるため、内部運用の説明文・ツール名などを残さない
- `docs/index.html` または `docs/mobile/index.html` に実案件ページへの導線を追加する場合、初期プレースホルダー（`.no-pages-note`）は残さず、実リンク表示に置き換えること

## レポート要件

実装完了後、必ず `.codex-report.tmp.json` を作成すること。
スキーマは `.codex/codex-report.schema.json` に従うこと。
