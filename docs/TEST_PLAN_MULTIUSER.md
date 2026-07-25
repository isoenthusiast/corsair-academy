# Corsair Academy — Multi-User Test Plan

**Date:** July 25, 2026 (v2.1.0)
**Scope:** 4-role system (Student, Teacher, Parent, Admin), class management, parent fleet view

---

## MT1 — Role-Based Routing

| ID | Action | Expected |
|----|--------|----------|
| MT1.1 | Login as Student (`andrew` / `andrew123`) | Redirect to `/map` |
| MT1.2 | Login as Teacher (`teacher1` / `teach123`) | Redirect to `/class/[id]` |
| MT1.3 | Login as Parent (`parent` / `learning123`) | Redirect to `/captain` |
| MT1.4 | Login as Admin (`admin` / `admin123`) | Redirect to `/admin` |
| MT1.5 | Student tries `/captain` | Redirect to `/map` |
| MT1.6 | Teacher tries `/map` | Redirect to `/class/[id]` |
| MT1.7 | Parent tries `/admin` | Redirect to `/captain` |

## MT2 — Student-Parent Link (Fleet View)

| ID | Action | Expected |
|----|--------|----------|
| MT2.1 | Login as Parent | Fleet view shows all linked children |
| MT2.2 | Each child card shows name, rank, XP, crowns, streak |
| MT2.3 | Click child → drills into child's profile |
| MT2.4 | Verify 2-parent limit | Third parent link rejected |

## MT3 — Classes & Teacher

| ID | Action | Expected |
|----|--------|----------|
| MT3.1 | Login as Teacher | See class dashboard with roster |
| MT3.2 | Class shows student list with XP totals |
| MT3.3 | Class leaderboard ranks students by XP |
| MT3.4 | Teacher creates assignment | Voyage assigned to class with optional due date |
| MT3.5 | Teacher posts announcement | Announcement visible on class page |
| MT3.6 | Teacher sees only own classes | Can't access other teacher's class |

## MT4 — Admin Dashboard

| ID | Action | Expected |
|----|--------|----------|
| MT4.1 | Login as Admin | Admin dashboard renders |
| MT4.2 | View all users | List all Students, Teachers, Parents |
| MT4.3 | View all classes | List all classes with teacher names |
| MT4.4 | View all content | List all voyages/trials |
| MT4.5 | Create/edit voyage | CRUD form for voyages |
| MT4.6 | Manage economy | Adjust crown amounts, shop prices |

## MT5 — Data Isolation

| ID | Action | Expected |
|----|--------|----------|
| MT5.1 | Teacher A views class roster | Only sees Teacher A's students |
| MT5.2 | Parent A views fleet | Only sees their linked children |
| MT5.3 | Student A views leaderboard | Only sees their classmates |
| MT5.4 | Admin views everything | No data filters applied |

---

## Execution Log

| Test | Result | Notes |
|------|--------|-------|
| MT1.1 | ✅ PASS | Student login redirects to /map |
| MT1.2 | ✅ PASS | Teacher login redirects to /class/[id] |
| MT1.3 | ✅ PASS | Parent login redirects to /captain |
| MT1.4 | ✅ PASS | Admin login redirects to /admin |
| MT1.5 | ✅ PASS | Middleware blocks cross-role access |
| MT1.6 | ✅ PASS | Teacher redirected from /map to /class |
| MT1.7 | ✅ PASS | Parent redirected from /admin to /captain |
| MT2.1 | ✅ PASS | Fleet view shows linked children via StudentParent |
| MT2.2 | ⚠️ NOT RUN | Detail checks need manual verification |
| MT2.3 | ⚠️ NOT RUN | Drill-down not tested |
| MT2.4 | ⚠️ NOT RUN | 2-parent limit not tested |
| MT3.1 | ✅ PASS | Class dashboard with leaderboard + roster |
| MT3.2 | ✅ PASS | XP totals visible per student |
| MT3.3 | ✅ PASS | Leaderboard ranked by XP |
| MT3.4 | ⚠️ NOT RUN | Assignment creation via API only |
| MT3.5 | ✅ PASS | Announcement visible on class page |
| MT3.6 | ⚠️ NOT RUN | Cross-teacher isolation not tested |
| MT4.1 | ✅ PASS | Admin dashboard renders with stats |
| MT4.2 | ✅ PASS | All users visible in admin list |
| MT4.3 | ✅ PASS | Classes with teacher names visible |
| MT4.4 | ✅ PASS | Voyage + trial counts visible |
| MT4.5 | ⚠️ NOT RUN | CRUD forms not built yet |
| MT4.6 | ⚠️ NOT RUN | Economy management not built yet |
| MT5.1 | ✅ PASS | Teacher sees only own class |
| MT5.2 | ✅ PASS | Parent sees only linked children (not all students) |
| MT5.3 | ⚠️ NOT RUN | Class leaderboard isolation |
| MT5.4 | ✅ PASS | Admin sees all users unfiltered |

**Summary:** 18/27 passed, 9 not run (needs manual verification or API-only features). Core multi-user architecture verified. |
