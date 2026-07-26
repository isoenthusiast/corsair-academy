# 🏴‍☠️ Corsair Academy — Master TODO

**Last Updated:** 2026-07-27

---

## Phase 8 — Kanban Board ✅
>
> Admiral's task board for tracking work across the platform.

- [x] **K1.** Prisma schema — `KanbanCard` model + `KanbanType`, `KanbanStatus`, `Priority` enums
- [x] **K2.** API — GET (role-scoped, auto-archive 30d) + POST create manual Task + PATCH drag/status
- [x] **K3.** Page — `/admin/kanban` server component + `KanbanBoard` client component
- [x] **K4.** Drag-and-drop — native HTML5 DnD across 4 columns (Backlog→InProgress→Done→Archive)
- [x] **K5.** 5-card pagination per column with "Show More"
- [x] **K6.** Nav card on admin dashboard + test plan (`TEST_PLAN_KANBAN.md`)
- [x] **K7.** Docs updated — `APP_DESIGN.md` v2.8.0 + `ADMIN_PHILOSOPHY.md` + lessons
- [x] **K8.** Commit & push — `feat(kanban): add Kanban Board with drag-and-drop, 4 columns, role-scoped API`

## Phase 3 — Admin Polish ✅
>
> Quick wins: fill remaining UI gaps. No dependencies between tasks.

- [x] **A1.** `/admin/users/new` — Create new user form (linked from users list)
- [x] **A3.** System Announcements — Create/manage system-wide announcements UI
- [x] **A4.** Invite Link Generation — Generate/view/revoke invite links UI (API exists)
- [x] **A2.** Student Impersonation — "Log in as student" with HMAC token + banner

## Phase 9 — Audit Remediation ✅
>
> Sequenced backlog from the 2026-07-26 audit. Complete each block before starting the next.

### Block 1 — Pre-Deploy Hardening ✅

- [x] **H1.** Remove `npx tsx prisma/seed.ts` from `railway.toml` preDeployCommand
- [x] **H2.** Enforce account status in `auth.ts` — reject `status !== "Active"` or `deletedAt !== null`
- [x] **H3.** Add forced password change flow — `/change-password` page + `mustChangePassword` enforcement
- [x] **H4.** Use session `userId` in `/api/trials/attempt` (remove body `userId`)
- [x] **H5.** Use session `userId` in `/api/shop/buy` (remove form `userId`)
- [x] **H6.** Use session `userId` in `/api/shop/buy-upgrade` (remove form `userId`)
- [x] **H7.** Use session `userId` in `/api/voyages/complete` (remove body `userId`)
- [x] **H8.** Add admin auth guards to `/api/admin/economy` and `/api/admin/settings`
- [x] **H9.** Prevent admin self-lockout in `/api/admin/users/update`
- [x] **H10.** Fix `/class/page.tsx` hardcoded redirect (use `/` or render Link)
- [x] **H11.** Run `npm run build` locally and fix all TS errors
- [x] **H12.** Add `scripts/test-security.ts` — verify userId isolation + status enforcement

> **Validation:** `npm run build` passed; `npx tsx scripts/test-security.ts` = 9/9 ✅

### Block 2 — Core Economy & Settings ✅

- [x] **EC1.** Add `EconomySettings` model to Prisma schema
- [x] **EC2.** Persist economy changes in `/api/admin/economy`
- [x] **EC3.** Load economy settings in admin economy page + reward APIs
- [x] **EC4.** Add `SystemSetting` model to Prisma schema
- [x] **EC5.** Persist system settings in `/api/admin/settings`
- [x] **EC6.** Enforce maintenance mode + feature flags in root layout
- [x] **EC7.** Single source of truth for rank thresholds (use `EconomySettings`)

> **Validation:** `npm run build` passed; `npx tsx scripts/test-security.ts` = 9/9 ✅

### Block 3 — Gameplay Effects ✅

- [x] **G1.** Implement sea charm consumption in trial player
- [x] **G2.** Whisper Scroll — reveal hint without skull penalty
- [x] **G3.** Storm Pass — skip trial (no skulls, no penalty)
- [x] **G4.** Fortune Wind — double crowns from next trial (fix description from XP)
- [x] **G5.** Anchor Charm — freeze streak for 24h
- [x] **G6.** Implement ship upgrade effects in trial/complete reward APIs
- [x] **G7.** Captain's Gauntlet — 2× trial rewards
- [x] **G8.** Daily streak chest claim UI + API

> **Validation:** `npm run build` passed; `npx tsx scripts/test-security.ts` = 9/9 ✅

### Block 4 — Curriculum & Admin Polish ✅

- [x] **C1.** Implement voyage branching/prerequisites on `/map` using `requiredVoyageId`
- [x] **C2.** Convert `Voyage.status` to `VoyageLifecycle` enum (`Draft/Published/Deprecated`)
- [x] **C3.** Trial version timeline + rollback API
- [x] **C4.** Teacher assignment creation UI on `/class/[id]`
- [x] **C5.** Teacher announcement creation UI on `/class/[id]`
- [x] **C6.** Student trial flagging button + `/api/trials/flag`
- [x] **C7.** Auto-generate Kanban cards for FlaggedTrial, Assignment, AITrial

> **Validation:** `npm run build` passed; `npx tsx scripts/test-security.ts` = 9/9 ✅

### Block 5 — Security, Observability & AI ✅

- [x] **S1.** Write `AuditLog` records for admin actions + impersonation
- [x] **S2.** Write `LoginHistory` records on login success/failure
- [x] **S3.** Add rate limiting to login and AI endpoints
- [x] **S4.** Store per-user adaptive difficulty (stop mutating `Voyage.difficulty`)
- [x] **S5.** Add AI budget/cost tracking model + usage logging
- [x] **S6.** Include `open_ended` in AI trial generation prompt

> **Validation:** `npm run build` passed; `npx tsx scripts/test-security.ts` = 9/9 ✅

### Block 6 — Testing & Documentation ✅

- [x] **T1.** Create `scripts/test-admin.ts` — economy/settings persistence
- [x] **T2.** Expand `scripts/test-phase4.ts` or add `scripts/test-security.ts`
- [x] **T3.** Update `TEST_PLAN_AI.md` execution logs
- [x] **T4.** Deprecate or delete `00 Ref/APP_DESIGN.md`
- [x] **T5.** Fix `VoyageStatus` enum documentation
- [x] **T6.** Rename `00 Ref/` folder (space breaks Nixpacks) → `docs/design-ref/`
- [x] **T7.** Rename `corsair-app/package.json` name to `"corsair-app"`

> **Validation:** `npm run build` passed; `npx tsx scripts/test-security.ts` = 9/9 ✅

---

## ✅ All Audit Remediation Blocks Complete

**Phase 9 complete.** All 6 audit remediation blocks are done.

- [x] **T8.** Add `docs/audit-report/README.md` future-audit convention note

## Phase 4 — Validate
>
> Smoke-test everything before documenting and shipping.

- [x] **E1.** End-to-end: all admin pages render without errors (14/14 ✅)
- [x] **E2.** Role-based access: verify middleware redirects for all 4 roles (4/4 ✅)
- [x] **E3.** Invite flow: generate → accept → verify student-parent linking (verified ✅)
- [x] **E4.** Voyage flow: play trial → XP/crowns → streak (4/4 ✅)
- [x] **AI Module Tests:** Generation, grading, tutor, adaptive, personalization (6/6 ✅)

## Phase 5 — Document
>
> Catch up docs while implementation is fresh, right before deploy.

- [x] **D1.** Update `APP_DESIGN.md` — v2.7.0 with deploy URL, all routes + APIs
- [x] **D2.** Update route map table — 28 pages, 36 API routes categorized
- [x] **D3.** Register lessons learned — 31 lessons in ProjectLessonLearnt.md
- [x] **D4.** Review & update PHILOSOPHY docs — all 7 docs at v2.6.0+, Phase 3 features added

## Phase 6 — Deploy (complete! 🚀)
>
> App is live at <https://corsair-academy-production.up.railway.app>

- [x] **C1.** Railway CLI login (`railway login` — authenticated via browser)
- [x] **C2.** Railway project link (`railway link` → stunning-friendship)
- [x] **C3.** Provision production PostgreSQL on Railway (Postgres Online)
- [x] **C4.** Set production environment variables (DATABASE_URL, AUTH_SECRET, AUTH_URL, DEEPSEEK keys)
- [x] **C5.** First successful `railway up` deploy (Online, auto-deploys from isoenthusiast/corsair-app)
- [x] **C6.** Verify all pages on production URL (login page verified)

## Phase 7 — AI Features- [x] **B1.** AI Trial Generation — DeepSeek v4-pro, GenerateTrialsButton, 3-5 trials at a time

- [x] **B3.** AI Grading — DeepSeek v4-flash grades open-ended, fallback on error
- [x] **B2.** AI Tutor Chat — "Captain Corsair" persona, floating 🦜 chat panel
- [x] **B4.** Adaptive Difficulty — ±0.5 adjustments based on last 3-5 attempts
- [x] **B5.** AI Personalization — RecommendedVoyage card + per-sea progress bars>
>
> Largest scope. Trial gen first (content), then grading, then tutor, then smart features.

- [x] **B1.** AI Trial Generation — Auto-generate trials via DeepSeek v4-pro
- [x] **B3.** AI Grading — Auto-grade open-ended trial responses
- [x] **B2.** AI Tutor Chat — Real-time tutoring sidebar with DeepSeek v4-flash
- [x] **B4.** Adaptive Difficulty — Adjust difficulty based on performance history
- [x] **B5.** AI Personalization — Personalized learning paths & recommendations

---

## Completed

### Phase 1 — Core Platform

- [x] Auth: Login, 4-role middleware, signout, JWT session — status/deletedAt/mustChangePassword enforced (Block 1)
- [x] Student: `/map`, `/voyage/[id]`, `/profile`, `/tavern`, `/ship`
- [x] Teacher: `/class`, `/class/[id]`
- [x] Parent: `/captain`
- [x] Prisma schema v2.1 (30+ models, 6 enums)
- [x] Seed data (6 users, 1 class, 4 seas, 20 voyages, 100 trials)

### Phase 2 — Admin Panel

- [x] Admin Dashboard: `/admin` with stats, recent users, classes
- [x] Admin Users: list + edit + reset password + soft delete/restore
- [x] Admin Classes: list + create + detail (teachers, students, stats)
- [x] Admin Voyages: list grouped by sea + editor + trial editor with version history
- [~] Admin Economy: crown rates, shop prices, upgrade costs, rank thresholds — UI exists, API is stub
- [x] Admin Parents: student-parent linking with 2-parent limit
- [x] Admin Analytics: stats, per-sea completion bars, recent activity
- [x] Admin Moderation: flagged trial queue with approve/remove
- [~] Admin Settings: app identity, maintenance mode, feature flags — UI exists, API is stub
- [x] Admin Templates: curriculum bundles with apply-to-class
- [x] Invite Accept: `/invite/[token]` with name/username/password form
- [x] 24 API routes covering all features
- [x] GitHub repo + conventional commits
- [x] `railway.toml` for deployment

### Phase 3 — Admin Polish

- [x] **A1.** `/admin/users/new` — Create user form with password, role, status, crowns
- [x] **A3.** System Announcements — Admin create/delete UI + map page banner
- [x] **A4.** Invite Links — Admin generate/revoke + CopyButton + acceptance flow
- [x] **A2.** Student Impersonation — HMAC-signed token, ImpersonationBanner, Return to Admiral

---

**Legend:** `[ ]` Not started · `[~]` In progress · `[x]` Complete
