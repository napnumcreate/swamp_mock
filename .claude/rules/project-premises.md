# Project premise

This file defines the premise of this mockup project.
Always refer to it when writing the Codex prompt and during review.

## Premise 1: system overview

This is a static mockup for a ホストクラブ店内業務システム (in-store business system for a host club).
It is intended to be used by actual store staff in their daily work.

## Premise 2: screen list and placement

### Mobile screens (`docs/mobile/pages/`)

| File | Screen | User |
|---|---|---|
| `login.html` | ログイン | Common (ホスト / 内勤) |
| `attendance-host.html` | 勤怠（ホスト向け） | ホストスタッフ |
| `attendance-staff.html` | 勤怠（内勤向け） | 内勤スタッフ |
| `store-status.html` | 店舗状況 | 内勤スタッフ |
| `order.html` | 注文 | 内勤スタッフ |
| `sales.html` | 売上 | ホストスタッフ |
| `customer.html` | 顧客 | 内勤スタッフ |
| `settings-host.html` | 設定（ホスト向け） | ホストスタッフ |
| `settings-staff.html` | 設定（内勤向け） | 内勤スタッフ |

### PC screens (`docs/pages/`)

| File | Screen | User |
|---|---|---|
| `login.html` | ログイン | 管理者 |
| `attendance.html` | 勤怠管理 | 管理者 |
| `salary-calculation.html` | 給料計算 | 管理者 |
| `analytics.html` | アナリティクス | 管理者 |
| `customer-management.html` | 顧客管理 | 管理者 |
| `host-list.html` | ホスト一覧 | 管理者 |
| `data-management.html` | データ管理 | 管理者 |

### Screen notes

- 店舗状況: which table each customer is at, used for tracking and management.
- 注文: drink and food order entry per table.
- 売上: sales and performance view for each ホスト themselves.
- 顧客: customer info reference screen (mobile).
- 設定: app settings for ホスト and 内勤 respectively.
- 給料計算: separate calculations for 内勤 and ホスト.
- 勤怠管理: list of ホスト shifts (PC view).
- アナリティクス: visualization of ホスト sales and performance.
- 顧客管理: customer info management (PC).
- ホスト一覧: roster and profile management of active ホスト.
- データ管理: master data / settings management.

## Premise 3: design direction

- White-based, high-end design.
- Reason: the store is dimly lit, so staff need high contrast on phone and PC.
- Tone: clean, elegant, premium. Avoid heavy decoration; organize information.

### Design application points

- Background is white or light gray.
- Sans-serif fonts for readability.
- Mobile screens use tap-friendly button sizes and spacing.
- PC screens use table / card layouts.

### Accent color system (confirmed spec)

| Section | Accent color | Usage |
|---|---|---|
| PC (`docs/pages/`) | Gold `#C9A84C` | All 管理者-facing screens |
| Mobile ホスト-facing | Purple `#7C3AED` | Applied via `.mobile-shell--host` |
| Mobile 内勤-facing | Blue `#2563EB` | Applied via `.mobile-shell--staff` |

Accent colors are managed by CSS variables (`--color-accent` etc.) and overridden by `.mobile-shell--host` / `.mobile-shell--staff`.
