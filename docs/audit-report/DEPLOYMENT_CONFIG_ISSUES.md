# Deployment & Configuration Issues — Corsair Academy Audit

Findings related to Railway deployment, build config, environment handling, and Prisma tooling.

---

## Critical

### DC1: preDeployCommand runs seed on every deploy

**Location:** [corsair-app/railway.toml](../../corsair-app/railway.toml)

```toml
[deploy]
preDeployCommand = "npx prisma generate && npx prisma db push && npx tsx prisma/seed.ts"
```

**Issue:** `prisma/seed.ts` performs data manipulation (DML) on every deploy. [ProjectLessonLearnt.md](../../ProjectLessonLearnt.md) explicitly states: **"Only DDL allowed in deploy scripts: CREATE/ALTER/DROP TABLE/COLUMN/INDEX. Never INSERT backfills."**

**Impact:**
- Seed re-upserts default users, seas, voyages, trials on every deploy.
- Could overwrite production data changes (e.g., edited trials) if seed logic changes or `upsert` keys match.
- Violates the documented deployment policy.

**Fix:**
```toml
[deploy]
preDeployCommand = "npx prisma generate && npx prisma db push"
```
Run seed manually only for new environment provisioning.

---

### DC2: Missing `sync-schema.ts`

**Document:** [App Design §8](../Corsair%20Academy%20App%20Design.md)  
**Quote:** "`sync-schema.ts` must stay in sync with Prisma schema unique constraints."

**Issue:** The file `prisma/sync-schema.ts` does not exist in the repo. The docs reference a preDeploy step that is not present.

**Impact:** Confusion for future maintainers. Any raw SQL migrations needed for Railway deploy are not centralized.

**Fix:** Either remove the reference from docs or create `prisma/sync-schema.ts` containing only safe DDL operations.

---

## Medium

### DC3: `package.json` name inconsistent

**Location:** [corsair-app/package.json](../../corsair-app/package.json)

```json
"name": "questlab"
```

**Issue:** Project branding is "Corsair Academy" but package name is the old "questlab."

**Impact:** Minor confusion; no runtime effect.

**Fix:** Rename to `"corsair-app"`.

---

### DC4: `00 Ref/` folder name contains a space

**Issue:** The folder `00 Ref/` has a space in its name. [ProjectLessonLearnt.md](../../ProjectLessonLearnt.md) notes that "Folder names with spaces break Nixpacks."

**Impact:** Potential build failure if Nixpacks mounts or references this folder.

**Fix:** Rename to `00_Ref/` or move contents into `docs/`.

---

### DC5: Generated Prisma client committed

**Assessment:** The generated Prisma client is committed to `src/generated/prisma/`. This is intentional per ProjectLessonLearnt.md to avoid needing `prisma generate` during Docker build.

**Risk:** Generated files can drift from `schema.prisma` if developers forget to regenerate before committing.

**Mitigation:** Add a pre-commit check or CI step that runs `prisma generate` and fails if `git diff` appears in `src/generated/prisma/`.

---

## Low

### DC6: Auth route runtime declaration verified

**Location:** [src/app/api/auth/[...nextauth]/route.ts](../../corsair-app/src/app/api/auth/[...nextauth]/route.ts)

**Status:** ✅ `export const runtime = "nodejs";` is correctly declared.

---

### DC7: `.env` excluded from build

**Status:** ✅ `.gitignore` and `.dockerignore` both exclude `.env`.

---

### DC8: `next.config.ts` empty experimental block

**Status:** Not a functional issue; may be removed for cleanliness.

---

## Summary

| # | Issue | Severity | Fix Effort |
|---|-------|----------|------------|
| DC1 | Seed in preDeployCommand | Critical | Minutes |
| DC2 | Missing sync-schema.ts | Critical (docs) | Minutes to hours |
| DC3 | package.json name | Medium | Minutes |
| DC4 | `00 Ref/` space | Medium | Minutes |
| DC5 | Generated client drift risk | Medium | CI setup |
| DC6-DC8 | Verified/low | Low | — |
