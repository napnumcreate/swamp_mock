# 静的モック制作テンプレート

契約前に顧客へ提示する静的画面モックを効率よく制作するための **ClaudeCode + Codex Agent 基盤**です。

## 目的

受託開発の契約前段階で、顧客に完成画面イメージを静的モックとして提示する作業を標準化・効率化します。

## 想定フロー

1. **ユーザー** が ClaudeCode に具体的な制作指示を渡す
   - 作るべき画面、各画面の目的、顧客確認ポイント、仮仕様、デザイン希望 など
2. **ClaudeCode** がユーザー指示を Codex 用実装プロンプトとして整理する
3. **Codex** が HTML/CSS を実装する
4. **ClaudeCode** が実装結果をレビューし、必要に応じて再実装指示を出す

## 現フェーズの状態

**実案件モック実装フェーズ**です。ホストクラブ店内業務システムの静的モックとして、PC管理画面群（ダッシュボード / 勤怠管理 / 給料計算 / アナリティクス / 顧客管理 / ホスト一覧 / データ管理 等）と、モバイル画面群（ホスト向け / 内勤向け）が `docs/` 配下に実装済みです。
画面の追加・修正は `/codex-exec` Command を通じて Codex に委任します。

## ディレクトリ構成

```text
docs/          ← GitHub Pages 公開用の静的モック領域
samples/       ← Pages 非公開の制作参照領域（制作時の見本）
.claude/       ← ClaudeCode 運用ルール・Command・テンプレート
.codex/        ← Codex 設定・レポートスキーマ
```

### `docs/` — 顧客向け公開モック領域

GitHub Pages の公開元は `docs/` 配下です。  
実案件のモック画面はここに作ります。

| パス | 内容 |
|---|---|
| `docs/index.html` | PC管理者向けダッシュボード画面（認証付き）|
| `docs/pages/` | 案件ごとの画面（Codex が実装） |
| `docs/pages/sidemenu/sidemenu.html` | PC画面群の導線（サイドメニュー） |
| `docs/mobile/` | 実案件の mobile モック公開領域 |
| `docs/mobile/pages/` | 実案件の mobile 画面ページ追加領域 |
| `docs/mobile/assets/css/mobile.css` | mobile app-shell 共通スタイル |
| `docs/assets/css/` | 共通 CSS デザインシステム |
| `docs/assets/js/` | モック用の軽量 JS 基盤（認証表現など） |
| `docs/assets/mock/` | mock レコード・options データ置き場 |
| `docs/assets/images/` | 画像素材置き場 |

### `samples/` — 制作参照サンプル領域

GitHub Pages では公開されません（リポジトリが Public の場合は GitHub 上から閲覧可能）。  
Codex や ClaudeCode が実装の参考にするための完成見本置き場です。  
**機密情報・未公開仕様は置かないでください。**

| パス | 内容 |
|---|---|
| `samples/basic-admin/` | BtoB 管理画面の基本完成見本（Dashboard / List / Detail / Form） |
| `samples/auth/` | ログイン画面と auth.js 利用の参考サンプル |
| `samples/mobile-basic/` | mobile モック制作時の参照サンプル（app-shell / bottom nav） |

> 通常の案件モック制作では `samples/` を編集対象にしません。

## 主要ファイルの役割

| ファイル | 役割 |
|---|---|
| `CLAUDE.md` | ClaudeCode が守る入口ルール |
| `AGENTS.md` | Codex が読むプロジェクト指示 |
| `docs/assets/css/` | HTML/CSS デザインシステム（全モックで共有） |
| `docs/mobile/` | 実案件 mobile モックの公開領域 |
| `docs/assets/js/auth.js` | モック用認証表現ユーティリティ（静的モック専用） |
| `docs/assets/mock/` | mock レコード・options の skeleton |
| `samples/basic-admin/` | 管理画面モックの完成見本サンプル |
| `samples/auth/` | 認証表現サンプル（ログイン画面・login.js） |
| `samples/mobile-basic/` | mobile モックの参照サンプル（app-shell・1カラム構成） |
| `.claude/rules/` | ClaudeCode の詳細運用ルール集 |
| `.claude/commands/codex-exec.md` | ユーザーが明示実行する `/codex-exec` Command 定義 |
| `.claude/templates/` | Codex プロンプトのテンプレート |
| `.codex/` | Codex の設定・レポートスキーマ |

## 今後の利用イメージ

```
ユーザー：「ログイン画面と一覧画面を作ってほしい。顧客確認ポイントは〇〇。
           デザインはシンプルなSaaSライクで。」

ユーザー：→ /codex-exec [制作指示] を明示実行
ClaudeCode：→ Codex 用プロンプト（.codex-prompt.tmp.md）を整理・作成
            → codex exec --skip-git-repo-check -s workspace-write を実行
            → 実装結果をレビューしてユーザーに報告
```

## 新規案件 repo 作成時の初期セットアップ（Template Repository 起動手順）

このセクションは **本リポジトリを Template Repository として複製し、新規案件を始める場合の手順** です。本プロジェクト（既に進行中の実案件）では既に完了しているため、参考情報として残しています。

1. **GitHub Pages の公開元を `docs/` に設定する**（Settings → Pages → Source: `docs/`）
2. **人間が作る画面・目的・確認ポイント・仮仕様を整理する**
3. **ClaudeCode に `/codex-exec [制作指示]` を明示実行する**
4. **ClaudeCode が Codex 用実装プロンプトを作成し、Codex が `docs/pages/` に HTML/CSS を実装する**
5. **ClaudeCode が実装結果をレビューし、必要に応じて再指示する**
6. **`docs/pages/sidemenu/sidemenu.html` または `docs/mobile/pages/footer/footer-host.html` / `footer-staff.html` に生成ページへの導線（リンク）を追加する**（新規画面の場合）
7. **GitHub Pages の URL を顧客へ共有する**

### 顧客共有導線について

- 本プロジェクトでは `docs/index.html` は **PC管理者向けダッシュボード画面**（認証付き）として機能する
- PC画面群への導線は `docs/pages/sidemenu/sidemenu.html`（サイドメニュー）に集約されている
- モバイル画面群への導線は `docs/mobile/pages/footer/footer-host.html` / `footer-staff.html`（ロール別フッター）が担う
- ルート URL（`https://<org>.github.io/<repo>/`）を顧客へ共有する前に、未認証時のログイン誘導が機能するか確認する
- 個別ページ URL（`docs/pages/login.html` 等）を直接渡す場合も、共有するURLを明示的に確認する

### GitHub Pages 公開前の確認

- 公開対象は **`docs/` 配下のみ**（GitHub Pages の設定で `docs/` を選択）
- **`samples/` は Pages 公開対象ではない**（リポジトリが Public の場合は GitHub 上から閲覧可能）
- Public repo の場合、`samples/` に機密情報・未公開仕様を置かない

## ローカル確認（Docker）

GitHub Pages への公開前に、Docker でローカル環境から `docs/` の内容を確認できます。

```bash
# 起動（初回・Dockerfile 変更時は --build）
docker compose up --build

# 確認URL
http://localhost:3001

# 停止
docker compose down
```

> Docker / Docker Compose がインストールされている環境が必要です。  
> これは GitHub Pages の代替ではなく、**公開前のローカル確認用途**です。

## 運用方針

- **Agent に Git 操作をさせない**。commit・push は人間が行う。
- ClaudeCode は要件を考案せず、ユーザー指示の整理役に徹する。
- Codex は指示範囲内の実装のみ行い、仕様補完は行わない。
- JS を使う場合も、本番機能実装ではなく**画面確認用の最小表現**に留める。
- mobile モックが必要な案件では `docs/mobile/` を実装対象にできる。desktop のみの案件では無理に mobile 領域を触らない。
