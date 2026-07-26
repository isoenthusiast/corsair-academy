# Test Plan — Phase 5: Documentation Audit

**Date:** 2026-07-26
**Coverage:** 7 philosophy docs + APP_DESIGN.md + ProjectLessonLearnt.md + TODO.md

---

## D1 — APP_DESIGN.md Accuracy

| # | Check | Expected |
|---|-------|----------|
| 1 | Version number reflects current state | v2.6.0+ with deploy status |
| 2 | Route map lists all 28 pages | Categorized by role |
| 3 | API routes table lists all 36 routes | Categorized by domain |
| 4 | Auth architecture mentions impersonation | HMAC token flow documented |
| 5 | AI section documents all 5 modules | Generation, grading, tutor, adaptive, personalization |
| 6 | Test infrastructure section present | 28/28 results table |
| 7 | Default accounts table updated | All 4 roles with test creds |
| 8 | Environment variables documented | All required vars listed |

## D2 — Route Map Completeness

| # | Check | Expected |
|---|-------|----------|
| 1 | All admin pages listed | 18 pages including new Phase 3 additions |
| 2 | All student pages listed | 8 pages |
| 3 | All teacher pages listed | 2 pages |
| 4 | All parent pages listed | 1 page |
| 5 | Invite page listed | /invite/[token] |
| 6 | Route map matches actual file system | Cross-reference with src/app/ |

## D3 — Lessons Learned Registration

| # | Check | Expected |
|---|-------|----------|
| 1 | ProjectLessonLearnt.md exists in root | Single consolidated file |
| 2 | All old date-based files deleted | /memories/ only has project-lessons-rules.md |
| 3 | 28 lessons from 2026-07-26 captured | Sections 1-28 in Railway/Deploy category |
| 4 | Folder naming rule captured | No spaces in folder names |
| 5 | Security rules captured | .dockerignore, Railway Variables, .env excluded |

## D4 — Philosophy Docs Review

| # | Doc | Check |
|---|-----|-------|
| 1 | GAME_PHILOSOPHY.md | Ranks, economy, seas still accurate? |
| 2 | LEARNING_PHILOSOPHY.md | Trial types, skull system, difficulty arc accurate? |
| 3 | USER_PHILOSOPHY.md | 4 roles, impersonation documented? |
| 4 | CURRICULUM_PHILOSOPHY.md | Voyages, branching, bundles accurate? |
| 5 | ADMIN_PHILOSOPHY.md | All admin features listed? |
| 6 | AI_PHILOSOPHY.md | All 5 AI modules documented? |
| 7 | CONTEXT.md | Project context up to date? |
