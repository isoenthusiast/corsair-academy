# Feature Gaps — Corsair Academy Audit

Features described in [Design Philosophy](../Corsair%20Academy%20Design%20Philosophy.md) or [App Design](../Corsair%20Academy%20App%20Design.md) that are missing or incomplete in the as-built app.

---

## Critical

| # | Feature | Evidence | Impact |
|---|---------|----------|--------|
| C1 | **Economy persistence** | [src/app/api/admin/economy/route.ts](../../corsair-app/src/app/api/admin/economy/route.ts) logs settings but does not persist. UI uses hardcoded `ECONOMY_DEFAULTS`. | Admin economy panel is non-functional. Crown rates, shop prices, and rank XP cannot be tuned. |
| C2 | **System settings persistence** | [src/app/api/admin/settings/route.ts](../../corsair-app/src/app/api/admin/settings/route.ts) logs only. No `SystemSetting` model. | Maintenance mode and feature flags cannot be toggled. |
| C3 | **Account status enforcement on login** | [src/lib/auth.ts](../../corsair-app/src/lib/auth.ts) returns user without checking `status` or `deletedAt`. | Inactive, suspended, and soft-deleted users can authenticate. |
| C4 | **Forced password change on first login** | `mustChangePassword` field exists on `User` but is never read. No `/change-password` page. | New invite users keep temp passwords indefinitely. |

---

## High

| # | Feature | Evidence | Impact |
|---|---------|----------|--------|
| H1 | **Daily Streak Chests** | `DailyChestClaim` model exists but no UI/API. Streak display only shows day count. | Core retention mechanic from Philosophy §1 is absent. |
| H2 | **Sea Charm gameplay effects** | [tavern/page.tsx](../../corsair-app/src/app/tavern/page.tsx) lists items; [TrialPlayer.tsx](../../corsair-app/src/app/voyage/[id]/TrialPlayer.tsx) never consumes charms. | Charms are collectible but useless. Fortune Wind description even says "Double XP" instead of crowns. |
| H3 | **Ship Upgrade gameplay effects** | [ship/page.tsx](../../corsair-app/src/app/ship/page.tsx) lists upgrades; trial/complete logic ignores them. | Upgrades are cosmetic purchases only. |
| H4 | **Voyage branching & prerequisites** | `Voyage.requiredVoyageId`, `branchParentId`, `branchLabel` exist in schema but [map/page.tsx](../../corsair-app/src/app/map/page.tsx) locks by array index. | Documented branching curriculum cannot be expressed in the student UI. |
| H5 | **Client-supplied userId in gameplay APIs** | `/api/trials/attempt`, `/api/shop/buy`, `/api/shop/buy-upgrade` read `userId` from body/form. | Horizontal privilege escalation: users can act as other users. |

---

## Medium

| # | Feature | Evidence | Impact |
|---|---------|----------|--------|
| M1 | **Achievement system beyond first two** | Only `first-steps` and `getting-started` are awarded in [api/voyages/complete/route.ts](../../corsair-app/src/app/api/voyages/complete/route.ts). | 13 seeded achievements are unreachable. |
| M2 | **Trial versioning rollback/timeline** | [api/admin/trials/update/route.ts](../../corsair-app/src/app/api/admin/trials/update/route.ts) creates `TrialVersion`, but no GET/rollback endpoint or UI. | Admins cannot view history or revert changes. |
| M3 | **Student trial flagging** | `Trial.flagCount` exists but no student UI or API to increment it. | Moderation queue has no source of flagged trials. |
| M4 | **Auto-generated Kanban cards** | [KanbanBoard.tsx](../../corsair-app/src/app/admin/kanban/page.tsx) only allows manual Task creation. | `FlaggedTrial`, `Assignment`, `AITrial` card types never spawn automatically. |
| M5 | **Teacher assignment creation** | `/class/[id]/page.tsx` likely read-only; only admin template-apply creates assignments. | Teachers cannot assign voyages to their own classes. |
| M6 | **Teacher announcement creation** | Announcements read-only on class page; admin creates system announcements only. | Teachers cannot post class announcements. |
| M7 | **Audit logging** | `AuditLog` model exists but no writes found in source. | Admin actions are not traceable. |
| M8 | **Login history** | `LoginHistory` model exists but no writes found. | No brute-force detection or security analytics. |
| M9 | **AIContext admin viewer** | [api/admin/ai-context/route.ts](../../corsair-app/src/app/api/admin/ai-context/route.ts) exists but no page browses transcripts. | AI conversations are stored but not reviewable. |
| M10 | **Bulk CSV user import** | Mentioned in [TEST_PLAN_USERS.md](../test-plans/TEST_PLAN_USERS.md); no implementation. | Scaling user creation requires manual entry. |
| M11 | **Streak protection grace period** | `Streak.streakProtection` field exists but logic only resets streak on gap >1 day. | Documented 2-day grace period not implemented. |
| M12 | **Captain's Gauntlet 2× rewards** | Complete API adds flat 100 bonus, but trial points are not doubled. | Gauntlets lack the documented reward multiplier. |

---

## Low

| # | Feature | Evidence | Impact |
|---|---------|----------|--------|
| L1 | **AI budget/cost management** | `TEST_PLAN_AI.md` AIT6 marked NOT BUILT. | No spending caps or throttling. |
| L2 | **Teacher grading queue / AI grade override** | `TEST_PLAN_AI.md` AIT3.3-3.7 not built. | AI grades are final. |
| L3 | **Content hash / 30-day repeat avoidance** | `TEST_PLAN_AI.md` AIT1.8-1.9 not built. | Students may see repeated AI-generated trials. |
| L4 | **Open-ended "no failure" philosophy** | [TrialPlayer.tsx](../../corsair-app/src/app/voyage/[id]/TrialPlayer.tsx) can mark `correct=false` for open-ended answers. | Contradicts Philosophy §2 "no failure state." |
| L5 | **Adaptive difficulty per-user** | [api/adaptive/check/route.ts](../../corsair-app/src/app/api/adaptive/check/route.ts) mutates global `Voyage.difficulty`. | One student's performance changes difficulty for everyone. |
| L6 | **Voyage status enum (`Draft/Published/Deprecated`)** | `Voyage.status` is a `String` defaulting to `"Draft"`; `UserVoyageProgress` uses `VoyageStatus` enum (`Locked/Available/...`). | Confused status model; docs say voyages have `Draft/Published/Deprecated`. |

---

## Summary Count

- Critical: 4
- High: 5
- Medium: 12
- Low: 6

**Total: 27 feature gaps**
