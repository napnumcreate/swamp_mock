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
