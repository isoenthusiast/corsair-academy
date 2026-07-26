# Corsair Academy — Technical Design & Architecture

**Last Updated:** July 26, 2026 (v2.8.0 — Kanban Board added)
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

### Admin API — Impersonation

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/impersonate` | POST | Create signed HMAC token, clear admin session, redirect to login with token |
| `/api/admin/impersonate/stop` | POST | Sign out impersonated session, return to login page |

**How it works:** Admin clicks "🏴 Login as [name]" → API generates `HMAC(userId.expiry)` signed with AUTH_SECRET → clears auth cookie → redirects to `/?impersonate=<token>`. Login page detects param, calls `signIn("credentials", { username: "_impersonate_", password: token })`. `authorize()` verifies HMAC, returns target user's identity with `impersonatedBy: "admin"`. JWT callback persists `impersonatedBy` → session callback exposes it → `ImpersonationBanner` renders "Return to Admiral" button on all pages.

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

### AI API — Trial Generation (B1)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/voyages/[id]/generate-trials` | POST | Generate 3-5 trials via DeepSeek v4-pro, save to DB |

**How it works:** Sends a structured prompt to DeepSeek API with voyage context (title, description, objectives, subject, difficulty, existing questions). System prompt instructs DeepSeek to return JSON array of trial objects with pirate theming, mixed types, and age-appropriate language. Response is parsed, validated, and saved to the Trial table. UI component `GenerateTrialsButton` handles count selection, loading state, and success/error feedback.

**DeepSeek Client** (`src/lib/deepseek.ts`): OpenAI-compatible chat completions wrapper. Uses `DEEPSEEK_API_KEY` + `DEEPSEEK_MODEL_PRO` from env. Handles error responses, token limits, and temperature configuration.

### AI API — Grading (B3)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/trials/grade` | POST | AI-grade open-ended answer via DeepSeek v4-flash, returns correct/skulls/feedback |

**How it works:** Takes `trialQuestion`, `expectedAnswer`, `studentAnswer`. Empty answers handled locally. System prompt instructs v4-flash to evaluate with encouraging pirate-themed feedback. Returns `{correct, skulls: 1-3, feedback}`. TrialPlayer calls this for `open_ended` trials instead of local comparison. Fallback on API error returns generic positive feedback.

### AI API — Tutor Chat (B2)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/tutor/chat` | POST | Conversational AI tutor "Captain Corsair" via DeepSeek v4-flash |

**How it works:** Takes `message` + optional `context` (voyage title, sea, trial index). System prompt defines pirate tutor persona with rules (short, encouraging, hints not answers). `TutorChat` component: floating 🦜 button → slide-out chat panel with message history. Integrated into voyage page.

### AI API — Adaptive Difficulty (B4)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/adaptive/check` | POST | Analyze recent performance, adjust voyage difficulty ±0.5 |

**Logic:** Last 3 attempts all 3-skull → +0.5 difficulty (max 5). Last 5 attempts all 1-skull → -0.5 (min 1). Called non-blocking after each trial attempt. Returns `{adjusted, oldDifficulty, newDifficulty, reason}`.

### AI API — Personalization (B5)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/personalize/recommend` | GET | Recommend next voyage based on sea progress + performance |

**Logic:** Finds sea with lowest completion %, recommends first incomplete voyage matching difficulty. `RecommendedVoyage` component on map page shows recommendation card + per-sea progress bars. Uses average skulls from last 10 attempts to determine appropriate difficulty.

## 5. Auth Architecture

- **Middleware** (`src/middleware.ts`): NextAuth v5 `auth()` with `auth.config.ts` (no Prisma, Edge-safe)
- **Auth config split**: `auth.config.ts` (JWT callbacks only) vs `auth.ts` (full: Prisma + Credentials provider)
- **Auth route** must use `runtime = "nodejs"` — Prisma 7 generates code with `node:path` etc.
- **Session**: JWT stores `id`, `role`, `name`, `impersonatedBy` (optional — set when admin impersonates)
- **Impersonation**: Admin generates HMAC-signed token → login page auto-submits to `_impersonate_` credentials → authorize verifies HMAC → JWT includes `impersonatedBy` field → `ImpersonationBanner` shown on all pages → "Return to Admiral" clears session

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

## 9. Test Infrastructure

- **Test Runner**: `scripts/test-phase4.ts` — 28 automated API/E2E tests using native `fetch` + CookieJar
- **Run**: `npx tsx scripts/test-phase4.ts`
- **Coverage**: Auth (4), Admin pages (14), Student pages (4), AI modules (6)
- **AI tests**: Trial generation, grading (correct + empty), tutor chat, adaptive difficulty, personalization
- **Test plans**: 7 plan documents in `00 Ref/` covering all features

### Phase 4 Test Results (2026-07-26)

| Category | Tests | Result |
|----------|-------|--------|
| E2 — Auth & RBAC | 4 | ✅ 4/4 |
| E1 — Admin Pages | 14 | ✅ 14/14 |
| E4 — Student Pages | 4 | ✅ 4/4 |
| AI-1 — Trial Generation | 1 | ✅ 1/1 |
| AI-2 — Grading | 2 | ✅ 2/2 |
| AI-3 — Tutor Chat | 1 | ✅ 1/1 |
| AI-4 — Adaptive | 1 | ✅ 1/1 |
| AI-5 — Personalization | 1 | ✅ 1/1 |
| **Total** | **28** | **✅ 100%** |

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

## 12. Kanban Board (v2.8.0)

**Route:** `/admin/kanban` — Admiral's task board for tracking flagged trials, assignments, AI-generated trials, support tickets, and manual tasks.

### Design

| Decision | Rationale |
|----------|-----------|
| Single `KanbanCard` table with polymorphic `sourceTable`/`sourceId` | Avoids table-per-type explosion. Same pattern as AttachmentMapping. |
| 4 columns: Backlog → InProgress → Done → Archive | Simple, linear workflow. No multi-column complexity. |
| 5 cards per column with "Show More" | Prevents column overload. Pagination keeps board scannable. |
| Auto-archive after 30 days in Done | Natural decay. Server-side check in GET API. |
| Native HTML5 drag-and-drop | Zero dependencies. Works across all modern browsers. |
| Role-scoped queries | Admin=all, Teacher=own students, Parent=own children, Student=none. |

### Card Types (`KanbanType`)

| Type | Source | Created By |
|------|--------|------------|
| `FlaggedTrial` | Moderation queue | System (auto) |
| `Assignment` | Teacher assignment overdue | System (auto) |
| `AITrial` | AI-generated trial needs review | System (auto) |
| `SupportTicket` | Manual or system-generated | Manual |
| `Task` | Manual admin/teacher task | Manual |

### Card Fields

- `title` — brief summary
- `description` — optional details
- `type` — KanbanType enum badge
- `priority` — Low / Medium / High
- `assigneeId` — target user (optional)
- `creatorId` — who created it
- `sourceTable` / `sourceId` — polymorphic link to original record

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/admin/kanban` | GET | List cards (role-scoped, auto-archives Done>30d) |
| `/api/admin/kanban` | POST | Create manual Task card |
| `/api/admin/kanban/[id]` | PATCH | Update status (incl. drag), priority, assignee; sets archivedAt when moved to Archive |

### Data Model

```prisma
model KanbanCard {
  id          String       @id @default(uuid())
  title       String
  description String?
  type        KanbanType   @default(Task)
  status      KanbanStatus @default(Backlog)
  priority    Priority     @default(Medium)
  sourceTable String?
  sourceId    String?
  assigneeId  String?
  creatorId   String?
  archivedAt  DateTime?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
  assignee    User?        @relation("KanbanAssigned", fields: [assigneeId], references: [id])
  creator     User?        @relation("KanbanCreated", fields: [creatorId], references: [id])
}

enum KanbanType   { FlaggedTrial Assignment AITrial SupportTicket Task }
enum KanbanStatus { Backlog InProgress Done Archive }
enum Priority     { Low Medium High }
```
