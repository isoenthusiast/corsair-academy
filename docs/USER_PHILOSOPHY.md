# Corsair Academy — User Management Philosophy

**Last Updated:** July 26, 2026 (v2.6.0 — Impersonation + Invite System)
**Related:** `ADMIN_PHILOSOPHY.md`, `LEARNING_PHILOSOPHY.md`, `APP_DESIGN.md`

---

## 1. Four Roles, One Crew

| Role | Purpose | Home Page | Scope |
|------|---------|-----------|-------|
| **Student** | The learner. Completes voyages, earns crowns, climbs ranks. | `/map` | Self + enrolled classes |
| **Teacher** | The guide. Manages classes, assigns voyages, monitors progress. | `/class/[id]` | Own classes only |
| **Parent** | The supporter. Views children's progress, no game actions. | `/captain` | Linked children (max 2) |
| **Admin** | The Admiral. Full control — users, curriculum, economy. | `/admin` | Everything |

---

## 2. Account Lifecycle

```
Created (by Admin or Invite Link)
  → Active (normal state)
  → Inactive (admin toggles — holiday, leave)
  → Suspended (temporary, auto-lifts at set date)
  → Soft Deleted (30-day restore window)
  → Hard Deleted (cron job after 30 days)
```

### Status Rules

- Inactive/Suspended users can't log in
- Suspension shows "Account suspended. Contact the Admiral."
- Data preserved in all non-deleted states
- Soft delete: `deletedAt` set, 30-day countdown, restorable
- Hard delete: cascades to all related records

---

## 3. Account Creation Flows

### Flow A: Admin Form

```
Admin fills: name, username, role, age, initial password
  → User created with mustChangePassword=true
  → First login forces password change
  → Account Active
```

### Flow B: Invite Link

```
Admin generates link → /invite/{token}
  → Shares via WhatsApp/email
  → Recipient opens link → sets name, username, password
  → Account created with pre-selected role
  → Link expires in 7 days or on first use
```

### Flow C: Student Impersonation (Admin Only)

```
Admin views user → clicks "🏴 Login as [name]"
  → API generates HMAC(userId.expiry) signed with AUTH_SECRET
  → Admin session cleared, redirected to /?impersonate=<token>
  → Login page auto-submits _impersonate_ credentials
  → JWT stores impersonatedBy field
  → All pages show "Impersonating [name] — Return to Admiral" banner
  → "Return to Admiral" signs out impersonated session
  → Token expires in 60 seconds
```

**Security:** Cannot impersonate admin accounts. HMAC signature prevents token forgery. Short expiry prevents replay attacks.

### Flow C: Bulk CSV Import

```
Admin uploads CSV: name, username, age, classId
  → System validates (unique usernames, valid class, age 5-18)
  → Preview table with auto-generated passwords
  → Confirm → creates users + enrolls in class + sets up Streak/Charms
  → Downloads credentials CSV for distribution
```

---

## 4. User Profile (Rich)

| Field | Who Edits | Purpose |
|-------|-----------|---------|
| `name` | Admin | Display name |
| `username` | Admin | Login credential |
| `passwordHash` | User (via reset) / Admin (initial) | Authentication |
| `role` | Admin | Permission level |
| `status` | Admin | Active/Inactive/Suspended |
| `avatarUrl` | Student (upload) / Admin | Identity expression |
| `age` | Admin | Difficulty adaptation |
| `bio` | Student | "I love sea monsters! 🐙" |
| `favoriteSea` | Student | Theme personalization |
| `learningGoals` | Student + Parent | "Master multiplication by December" |
| `crowns` | System (+ Admin adjust) | Spendable currency |
| `pirateRank` | System (computed from XP) | Progression marker |

---

## 5. Password Management

- Admin sets initial password on creation
- `mustChangePassword` flag forces change on first login
- Self-service "Forgot Password" via email (future)
- Admin can force-reset any password → user gets temp
- Passwords hashed with bcrypt (10 rounds)

---

## 6. Role Transition

Changing roles is instant, no warnings, audit logged:

| From → To | What Happens |
|-----------|-------------|
| Student → Teacher | Class enrollments cleared. Progress data kept. |
| Teacher → Student | Classes marked "Former Teacher." New teacher can claim. |
| Parent → (any) | StudentParent links archived. |
| Any → Admin | Full access granted immediately. |
| Admin → (any) | Admin privileges revoked. Can't delete last admin. |

---

## 7. Student-Parent Linking

- Admin links at `/admin/parents`
- Search student → see current parents (0-2) → search parent → Link
- Max 2 parents per student (enforced in UI + DB `@@unique`)
- Unlinking removes StudentParent record (no cascade)
- Audit logged: who linked/unlinked whom
- At account creation: admin can link parents in same form

---

## 8. Bulk Operations

| Operation | Method |
|-----------|--------|
| Create many students | CSV upload (see §3 Flow C) |
| Enroll many in class | Multi-select students → "Add to Class" |
| Change status (many) | Checkbox select → "Set Inactive" |
| Export user list | Download filtered results as CSV |

---

## 9. Audit & Security

### Audit Log

Every admin action is recorded: `{ userId, action, targetId, details, ipAddress, createdAt }`

Tracked actions: user.create, user.edit, user.delete, user.restore, user.impersonate, user.role_change, user.password_reset, parent.link, parent.unlink

### Login History

Every login attempt: `{ userId, ipAddress, userAgent, success, createdAt }`

### Impersonation

- Admin clicks "👁️ View as Student" → enters reason → session switches
- Banner: "👁️ Viewing as Andrew Wee. [Exit Impersonation]"
- All actions during impersonation tagged in audit log
- Cannot earn XP/crowns while impersonating (sandboxed)

---

## 10. Search & Filter

- **Search**: type name or username, live results
- **Filters**: role, status, class, sea progress % (slider), last active (date range)
- **Sort**: name, role, XP, crowns, last login, streak
- **Pagination**: 20 per page
- **Export**: filtered results → CSV download

---

## 11. Anti-Patterns (Users)

- ❌ **Orphaned students** — warn before deleting last linked parent
- ❌ **Last admin deletion** — can't delete/change role of the sole admin
- ❌ **Silent role changes** — all role transitions are audit logged
- ❌ **Exposed credentials** — passwords never shown after creation, only downloadable once
- ❌ **Impersonation without trace** — reason required, audit logged, banner visible
