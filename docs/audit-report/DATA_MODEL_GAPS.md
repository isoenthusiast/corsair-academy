# Data Model Gaps — Corsair Academy Audit

Comparison of [prisma/schema.prisma](../../corsair-app/prisma/schema.prisma) against the documented model in [App Design](../Corsair%20Academy%20App%20Design.md) and [Design Philosophy](../Corsair%20Academy%20Design%20Philosophy.md).

---

## Missing Models

| Model | Documented In | Severity | Notes |
|-------|--------------|----------|-------|
| `EconomySettings` | App Design §2 (economy tuning) | **Critical** | No model to persist crown rates, shop prices, upgrade costs, or rank XP thresholds. |
| `SystemSetting` | App Design §2 (feature flags, maintenance mode) | **High** | No model to persist app identity, maintenance mode, or feature flags. |

---

## Present but Underutilized Models

| Model | Fields | Status | Notes |
|-------|--------|--------|-------|
| `DailyChestClaim` | `userId`, `streakDay`, `chestType`, `rewardSummary`, `claimedAt` | Unused | Model exists but never read/written in app. |
| `AuditLog` | `userId`, `action`, `targetId`, `details`, `ipAddress`, `createdAt` | Unused | No writes found. |
| `LoginHistory` | `userId`, `ipAddress`, `userAgent`, `success`, `createdAt` | Unused | No writes found. |
| `TrialVersion` | Full snapshot fields | Partial | Written on trial edit; no read/rollback API or UI. |

---

## Enum Inconsistencies

| Enum | Documented Values | Schema Values | Severity | Notes |
|------|-------------------|---------------|----------|-------|
| `VoyageStatus` | `Draft, Published, Deprecated` | Schema enum: `Locked, Available, InProgress, Completed, Mastered` (used by `UserVoyageProgress.status`); `Voyage.status` is a plain `String` default `"Draft"`. | **High** | Two different status concepts conflated under one name in docs. |
| `Role` | `Student, Teacher, Parent, Admin` | ✅ Matches | — | Good. |
| `TrialType` | `multi_choice, fill_blank, puzzle, open_ended` | ✅ Matches | — | Good. |
| `KanbanType` | `FlaggedTrial, Assignment, AITrial, SupportTicket, Task` | ✅ Matches | — | Good. |
| `KanbanScope` | `Class, Trial, Admin` | ✅ Matches | — | Good. |
| `KanbanStatus` | `Backlog, InProgress, Done, Archive` | ✅ Matches | — | Good. |
| `Priority` | `Low, Medium, High` | ✅ Matches | — | Good. |
| `AIContextFeature` | `trials, voyages, seas, kanban, announcements` | ✅ Matches | — | Good. |
| `SeaCharmType` | `whisper_scroll, storm_pass, fortune_wind, anchor_charm` | ✅ Matches | — | Good. |
| `AchievementType` | `streak, mastery, speed, exploration, social` | ✅ Matches | — | Good. |
| `BadgeRarity` | `Common, Uncommon, Rare, Epic, Legendary` | ✅ Matches | — | Good. |

---

## Field-Level Gaps

| Model | Field | Status | Notes |
|-------|-------|--------|-------|
| `User` | `status` | ✅ Present | Not enforced at login. |
| `User` | `mustChangePassword` | ✅ Present | Not enforced at login. |
| `User` | `deletedAt` | ✅ Present | Not enforced at login. |
| `User` | `totalPoints` | Inconsistent | Docs mention `User.totalPoints`; schema derives from `PointTransaction`. |
| `Voyage` | `captainGauntlet` | ✅ Present | Used. |
| `Voyage` | `requiredVoyageId` | ✅ Present | Schema only; map ignores it. |
| `Voyage` | `branchParentId`, `branchLabel` | ✅ Present | Schema only; no UI/logic. |
| `Voyage` | `abTestGroup` | ✅ Present | Unused. |
| `Voyage` | `status` | ⚠️ | Plain `String`, not enum. Should probably be enum `Draft/Published/Deprecated`. |
| `Trial` | `flagCount` | ✅ Present | No API/UI to increment. |
| `Trial` | `aiGenerated` | ✅ Present | Used in generation. |
| `Streak` | `streakProtection` | ✅ Present | Grace-period logic not implemented. |

---

## Unique Constraints

Most junction tables use appropriate `@@unique` constraints:
- `@@unique([classId, teacherId])`
- `@@unique([studentId, classId])`
- `@@unique([studentId, parentId])`
- `@@unique([userId, achievementId])`
- `@@unique([userId, upgradeId])`
- `@@unique([userId, voyageId])`
- `@@unique([userId, type])` (SeaCharm)
- `@@unique([userId, streakDay])` (DailyChestClaim)
- `@@unique([bundleId, voyageId])`

Single-column unique constraints:
- `User.username @unique` ✅
- `Sea.name @unique` ✅ (acceptable for reference data)
- `InviteLink.token @unique` ✅

No multi-tenant/company-scoped composite unique issues detected in this schema (companyId not present in Corsair Academy).

---

## Recommendations

1. **Add `EconomySettings` model** with a single row or key-value structure to persist crown rate, shop prices, upgrade costs, and rank XP thresholds.
2. **Add `SystemSetting` model** for app name, maintenance mode, and feature flags.
3. **Convert `Voyage.status` to an enum** matching the documented `Draft/Published/Deprecated` lifecycle. Rename `UserVoyageProgress.status` enum or clarify naming to avoid confusion.
4. **Start writing `AuditLog` and `LoginHistory`** records, especially for admin actions, impersonation, and authentication events.
5. **Implement `DailyChestClaim` reads/writes** when streak milestones are reached.
6. **Remove or use unused fields** (`abTestGroup`, `branchParentId` if branching not planned) to reduce schema noise.
