# Corsair Academy — User Management Test Plan

**Date:** July 25, 2026 (v2.1.0)
**Scope:** Account creation, roles, status, password, bulk import, audit, impersonation

---

## UT1 — Account Creation

| ID | Action | Expected |
|----|--------|----------|
| UT1.1 | Admin creates student via form | User created, mustChangePassword=true, status=Active |
| UT1.2 | New student logs in first time | Forced to change password |
| UT1.3 | Admin generates invite link | Token created, 7-day expiry, copy-paste UI |
| UT1.4 | Recipient opens /invite/{token} | Form: name, username, password. Role pre-filled. |
| UT1.5 | Recipient submits invite form | Account created, status=Active, token consumed |
| UT1.6 | Expired invite link opened | "This invite has expired. Contact the Admiral." |
| UT1.7 | Already-used invite link opened | "This invite has already been used." |

## UT2 — User Status

| ID | Action | Expected |
|----|--------|----------|
| UT2.1 | Admin sets user to Inactive | User can't log in. "Account is inactive." |
| UT2.2 | Admin sets user to Suspended (3 days) | User sees "Suspended. Contact the Admiral." Auto-lifts after 3 days. |
| UT2.3 | Suspension auto-lifts | Status returns to Active. Login works. |
| UT2.4 | Admin restores Inactive → Active | Login works immediately. |
| UT2.5 | Status change audit logged | auditLog entry with old→new status |

## UT3 — Password Management

| ID | Action | Expected |
|----|--------|----------|
| UT3.1 | Admin creates user with temp password | mustChangePassword=true |
| UT3.2 | User logs in with temp password | Redirected to /change-password |
| UT3.3 | User sets new password | mustChangePassword=false, normal access |
| UT3.4 | Admin force-resets password | User gets new temp, mustChangePassword=true |
| UT3.5 | Forgot Password flow | Email sent with reset link (future) |

## UT4 — Bulk CSV Import

| ID | Action | Expected |
|----|--------|----------|
| UT4.1 | Upload valid CSV (5 students) | Preview shows 5 rows with auto-generated passwords |
| UT4.2 | Confirm import | 5 users created, enrolled in class, Streak+Charms set up |
| UT4.3 | Download credentials CSV | File: name, username, password |
| UT4.4 | Upload CSV with duplicate username | Validation error: "Username 'andrew' already exists" |
| UT4.5 | Upload CSV with invalid classId | Validation error: "Class 'X' not found" |
| UT4.6 | Upload CSV with age out of range | Validation error: "Age must be 5-18" |

## UT5 — Profile Editing

| ID | Action | Expected |
|----|--------|----------|
| UT5.1 | Student uploads avatar | Avatar displayed on profile + map header |
| UT5.2 | Student edits bio | "I love sea monsters!" saved |
| UT5.3 | Student selects favorite sea | Theme personalization weight updated |
| UT5.4 | Student sets learning goal | "Master multiplication" displayed on profile |
| UT5.5 | Admin edits crowns (+100) | CrownTransaction created, user.crowns += 100 |

## UT6 — Role Transition

| ID | Action | Expected |
|----|--------|----------|
| UT6.1 | Admin changes Student → Teacher | Class enrollments cleared. Progress data kept. Audit logged. |
| UT6.2 | Admin changes Teacher → Student | Classes show "Former Teacher." |
| UT6.3 | Admin can't demote last admin | Error: "Cannot remove the last Admin." |
| UT6.4 | Role change audit logged | auditLog: { action: "user.role_change", details: { old: "Student", new: "Teacher" } } |

## UT7 — Soft Delete

| ID | Action | Expected |
|----|--------|----------|
| UT7.1 | Admin soft-deletes user | deletedAt set. User can't log in. "Account not found." |
| UT7.2 | Deleted user visible in admin | Shows "Deleted" badge, restore button available |
| UT7.3 | Admin restores user within 30 days | deletedAt cleared. Login works. Data intact. |
| UT7.4 | 30 days pass | Cron hard-deletes: user + cascade all related records |

## UT8 — Impersonation

| ID | Action | Expected |
|----|--------|----------|
| UT8.1 | Admin clicks "View as Student" | Prompt for reason. Session switches. Banner visible. |
| UT8.2 | Admin sees student's exact view | Map, voyages, trials render as that student |
| UT8.3 | Admin attempts trial during impersonation | Blocked: "Impersonation mode — read only." |
| UT8.4 | Admin clicks "Exit Impersonation" | Returns to admin session. Audit logged. |

## UT9 — Search & Filter

| ID | Action | Expected |
|----|--------|----------|
| UT9.1 | Search "andrew" | Shows Andrew Wee |
| UT9.2 | Filter by role "Student" | Only students visible |
| UT9.3 | Filter by status "Active" | Only active users |
| UT9.4 | Sort by XP descending | Highest XP first |
| UT9.5 | Export filtered results | Downloads CSV |

---

## Execution Log

| Test | Result | Notes |
|------|--------|-------|
| UT1.1 | ⚠️ NOT BUILT | |
| ... | | |
