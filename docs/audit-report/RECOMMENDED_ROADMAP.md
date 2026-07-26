# Recommended Roadmap — Corsair Academy Audit

Prioritized action plan based on the audit findings. Grouped by phase and severity.

---

## Phase A — Pre-Deploy Hardening (Do Before Next Deploy)

| # | Task | Files | Rationale |
|---|------|-------|-----------|
| A1 | Remove seed from `preDeployCommand` | [corsair-app/railway.toml](../../corsair-app/railway.toml) | Prevents DML on every deploy. Critical lesson from ProjectLessonLearnt. |
| A2 | Enforce account status on login | [src/lib/auth.ts](../../corsair-app/src/lib/auth.ts) | Block inactive/suspended/deleted users. |
| A3 | Add forced password change flow | New `/change-password` page + auth check | New invite users must change temp password. |
| A4 | Derive `userId` from session in gameplay APIs | [api/trials/attempt](../../corsair-app/src/app/api/trials/attempt/route.ts), [api/shop/buy](../../corsair-app/src/app/api/shop/buy/route.ts), [api/shop/buy-upgrade](../../corsair-app/src/app/api/shop/buy-upgrade/route.ts), [api/voyages/complete](../../corsair-app/src/app/api/voyages/complete/route.ts) | Closes horizontal privilege escalation. |
| A5 | Add auth checks to economy/settings APIs | [api/admin/economy](../../corsair-app/src/app/api/admin/economy/route.ts), [api/admin/settings](../../corsair-app/src/app/api/admin/settings/route.ts) | Even stubs should be admin-only. |
| A6 | Prevent admin self-lockout | [api/admin/users/update](../../corsair-app/src/app/api/admin/users/update/route.ts) | Don't allow demoting the last admin. |
| A7 | Fix `/class/page.tsx` hardcoded redirect | [src/app/class/page.tsx](../../corsair-app/src/app/class/page.tsx) | Follow middleware-first routing rule. |
| A8 | Run `npm run build` locally and fix TS errors | Full app | Turbopack misses type errors that Railway will reject. |

---

## Phase B — Core Gameplay (Next Sprint)

| # | Task | Files | Rationale |
|---|------|-------|-----------|
| B1 | Add `EconomySettings` model + persist economy changes | [prisma/schema.prisma](../../corsair-app/prisma/schema.prisma), [api/admin/economy](../../corsair-app/src/app/api/admin/economy/route.ts), [admin/economy page](../../corsair-app/src/app/admin/economy/page.tsx) | Make economy panel functional. |
| B2 | Add `SystemSetting` model + persist settings | [prisma/schema.prisma](../../corsair-app/prisma/schema.prisma), [api/admin/settings](../../corsair-app/src/app/api/admin/settings/route.ts), [admin/settings page](../../corsair-app/src/app/admin/settings/page.tsx) | Enable maintenance mode and feature flags. |
| B3 | Implement daily streak chest claim | [prisma/schema.prisma](../../corsair-app/prisma/schema.prisma), [map page](../../corsair-app/src/app/map/page.tsx), [api/trials/attempt](../../corsair-app/src/app/api/trials/attempt/route.ts) | Core retention feature from philosophy. |
| B4 | Apply sea charm effects in trial player | [TrialPlayer.tsx](../../corsair-app/src/app/voyage/[id]/TrialPlayer.tsx), [tavern page](../../corsair-app/src/app/tavern/page.tsx) | Charms currently do nothing. |
| B5 | Apply ship upgrade effects | [api/trials/attempt](../../corsair-app/src/app/api/trials/attempt/route.ts), [api/voyages/complete](../../corsair-app/src/app/api/voyages/complete/route.ts) | Upgrades currently do nothing. |
| B6 | Fix Fortune Wind description | [tavern page](../../corsair-app/src/app/tavern/page.tsx) | Match philosophy: double crowns, not XP. |
| B7 | Implement Captain's Gauntlet 2× rewards | [api/voyages/complete](../../corsair-app/src/app/api/voyages/complete/route.ts), [TrialPlayer](../../corsair-app/src/app/voyage/[id]/TrialPlayer.tsx) | Documented gauntlet bonus. |

---

## Phase C — Curriculum & Admin Polish (Following Sprint)

| # | Task | Files | Rationale |
|---|------|-------|-----------|
| C1 | Implement voyage branching/prerequisites on map | [map page](../../corsair-app/src/app/map/page.tsx), [api/voyages/complete](../../corsair-app/src/app/api/voyages/complete/route.ts) | Use `requiredVoyageId` and `branchParentId`. |
| C2 | Convert `Voyage.status` to enum (`Draft/Published/Deprecated`) | [prisma/schema.prisma](../../corsair-app/prisma/schema.prisma), all voyage queries | Align schema with docs. |
| C3 | Build trial version timeline + rollback UI | [admin/voyages client](../../corsair-app/src/app/admin/voyages/VoyageCurriculumClient.tsx), new API | Complete versioning feature. |
| C4 | Add teacher assignment creation UI | [class/[id] page](../../corsair-app/src/app/class/[id]/page.tsx), new API | Teachers need to assign voyages. |
| C5 | Add teacher announcement creation UI | [class/[id] page](../../corsair-app/src/app/class/[id]/page.tsx), new API | Teachers need class announcements. |
| C6 | Add student trial flagging | [TrialPlayer](../../corsair-app/src/app/voyage/[id]/TrialPlayer.tsx), [api/trials/flag](../../corsair-app/src/app/api) | Source of flagged trials for moderation. |
| C7 | Auto-generate Kanban cards | New hooks in trial flag/assignment/generation flows | Use `FlaggedTrial`, `Assignment`, `AITrial` types. |

---

## Phase D — Security & Observability (Parallel)

| # | Task | Files | Rationale |
|---|------|-------|-----------|
| D1 | Write `AuditLog` records | All admin action APIs | Traceability. |
| D2 | Write `LoginHistory` records | [auth.ts](../../corsair-app/src/lib/auth.ts) | Security analytics + brute-force detection. |
| D3 | Add rate limiting | Middleware or API routes | Protect login and AI endpoints. |
| D4 | Add AI budget/cost tracking | New `AIBudget` model or usage logs | Prevent runaway AI costs. |
| D5 | Add per-user adaptive difficulty | [api/adaptive/check](../../corsair-app/src/app/api/adaptive/check/route.ts) | Don't mutate global voyage difficulty. |

---

## Phase E — Testing & Documentation (Ongoing)

| # | Task | Files | Rationale |
|---|------|-------|-----------|
| E1 | Create `scripts/test-admin.ts` | New | Cover economy/settings once fixed. |
| E2 | Create `scripts/test-security.ts` | New | Cover auth bypass, userId isolation. |
| E3 | Update `TODO.md` | [TODO.md](../../TODO.md) | Reflect actual completion state. |
| E4 | Deprecate or delete `00 Ref/APP_DESIGN.md` | [00 Ref/APP_DESIGN.md](../../00%20Ref/APP_DESIGN.md) | Remove stale reference. |
| E5 | Fix `VoyageStatus` enum docs | [Design Philosophy](../Corsair%20Academy%20Design%20Philosophy.md), [App Design](../Corsair%20Academy%20App%20Design.md) | Align docs with schema. |
| E6 | Rename `00 Ref/` or move contents | [00 Ref/](../../00%20Ref) | Avoid Nixpacks space-in-path issue. |
| E7 | Rename package | [corsair-app/package.json](../../corsair-app/package.json) | Match project branding. |

---

## Suggested Kanban Board Tasks

Add these to `/admin/kanban` to track the roadmap:

1. `[Admin] Remove seed from railway.toml preDeployCommand`
2. `[Security] Enforce user status/deletedAt on login`
3. `[Security] Session-based userId in gameplay APIs`
4. `[Economy] Persist economy settings to DB`
5. `[Settings] Persist system settings to DB`
6. `[Gameplay] Daily streak chest claim`
7. `[Gameplay] Sea charm effects in trial player`
8. `[Gameplay] Ship upgrade effects`
9. `[Curriculum] Voyage branching on map`
10. `[Curriculum] Trial version timeline + rollback`
11. `[Teacher] Assignment creation UI`
12. `[Teacher] Class announcement creation UI`
13. `[Security] Audit log + login history writes`
14. `[Docs] Deprecate 00 Ref/APP_DESIGN.md`
15. `[Tests] Automated admin + security test suites`
