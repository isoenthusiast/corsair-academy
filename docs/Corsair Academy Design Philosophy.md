# Corsair Academy — Design Philosophy

**Last Updated:** July 26, 2026 (v5.0.0 — Curriculum rules, pass thresholds, grill me protocol)
**Stack:** Next.js 16 + Prisma 7 + PostgreSQL + NextAuth v5 + Tailwind CSS v3 + DeepSeek AI

> This is the single source of truth for all design decisions. When a new feature is proposed, it should be **grilled** (Q&A alignment), then **registered here** before building. See `CLAUDE.md` for the full development workflow.

---

## 1. Game Philosophy — "Corsair Academy"

### Theme & Identity

Corsair Academy is a **pirate-themed learning platform** for kids aged 7-14. Every aspect of the UI, mechanics, and language is filtered through the pirate lens:

- **Students** are "Cadets" embarking on voyages across four seas
- **Teachers** are "Captains" guiding their crew
- **Parents** are "First Mates" watching from the Captain's Quarters
- **Admins** are "Lord Admirals" commanding the fleet
- **XP** is measured in skulls (☠️), currency is crowns (🪙)
- **Content** lives in seas, voyages, islands, and trials — not worlds, quests, and challenges

### Visual Language

- **Color palette**: Deep navy (#1A1A2E), abyssal black (#0D1117), aged parchment (#F5E6C8), pirate gold (#F7C948), blood red (#8B0000)
- **Typography**: Pirata One for headings, system sans-serif for body
- **UI components**: Parchment cards with torn edges, treasure map backgrounds, nautical iconography
- **Animations**: Ship sway on hover, cannon fire on trial completion, treasure sparkle on rewards

### Economy

| Currency | Earned By | Spent On |
|----------|-----------|----------|
| **Crowns** 🪙 | Completing trials, voyages, streaks | Sea charms, ship upgrades |
| **Skulls** ☠️ | Trial performance (1-3 per trial) | Determines XP earned |
| **XP** | Sum of skulls across all attempts | Pirate rank progression |

### Pirate Ranks

```
Deckhand → Swabbie → Gunner → Boatswain → Quartermaster → First Mate → Captain → Commodore → Sea Lord
    0        100       300       600        1000          1500        2500       4000        6000
```

### Sea Charms (Power-Ups)

| Charm | Type | Effect |
|-------|------|--------|
| Whisper Scroll | whisper_scroll | Reveals a hint without skull penalty |
| Storm Pass | storm_pass | Skip a trial (no skulls, no penalty) |
| Fortune Wind | fortune_wind | Double crowns from next trial |
| Anchor Charm | anchor_charm | Freeze streak for 24 hours |

New students start with 50 🪙 and 3 Whisper Scrolls.

### Ship Upgrades (Permanent)

Effects stored as JSON on `ShipUpgrade.effects`. Applied multiplicatively in trial and voyage reward APIs.

| Upgrade | Cost | Effect |
|---------|------|--------|
| Reinforced Hull | 300 🪙 | xpMultiplier: 1.1 (+10% XP) |
| Crow's Nest | 500 🪙 | skullBonus: 1 (+1 skull per trial) |
| Treasure Hold | 1000 🪙 | crownMultiplier: 1.2 (+20% crowns) |
| Cannon Array | 2000 🪙 | hintPenaltyReduction: 1 (no skull loss for hints) |
| Phantom Sails | 5000 🪙 | timeBonus: 0.9 |

### Daily Streak Chests

Tiered rewards claimed via `/api/streak/claim`. Chests are one-time per streak milestone.

| Streak Day | Chest | Rewards |
|-----------|-------|---------|
| 3 | Bronze | 10 🪙 |
| 5 | Silver | 50 🪙 + 1 Whisper Scroll |
| 7 | Gold | 100 🪙 + 1 Storm Pass |
| 14 | Emerald | 200 🪙 + 1 Fortune Wind |
| 30 | Diamond | 500 🪙 + 1 Anchor Charm |

### Achievements

15 achievements across categories: Streak, Exploration, Mastery, Collection, Speed. Each awards crowns and appears as a badge on the Wanted Poster (profile).

---

## 2. Learning Philosophy

### Trial Design (Retrieval Practice)

Every trial follows the retrieval practice ladder:

| Type | Process | Weight | Example |
|------|---------|--------|---------|
| `multi_choice` | Recognition | ~40% | "Which of these be the correct spelling, sailor?" |
| `fill_blank` | Recall | ~35% | "Complete the pirate word: C _ P T A I N" |
| `puzzle` | Application | ~10% | "Decode the secret message using the cipher" |
| `open_ended` | Synthesis | ~15% | "Write a short sea shanty about fractions" |

### Trial Structure

Every trial: `type badge → question → options? → hint? → answer → explanation → points`

### Skull Rating (No Failure)

| Skulls | Meaning |
|--------|---------|
| ☠️ (1) | Attempted — always awarded. No failure state. |
| ☠️☠️ (2) | Correct answer |
| ☠️☠️☠️ (3) | Correct + no hints used + fast response |

Students always earn at least 1 skull. There is no failure — only different degrees of success.

### Key Rules

- Always show explanation (even for correct answers — reinforces learning)
- Hints always available, cost 1 skull from the rating
- Never same trial type >2 in a row (variety prevents fatigue)
- Pirate dual-coding on every question (theme + content pairing)
- No trick questions or progress gates

### Difficulty Arc (Per Sea)

```
⭐ Foundation → ⭐⭐ Building → ⭐⭐⭐ Applying → ⭐⭐⭐⭐ Mastering → ⭐⭐⭐⭐⭐ ⚔️ Gauntlet
```

### Captain's Gauntlet (Every 5th Voyage)

- Ends with `open_ended` trial
- 2× point values
- Bonus XP + crowns on completion
- Unlocks nothing (end of sea chain, not a gate)

### Streak System

- Consecutive days with ≥1 trial completed
- Streak freeze: Anchor Charm pauses the streak for 24h
- Streak protection: 2-day grace period after breaking
- Streak chests reward consistency

---

## 3. User Philosophy

### Roles & Scope

| Role | Home Route | Scope | Password |
|------|-----------|-------|----------|
| **Student** | `/map` | Self + enrolled classes | `andrew123` |
| **Teacher** | `/class/[id]` | Own classes only | `teach123` |
| **Parent** | `/captain` | Linked children (max 2) | `learning123` |
| **Admin** | `/admin` | Everything | `admin123` |

### Student Profile ("Wanted Poster")

Displays: pirate name, rank, total skulls, crowns, streak, sea charms inventory, ship upgrades, achievements, voyage progress map.

### Teacher Dashboard ("Captain's Quarters")

- Class roster with per-student stats
- Leaderboard (top 10 by XP)
- Assignment creation (voyage → class with due date)
- Announcements to class

### Parent View ("Captain's Fleet")

- All linked children with per-sea progress
- Crown balance + charm inventory per child
- Recent activity feed
- Max 2 parents per student

### Account Lifecycle

- **Create**: Admin via form or invite link (sets temp password)
- **First Login**: Forced password change
- **Active**: Normal access
- **Inactive**: Manual toggle by admin (preserves data)
- **Suspended**: Temporary disciplinary (auto-expires)
- **Soft Delete**: 30-day restore window, then hard delete

### Invite System

Admin generates time-limited invite links by role. Recipient sets name, username, password. Link expires after 7 days or on first use.

### Impersonation ("View as Student")

Admin generates HMAC-signed token → clears session → logs in as student. Banner on all pages: "👁️ Viewing as [Student]. [Return to Admiral]". Actions audit-logged.

---

## 4. Curriculum Philosophy

### Structure (v4.0 — Island System)

```
Sea (Subject Area, e.g., Mathematics)
└── Voyage (School Year, e.g., Year 1-11, mapping to IGCSE/National Syllabus)
    ├── Island 0: 🏁 Courage Challenge (Entry Exam — 10 questions)
    ├── Island 1-11: Monthly Units (5-10 trials each, sequential)
    └── Island 12: 👑 Boss Fight (Exit Exam — 10 questions)
```

### Island System — Core Mechanics

The Island system bridges syllabus-based education with gamified progression. Each voyage represents a school year; islands represent monthly units within that year. Two special islands gate advancement:

| Island | Position | Purpose | Questions | Pass Threshold |
|--------|----------|---------|-----------|----------------|
| **Courage Challenge** 🏁 | Island 0 (first) | Entry exam — tests existing competency | 10 exam-level | 80% (8/10) |
| **Monthly Islands** 🏝️ | Islands 1-11 | Regular learning units | 5 each | 60% (3/5) |
| **Boss Fight** 👑 | Island 12 (last) | Exit exam — proves mastery | 10 exam-level | 80% (8/10) |

### Advancement Mechanics

```
Student enters Voyage
    │
    ├─→ 🏁 Courage Challenge (Island 0)
    │       │
    │       ├─ 80%+ PASS → Skip voyage entirely
    │       │              Earn 50% XP/Crowns reward
    │       │              Unlock next voyage
    │       │
    │       └─ <80% FAIL → Play through islands
    │              │
    │              ├─→ 🏝️ Island 1 → 2 → ... → 11
    │              │
    │              └─→ 👑 Boss Fight (Island 12)
    │                      │
    │                      ├─ 80%+ PASS → Unlock next voyage
    │                      │
    │                      └─ <80% FAIL → Repeat all islands (1-11)
    │                                     AI-generated variant questions
    │                                     Unlimited attempts
```

### Design Rationale

- **Competency-based advancement**: Students who already know the material skip ahead via Courage Challenge, preventing boredom. This maps to real-world scenarios where a Year 12 student shouldn't waste time on Year 1 content.
- **Foundation building**: Students who fail the Courage Challenge play through islands sequentially. Even if the content is below their grade level, it reinforces foundations needed for higher years.
- **Mastery gating**: Boss Fight ensures genuine mastery before advancement. No student progresses to Year 11 without proving Year 10 competency.
- **Repeat with variety**: AI generates fresh questions on each repeat cycle. Students see different questions on the same learning objectives — repetition without monotony.
- **Reduced skip rewards**: Skipping via Courage Challenge grants 50% rewards. This balances fairness (competency is rewarded) with incentive (playing through earns more).

### Island Model

| Field | Purpose | Example |
|-------|---------|---------|
| `voyageId` | Parent voyage | Year 5 Mathematics |
| `title` | Display name | "Fractions & Decimals" |
| `type` | regular / courage_challenge / boss_fight | regular |
| `sortOrder` | Sequential position (0-12) | 3 |
| `syllabusTags` | Curriculum mapping (optional) | ["IGCSE-Math-Y5", "Fractions"] |
| `description` | Learning objectives for this island | "Add and subtract fractions with unlike denominators" |

Islands are **strictly sequential** within a voyage (`sortOrder` 0-12). No branching at the island level — branching happens at the voyage level (see Voyage Branching below).

### Trial Structure (Updated)

Trials now belong to Islands, not Voyages:

```
Island
└── Trial 1 (Question/Exercise)
├── Trial 2
└── Trial 3-5 (or 10 for exam islands)
```

### Courage Challenge & Boss Fight — Shared Traits

- Both are 10-question exams at voyage difficulty level
- Same difficulty, **different question pools** (entry tests readiness, exit tests mastery)
- Both auto-generated by AI with the voyage's subject context
- Both use `open_ended` + `multi_choice` mix for comprehensive assessment
- Pass threshold: 80% (8/10 correct)

### AI-Generated Variants on Repeat

When a student fails the Boss Fight and repeats islands:

1. AI generates fresh trials for each island based on the same learning objectives
2. Question types and difficulty remain consistent; specific questions change
3. Prevents memorization — students must demonstrate understanding, not recall

### Voyage Branching (Unchanged)

Branching still happens at the voyage level via `requiredVoyageId`:

```
Sea of Cunning
├── V1: Message in a Bottle (required)
├── V2: The Captain's Log (required, unlocks choice)
├── V3a: Parley & Persuasion (grammar path)
│   └── V4a → V5a ⚔️ Gauntlet
└── V3b: Sea Shanty Songwriting (creative path)
    └── V4b → V5b ⚔️ Gauntlet
```

### Voyage States (Unchanged)

| State | Visible To | Editable? |
|-------|-----------|-----------|
| **Draft** | Admin only | ✅ |
| **Published** | Everyone | ❌ (unpublish to edit) |
| **Deprecated** | Students who started it | ❌ |

### The Four Seas

| Sea | Icon | Subject |
|-----|------|---------|
| Sea of Cunning | 📚 | English / Language Arts |
| Sea of Whispers | 🀄 | Chinese / Languages |
| Sea of Navigation | 🧮 | Mathematics |
| Sea of Brews | 🔬 | Science |

### Voyage Metadata

| Field | Purpose | Example |
|-------|---------|---------|
| `title` | Display name | "Message in a Bottle" |
| `description` | Flavor text | "Decode secret messages & master the alphabet!" |
| `difficulty` | 1-5 ☠️ scale | 1 |
| `lifecycle` | Draft / Published / Deprecated | Draft |
| `objectives` | Learning goals | "Recognize all 26 letters and their sounds" |
| `estimatedMinutes` | Session length | 10 |
| `tags` | Searchable labels | ["phonics", "alphabet"] |
| `skills` | Competency tags | ["letter-recognition"] |
| `captainGauntlet` | Final voyage in sea | false |
| `prerequisiteKnowledge` | What student needs to know | "Knows letters A-M" |
| `successCriteria` | Pass condition | "Complete 5/5 trials" |

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

### Voyage States

| State | Visible To | Editable? |
|-------|-----------|-----------|
| **Draft** | Admin only | ✅ |
| **Published** | Everyone | ❌ (unpublish to edit) |
| **Deprecated** | Students who started it | ❌ |

### Trial Versioning

Every edit creates a `TrialVersion` snapshot: `{ trialId, versionNumber, question, options, answer, explanation, hint, points, editedBy, editedAt }`. Admin can view timeline and rollback (creates new version, never deletes history).

### Voyage Bundles

Named cross-sea collections. Teacher applies in one click. Example: "Pirate Starter Pack" = V1 from each sea.

---

## 5. Admin Philosophy

### Admin Role — "Lord Admiral"

**Commandments:**

1. See everything — all users, classes, data. No scope limits.
2. Control the curriculum — voyages/trials are shared. Admin manages source of truth.
3. Manage the economy — crown rates, shop prices, rank XP thresholds.
4. Orchestrate classes — create classes, assign teachers, enroll students.
5. Link families — connect students to parents (max 2).
6. Monitor health — analytics on engagement, completion, accuracy.

### Admin Pages

| Page | Purpose |
|------|---------|
| `/admin` | Dashboard — stats, recent users, classes, nav cards |
| `/admin/users` | User CRUD — create, edit role, reset password, adjust crowns/XP |
| `/admin/users/new` | Create user form |
| `/admin/users/[id]` | Edit user + soft delete/restore |
| `/admin/classes` | Class list + create |
| `/admin/classes/[id]` | Class detail — teachers, roster, stats |
| `/admin/voyages` | **Island-aware curriculum manager** — left: collapsible seas/voyages with prep progress (X/13 🏝️); right: scrollable island tabs (🏁0-11👑), per-island trial list with edit modals, ⚡ Prep All Islands bulk generation, AI grilling chat |
| `/admin/kanban` | **Kanban Board** — drag-and-drop task board with 4 columns, scope badges (Class/Trial/Admin), edit modal |
| `/admin/announcements` | System announcements — create + delete, role-targeted |
| `/admin/invites` | Invite link generation — role + expiry, copy/revoke |
| `/admin/economy` | Crown rates, shop prices, upgrade costs, rank thresholds |
| `/admin/parents` | Student-parent linking with 2-parent limit |
| `/admin/analytics` | Stats, per-sea completion, recent activity |
| `/admin/moderation` | Flagged trial queue — approve/remove |
| `/admin/settings` | App identity, maintenance mode, feature flags |
| `/admin/templates` | Curriculum bundles — create, apply to class |

### Kanban Board (v2.8.0)

Task board with 4 columns (Backlog → InProgress → Done → Archive), 5 card types (FlaggedTrial, Assignment, AITrial, SupportTicket, Task), drag-and-drop, role-scoped visibility. Each card has a `KanbanScope` (Class/Trial/Admin) that controls who sees it.

### Curriculum Manager v4.0 — Island-Aware

Split-panel layout with island-level management. Left panel: collapsible sea accordion with per-voyage prep indicators (X/13 🏝️). Right panel: scrollable horizontal island tab bar (🏁0-11👑) with trial count dots (●=has trials, ○=empty). Per-island trial generation with enforced counts (10 for exams, 5 for regular). ⚡ Prep All Islands bulk-generates trials for every empty island in a voyage sequentially.

### Pattern

Consistent admin feature pattern: Server Page + POST API + `redirect("/")` for auth guards (delegates to middleware for role-based routing). Never hardcode role-specific redirects.

---

## 6. AI Philosophy

### AI Features (5 built + 1 new)

| Feature | Model | Purpose |
|---------|-------|---------|
| **B1 — Trial Generation** | DeepSeek v4-pro | Generate 3-10 trials per island (5 regular, 10 exam). Includes all 4 types: multi_choice, fill_blank, puzzle, open_ended |
| **B2 — Tutor Chat** | DeepSeek v4-flash | "Captain Corsair" conversational tutor |
| **B3 — Grading** | DeepSeek v4-flash | Grade open-ended answers with feedback |
| **B4 — Adaptive Difficulty** | Rule-based | ±0.5 adjustments based on last 3-5 attempts |
| **B5 — Personalization** | Rule-based | Recommend next voyage by sea progress |

### AI Grilling Chat (v3.0.0) — NEW

Multi-turn conversation before generating trials. Admin describes intent → AI asks clarifying questions → iterate → AI signals `GENERATE_READY` → Generate button appears → trials created. Cheaper (v4-flash for chat, v4-pro for generation) and more precise than one-shot generation.

### AIContext Table

Stores AI conversation transcripts for audit, reuse, and analysis:

| Field | Purpose |
|-------|---------|
| `userId` | Who initiated |
| `content` | Markdown transcript |
| `appFeature` | trials, voyages, seas, kanban, announcements |
| `voyageId` / `seaId` | Optional FK links |
| `isFinal` | false = message, true = generation summary |

### AI Budget

- Chat messages (v4-flash): ~$0.14/1M input, ~$0.28/1M output — typical session ~$0.001
- Trial generation (v4-pro): more expensive, throttled
- 80% monthly budget → warning banner; 95% → AI disabled, manual-only

### Anti-Patterns

- ❌ AI replacing teachers — human in the loop
- ❌ Black-box grading — transparent skull feedback
- ❌ Burning budget on idle — all AI work is user-triggered
- ❌ Sending PII to AI — only trial content, no names/ages
- ❌ AI-generated content without pirate voice

---

## 7. Multi-User Architecture

### Authorization Flow

```
Browser → Middleware (Edge, Prisma-free) → Role-based redirect
         ├─ Admin → /admin
         ├─ Teacher → /class
         ├─ Parent → /captain
         └─ Student → /map
```

Auth guards use `redirect("/")` — the middleware is the single source of truth for role-based routing. Never hardcode role-specific home pages.

### Key Models

- **Class** — name, teacherId (1 per class)
- **ClassTeacher** — many-to-many: teacher ↔ class (co-teaching)
- **StudentClass** — many-to-many: student ↔ class
- **StudentParent** — many-to-many: student ↔ parent (max 2 per student)
- **Assignment** — voyage assigned to class with optional due date
- **Announcement** — teacher posts to class

---

## 8. Economy & Gamification Tuning

Admin can adjust via `/admin/economy`:

| Category | Settings |
|----------|----------|
| Crown Rates | Per-trial, per-voyage, streak multipliers |
| Shop Prices | Charm costs, upgrade costs |
| Rank Thresholds | XP per rank |
| Streak | Protection duration, freeze duration |
| Skulls | Multiplier (1☠️=1×, 2☠️=2×, 3☠️=3×) |
| Charms | Starting quantities for new students |

---

## 9. Content Moderation

Flagged AI-generated trial review at `/admin/moderation`:

- Sorted by flag count (most flagged first)
- Actions: Approve, Edit, Remove
- Auto-removal: 3+ flags → auto-remove
- Flag count tracked on Trial model

---

> **Related Documents:** `Corsair Academy App Design.md` (technical architecture, data model, API routes), `CURRICULUM.md` (trial design rules, subject profiles, pass thresholds), `ProjectLessonLearnt.md` (lessons learned), `TODO.md` (task tracker), `docs/test-plans/` (feature test plans)

---

## 10. Design Process — "Grill Me Protocol"

### How Design Decisions Are Made

Every new feature or design question follows a structured Q&A process called the **Grill Me Protocol**:

1. **Propose** — Present options with a recommended answer, citing logic and past decisions
2. **Grill** — Ask clarifying questions to expose edge cases and align understanding
3. **Register** — Document the decision in this file AND `CURRICULUM.md` (if content-related)
4. **Build** — Implement only after alignment is confirmed

### Recommendation Logic

When proposing solutions, the recommended answer is selected using these priority rules:

| Priority | Rule | Example |
|----------|------|---------|
| 1 | **Consistency** — match past decisions | User chose 80% for exams → recommend 80% |
| 2 | **Syllabus alignment** — map to IGCSE/year structure | 5 trials = school week, 12 islands = months |
| 3 | **Simplicity** — fewer models, fewer concepts | "Just another island" not "a separate BossFight entity" |
| 4 | **Pirate theme** — fit the metaphor | "Island" not "Module", "Crowns" not "Points" |
| 5 | **Scalability** — automate over manual | AI generation > manual content creation |

### Design Values

- **Student-first**: Every mechanic must benefit the learner — not the admin, not the teacher
- **No failure**: Minimum 1 skull always awarded. Progress, not punishment
- **Competency over seat time**: If you know it, prove it and move on
- **Mastery before advancement**: Can't progress without genuine understanding
- **AI as assistant**: Generates drafts, humans review and edit
- **Pirate lens on everything**: If it doesn't sound like a pirate would say it, reframe it
