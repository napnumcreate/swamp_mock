---
description: mobile モック制作時の ClaudeCode 方針
paths:
  - "docs/mobile/**"
  - "samples/mobile-basic/**"
---

# mobile モック制作方針

## 利用方針

ユーザー指示に mobile 画面・スマートフォン向け導線・mobile-first な画面確認が含まれる場合、Required reading として以下を候補に含める：

- `docs/mobile/assets/css/mobile.css`
- `samples/mobile-basic/pages/home.html`（app-shell 構成の参考）
- （対象画面が明確な場合は対応するサンプルページ）

mobile 画面が不要な案件では、`docs/mobile/` や mobile sample を無理に読ませない。

## 実装範囲

- mobile 実装の対象は `docs/mobile/` 配下
- mobile 共通スタイルは `docs/mobile/assets/css/mobile.css` を優先活用する
- mobile UI の参考として `samples/mobile-basic/` を必要に応じて参照できる
- 静的モックの範囲を守る（本番機能に膨らませない）

## ロール別カラーテーマ（確定仕様）

モバイル画面はホスト向け・内勤向けでアクセントカラーが異なる。`.mobile-shell` に付与するロール修飾クラスで切り替える。

| ロール | クラス | アクセントカラー |
|---|---|---|
| ホスト向け | `.mobile-shell--host` | パープル `#7C3AED` |
| 内勤向け | `.mobile-shell--staff` | ブルー `#2563EB` |

- CSS 変数（`--color-accent` / `--color-accent-hover` / `--color-accent-light` / `--color-accent-text` / `--color-accent-shadow` / `--color-accent-shadow-hover`）を `.mobile-shell--host` および `.mobile-shell--staff` で上書きする
- この変数を参照している全子要素（ヘッダー・フッター・ボタン等）が自動的にロールカラーで描画される
- ホスト向け画面では `<div class="mobile-shell mobile-shell--host">`, 内勤向けでは `mobile-shell--staff` を付与する

## 共通ヘッダー・ロール別フッター構成（確定仕様）

- **ヘッダー**：`docs/mobile/pages/header/header.html` を全ロール共通で `fetch` する
  - `{{TITLE}}` / `{{TAG_CLASS}}` / `{{TAG_TEXT}}` のプレースホルダをロードJSで差し替える
- **フッター**：ロール別に別ファイルを使用
  - ホスト向け：`docs/mobile/pages/footer/footer-host.html`
  - 内勤向け：`docs/mobile/pages/footer/footer-staff.html`
- `docs/mobile/assets/js/shared-mobile-layout.js` がヘッダー・フッターの fetch・注入・ログアウト処理を担当する

## ログイン後リダイレクト仕様（確定仕様）

`docs/mobile/pages/login.js` はログイン成功後に `attendance-host.html` へ固定遷移する。
ログイン画面にホスト/内勤の選択 UI はない。この動作は仕様通りのため修正提案しない。
