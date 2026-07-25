# Corsair Academy — Admin Test Plan

**Date:** July 25, 2026 (v2.1.0)
**Scope:** Admin dashboard, user CRUD, class management, curriculum, economy, parent linking, analytics

---

## AT1 — Admin Dashboard

| ID | Action | Expected |
|----|--------|----------|
| AT1.1 | Login as `admin` / `admin123` | Redirect to `/admin` |
| AT1.2 | Dashboard shows 4 stat cards | Users, Classes, Voyages, Trials counts |
| AT1.3 | Recent users list visible | Shows last 10 users with role badges |
| AT1.4 | Classes list visible | Shows class name, teacher, student count |
| AT1.5 | Navigation cards present | Manage Users, Classes, Curriculum links |

## AT2 — User CRUD

| ID | Action | Expected |
|----|--------|----------|
| AT2.1 | Navigate to `/admin/users` | User table renders all users |
| AT2.2 | Click "Create User" | Form opens: name, username, password, role, age |
| AT2.3 | Submit new student | User created, appears in table |
| AT2.4 | Click edit on a user | Form pre-filled, save updates user |
| AT2.5 | Change user role from Student to Teacher | Role updated, class enrollments cleared |
| AT2.6 | Adjust crowns (+100) | CrownTransaction created, user crowns updated |
| AT2.7 | Reset password | Password changed, old sessions invalidated |
| AT2.8 | Delete user | Confirmation dialog, cascade warning for linked records |
| AT2.9 | Cannot delete self | Delete button disabled for current admin |

## AT3 — Class Management

| ID | Action | Expected |
|----|--------|----------|
| AT3.1 | Navigate to `/admin/classes` | All classes listed with teacher names |
| AT3.2 | Create class | Name, select teacher(s), submit → class created |
| AT3.3 | Add co-teacher | Second teacher added to class |
| AT3.4 | Enroll students | Multi-select students, submit → StudentClass records |
| AT3.5 | Remove student from class | StudentClass record deleted |
| AT3.6 | Class detail shows roster | All enrolled students with XP/rank |

## AT4 — Curriculum Management

| ID | Action | Expected |
|----|--------|----------|
| AT4.1 | Navigate to `/admin/voyages` | All 20 voyages listed by sea |
| AT4.2 | Toggle voyage active/inactive | Voyage hidden from student map |
| AT4.3 | Adjust point value | Trial XP updated in DB |
| AT4.4 | Edit trial question/hint/answer | Changes saved, reflected on next page load |
| AT4.5 | Create curriculum template | Name template, select voyages, set due days |
| AT4.6 | Apply template to class | All template voyages assigned to class with due dates |

## AT5 — Economy Panel

| ID | Action | Expected |
|----|--------|----------|
| AT5.1 | Navigate to `/admin/economy` | All economy values displayed |
| AT5.2 | Change crown rate from 0.5 to 0.75 | New trials award 75% of XP as crowns |
| AT5.3 | Change shop item price | Price updates in tavern |
| AT5.4 | Change rank XP threshold | Next rank calculation uses new threshold |
| AT5.5 | Reset to defaults | All values revert to hardcoded defaults |

## AT6 — Parent Linking

| ID | Action | Expected |
|----|--------|----------|
| AT6.1 | Navigate to `/admin/parents` | Search interface for students |
| AT6.2 | Search student "Andrew" | Shows Andrew with current parents |
| AT6.3 | Link parent2 to Andrew | StudentParent record created |
| AT6.4 | Attempt 3rd parent link | Button disabled, tooltip "Max 2 parents" |
| AT6.5 | Unlink parent | StudentParent record deleted |

## AT7 — Analytics

| ID | Action | Expected |
|----|--------|----------|
| AT7.1 | Navigate to `/admin/analytics` | Dashboard with charts |
| AT7.2 | Select time range "7 days" | Data filters to 7-day window |
| AT7.3 | View per-sea completion | Bar chart with 4 seas |
| AT7.4 | View class comparison | Side-by-side class metrics |
| AT7.5 | Export CSV | Downloads CSV file with selected data |

---

## Execution Log

| Test | Result | Notes |
|------|--------|-------|
| AT1.1 | | |
| AT1.2 | | |
| AT1.3 | | |
| AT1.4 | | |
| AT1.5 | | |
| AT2.1 | | |
| AT2.2 | | |
| AT2.3 | | |
| AT2.4 | | |
| AT2.5 | | |
| AT2.6 | | |
| AT2.7 | | |
| AT2.8 | | |
| AT2.9 | | |
| AT3.1 | | |
| AT3.2 | | |
| AT3.3 | | |
| AT3.4 | | |
| AT3.5 | | |
| AT3.6 | | |
| AT4.1 | | |
| AT4.2 | | |
| AT4.3 | | |
| AT4.4 | | |
| AT4.5 | | |
| AT4.6 | | |
| AT5.1 | | |
| AT5.2 | | |
| AT5.3 | | |
| AT5.4 | | |
| AT5.5 | | |
| AT6.1 | | |
| AT6.2 | | |
| AT6.3 | | |
| AT6.4 | | |
| AT6.5 | | |
| AT7.1 | | |
| AT7.2 | | |
| AT7.3 | | |
| AT7.4 | | |
| AT7.5 | | |
