# Corsair Academy — Technical Design & Architecture

**Last Updated:** July 26, 2026 (v2.2.0 — Admin Polish + Invites + Announcements)
**Code Name:** "Corsair Academy"
**Stack:** Next.js 16 + Prisma 7 + PostgreSQL + NextAuth v5 + Tailwind CSS v3

**Repo:** <https://github.com/isoenthusiast/corsair-academy>

**Related Documents:**

- `GAME_PHILOSOPHY.md` — Theme, economy, ranks, visual language
- `LEARNING_PHILOSOPHY.md` — Trial design, pedagogy, skull system, multi-user
- `USER_PHILOSOPHY.md` — Roles, account lifecycle, profiles, passwords, audit
- `CURRICULUM_PHILOSOPHY.md` — Voyages, branching, metadata, bundles, versioning
- `ADMIN_PHILOSOPHY.md` — Admin dashboard, user/class/economy management
- `AI_PHILOSOPHY.md` — AI trials, tutor chat, grading, adaptive difficulty
- `TEST_PLAN.md` — General tests
- `TEST_PLAN_LEARNING.md` — Learning tests
- `TEST_PLAN_MULTIUSER.md` — Multi-user role tests
- `TEST_PLAN_USERS.md` — User management tests
- `TEST_PLAN_CURRICULUM.md` — Curriculum tests
- `TEST_PLAN_ADMIN.md` — Admin feature tests
- `TEST_PLAN_AI.md` — AI feature tests
- `TEST_PLAN_PHASE2.md` — Phase 2 admin tests
- `CONTEXT.md` — Original design philosophy (pre-pirate)

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────┐
│  Browser (Next.js 16, React 19, Tailwind)    │
│  ├─ /             → Pirate login             │
│  ├─ /map          → Treasure map dashboard   │
│  ├─ /voyage/[id]  → Trial scroll player      │
│  ├─ /profile      → Wanted poster + stats    │
│  ├─ /captain      → Captain's Quarters       │
│  ├─ /tavern       → Sea charm shop           │
│  └─ /ship         → Shipwright upgrades      │
├──────────────────────────────────────────────┤
│  API Routes (Next.js Route Handlers)         │
│  ├─ /api/auth/[...nextauth] → Auth (nodejs)  │
│  ├─ /api/trials/attempt    → Record trial    │
│  ├─ /api/voyages/complete  → Complete voyage │
│  ├─ /api/shop/buy          → Buy sea charm   │
│  └─ /api/shop/buy-upgrade  → Buy ship upgrade│
├──────────────────────────────────────────────┤
│  Prisma 7 ORM + pg Driver Adapter → PostgreSQL│
└──────────────────────────────────────────────┘
```

## 2. Data Model

### Core Models

- **User** — `crowns Int`, `pirateRank String`, relations to charms, ship upgrades, chest claims
- **Sea** (was World) — `name`, `icon`, `description`, `color`
- **Voyage** (was Quest) — `seaId`, `difficulty`, `requiredVoyageId`, `captainGauntlet Boolean`
- **Trial** (was Challenge) — `voyageId`, `type` (multi_choice/fill_blank/puzzle/open_ended), `question`, `options Json?`, `answer`, `explanation`, `hint`, `points`
- **TrialAttempt** (was ChallengeAttempt) — `skulls Int` (1-3), `hintsUsed`, `timeSpent`

### Economy Models

- **CrownTransaction** — audit trail for all crown movements (userId, amount, reason, sourceId)
- **ShipUpgrade** — permanent upgrade definitions (name, description, icon, cost)
- **UserShipUpgrade** — junction table (userId, upgradeId, purchasedAt)
- **DailyChestClaim** — tracks claimed streak chests (userId, streakDay, chestType, rewardSummary)
- **SeaCharm** (was PowerUp) — types: whisper_scroll, storm_pass, fortune_wind, anchor_charm

### Enums

- `Role` — Parent, Learner
- `TrialType` — multi_choice, fill_blank, puzzle, open_ended
- `VoyageStatus` — Locked, Available, InProgress, Completed, Mastered
- `SeaCharmType` — whisper_scroll, storm_pass, fortune_wind, anchor_charm

## 3. Route Map

### Student Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | LoginPage | Pirate-themed auth gate with parchment card |
| `/map` | MapPage | Treasure map with 4 sea cards, voyage paths, Wanted Poster banner, announcement banner |
| `/voyage/[id]` | VoyagePage | Trial scroll player — parchment UI, skull rating, cannon fire animation |
| `/profile` | ProfilePage | Wanted Poster — pirate rank, skulls, sea charms, achievements, ship log |
| `/tavern` | TavernPage | Shop — 4 sea charms for purchase with crown balance |
| `/ship` | ShipPage | Shipwright — 5 permanent upgrades with owned/unowned state |

### Teacher Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/class` | ClassListPage | Teacher's class list (redirects to first class) |
| `/class/[id]` | ClassDashboard | Class leaderboard, assignments, announcements |

### Parent Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/captain` | CaptainPage | Parent fleet view — linked children, per-sea stats |

### Invite Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/invite/[token]` | InviteAcceptPage | Join form — name, username, password. Expired/used handling. |

### Admin Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/admin` | AdminDashboard | Admiral's Command — stats, recent users, classes, nav cards |
| `/admin/users` | UserListPage | User table with role/status badges, edit links, +new button |
| `/admin/users/new` | CreateUserPage | Create user form — name, username, password, role, status, crowns |
| `/admin/users/[id]` | UserEditPage | Edit user — form + reset password + soft delete/restore |
| `/admin/classes` | ClassListPage | Class list with teacher display, +new button |
| `/admin/classes/new` | CreateClassPage | Create class form — name, multi-teacher checkboxes |
| `/admin/classes/[id]` | ClassDetailPage | Teachers, student roster, assignment/announcement counts |
| `/admin/voyages` | VoyageListPage | Curriculum list grouped by sea with status badges |
| `/admin/voyages/[id]` | VoyageEditorPage | Metadata form + trials list with edit links |
| `/admin/voyages/[id]/trials/[trialId]` | TrialEditorPage | Trial editor — form + live preview + version history |
| `/admin/announcements` | AnnouncementsPage | System announcements — create form + list with delete |
| `/admin/invites` | InvitesPage | Invite link generation — role/expiry form + list with copy/revoke |
| `/admin/economy` | EconomyPage | Crown rates, shop prices, upgrade costs, rank XP thresholds |
| `/admin/parents` | ParentsPage | Per-student parent linking with 2-parent limit |
| `/admin/analytics` | AnalyticsPage | Stats, per-sea completion bars, recent activity |
| `/admin/moderation` | ModerationPage | Flagged trial queue with approve/remove |
| `/admin/settings` | SettingsPage | App identity, maintenance mode, feature flags |
| `/admin/templates` | TemplatesPage | Curriculum bundles with apply-to-class, create template |

## 4. API Routes

### Core API

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth v5 credentials provider + JWT (runtime: nodejs) |
| `/api/trials/attempt` | POST | Record trial answer, award XP+crowns, update streak |
| `/api/voyages/complete` | POST | Complete voyage, bonus XP+crowns, unlock next |
| `/api/shop/buy` | POST | Deduct crowns, increment charm quantity |
| `/api/shop/buy-upgrade` | POST | Deduct crowns, create UserShipUpgrade |

### Invite API

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/invite/accept` | POST | Accept invite — create user with role, streak, charms, mark used |

### Admin API — Users

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/users/create` | POST | Create user with bcrypt hash, duplicate check |
| `/api/admin/users/update` | POST | Update user profile, role, status; log crown transactions |
| `/api/admin/users/reset-password` | POST | Reset user password with new bcrypt hash |
| `/api/admin/users/delete` | POST | Soft delete user (set deletedAt) |
| `/api/admin/users/restore` | POST | Restore soft-deleted user |

### Admin API — Classes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/classes/create` | POST | Create class with teacher junction |
| `/api/admin/classes/add-teacher` | POST | Add co-teacher via ClassTeacher junction |
| `/api/admin/classes/enroll` | POST | Enroll student via StudentClass junction |

### Admin API — Voyages & Trials

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/voyages/update` | POST | Update voyage metadata (title, status, difficulty, etc.) |
| `/api/admin/trials/update` | POST | Update trial + save TrialVersion snapshot before edit |

### Admin API — Announcements

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/announcements/create` | POST | Create system announcement with role target + expiry |
| `/api/admin/announcements/delete` | POST | Delete announcement by id |

### Admin API — Invites

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/invites/create` | POST | Generate invite link — crypto.randomUUID token, expiry |
| `/api/admin/invites/revoke` | POST | Revoke unused invite link |

### Admin API — Economy

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/economy` | GET/POST | Get/set crown rate, shop prices, upgrade costs, rank thresholds |
| `/api/admin/economy/reset` | POST | Reset economy to defaults |

### Admin API — Parents

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/parents/link` | POST | Link parent to student (max 2 parents per student) |
| `/api/admin/parents/unlink` | POST | Unlink parent from student |

### Admin API — Moderation

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/moderation/approve` | POST | Approve flagged trial (remove flags) |
| `/api/admin/moderation/remove` | POST | Remove flagged trial |

### Admin API — Settings & Templates

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/settings` | POST | Update system settings (app name, maintenance mode, features) |
| `/api/admin/templates/create` | POST | Create voyage bundle template |
| `/api/admin/templates/apply` | POST | Apply template to class (copy voyages) |

## 5. Auth Architecture

- **Middleware** (`src/middleware.ts`): NextAuth v5 `auth()` with `auth.config.ts` (no Prisma, Edge-safe)
- **Auth config split**: `auth.config.ts` (JWT callbacks only) vs `auth.ts` (full: Prisma + Credentials provider)
- **Auth route** must use `runtime = "nodejs"` — Prisma 7 generates code with `node:path` etc.
- **Session**: JWT stores `id`, `role`, `name`

## 6. Pirate Rank System

```
Deckhand → Swabbie → Gunner → Boatswain → Quartermaster → First Mate → Captain → Commodore → Sea Lord
```

Computed from total XP at thresholds: 0, 100, 300, 600, 1000, 1500, 2500, 4000, 6000.

## 7. Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Prisma 7.9 + pg adapter | Pure JS — works on Windows ARM64. No native binary needed. |
| `prisma.config.ts` | Required by Prisma 7 for datasource URL. |
| `runtime: "nodejs"` on auth route | Prisma 7 client uses Node APIs not available on Edge. |
| Split `auth.config.ts` / `auth.ts` | Middleware (Edge) needs Prisma-free config. |
| `@/` path alias for generated client | Avoids `.js` extension resolution issues with Turbopack. |
| Tailwind v3 (not v4) | More stable, wider ecosystem. |

## 8. Environment Variables

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gamified_learning
AUTH_SECRET=questlab-dev-secret-change-in-production-abc123
AUTH_URL=http://localhost:3200
DEEPSEEK_API_KEY=           # Optional — for future AI tutor
DEEPSEEK_MODEL=deepseek-v4-pro
```

## 9. Default Accounts

| Role | Username | Password | Starting |
|------|----------|----------|----------|
| Captain (Parent) | `parent` | `learning123` | 0 🪙 |
| Cadet (Learner) | `andrew` | `andrew123` | 50 🪙, 3 Whisper Scrolls |

## 10. Learning Design Summary

> Full detail: `LEARNING_PHILOSOPHY.md`

### Trial Types (Retrieval Practice Ladder)

| Type | Process | Weight |
|------|---------|--------|
| `multi_choice` | Recognition | ~40% |
| `fill_blank` | Recall | ~35% |
| `puzzle` | Application | ~10% |
| `open_ended` | Synthesis (Gauntlets only) | ~15% |

### Trial Structure

Every trial: `type badge → difficulty → question → options? → hint? → explanation → answer → points`

### Skull Rating

1☠️ = attempted, 2☠️ = correct, 3☠️ = correct + no hints + fast. Minimum always 1. No failure state.

### Difficulty Arc (Per Sea)

```
⭐ Foundation → ⭐⭐ Building → ⭐⭐⭐ Applying → ⭐⭐⭐⭐ Mastering → ⭐⭐⭐⭐⭐ ⚔️ Gauntlet
```

### Captain's Gauntlet (Every 5th Voyage)

- Ends with open_ended trial
- 2× point values
- Bonus XP + crowns on completion
- Unlocks nothing (end of sea chain)

### Key Rules

- Always show explanation (even for correct answers)
- Hints always available, cost 1 skull
- Never same trial type >2 in a row
- Pirate dual-coding on every question
- No trick questions or progress gates

## 11. Multi-User Architecture (v2.1.0)

> Full detail: `LEARNING_PHILOSOPHY.md` §13

### Roles

| Role | Home Route | Scope |
|------|-----------|-------|
| **Student** | `/map` | Self + classes |
| **Teacher** | `/class/[id]` | Own classes only |
| **Parent** | `/captain` | Linked children (via StudentParent, max 2) |
| **Admin** | `/admin` | Everything |

### New Models

- **Class** — name, teacherId (1 teacher per class)
- **StudentClass** — many-to-many: student ↔ class
- **StudentParent** — many-to-many: student ↔ parent (max 2 per student)
- **Assignment** — voyage assigned to class with optional due date
- **Announcement** — teacher posts to class

### New Pages

| Route | Role | Purpose |
|-------|------|---------|
| `/admin` | Admin | Dashboard: users, classes, content counts |
| `/class` | Teacher | Class list (redirects to single class) |
| `/class/[id]` | Teacher | Roster, leaderboard, assignments, announcements |

### Default Accounts (v2.1.0)

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Teacher | `teacher1` | `teach123` |
| Parent | `parent` | `learning123` |
| Parent | `parent2` | `parent456` |
| Student | `andrew` | `andrew123` |
| Student | `sally` | `sally123` |
