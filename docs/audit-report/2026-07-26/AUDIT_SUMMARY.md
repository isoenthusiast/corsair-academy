# Corsair Academy — Project Audit Summary

**Audit Date:** July 26, 2026  
**Auditor:** GitHub Copilot (Kimi K2.7 Code)  
**Scope:** Full project audit comparing design philosophy, app design, and as-built application.  
**Repositories:**

- Code: `isoenthusiast/corsair-app`
- Docs: `isoenthusiast/corsair-academy`
- Production: `https://corsair-academy-production.up.railway.app`

---

## Executive Summary

Corsair Academy is a functional Next.js 16 + Prisma 7 pirate-themed learning platform with a strong core: auth, curriculum, admin panel, AI integration, and deployment pipeline. However, the audit identified **significant gaps between the documented design and the as-built app**, particularly in gameplay systems, security enforcement, and persistent configuration. Several documented "complete" features are actually stubs or only partially implemented.

### Top Critical Findings

1. **Auth does not enforce account status** — inactive, suspended, and soft-deleted users can still log in.
2. **No forced password change flow** — `mustChangePassword` is stored but never checked.
3. **Economy & Settings APIs are stubs** — UI exists, but changes are only logged to console and discarded.
4. **preDeployCommand runs seed on every deploy** — data mutation risk in production on every push.
5. **Client-supplied `userId` in trial/shop APIs** — horizontal privilege escalation vulnerability.
6. **Hardcoded role-specific redirect in `/class/page.tsx`** — violates the documented middleware-first routing rule.

---

## Audit Methodology

1. Surveyed full project structure (`corsair-app/`, `docs/`, `00 Ref/`).
2. Read governing documents:
   - [docs/Corsair Academy Design Philosophy.md](../Corsair%20Academy%20Design%20Philosophy.md)
   - [docs/Corsair Academy App Design.md](../Corsair%20Academy%20App%20Design.md)
   - [docs/ADMIN_PHILOSOPHY.md](../ADMIN_PHILOSOPHY.md)
   - [docs/AI_PHILOSOPHY.md](../AI_PHILOSOPHY.md)
   - [ProjectLessonLearnt.md](../../ProjectLessonLearnt.md)
   - [00 Ref/APP_DESIGN.md](../../00%20Ref/APP_DESIGN.md)
3. Mapped every Prisma model/enum, Next.js route, API route, and page against the docs.
4. Searched for redirects, auth checks, audit log usage, gameplay effect code, and hardcoded values.
5. Compared test plans to actual test scripts.

---

## Snapshot: What's Built vs. What's Designed

| Area | Built | Designed | Gap Level |
|------|-------|----------|-----------|
| Auth & Middleware | ✅ Core JWT + role routing | ✅ Documented | Minor gaps in status enforcement |
| Student Map/Voyages | ✅ Functional | ✅ Documented | Missing branching, charm effects |
| Trial Player | ✅ 4 trial types + AI grading | ✅ Documented | No failure-state philosophy, no charm usage |
| Economy (Tavern/Ship) | ✅ Shop UI + purchase APIs | ✅ Documented | Purchases have no gameplay effect |
| Admin Users/Classes | ✅ CRUD + impersonation | ✅ Documented | Missing audit logging, CSV import |
| Admin Curriculum v3 | ✅ Split-panel + AI grilling | ✅ Documented | Minor versioning gaps |
| Admin Kanban | ✅ Board + edit modal | ✅ Documented | No auto-generated cards |
| Admin Economy/Settings | ❌ Stub APIs | ✅ Documented | **Critical** |
| Daily Streak Chests | ❌ Missing UI/API | ✅ Documented | **High** |
| Voyage Branching | ❌ Schema only | ✅ Documented | **High** |
| Teacher Dashboard | ⚠️ Read-only | ✅ Documented | **Medium** |
| Parent Dashboard | ✅ Basic view | ✅ Documented | Minor |
| Security Hardening | ⚠️ Partial | ✅ Documented | **High** |
| Deployment Pipeline | ✅ Railway deploy | ✅ Documented | Seed in preDeploy is risky |

---

## Document Deliverables

This audit report is organized under `docs/audit-report/2026-07-26/`. The folder contains:

| File | Purpose |
|------|---------|
| [AUDIT_SUMMARY.md](2026-07-26/AUDIT_SUMMARY.md) | This high-level overview |
| [FEATURE_GAPS.md](2026-07-26/FEATURE_GAPS.md) | Missing/incomplete features with severity |
| [ROUTE_API_GAPS.md](2026-07-26/ROUTE_API_GAPS.md) | Route and API discrepancies |
| [DATA_MODEL_GAPS.md](2026-07-26/DATA_MODEL_GAPS.md) | Schema vs. design document gaps |
| [SECURITY_ISSUES.md](2026-07-26/SECURITY_ISSUES.md) | Auth, authorization, and security findings |
| [DESIGN_INCONSISTENCIES.md](2026-07-26/DESIGN_INCONSISTENCIES.md) | Philosophical/UX mismatches |
| [TEST_COVERAGE_GAPS.md](2026-07-26/TEST_COVERAGE_GAPS.md) | Test plan vs. implementation gaps |
| [DEPLOYMENT_CONFIG_ISSUES.md](2026-07-26/DEPLOYMENT_CONFIG_ISSUES.md) | Railway, preDeploy, and config risks |
| [DOCUMENTATION_GAPS.md](2026-07-26/DOCUMENTATION_GAPS.md) | Inconsistencies across docs and code |
| [RECOMMENDED_ROADMAP.md](2026-07-26/RECOMMENDED_ROADMAP.md) | Prioritized fix plan |

> Future audits should be placed in sibling date folders (e.g., `docs/audit-report/2026-08-15/`).

---

## Immediate Actions Recommended

### Before Next Deploy

1. Remove `npx tsx prisma/seed.ts` from `railway.toml` preDeployCommand.
2. Fix `auth.ts` to reject users with `status !== "Active"` or `deletedAt !== null`.
3. Replace client-supplied `userId` in `/api/trials/attempt`, `/api/shop/buy`, `/api/shop/buy-upgrade` with `session.user.id`.
4. Add auth checks to `/api/admin/economy` and `/api/admin/settings`.

### Next Sprint

5. Implement `EconomySettings` and `SystemSetting` models; persist economy/settings changes.
2. Build daily streak chest claim UI + API.
3. Apply sea charm effects and ship upgrade effects in trial/complete flows.
4. Fix `/class/page.tsx` redirect to use middleware (redirect to `/` or convert to Link list).
5. Start writing `AuditLog` records for admin actions and impersonation.

### Following Sprint

10. Implement voyage branching/prerequisites on the map.
2. Build trial version timeline/rollback UI and API.
3. Add teacher assignment and announcement creation UI.
4. Expand automated test coverage for admin, users, and AI features.

---

## Lessons Captured

This audit reinforced several project-specific lessons already captured in [ProjectLessonLearnt.md](../../ProjectLessonLearnt.md) and added new ones:

- **TODO.md overstates completion**: stub UIs with non-persistent APIs were marked complete.
- **Docs drift from code**: `VoyageStatus` enum semantics diverged between Philosophy doc and schema.
- **Security gaps hide behind "complete" features**: auth status checks, audit logging, and session-based user IDs were omitted.
- **preDeployCommand DML risk**: seeding every deploy contradicts the documented "DDL only" rule.
- **Folder name with space (`00 Ref/`)**: previously caused Nixpacks build issues; should be renamed or removed.

The detailed findings and recommendations are in the files above.
