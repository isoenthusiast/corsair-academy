# Security Issues — Corsair Academy Audit

Findings related to authentication, authorization, session management, and data access.

---

## Critical

### S1: Account status not enforced on login

**Location:** [src/lib/auth.ts](../../corsair-app/src/lib/auth.ts) `authorize()`

**Issue:** The normal authentication branch returns the user after password validation without checking `status`, `mustChangePassword`, or `deletedAt`.

**Impact:**
- Inactive users can log in.
- Suspended users can log in.
- Soft-deleted users can log in.
- Users required to change password can log in with old credentials.

**Fix:**
```typescript
if (user.status !== "Active" || user.deletedAt) return null;
// Optionally redirect mustChangePassword users to a forced change flow
```

---

### S2: Client-supplied `userId` in gameplay APIs

**Locations:**
- [src/app/api/trials/attempt/route.ts](../../corsair-app/src/app/api/trials/attempt/route.ts)
- [src/app/api/shop/buy/route.ts](../../corsair-app/src/app/api/shop/buy/route.ts)
- [src/app/api/shop/buy-upgrade/route.ts](../../corsair-app/src/app/api/shop/buy-upgrade/route.ts)
- [src/app/api/voyages/complete/route.ts](../../corsair-app/src/app/api/voyages/complete/route.ts)

**Issue:** These endpoints read `userId` from the request body or form data instead of deriving it from the authenticated session.

**Impact:** Any authenticated user can submit trials, complete voyages, or spend crowns on behalf of another user.

**Fix:** Use `const session = await auth(); const userId = session.user.id;` in each route handler.

---

## High

### S3: Economy and Settings APIs lack auth checks

**Locations:**
- [src/app/api/admin/economy/route.ts](../../corsair-app/src/app/api/admin/economy/route.ts)
- [src/app/api/admin/settings/route.ts](../../corsair-app/src/app/api/admin/settings/route.ts)

**Issue:** Neither route calls `auth()` to verify the caller is an admin. Combined with being stubs, they are also non-functional, but if persistence is added without auth checks, any logged-in user (or unauthenticated caller, depending on middleware) could modify economy/settings.

**Fix:** Add `const session = await auth(); if (session?.user?.role !== "Admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });`.

---

### S4: Admin can change own role, potentially locking out last admin

**Location:** [src/app/api/admin/users/update/route.ts](../../corsair-app/src/app/api/admin/users/update/route.ts)

**Issue:** No guard prevents an admin from changing their own role to `Student` or `Teacher`, or prevents demoting the only remaining admin.

**Impact:** Accidental or malicious self-lockout from admin panel.

**Fix:** Block role changes on the current session user; count remaining admins before demoting.

---

### S5: No rate limiting on login or AI endpoints

**Issue:** `LoginHistory` exists but is unused. No rate limiting or brute-force protection on `/api/auth/[...nextauth]`, `/api/trials/grade`, or `/api/admin/voyages/[id]/generate-trials`.

**Impact:**
- Credential stuffing attacks.
- AI API abuse / unexpected cost spikes.

**Fix:** Implement login attempt tracking and exponential lockout. Add per-user or per-IP rate limits on AI endpoints.

---

## Medium

### S6: Impersonation actions not audit-logged

**Location:** [src/app/api/admin/impersonate/route.ts](../../corsair-app/src/app/api/admin/impersonate/route.ts)

**Issue:** Starting impersonation does not write to `AuditLog`.

**Impact:** No traceability of admin "view as student" actions.

**Fix:** Write `AuditLog` record with action `"impersonate_start"`, target student ID, and admin ID.

---

### S7: No IP address captured for login history

**Issue:** `LoginHistory` model has `ipAddress` and `userAgent` fields but is never written.

**Impact:** Cannot investigate suspicious logins or enforce geo/IP-based alerts.

**Fix:** Write `LoginHistory` on each successful and failed login attempt.

---

### S8: Shop forms expose `userId` in hidden inputs

**Locations:** [tavern/page.tsx](../../corsair-app/src/app/tavern/page.tsx), [ship/page.tsx](../../corsair-app/src/app/ship/page.tsx)

**Issue:** Hidden form inputs include `name="userId" value={user.id}`. Even if API is fixed to use session, these fields are misleading and could be reintroduced later.

**Fix:** Remove hidden `userId` inputs; derive from session server-side.

---

## Low

### S9: Impersonation token 60s expiry

**Issue:** Token is short-lived, but the login page auto-submits immediately upon receiving a token. Acceptable risk.

---

### S10: CSRF protection relies on NextAuth defaults

**Assessment:** NextAuth v5 provides CSRF protection for its own endpoints. Form actions to custom API routes (`/api/shop/buy`) use standard same-origin policy. Acceptable for current threat model.

---

## Security Summary

| Severity | Count | Top Issues |
|----------|-------|------------|
| Critical | 2 | Account status bypass, client-supplied userId |
| High | 4 | Stub API auth, admin self-lockout, no rate limiting |
| Medium | 3 | Missing audit logs, exposed hidden userId |
| Low | 2 | Minor |

**Priority fix order:** S1 → S2 → S3 → S4 → S5 → S6/S7.
