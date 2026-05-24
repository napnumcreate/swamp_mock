# samples/

このディレクトリは **GitHub Pages で公開する顧客向け領域ではありません**。

Codex や ClaudeCode が静的モック制作時に参考にする **完成見本の置き場** です。

## 用途

- 実案件でモックを作る際の「レイアウト・表現・デザイン方針」の参照用
- Codex が `docs/` 配下へ実装する際の参考資料として使う

## 運用ルール

| ルール | 内容 |
|---|---|
| 実案件の実装先 | `docs/` に作る。通常は `samples/` を変更しない |
| 編集禁止条件 | ユーザーから明示的な指示がない限り `samples/` は変更禁止 |
| Codex の参照 | 実装時に参考として読んでよい（丸ごとコピーは禁止） |
| CSS | `docs/assets/css/` の CSS を相対パスで参照する。`samples/` 内に CSS を置かない |

JS を伴うモックを実装する場合、`auth/` を参考にできる。ただし `auth/` は認証表現のサンプルであり、業務ロジックのサンプルではない。

## 閲覧可能範囲について

このディレクトリは GitHub Pages では公開されません。
ただし、リポジトリが Public の場合は GitHub 上からは閲覧可能です。
**機密情報・未公開仕様は置かないでください。**

## 収録サンプル

| ディレクトリ | 内容 |
|---|---|
| `basic-admin/` | BtoB 管理画面の基本完成見本（Dashboard / List / Detail / Form） |
| `auth/` | ログイン画面・認証後サンプル（`authed.html`）・`auth.js`（requireAuth / logout）利用例（他サンプルに依存せず完結） |
| `mobile-basic/` | mobile app-shell / bottom nav / 1カラム画面構成の参考（`basic-admin/`・`auth/` とは独立したサンプル） |
