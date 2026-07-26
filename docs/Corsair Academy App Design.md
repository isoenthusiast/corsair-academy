# Corsair Academy — App Design

**Last Updated:** July 26, 2026 (v3.0.0 — Consolidated from APP_DESIGN.md + SETUP.md + CONTEXT.md)
**Repo:** <https://github.com/isoenthusiast/corsair-app>
**Production:** <https://corsair-academy-production.up.railway.app>

> This document consolidates APP_DESIGN.md, SETUP.md, and CONTEXT.md into a single technical reference.

---

## 1. Architecture

```
┌──────────────────────────────────────────────┐
│  Browser (Next.js 16, React 19, Tailwind)    │
│  ├─ /             → Pirate login             │
│  ├─ /map          → Treasure map dashboard   │
│  ├─ /voyage/[id]  → Trial scroll player      │
│  ├─ /profile      → Wanted poster + stats    │
│  ├─ /captain      → Captain's Quarters       │
│  ├─ /tavern       → Sea charm shop           │
│  ├─ /ship         → Shipwright upgrades      │
│  ├─ /class/[id]   → Teacher dashboard        │
│  └─ /admin/*      → Admiral's Command        │
├──────────────────────────────────────────────┤
│  API Routes (Next.js Route Handlers)         │
│  ├─ /api/auth/[...nextauth] → Auth           │
│  ├─ /api/admin/*            → Admin CRUD     │
│  ├─ /api/trials/*           → Trial logic    │
│  └─ /api/shop/*             → Economy        │
├──────────────────────────────────────────────┤
│  Prisma 7 ORM + pg Driver Adapter → PostgreSQL│
└──────────────────────────────────────────────┘
```

---

## 2. Data Model

### Core Models

| Model | Purpose | Key Fields |
|-------|---------|------------|
| **User** | All user types | name, username, passwordHash, role, crowns, pirateRank, status, deletedAt |
| **Sea** | Topic area | name, icon, description, color, sortOrder |
| **Voyage** | Lesson/unit | seaId, title, difficulty, status, objectives, estimatedMinutes, tags[], skills[], captainGauntlet |
| **Trial** | Question/exercise | voyageId, type, question, options(JSON), answer, explanation, hint, points, difficulty |
| **TrialAttempt** | Student answer | trialId, userId, answer, correct, skulls, hintsUsed, timeSpent |
| **TrialVersion** | Edit history | trialId, versionNumber, question, options, answer, etc. |

### Multi-User Models

| Model | Purpose |
|-------|---------|
| **Class** | name, teacherId |
| **ClassTeacher** | Many-to-many: teacher ↔ class |
| **StudentClass** | Many-to-many: student ↔ class |
| **StudentParent** | Many-to-many: student ↔ parent (max 2) |
| **Assignment** | voyage assigned to class with due date |
| **Announcement** | Teacher post to class |

### Economy Models

| Model | Purpose |
|-------|---------|
| **CrownTransaction** | Audit trail for crown movements |
| **PointTransaction** | XP audit trail |
| **Streak** | Daily streak tracking |
| **DailyChestClaim** | Streak chest rewards |
| **SeaCharm** | Power-up inventory (4 types) |
| **ShipUpgrade** | Upgrade definitions |
| **UserShipUpgrade** | Junction: user ↔ upgrade |

### Admin & AI Models

| Model | Purpose |
|-------|---------|
| **SystemAnnouncement** | Role-targeted announcements with expiry |
| **InviteLink** | Time-limited account creation links |
| **AuditLog** | Admin action logging |
| **LoginHistory** | Login attempt tracking |
| **KanbanCard** | Task board with drag-and-drop |
| **AIContext** | AI conversation transcripts |
| **VoyageBundle** | Curriculum template bundles |
| **VoyageBundleItem** | Junction: bundle ↔ voyage |

### Key Enums

| Enum | Values |
|------|--------|
| `Role` | Student, Teacher, Parent, Admin |
| `TrialType` | multi_choice, fill_blank, puzzle, open_ended |
| `VoyageStatus` | Draft, Published, Deprecated |
| `KanbanType` | FlaggedTrial, Assignment, AITrial, SupportTicket, Task |
| `KanbanScope` | Class, Trial, Admin |
| `KanbanStatus` | Backlog, InProgress, Done, Archive |
| `Priority` | Low, Medium, High |
| `AIContextFeature` | trials, voyages, seas, kanban, announcements |
| `SeaCharmType` | whisper_scroll, storm_pass, fortune_wind, anchor_charm |

---

## 3. Route Map

### Student Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/` | LoginPage | Pirate-themed auth gate |
| `/map` | MapPage | Treasure map dashboard |
| `/voyage/[id]` | VoyagePage | Trial scroll player |
| `/profile` | ProfilePage | Wanted poster + stats |
| `/tavern` | TavernPage | Sea charm shop |
| `/ship` | ShipPage | Shipwright upgrades |

### Teacher & Parent Routes

| Route | Role | Purpose |
|-------|------|---------|
| `/class` | Teacher | Class list (redirects to first class) |
| `/class/[id]` | Teacher | Class dashboard |
| `/captain` | Parent | Fleet view — linked children |

### Admin Routes

| Route | Purpose |
|-------|---------|
| `/admin` | Dashboard — stats, nav cards |
| `/admin/users` | User table — CRUD |
| `/admin/users/new` | Create user form |
| `/admin/users/[id]` | Edit user + soft delete |
| `/admin/classes` | Class management |
| `/admin/classes/new` | Create class |
| `/admin/classes/[id]` | Class detail |
| `/admin/voyages` | **Split-panel curriculum manager** (v3.0) |
| `/admin/kanban` | Kanban board (v2.8) |
| `/admin/announcements` | System announcements |
| `/admin/invites` | Invite links |
| `/admin/economy` | Economy tuning |
| `/admin/parents` | Parent linking |
| `/admin/analytics` | Analytics dashboard |
| `/admin/moderation` | Flagged trial queue |
| `/admin/settings` | System settings |
| `/admin/templates` | Curriculum bundles |
| `/invite/[token]` | Invite acceptance |

---

## 4. API Routes

### Core API

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth v5 credentials + JWT |
| `/api/trials/attempt` | POST | Record trial answer |
| `/api/voyages/complete` | POST | Complete voyage |
| `/api/shop/buy` | POST | Buy sea charm |
| `/api/shop/buy-upgrade` | POST | Buy ship upgrade |
| `/api/invite/accept` | POST | Accept invite |

### Admin API — Curriculum (v3.0)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/voyages/[id]` | GET | Voyage detail with trials, sea, metadata |
| `/api/admin/voyages/[id]/ai-chat` | POST | AI grilling chat (multi-turn) |
| `/api/admin/voyages/[id]/generate-trials` | POST | Generate trials via DeepSeek v4-pro |
| `/api/admin/voyages/update` | POST | Update voyage metadata (JSON) |
| `/api/admin/trials/update` | POST | Update trial + save version (JSON) |

### Admin API — Kanban

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/kanban` | GET | List cards (role-scoped, auto-archive) |
| `/api/admin/kanban` | POST | Create task card |
| `/api/admin/kanban/[id]` | PATCH | Update card status/fields |

### Admin API — AI Context

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/ai-context` | GET | List past AI contexts |
| `/api/admin/ai-context` | POST | Create AIContext record |

### Admin API — Users, Classes, Economy, etc.

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/users/create` | POST | Create user |
| `/api/admin/users/update` | POST | Update user profile |
| `/api/admin/users/reset-password` | POST | Reset password |
| `/api/admin/users/delete` | POST | Soft delete |
| `/api/admin/users/restore` | POST | Restore deleted user |
| `/api/admin/classes/create` | POST | Create class |
| `/api/admin/classes/add-teacher` | POST | Add co-teacher |
| `/api/admin/classes/enroll` | POST | Enroll student |
| `/api/admin/announcements/create` | POST | Create announcement |
| `/api/admin/announcements/delete` | POST | Delete announcement |
| `/api/admin/invites/create` | POST | Generate invite link |
| `/api/admin/invites/revoke` | POST | Revoke invite |
| `/api/admin/impersonate` | POST | Start impersonation |
| `/api/admin/impersonate/stop` | POST | Stop impersonation |
| `/api/admin/economy` | GET/POST | Economy settings |
| `/api/admin/parents/link` | POST | Link parent to student |
| `/api/admin/parents/unlink` | POST | Unlink parent |
| `/api/admin/moderation/approve` | POST | Approve flagged trial |
| `/api/admin/moderation/remove` | POST | Remove flagged trial |
| `/api/admin/settings` | POST | Update settings |
| `/api/admin/templates/create` | POST | Create bundle |
| `/api/admin/templates/apply` | POST | Apply bundle to class |

### AI API (Student-facing)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/trials/grade` | POST | AI-grade open-ended answer |
| `/api/tutor/chat` | POST | Captain Corsair tutor chat |
| `/api/adaptive/check` | POST | Adjust difficulty |
| `/api/personalize/recommend` | GET | Recommend next voyage |

---

## 5. Auth Architecture

- **NextAuth v5** with credentials provider + JWT strategy
- **Split config**: `auth.config.ts` (Edge-safe, no Prisma) for middleware vs `auth.ts` (full with Prisma) for API routes
- **Auth route**: `runtime = "nodejs"` — Prisma 7 uses Node APIs
- **Session**: JWT stores `id`, `role`, `name`, `impersonatedBy` (optional)
- **Middleware**: Role-based routing from `/` — Admin→/admin, Teacher→/class, Parent→/captain, Student→/map
- **Auth guards**: All server pages use `redirect("/")` — delegates to middleware for role-based routing. Never hardcode role-specific routes.
- **Impersonation**: HMAC-signed token with 60s expiry, `_impersonate_` special credentials, banner on all pages

---

## 6. Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| Prisma 7.9 + pg adapter | Pure JS — works on Windows ARM64. No native binary needed. |
| `prisma.config.ts` | Required by Prisma 7 for datasource URL. |
| `runtime: "nodejs"` on auth route | Prisma 7 client uses Node APIs not available on Edge. |
| Split `auth.config.ts` / `auth.ts` | Middleware (Edge) needs Prisma-free config. |
| `@/` path alias for generated client | Avoids `.js` extension resolution issues with Turbopack. |
| Tailwind v3 (not v4) | More stable, wider ecosystem. |
| Generated Prisma client committed to repo | Avoids needing `prisma generate` during Docker build. |
| Railway with Nixpacks | Auto-deploys from GitHub push. `railway.toml` manages preDeployCommand. |

---

## 7. Environment Variables

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/gamified_learning
AUTH_SECRET=questlab-dev-secret-change-in-production-abc123
AUTH_URL=http://localhost:3200
DEEPSEEK_API_KEY=sk-...        # DeepSeek API key for AI features
DEEPSEEK_MODEL_PRO=deepseek-chat    # For trial generation
DEEPSEEK_MODEL_FLASH=deepseek-chat  # For chat/grading
```

**Production**: Set via Railway Variables. Never hardcode secrets in repo. `.env` must be in `.gitignore` AND `.dockerignore`.

---

## 8. Deployment (Railway)

### Configuration (`railway.toml`)

```toml
[build]
builder = "nixpacks"
[nixpacks]
providers = ["nodejs_22"]

[deploy]
preDeployCommand = "npx prisma generate && npx prisma db push && npx tsx prisma/seed.ts"
```

### Deploy Flow

```
git push → GitHub → Railway detects push → Nixpacks build → preDeployCommand → start
```

- `preDeployCommand` runs generate → db push → seed on EVERY deploy
- Only DDL allowed in deploy scripts (CREATE/ALTER TABLE/INDEX). Never INSERT backfills.
- `sync-schema.ts` must stay in sync with Prisma schema unique constraints

---

## 9. Test Infrastructure

### Test Runner

`scripts/test-phase4.ts` — 28 automated API/E2E tests using native `fetch` + CookieJar
`scripts/test_kanban.py` — 21 Kanban API tests across all 4 roles

### Test Plans

Located in `docs/test-plans/`:
- `TEST_PLAN.md` — General tests
- `TEST_PLAN_LEARNING.md` — Learning tests
- `TEST_PLAN_MULTIUSER.md` — Multi-user role tests
- `TEST_PLAN_USERS.md` — User management tests
- `TEST_PLAN_CURRICULUM.md` — Curriculum tests
- `TEST_PLAN_CURRICULUM_V3.md` — Split-panel curriculum tests
- `TEST_PLAN_ADMIN.md` — Admin feature tests
- `TEST_PLAN_AI.md` — AI feature tests
- `TEST_PLAN_KANBAN.md` — Kanban board tests

---

## 10. Local Development

### Prerequisites
- Node.js 22+
- PostgreSQL 16 running on localhost:5432
- Database: `gamified_learning`

### Setup
```bash
cd corsair-app
npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
npm run dev        # → http://localhost:3200
```

### Default Accounts

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Teacher | `teacher1` | `teach123` |
| Parent | `parent` | `learning123` |
| Student | `andrew` | `andrew123` |
| Student | `sally` | `sally123` |

---

> **Related Documents:** `Corsair Academy Design Philosophy.md` (game, learning, user, curriculum, admin, AI design), `ProjectLessonLearnt.md` (lessons learned), `TODO.md` (task tracker)
