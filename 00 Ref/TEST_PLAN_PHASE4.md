# Test Plan — Phase 4: Validation & AI Module Testing

**Date:** 2026-07-26
**Coverage:** 28 pages, 36 API routes, 5 AI modules

---

## E1 — Admin Pages Render Without Errors

| # | Page | Check |
|---|------|-------|
| 1 | `/admin` | Dashboard loads, 4 stat cards, nav cards visible |
| 2 | `/admin/users` | User table with all columns |
| 3 | `/admin/users/new` | Create form with all fields |
| 4 | `/admin/users/[id]` | Edit form + impersonation button |
| 5 | `/admin/classes` | Class list |
| 6 | `/admin/classes/new` | Create class form |
| 7 | `/admin/classes/[id]` | Teachers, students, stats |
| 8 | `/admin/voyages` | Grouped by sea |
| 9 | `/admin/voyages/[id]` | Details form + trials + generate button |
| 10 | `/admin/voyages/[id]/trials/[id]` | Trial editor + preview + versions |
| 11 | `/admin/announcements` | Create form + list |
| 12 | `/admin/invites` | Generate form + list |
| 13 | `/admin/economy` | Economy settings |
| 14 | `/admin/parents` | Parent linking |
| 15 | `/admin/analytics` | Stats dashboard |
| 16 | `/admin/moderation` | Flagged trials |
| 17 | `/admin/settings` | System settings |
| 18 | `/admin/templates` | Templates list |

## E2 — Role-Based Access Control

| # | Role | Access | Expected |
|---|------|--------|----------|
| 1 | Student | `/admin/*` | Redirect to /map |
| 2 | Student | `/class/*` | Redirect to /map |
| 3 | Student | `/captain` | Redirect to /map |
| 4 | Student | `/map`, `/voyage`, `/profile`, `/tavern`, `/ship` | Access allowed |
| 5 | Teacher | `/admin/*` | Redirect to /class |
| 6 | Teacher | `/class/*` | Access allowed |
| 7 | Teacher | `/map`, `/voyage`, etc. | Redirect to /class |
| 8 | Parent | `/admin/*` | Redirect to /captain |
| 9 | Parent | `/captain` | Access allowed |
| 10 | Parent | `/map`, `/voyage`, etc. | Redirect to /captain |
| 11 | Admin | `/admin/*` | Access allowed |
| 12 | Admin | `/class/*` | Access allowed |
| 13 | Unauthenticated | `/map` | Redirect to / |

## E3 — Invite Flow End-to-End

| # | Step | Verification |
|---|------|-------------|
| 1 | Admin generates invite (role=Student, 7 days) | Token created, appears in list |
| 2 | Copy invite URL | URL format: `/invite/<uuid>` |
| 3 | Open invite URL | "Join the Crew!" page shows role |
| 4 | Submit with name/username/password | Redirect to `/?invited=1` |
| 5 | New user appears in admin users | Correct role, starting items |
| 6 | Invite marked as used | Status shows "Used" in admin |
| 7 | Re-open used invite | "Invite Expired" page |
| 8 | Revoke unused invite | Removed from list, link shows expired |

## E4 — Voyage Flow End-to-End

| # | Step | Verification |
|---|------|-------------|
| 1 | Student opens `/map` | 4 sea cards, RecommendedVoyage |
| 2 | Click first voyage | TrialPlayer loads |
| 3 | Answer multi_choice correctly | "Bullseye!", 3 skulls, XP+crowns |
| 4 | Progress bar advances | Trial counter increments |
| 5 | Answer incorrectly | "Close, sailor!", 1 skull |
| 6 | Use hint | Hint revealed, skull deduction |
| 7 | Complete all trials | "Voyage Complete!" screen |
| 8 | Return to map | Voyage marked completed |

## AI-1 — Trial Generation

| # | Test | Verification |
|---|------|-------------|
| 1 | Generate 3 trials for English voyage | 3 new trials, pirate-themed |
| 2 | Generate 5 trials for Maths voyage | 5 trials with math content |
| 3 | Mixed types generated | multi_choice, fill_blank, puzzle |
| 4 | All fields present | type, question, answer, explanation, hint, points |
| 5 | API error handling | Graceful error message, no crash |

## AI-2 — Trial Grading

| # | Test | Verification |
|---|------|-------------|
| 1 | Grade correct open-ended answer | correct=true, skulls>=2 |
| 2 | Grade wrong answer | correct=false, skulls=1, feedback |
| 3 | Empty answer | Handled locally, skulls=1 |
| 4 | API fallback on error | Returns generic feedback |
| 5 | multi_choice NOT sent to AI | Graded locally |

## AI-3 — Tutor Chat

| # | Test | Verification |
|---|------|-------------|
| 1 | Send message to tutor | Response with pirate language |
| 2 | Context-aware response | References voyage/sea |
| 3 | Tutor gives hints, not answers | Response guides, doesn't solve |
| 4 | Empty message | Handled gracefully |
| 5 | API error fallback | "Seas be choppy" message |

## AI-4 — Adaptive Difficulty

| # | Test | Verification |
|---|------|-------------|
| 1 | 3 perfect in a row → bump up | Difficulty +0.5 |
| 2 | 5 weak in a row → bump down | Difficulty -0.5 |
| 3 | Not enough data | No adjustment, reason returned |
| 4 | Already at max (5) | No adjustment beyond 5 |
| 5 | Already at min (1) | No adjustment below 1 |

## AI-5 — Personalization

| # | Test | Verification |
|---|------|-------------|
| 1 | Get recommendation for new student | Recommends first voyage in least-progress sea |
| 2 | Sea progress bars | All 4 seas shown with % |
| 3 | RecommendedVoyage renders on map | Card visible with title + reason |
| 4 | Unauthenticated access | Returns 401 |
