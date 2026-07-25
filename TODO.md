# 🏴‍☠️ Corsair Academy — Master TODO

**Last Updated:** 2026-07-26

---

## Phase 3 — Admin Polish (current)
>
> Quick wins: fill remaining UI gaps. No dependencies between tasks.

- [x] **A1.** `/admin/users/new` — Create new user form (linked from users list)
- [x] **A3.** System Announcements — Create/manage system-wide announcements UI
- [x] **A4.** Invite Link Generation — Generate/view/revoke invite links UI (API exists)
- [x] **A2.** Student Impersonation — "Log in as student" with HMAC token + banner

## Phase 4 — Validate
>
> Smoke-test everything before documenting and shipping.

- [ ] **E1.** End-to-end: all admin pages render without errors
- [ ] **E2.** Role-based access: verify middleware redirects for all 4 roles
- [ ] **E3.** Invite flow: generate → accept → verify student-parent linking
- [ ] **E4.** Voyage flow: play trial → XP/crowns awarded → streak updates

## Phase 5 — Document
>
> Catch up docs while implementation is fresh, right before deploy.

- [ ] **D1.** Update `APP_DESIGN.md` — add Phase 2 routes + API routes
- [ ] **D2.** Update route map table with all 25+ pages
- [ ] **D3.** Register lessons learned from Phase 2 build
- [ ] **D4.** Review & update PHILOSOPHY docs for accuracy

## Phase 6 — Deploy
>
> Railway auth has failed before — may need troubleshooting.

- [ ] **C1.** Railway CLI login (`railway login` or `$env:RAILWAY_TOKEN`)
- [ ] **C2.** Railway project link (`railway link`)
- [ ] **C3.** Provision production PostgreSQL on Railway
- [ ] **C4.** Set production environment variables
- [ ] **C5.** First successful `railway up` deploy
- [ ] **C6.** Verify all pages on production URL

## Phase 7 — AI Features
>
> Largest scope. Trial gen first (content), then grading, then tutor, then smart features.

- [ ] **B1.** AI Trial Generation — Auto-generate trials via DeepSeek v4-pro
- [ ] **B3.** AI Grading — Auto-grade open-ended trial responses
- [ ] **B2.** AI Tutor Chat — Real-time tutoring sidebar with DeepSeek v4-flash
- [ ] **B4.** Adaptive Difficulty — Adjust difficulty based on performance history
- [ ] **B5.** AI Personalization — Personalized learning paths & recommendations

---

## Completed

### Phase 1 — Core Platform

- [x] Auth: Login, 4-role middleware, signout, JWT session
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
- [x] Admin Economy: crown rates, shop prices, upgrade costs, rank thresholds
- [x] Admin Parents: student-parent linking with 2-parent limit
- [x] Admin Analytics: stats, per-sea completion bars, recent activity
- [x] Admin Moderation: flagged trial queue with approve/remove
- [x] Admin Settings: app identity, maintenance mode, feature flags
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
