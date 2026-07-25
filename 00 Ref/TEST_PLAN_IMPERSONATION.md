# Test Plan — Student Impersonation

**Feature:** A2 — Admin Student Impersonation
**Date:** 2026-07-26

---

## 1. Impersonation Initiation

| # | Test | Expected |
|---|------|----------|
| 1.1 | Admin views `/admin/users/[id]` for a Student | "🏴 Login as [name]" button visible |
| 1.2 | Admin views `/admin/users/[id]` for a Teacher | "🏴 Login as [name]" button visible |
| 1.3 | Admin views `/admin/users/[id]` for another Admin | Button hidden or disabled (can't impersonate admin) |
| 1.4 | Non-admin user navigates to user edit page | Redirected away (middleware) |
| 1.5 | Click "Login as [student]" | Session switches to that student, redirected to /map |

## 2. Impersonated Session

| # | Test | Expected |
|---|------|----------|
| 2.1 | After impersonation, page shows student's name in header | Student's name, not admin's |
| 2.2 | Student data loaded (XP, crowns, voyages, etc.) | Shows that student's actual data |
| 2.3 | Banner shows "Impersonating [name] — Return to Admin" | Gold banner at top of all pages |
| 2.4 | Navigating to /admin while impersonating | Redirected to /map (role is now Student) |
| 2.5 | Student game pages work while impersonating | /map, /voyage, /profile, /tavern, /ship all functional |
| 2.6 | Submitting a trial while impersonating | Trial attempt recorded under student's ID |

## 3. Ending Impersonation

| # | Test | Expected |
|---|------|----------|
| 3.1 | Click "Return to Admin" in impersonation banner | Session restored to admin, redirected to /admin |
| 3.2 | After return, admin dashboard shows admin's name | "Lord Admiral" in header |
| 3.3 | After return, all admin pages accessible | No role restrictions |
| 3.4 | Sign out while impersonating | Clears impersonation, signs out completely |
| 3.5 | Browser refresh while impersonating | Impersonation persists (maintained in JWT) |

## 4. Security & Edge Cases

| # | Test | Expected |
|---|------|----------|
| 4.1 | Direct POST to impersonate API as non-admin | 403 / redirect |
| 4.2 | Impersonate a non-existent user ID | Error handled gracefully |
| 4.3 | Impersonate self (admin impersonating own account) | Treated as normal login |
| 4.4 | Multiple impersonation attempts | Each replaces previous (no stacking) |
| 4.5 | Impersonation JWT contains `impersonatedBy` field | Admin's user ID stored for audit trail |

## 5. UI Consistency

| # | Test | Expected |
|---|------|----------|
| 5.1 | Impersonation banner matches pirate theme | Gold/amber colors, pirate icon |
| 5.2 | Banner appears on all non-admin pages | /map, /voyage, /profile, /tavern, /ship, /captain |
| 5.3 | Banner does NOT appear during normal admin session | Only when impersonating |
| 5.4 | "Login as" button matches btn-pirate style | Consistent with design system |
