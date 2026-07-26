# CLAUDE.md — Corsair Academy

A pirate-themed gamified learning platform for kids aged 7-14. Powered by AI, driven by game mechanics.

## Quick Reference

- **Stack:** Next.js 16 + Prisma 7 + PostgreSQL + NextAuth v5 + Tailwind CSS v3
- **AI:** DeepSeek v4-pro (generation) + v4-flash (chat/grading)
- **Port:** 3200 (dev) / Railway (prod)
- **App:** `corsair-app/` (own repo: `isoenthusiast/corsair-app`)
- **Docs:** This project root (`isoenthusiast/corsair-academy`)
- **Production:** <https://corsair-academy-production.up.railway.app>

## Default Accounts

| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Teacher | `teacher1` | `teach123` |
| Parent | `parent` | `learning123` |
| Student | `andrew` | `andrew123` |
| Student | `sally` | `sally123` |

## Document Map

| Document | Purpose |
|----------|---------|
| `Corsair Academy Design Philosophy.md` | Game, learning, user, curriculum, admin, AI design |
| `Corsair Academy App Design.md` | Architecture, data model, routes, APIs, deployment |
| `ProjectLessonLearnt.md` | All lessons learned — **must scan before building** |
| `TODO.md` | Task tracker and phase checklist |

---

## 🏴‍☠️ Development Workflow

### Phase 1 — Ideation & Alignment

When the user has an idea for a feature:

1. **Grill the user.** Ask clarifying questions until both you and the user are fully aligned on:
   - What the feature does
   - Who it's for (which roles)
   - Where it lives (route/page)
   - How it interacts with existing features
   - Edge cases and constraints
2. **Update `Corsair Academy Design Philosophy.md`** with the new feature's design decisions, philosophy, and rationale. Add it to the relevant section.
3. **Register in Kanban.** Create a Kanban card (via the app or direct API) referencing the Design Philosophy section. Type: `Task`, Scope: relevant scope.

### Phase 2 — Build

Once aligned and registered:

1. **Study `ProjectLessonLearnt.md`** — scan relevant sections for what could go wrong. Pay special attention to:
   - Prisma bidirectional relations
   - Turbopack caching issues
   - TypeScript errors Turbopack silently ignores
   - JSON API vs formData patterns
   - Middleware as single source of truth for role routing
2. **Write a test plan** based on the Design Philosophy section. Save to `docs/test-plans/TEST_PLAN_<FEATURE>.md`.
3. **Backup the database** (minor backup):
   - Local: `pg_dump gamified_learning > backup_<date>.sql`
   - Railway: Trigger a backup from the Railway dashboard or via CLI
4. **Build the feature** — schema, API, pages, components.
5. **Test the feature** against the test plan. Fix bugs. Repeat until all tests pass.
6. **Update `Corsair Academy App Design.md`** with new routes, APIs, models, and technical decisions.

### Phase 3 — Lessons & Deploy

After the feature is built and tested:

1. **Register new lessons** in `ProjectLessonLearnt.md` — what went wrong, what was learned.
2. **Update `TODO.md`** — mark the phase/feature as complete.
3. **Run `npm run build` locally** — never trust Turbopack's type checking.
4. **Commit & push** both repos (`corsair-app` + `corsair-academy`).
5. **Deploy** — `railway up` from `corsair-app/` or push to trigger auto-deploy.

---

## ⚡ Key Rules (from ProjectLessonLearnt)

- **Never hardcode role-based redirects** — always `redirect("/")` and let middleware route
- **Never trust Turbopack's type checking** — always `npm run build` before pushing
- **JSON API > formData** for modals — return `NextResponse.json()`, never `redirect()`
- **Prisma bidirectional relations are mandatory** — add reverse fields to all related models
- **Turbopack caches Prisma client aggressively** — delete `.next/` after schema changes
- **Use `.py` files, never `python -c`** in PowerShell
- **Middleware is the single source of truth** for role→home route mapping
- **sync-schema.ts must stay in sync** with Prisma schema unique constraints
- **Generated Prisma client should be committed** to repo
- **`.env` must be in `.gitignore` AND `.dockerignore`**

---

## Project Philosophy

- **Learning is play** — every interaction rewards curiosity. Pirate theme throughout.
- **Progress over perfection** — skulls, streaks, milestones, mastery paths. No failure state.
- **AI as tutor** — generates trials, grades answers, explains concepts, adapts difficulty.
- **Parent visibility** — dashboard shows what's being learned, where they're stuck.
- **Admin as Admiral** — full control of fleet: users, curriculum, economy, analytics.

