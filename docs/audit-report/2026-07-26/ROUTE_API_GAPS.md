# Route & API Gaps — Corsair Academy Audit

Comparison of documented routes/APIs against the as-built app.

---

## Route Map

### Documented in App Design §3

| Route | Exists | Notes |
|-------|--------|-------|
| `/` | ✅ | Login page |
| `/map` | ✅ | Student treasure map |
| `/voyage/[id]` | ✅ | Trial player |
| `/profile` | ✅ | Wanted poster |
| `/tavern` | ✅ | Sea charm shop |
| `/ship` | ✅ | Ship upgrades |
| `/class` | ✅ | Class list / redirect |
| `/class/[id]` | ✅ | Teacher class dashboard |
| `/captain` | ✅ | Parent fleet view |
| `/invite/[token]` | ✅ | Invite acceptance |
| `/admin` | ✅ | Admin dashboard |
| `/admin/users` | ✅ | User list |
| `/admin/users/new` | ✅ | Create user |
| `/admin/users/[id]` | ✅ | Edit user |
| `/admin/classes` | ✅ | Class list |
| `/admin/classes/new` | ✅ | Create class |
| `/admin/classes/[id]` | ✅ | Class detail |
| `/admin/voyages` | ✅ | Split-panel curriculum manager |
| `/admin/voyages/[id]` | ⚠️ | No dedicated page; replaced by split-panel. Acceptable by v3.0 design. |
| `/admin/voyages/[id]/trials/[trialId]` | ⚠️ | No dedicated page; trial edit moved to modal. Acceptable by v3.0 design. |
| `/admin/kanban` | ✅ | Kanban board |
| `/admin/announcements` | ✅ | System announcements |
| `/admin/invites` | ✅ | Invite links |
| `/admin/economy` | ✅ | UI page exists |
| `/admin/parents` | ✅ | Parent linking |
| `/admin/analytics` | ✅ | Analytics dashboard |
| `/admin/moderation` | ✅ | Flagged trial queue |
| `/admin/settings` | ✅ | UI page exists |
| `/admin/templates` | ✅ | Curriculum bundles |

### Undocumented but Present

| Route | Notes |
|-------|-------|
| `/admin/voyages/[id]/trials` | Possibly a legacy route; needs verification. |
| `/learn`, `/parent` | Empty/unused route directories found in source tree. Should be removed or redirected. |

---

## API Map

### Core APIs

| Route | Method | Exists | Notes |
|-------|--------|--------|-------|
| `/api/auth/[...nextauth]` | GET/POST | ✅ | Runtime `nodejs` correctly declared. |
| `/api/trials/attempt` | POST | ⚠️ | Functional but accepts client `userId`. |
| `/api/trials/grade` | POST | ✅ | AI grading for open-ended. |
| `/api/voyages/complete` | POST | ✅ | Functional but accepts client `userId`. |
| `/api/shop/buy` | POST | ⚠️ | Functional but accepts client `userId` via form. |
| `/api/shop/buy-upgrade` | POST | ⚠️ | Functional but accepts client `userId` via form. |
| `/api/invite/accept` | POST | ✅ | Invite acceptance. |
| `/api/tutor/chat` | POST | ✅ | Captain Corsair tutor. |
| `/api/adaptive/check` | POST | ⚠️ | Mutates global `Voyage.difficulty`. |
| `/api/personalize/recommend` | GET | ✅ | Recommendation engine. |

### Admin APIs — Curriculum

| Route | Method | Exists | Notes |
|-------|--------|--------|-------|
| `/api/admin/voyages/[id]` | GET | ✅ | Voyage detail with trials. |
| `/api/admin/voyages/[id]/ai-chat` | POST | ✅ | AI grilling chat. |
| `/api/admin/voyages/[id]/generate-trials` | POST | ✅ | DeepSeek trial generation. |
| `/api/admin/voyages/update` | POST | ✅ | JSON-based voyage metadata update. |
| `/api/admin/trials/update` | POST | ✅ | JSON-based trial update + version snapshot. |

### Admin APIs — Kanban

| Route | Method | Exists | Notes |
|-------|--------|--------|-------|
| `/api/admin/kanban` | GET/POST | ✅ | List/create cards. |
| `/api/admin/kanban/[id]` | PATCH | ✅ | Update status/fields. |

### Admin APIs — AI Context

| Route | Method | Exists | Notes |
|-------|--------|--------|-------|
| `/api/admin/ai-context` | GET/POST | ✅ | Exists but no UI consumer. |

### Admin APIs — Users / Classes / Security

| Route | Method | Exists | Notes |
|-------|--------|--------|-------|
| `/api/admin/users/create` | POST | ✅ | Create user. |
| `/api/admin/users/update` | POST | ✅ | Update user. |
| `/api/admin/users/reset-password` | POST | ✅ | Reset password. |
| `/api/admin/users/delete` | POST | ✅ | Soft delete. |
| `/api/admin/users/restore` | POST | ✅ | Restore user. |
| `/api/admin/classes/create` | POST | ✅ | Create class. |
| `/api/admin/classes/add-teacher` | POST | ✅ | Add co-teacher. |
| `/api/admin/classes/enroll` | POST | ✅ | Enroll student. |
| `/api/admin/announcements/create` | POST | ✅ | Create announcement. |
| `/api/admin/announcements/delete` | POST | ✅ | Delete announcement. |
| `/api/admin/invites/create` | POST | ✅ | Generate invite. |
| `/api/admin/invites/revoke` | POST | ✅ | Revoke invite. |
| `/api/admin/impersonate` | POST | ✅ | Start impersonation. |
| `/api/admin/impersonate/stop` | POST | ✅ | Stop impersonation. |
| `/api/admin/parents/link` | POST | ✅ | Link parent. |
| `/api/admin/parents/unlink` | POST | ✅ | Unlink parent. |
| `/api/admin/moderation/approve` | POST | ✅ | Approve flagged trial. |
| `/api/admin/moderation/remove` | POST | ✅ | Remove flagged trial. |
| `/api/admin/templates/create` | POST | ✅ | Create bundle. |
| `/api/admin/templates/apply` | POST | ✅ | Apply bundle to class. |

### Admin APIs — Broken / Stub

| Route | Method | Status | Notes |
|-------|--------|--------|-------|
| `/api/admin/economy` | GET/POST | ❌ Stub | Only logs to console; no persistence. |
| `/api/admin/economy/reset` | POST | ⚠️ | Exists but likely no-op or destructive without model. |
| `/api/admin/settings` | POST | ❌ Stub | Only logs to console; no persistence. |

---

## Redirect Audit

Per [ProjectLessonLearnt.md](../../ProjectLessonLearnt.md), the rule is: **all auth guards should `redirect("/")`; never hardcode role-specific home routes.**

### Findings

| File | Redirect | Severity | Notes |
|------|----------|----------|-------|
| [src/app/class/page.tsx](../../corsair-app/src/app/class/page.tsx#L35) | `redirect(`/class/${classes[0].id}`)` | **High** | Only non-guard hardcoded role-specific redirect found. Violates project rule. |
| [src/app/page.tsx](../../corsair-app/src/app/page.tsx#L33) | `router.push("/")` | Low | After impersonation login; middleware routes from `/`. |
| [src/app/page.tsx](../../corsair-app/src/app/page.tsx#L46) | `router.push("/")` | Low | After normal login; middleware routes from `/`. |
| All admin pages | `redirect("/")` | ✅ | Correct. |
| [src/middleware.ts](../../corsair-app/src/middleware.ts) | Role→home map | Note | Middleware itself maps roles to home routes, which is its documented purpose. |

### Recommendation

Convert `/class/page.tsx` single-class redirect into a server-side redirect to `/` (letting middleware route the user back to `/class` immediately, then showing the list), or render the single class via a Link instead of a redirect. Avoid hardcoding `/class/${id}`.

---

## Summary

- **Routes:** Good coverage. Legacy `/admin/voyages/[id]` pages intentionally replaced by split-panel.
- **APIs:** Economy and settings are stubs. Core gameplay APIs have privilege-escalation risk via client `userId`.
- **Redirects:** One violation in `/class/page.tsx`.
