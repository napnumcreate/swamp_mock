# Goal

<!-- この実装で達成したいことを 1〜2 文で書く。
例：「ログイン画面と一覧画面の静的 HTML モックを新規作成し、顧客への提示用として使えるクオリティにする。」 -->

# User instruction summary

<!-- ユーザーが ClaudeCode に伝えた指示の要点を原文に忠実にまとめる。
ClaudeCode が解釈・補完した内容は含めない。
例：
- 作る画面：ログイン画面、ユーザー一覧画面
- 目的：契約前の顧客確認用
- 顧客確認ポイント：「ナビゲーションの位置」「テーブルの列数」
- 仮仕様：会社名は「株式会社サンプル」、ユーザー数は3件のダミー
- デザイン：シンプルなSaaS風、ブルー系 -->

# Required reading

<!-- 実装前に Codex が読むべきファイルを列挙する。最小限にすること。
例：
- AGENTS.md
- （対象画面が既存ファイルを修正する場合はそのファイルパス）
- （レイアウト・表現の参考になる場合のみ）samples/basic-admin/pages/dashboard.html など

不要なファイルを含めない。広範囲な探索を Codex にさせない。
サンプルを読ませる場合も、必要な画面・必要な CSS のみ列挙すること。
認証付き mock を作る場合は `docs/assets/js/auth.js` や `samples/auth/` を必要に応じて列挙する。
mock データを使う場合は `docs/assets/mock/data.js` や `docs/assets/mock/options.js` を必要に応じて列挙する。
領域固有のファイル（Docker / mobile 等）は、必要な場合のみ最小限列挙すること。 -->

# Edit scope

<!-- 変更してよいファイル・ディレクトリを明示する。
ここに記載のないファイルは変更禁止。
例（通常案件）：
- 新規作成：`docs/pages/login.html`、`docs/pages/user-list.html`
- 変更可：`docs/assets/css/` 配下（既存スタイルで足りない場合のみ）
- 変更禁止：`samples/` 配下のすべてのファイル
- 変更禁止：上記以外のすべてのファイル

`samples/` を編集対象に含めるのは、ユーザーがサンプル改善を明示した場合のみ。 -->

# Implementation requirements

<!-- 実装すべき内容を具体的に列挙する。
各画面・各要素について「何を・どのように」を書く。
例：
- login.html：メールアドレス入力欄、パスワード入力欄、ログインボタンを配置
- user-list.html：ヘッダーナビ（ロゴ・メニュー）、ユーザー一覧テーブル（3件のダミーデータ）
- style.css：共通スタイル（フォント・カラー・ボタン）
- JavaScript は使用しない -->

# Must not do

<!-- 実装してはいけないことを明示する。
例：
- JavaScript の追加
- API 通信・フォーム送信処理
- 認証・セッション処理
- Edit scope 外のファイル変更
- Git 操作
- ユーザー指示にない画面・機能の追加 -->

# Acceptance criteria

<!-- レビュー時に確認する完了基準を列挙する。
例：
- login.html をブラウザで開いてログインフォームが表示される
- user-list.html をブラウザで開いて一覧テーブルが3件表示される
- 静的ファイルのみで動作する（サーバー不要）
- JavaScript エラーが発生しない
- `docs/index.html` を更新する場合は `.no-pages-note` プレースホルダーが実リンクに置き換えられていること -->

# Report requirement

実装完了後、必ず `.codex-report.tmp.json` を作成すること。

- スキーマは `.codex/codex-report.schema.json` に従うこと
- `status` は `completed` / `blocked` / `partial` のいずれかを設定する
- `files_changed` には変更・作成したファイルのパスを列挙する
- `open_questions` には判断できなかった点・ユーザーへの確認事項を記載する
