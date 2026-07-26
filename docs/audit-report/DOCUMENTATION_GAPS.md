# Documentation Gaps — Corsair Academy Audit

Inconsistencies between design documents, code, and project metadata.

---

## Dg1: `00 Ref/APP_DESIGN.md` is outdated

**Location:** [00 Ref/APP_DESIGN.md](../../00%20Ref/APP_DESIGN.md)

**Issues:**
- Uses old terminology: `Learner` instead of `Student`, `World`/`Quest`/`Challenge` instead of `Sea`/`Voyage`/`Trial`.
- Lists repo as `isoenthusiast/corsair-academy` (docs repo) instead of `isoenthusiast/corsair-app` (code repo).
- References outdated env vars (`DEEPSEEK_MODEL` singular).
- Architecture diagram omits `/ship`, `/tavern`, `/profile`.

**Impact:** New contributors or future audits may reference stale information.

**Fix:** Either delete `00 Ref/APP_DESIGN.md` and point to `docs/Corsair Academy App Design.md`, or add a prominent deprecation notice at the top.

---

## Dg2: `VoyageStatus` enum semantics diverge

**Locations:**
- [docs/Corsair Academy Design Philosophy.md](../Corsair%20Academy%20Design%20Philosophy.md) §4 — `Draft, Published, Deprecated`
- [corsair-app/prisma/schema.prisma](../../corsair-app/prisma/schema.prisma) — `VoyageStatus` enum `Locked, Available, InProgress, Completed, Mastered`

**Issue:** The same enum name describes two different concepts. The `Voyage` model uses a plain `String` for lifecycle status; `UserVoyageProgress` uses the enum for student progress.

**Fix:** Rename schema enum to `UserVoyageStatus` and add `VoyageLifecycle` enum (`Draft/Published/Deprecated`) for `Voyage.status`. Update docs accordingly.

---

## Dg3: `TODO.md` overstates completion

**Location:** [TODO.md](../../TODO.md)

**Issues:**
- Phase 2 lists "Admin Economy: crown rates, shop prices, upgrade costs, rank thresholds" as complete, but the API is a stub.
- Phase 2 lists "Admin Settings: app identity, maintenance mode, feature flags" as complete, but the API is a stub.
- Phase 1 lists "Seed data (6 users, 1 class, 4 seas, 20 voyages, 100 trials)" as complete, but gameplay systems (charms, upgrades, chests) are not.

**Impact:** Misleading project status. Features marked done are non-functional.

**Fix:** Mark economy/settings as not started/incomplete. Add separate tasks for charm effects, upgrade effects, streak chests, and voyage branching.

---

## Dg4: `ADMIN_PHILOSOPHY.md` references non-existent model fields

**Location:** [docs/ADMIN_PHILOSOPHY.md](../ADMIN_PHILOSOPHY.md) §3

**Issue:** Shows `User.usedInvite` relation, but schema has no `usedInvite` field on `User`. `InviteLink.usedById` exists but is not linked back to `User`.

**Fix:** Either add the bidirectional relation or remove the `usedInvite` line from the doc.

---

## Dg5: AI Philosophy says anti-repeat is built

**Location:** [docs/AI_PHILOSOPHY.md](../AI_PHILOSOPHY.md) §3 — Anti-Repeat

**Issue:** Describes content hashing and 30-day repeat avoidance. No such logic exists in [api/admin/voyages/[id]/generate-trials/route.ts](../../corsair-app/src/app/api/admin/voyages/[id]/generate-trials/route.ts) or trial serving.

**Fix:** Mark anti-repeat as planned/not built, or implement it.

---

## Dg6: `App Design.md` references missing `sync-schema.ts`

**Location:** [docs/Corsair Academy App Design.md](../Corsair%20Academy%20App%20Design.md) §8

**Issue:** States `sync-schema.ts` must stay in sync with schema, but file does not exist.

**Fix:** Remove the reference or create the file.

---

## Dg7: `App Design.md` test infrastructure section is incomplete

**Location:** [docs/Corsair Academy App Design.md](../Corsair%20Academy%20App%20Design.md) §9

**Issue:** Lists only `TEST_PLAN.md` and a few others, but `docs/test-plans/` contains 16 files.

**Fix:** Update the test plan list to match the actual directory contents.

---

## Dg8: Duplicate/legacy test plan files

**Location:** `docs/test-plans/`

**Issue:** Multiple overlapping plans exist (`TEST_PLAN_PHASE2.md`, `TEST_PLAN_PHASE4.md`, `TEST_PLAN_PHASE5.md`, `TEST_PLAN_ADMIN.md`). Some are outdated; some have no execution log.

**Fix:** Consolidate into role/domain-based plans and archive outdated ones.

---

## Dg9: Default accounts password mismatch in docs

**Location:** [docs/Corsair Academy App Design.md](../Corsair%20Academy%20App%20Design.md) §10

**Issue:** Default accounts match seed, but some older docs may list different passwords. Verified App Design is correct.

**Status:** ✅ OK in current consolidated docs.

---

## Dg10: `package.json` name vs. docs

**Issue:** Docs call the app "corsair-app" but `package.json` name is "questlab."

**Fix:** Align `package.json` name with docs.

---

## Summary Table

| # | Documentation Gap | Severity |
|---|-------------------|----------|
| Dg1 | `00 Ref/APP_DESIGN.md` outdated | High |
| Dg2 | `VoyageStatus` enum mismatch | High |
| Dg3 | `TODO.md` overstates completion | High |
| Dg4 | `ADMIN_PHILOSOPHY.md` model field error | Medium |
| Dg5 | AI anti-repeat described but not built | Medium |
| Dg6 | Missing `sync-schema.ts` reference | Medium |
| Dg7 | Test plan list incomplete | Low |
| Dg8 | Duplicate/legacy test plans | Low |
| Dg9 | Default passwords verified | OK |
| Dg10 | package.json name mismatch | Low |
