# Corsair Academy — Admin Design Philosophy

**Last Updated:** July 25, 2026 (v2.1.0)
**Related:** `GAME_PHILOSOPHY.md`, `LEARNING_PHILOSOPHY.md`, `APP_DESIGN.md`

---

## 1. Admin Role — "Lord Admiral"

The Admin is the **system owner** — full visibility, full control. They manage users, curriculum, classes, economy, and analytics. Unlike teachers (scoped to their classes) or parents (scoped to their children), the Admin has **no filters**.

### Admin Commandments

1. **See everything** — all users, all classes, all data. No scope limits.
2. **Control the curriculum** — voyages/trials are shared. Admin manages the source of truth.
3. **Manage the economy** — crown rates, shop prices, rank XP thresholds, charm costs.
4. **Orchestrate classes** — create classes, assign teachers (co-teaching supported), enroll students.
5. **Link families** — admin connects students to parents (max 2).
6. **Monitor health** — analytics on engagement, completion, accuracy.

---

## 2. Admin Pages

| Page | Purpose | Priority |
|------|---------|----------|
| `/admin` | Dashboard — overview stats, quick-action cards | P0 (built) |
| `/admin/users` | User table — CRUD: create, edit role, reset password, adjust crowns/XP | P1 |
| `/admin/users/[id]` | Single user editor | P1 |
| `/admin/classes` | Class manager — create, assign teachers, enroll students | P1 |
| `/admin/classes/[id]` | Class detail — roster, co-teachers, assignments | P2 |
| `/admin/voyages` | Curriculum list — toggle active, adjust points, reorder | P1 |
| `/admin/voyages/[id]` | Voyage editor — edit trials inline | P2 |
| `/admin/economy` | Economy panel — prices, rates, XP thresholds | P2 |
| `/admin/parents` | Parent linking — search student, link parents, enforce 2-parent limit | P1 |
| `/admin/analytics` | Analytics suite — completion %, avg skulls, class comparison | P2 |
| `/admin/templates` | Curriculum templates — create, edit, one-click apply to class | P2 |

---

## 3. User Management

### Capabilities

- **Create** — new user via form or invite link. Admin sets initial password.
- **Edit** — all fields: name, username, role, status, age, avatar, bio, crowns
- **Delete** — soft delete (30-day restore window, then hard delete)
- **Bulk import** — CSV upload for creating many student accounts at once
- **Invite** — generate copy-paste link, expires in 7 days, user sets own password
- **Impersonate** — "View as Student" with reason logging
- **Search** — name/username search + role/status/class/sea progress filters + sortable columns

### User Model (Extended)

```prisma
model User {
  // Existing
  id, name, username, passwordHash, role, avatarUrl, age, crowns, pirateRank
  
  // New
  status        String   @default("Active")   // Active | Inactive | Suspended
  bio           String?                        // "I love sea monsters!"
  favoriteSea   String?                        // Sea of Cunning, etc.
  learningGoals String?                        // "Master multiplication by December"
  deletedAt     DateTime?                      // Soft delete timestamp
  
  // New relations
  auditLog      AuditLog[]
  loginHistory  LoginHistory[]
  createdInvites InviteLink[]
  usedInvite    InviteLink?  @relation("InviteUsedBy")
}
```

### Account Creation Flow

```
Admin fills form → User created with temp password + Active status
                      ↓
              User logs in → Forced to change password on first login
                      ↓
              Normal access

--- OR ---

Admin generates invite link → Copy-pastes to WhatsApp/email
                      ↓
              Recipient clicks /invite/{token} → Sets name, username, password
                      ↓
              Account created with chosen role, Active status
                      ↓
              Link expires after 7 days or on first use
```

### User Statuses

| Status | Can Login? | Data | Use Case |
|--------|-----------|------|----------|
| **Active** | ✅ | Fully accessible | Normal state |
| **Inactive** | ❌ | Preserved | Student on holiday, teacher on leave |
| **Suspended** | ❌ | Preserved, auto-expires | Temporary disciplinary |

- Suspended users show "Account suspended. Contact the Admiral." on login
- Admin sets suspension with optional auto-lift date
- Changing status logs to audit trail

### Password Management

- Admin sets initial password on account creation
- First login forces password change (flag: `mustChangePassword Boolean`)
- "Forgot Password" sends reset link to email (future: needs email service)
- Admin can force reset any user's password → user gets new temp

### Bulk Student Import (CSV)

Template columns:

```
name,username,age,classId
Andrew Wee,andrew,10,class-pirate-101
Sally Swashbuckler,sally,9,class-pirate-101
```

On upload:

1. Validate: usernames unique, classId exists, age 5-18
2. Preview table: shows what will be created + auto-generated passwords
3. Confirm → creates users + StudentClass records + Streak + SeaCharm defaults
4. Download credentials CSV: `name,username,password` — admin shares with parents

### Role Change — Clean Transition

- Role changes immediately. Old data stays.
- Student → Teacher: class enrollments cleared. Progress data kept (for reference).
- Teacher → Student: classes taught become "Former Teacher" (read-only for new teacher).
- No warning modals. Just do it. Audit logged.

### Soft Delete

- Sets `deletedAt = now()`. User can't log in.
- Data preserved for 30 days. Admin can restore.
- After 30 days, cron job hard-deletes: user + all related records cascade.
- Parents linked to deleted student: link marked as "archived."

### Audit Trail

```prisma
model AuditLog {
  id        String   @id @default(cuid())
  userId    String   // Who performed the action
  action    String   // "user.create", "user.edit", "user.delete", "user.impersonate"
  targetId  String?  // Who/what was affected
  details   String?  // JSON: { field: "role", old: "Student", new: "Teacher" }
  ipAddress String?
  createdAt DateTime @default(now())
}

model LoginHistory {
  id        String   @id @default(cuid())
  userId    String
  ipAddress String?
  userAgent String?
  success   Boolean
  createdAt DateTime @default(now())
}
```

### Search & Filter

- Search bar: type name or username, live results
- Filters: role (dropdown), status (dropdown), class (dropdown), sea progress % (slider)
- Sortable columns: name, role, XP, crowns, last login, streak
- Pagination: 20 per page
- "Export Results" → downloads filtered view as CSV

---

## 4. Curriculum Management

### Philosophy

The `prisma/seed.ts` file is the **source of truth** for curriculum structure. The admin UI provides **runtime controls** and a full trial editor.

### Trial Editor — Full-Page

Route: `/admin/voyages/[voyageId]/trials/[trialId]`

Each trial gets a dedicated page with:

- All 6 fields editable (question, options, answer, explanation, hint, points)
- **Preview panel** — renders trial exactly as student sees it (parchment scroll)
- **AI suggestions** — "Improve hint" or "Generate distractor" buttons
- **Version history** — sidebar shows all previous versions, click to view, button to rollback
- **Save** — changes live immediately (no draft/publish)

### Version History

- Every edit creates a `TrialVersion` record: `{ trialId, versionNumber, question, options, answer, explanation, hint, points, editedBy, editedAt }`
- Admin can view version timeline, diff between versions, rollback to any version
- Rollback creates a NEW version (never deletes history)

### Bulk Operations

| Operation | How |
|-----------|-----|
| Reorder voyages | Drag-and-drop in sea view |
| Reorder trials | Drag-and-drop in voyage view |
| Delete trial | Checkbox multi-select → "Delete Selected" |
| Duplicate voyage | "Clone" button — copies voyage + all trials |
| Move trial | "Move to..." dropdown → select target voyage |
| CSV Export | Download all trials as CSV (template format) |
| CSV Import | Upload CSV → validate → preview → confirm import |

### CSV Template Format

Admin downloads a per-voyage template pre-filled with `voyageId` and `difficulty`:

```
voyageId,type,question,options,answer,explanation,hint,points,difficulty
sea-of-cunning-message-in-a-bottle,multi_choice,"What is...","[""A"",""B"",""C"",""D""]","B","Because...","Think about...",10,1
```

### Voyage Branching

```
Sea of Cunning
├── V1: Message in a Bottle (required)
├── V2: The Captain's Log (required, unlocks choice)
├── V3a: Parley & Persuasion (grammar path)
│   └── V4a → V5a ⚔️ Gauntlet
└── V3b: Sea Shanty Songwriting (creative path)
    └── V4b → V5b ⚔️ Gauntlet
```

- Student chooses branch after V2
- Each branch has its own V3→V4→V5
- Sea is "mastered" when ANY path's gauntlet is completed
- `branchParentId` + `branchLabel` fields on Voyage model

### Voyage Metadata

| Field | Purpose | Example |
|-------|---------|---------|
| `objectives` | Learning goals | "Recognize all 26 letters and their sounds" |
| `estimatedMinutes` | Session length | 10 |
| `tags` | Searchable labels | ["phonics", "alphabet"] |
| `skills` | Competency tags | ["letter-recognition"] |
| `prerequisiteKnowledge` | What student needs to know | "Knows letters A-M" |
| `successCriteria` | Pass condition | "Complete 5/5 trials" |

### Voyage States

| State | Visible To | Editable? |
|-------|-----------|-----------|
| **Draft** | Admin only | ✅ |
| **Published** | Everyone | ❌ (unpublish to edit) |
| **Deprecated** | Students who started it | ❌ |
| **A/B Test** | Random 50% of students | ❌ |

A/B testing: two voyages with same `branchParentId`, different `abTestGroup`. Auto-compare after 50 students. Winner → Published, loser → Deprecated.

### Trial Composition Guidelines

Admin sees soft warnings (not blocks):

- ⚠️ < 5 trials (recommended: exactly 5)
- ⚠️ No fill_blank (recommended: ≥1 for recall)
- ⚠️ 3+ consecutive multi_choice (recommended: alternate)
- ⚠️ Gauntlet final trial not open_ended (strongly recommended)

### Voyage Bundles

Admin creates named cross-sea bundles. Teacher applies in one click.

```
"Pirate Starter Pack"
├── V1 from Sea of Cunning
├── V1 from Sea of Whispers
├── V1 from Sea of Navigation
└── V1 from Sea of Brews
```

### Student Impersonation

- Admin clicks "👁️ View as Student" on any student row
- Enters reason (audit logged)
- Admin session switches to student view — sees exact map, voyages, trials as that student
- Banner at top: "👁️ Viewing as Andrew Wee. [Exit Impersonation]"
- All actions during impersonation are tagged in audit log
- Cannot earn XP/crowns while impersonating (read-only or sandboxed)

---

## 5. AI Integration Points

See `AI_PHILOSOPHY.md` for full AI design:

- **AI-graded open-ended trials** — DeepSeek evaluates essay responses
- **AI-generated trials** — infinite variety from prompt templates
- **AI tutor chat** — conversational help for stuck students
- **Adaptive difficulty** — auto-adjusts based on performance

---

## 8. Analytics Suite

### Metrics Tracked

| Category | Metrics |
|----------|---------|
| **Engagement** | Daily active users, trials completed/day, average session length |
| **Completion** | Per-sea completion %, voyage completion rate, gauntlet pass rate |
| **Accuracy** | Average skulls per trial, % correct by trial type, hint usage rate |
| **Progression** | Rank distribution, XP growth over time, voyage unlock velocity |
| **Comparison** | Class vs class, student vs class average, sea vs sea |
| **Economy** | Crown earn rate, shop purchase frequency, most popular charms |

### Display

- Time-range selector (7d, 30d, 90d, all time)
- Export to CSV for all tables
- Visual charts (completion bars, XP line graphs, skull distribution)

---

## 9. Parent Linking

### Flow

1. Admin navigates to `/admin/parents`
2. Search for a student by name
3. See currently linked parents (0, 1, or 2)
4. Search for parent accounts by name
5. Click "Link" — creates StudentParent record
6. If 2 parents already linked, "Add" button disabled with tooltip: "Maximum 2 parents reached"

### Rules

- Max 2 parents per student (enforced in UI + DB unique constraint)
- Parent must have role `Parent`
- Unlinking removes the StudentParent record (no cascade)
- Audit log tracks all link/unlink actions

---

## 10. Notifications — System Announcements

Admin posts to a global notice board visible on all users' home pages.

- Banner at top of each user's home page, dismissible per-user
- Color-coded: info (blue), celebration (gold), maintenance (red)
- Target: all users or specific role
- Optional expiry date
- Max 1 active announcement per role at a time

---

## 11. Gamification Tuning Panel

| Category | Settings |
|----------|----------|
| **Achievements** | Thresholds (e.g., "3-day streak" → change to 5-day) |
| **Chest Rewards** | Crowns per streak day, item drop rates |
| **Streak** | Protection duration, freeze charm duration, max protection days |
| **Skulls** | Multipliers (1☠️=1×, 2☠️=2×, 3☠️=3× points) |
| **Ranks** | XP thresholds per rank, rank names |
| **Charms** | Starting quantities for new students |

Changes take effect immediately, all audit logged, "Reset to Defaults" per category.

---

## 12. System Settings

| Category | Examples |
|----------|----------|
| **App Identity** | App name, logo URL, favicon, meta description |
| **Maintenance Mode** | Custom message, admin bypass |
| **Feature Flags** | Toggle: AI generation, tutor chat, grading, shop, registrations |
| **Theming** | Primary color, font, custom CSS snippet, preview mode |

---

## 13. Content Moderation

Flagged AI-generated trial review queue at `/admin/moderation`:

- Sorted by flag count (most flagged first)
- Actions: Approve (dismiss), Edit (fix), Remove (delete from pool)
- Auto-removal: 3+ flags → auto-remove (configurable threshold)
- Analytics: flag rate, most flagged types, top flagging students

---

## 14. Anti-Patterns (Admin)

- ❌ **Admin playing the game** — admin can view student pages but should not complete trials (muddies analytics)
- ❌ **Direct DB manipulation** — all changes go through API routes with validation
- ❌ **Silent economy changes** — all crown adjustments create audit records
- ❌ **Orphaned students** — deleting a parent warns if they're the only parent linked to a student
- ❌ **Curriculum drift** — seed file and DB must stay in sync; admin UI warns when seed has changes not reflected in DB
