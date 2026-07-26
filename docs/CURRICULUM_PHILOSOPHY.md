# Corsair Academy — Curriculum & Voyage Philosophy

**Last Updated:** July 26, 2026 (Reviewed — accurate) (v2.1.0)
**Related:** `ADMIN_PHILOSOPHY.md`, `LEARNING_PHILOSOPHY.md`, `AI_PHILOSOPHY.md`

---

## 1. Curriculum Architecture

```
Sea (subject area)
├── Voyage (5-trial learning module)
│   ├── Trial 1 (recognition)
│   ├── Trial 2 (recall)
│   ├── Trial 3 (recognition)
│   ├── Trial 4 (recall)
│   └── Trial 5 (application / open-ended if gauntlet)
│
├── Voyage 2 → Voyage 3 → Voyage 4 → Voyage 5 ⚔️ Gauntlet
│
└── Branch: Voyage 3a → 4a → 5a ⚔️  OR  Voyage 3b → 4b → 5b ⚔️
```

### Hierarchy

| Level | Contains | Managed By |
|-------|----------|------------|
| **Sea** | 5+ voyages | Admin (seed file + UI) |
| **Voyage** | 5 trials | Admin (UI editor) |
| **Trial** | question, options, answer, explanation, hint, points | Admin (UI editor) + AI (generation) |

---

## 2. Voyage Structure

### Standard Voyage (5 trials)

```
Trial 1: multi_choice   ← Easy win, builds confidence
Trial 2: fill_blank     ← Active recall
Trial 3: multi_choice   ← Pattern recognition
Trial 4: fill_blank     ← Deeper recall
Trial 5: multi_choice   ← Final check
```

### Captain's Gauntlet (5 trials)

```
Trial 1-4: mixed types  ← Cumulative test of V1-V4
Trial 5: open_ended     ← Creative synthesis (always)
```

### Composition Guidelines

Admin sees soft warnings:

- ⚠️ Fewer than 5 trials
- ⚠️ No `fill_blank` (need ≥1 for recall practice)
- ⚠️ 3+ consecutive same type (need variety)
- ⚠️ Gauntlet final trial not `open_ended`

---

## 3. Voyage Branching

```
Sea of Cunning
│
├── V1: Message in a Bottle ──→ V2: The Captain's Log ──→ CHOICE
│                                                          │
│                    ┌─────────────────────────────────────┤
│                    ↓                                     ↓
│         V3a: Parley & Persuasion              V3b: Sea Shanty Songwriting
│         (grammar focus)                       (creative writing focus)
│                    ↓                                     ↓
│         V4a: Silver Tongue Tavern             V4b: Bard of the Brine
│                    ↓                                     ↓
│         V5a: The Corsair's Codex ⚔️          V5b: The Legend's Ballad ⚔️
│                    ↓                                     ↓
│                    └────── SEA MASTERED ─────────────────┘
```

### Rules

- Student chooses branch after V2
- Each branch has its own V3→V4→V5
- Sea is "mastered" when ANY gauntlet is completed
- Student can switch branches (progress in old branch preserved)
- Admin can add/remove branches via UI

---

## 4. Voyage Metadata

| Field | Type | Purpose |
|-------|------|---------|
| `objectives` | String | "By the end, you will: recognize all 26 letters" |
| `estimatedMinutes` | Int | 10 |
| `tags` | String[] | ["phonics", "alphabet", "spelling"] |
| `skills` | String[] | ["letter-recognition", "phonemic-awareness"] |
| `prerequisiteKnowledge` | String | "Knows letters A-M" |
| `successCriteria` | String | "Complete 5/5 trials" |

### Why Metadata Matters

- **Parents** see "Andrew is working on letter-recognition (10 min)"
- **Teachers** filter voyages by skill tag to find remedial content
- **AI** uses tags to generate related trials
- **Analytics** groups performance by skill, not just by sea

---

## 5. Voyage Lifecycle

```
Draft ──→ Published ──→ Deprecated
  │           │
  │           └──→ A/B Test (two Published variants compete)
  │                    │
  │                    ├── Winner → Published
  │                    └── Loser → Deprecated
  │
  └── Can return to Draft from any state
```

| State | Visible To | Editable | Use Case |
|-------|-----------|----------|----------|
| **Draft** | Admin only | ✅ | Building, not ready |
| **Published** | All users | ❌ | Live in production |
| **Deprecated** | Students who started it | ❌ | Old version, replaced |
| **A/B Test** | Random 50% of new students | ❌ | Comparing two versions |

### A/B Testing

- Two voyages with same `branchParentId`, different `abTestGroup` ("A"/"B")
- Students randomly assigned on first visit to that branch point
- After 50 students complete both versions → admin sees comparison:
  - Completion rate, average skulls, time spent, hint usage
- Winner → Published. Loser → Deprecated.
- Ties → both stay. Admin picks manually.

---

## 6. Voyage Bundles

Cross-sea themed collections. Admin creates. Teacher applies in one click.

```
Bundle: "Pirate Starter Pack"
├── V1: Message in a Bottle (Cunning)
├── V1: The Eastern Port (Whispers)
├── V1: Chart the Stars (Navigation)
└── V1: Island Bestiary (Brews)

Bundle: "Sea Monster Summer"
├── V3: Forces & Motion (Brews — physics of sea monsters)
├── V4: Vocabulary Quest (Cunning — describing beasts)
└── V2: Treasure Counting (Navigation — counting monster eggs)
```

### Bundle Features

- Admin names and describes the bundle
- Select voyages from any sea, any difficulty
- Set order within bundle
- Teacher sees "Apply Bundle" → all voyages assigned with suggested due dates
- Due dates calculated as: `today + (sortOrder × 7 days)`

---

## 7. Trial Version History

Every edit creates an immutable version:

```prisma
model TrialVersion {
  id            String   @id @default(cuid())
  trialId       String
  versionNumber Int
  question      String
  options       Json?
  answer        String
  explanation  String?
  hint          String?
  points        Int
  editedBy      String
  editedAt      DateTime
}
```

### Features

- Version timeline sidebar on trial editor page
- Click any version to preview
- "Rollback" button → creates NEW version with old content (never deletes)
- Diff view: highlights what changed between versions

---

## 8. Bulk Operations

| Operation | UI |
|-----------|-----|
| Reorder voyages | Drag-and-drop in sea tree view |
| Reorder trials | Drag-and-drop in voyage editor |
| Delete trials | Checkbox multi-select → "Delete Selected" |
| Duplicate voyage | "Clone" button → copies voyage + all trials + metadata |
| Move trial | "Move to..." dropdown → select target voyage |
| CSV Export | Download all trials as CSV (template format) |
| CSV Import | Upload → validate → preview → confirm |
| Clone sea | Copies entire sea structure (voyages + trials) |

### CSV Template

Per-voyage template, pre-filled with voyageId and difficulty:

```csv
voyageId,type,question,options,answer,explanation,hint,points,difficulty
sea-of-cunning-v1,multi_choice,"What letter...","[""A"",""B"",""C"",""D""]","B","Because...","Think...",10,1
```

---

## 9. Seed File Relationship

```
prisma/seed.ts          Admin UI
─────────────          ─────────
Source of truth        Runtime controls
Defines structure      Adjusts values
Populates initial      Edits content
Re-seed to reset       Live changes
```

### Sync Rules

- Seed file defines the canonical curriculum structure
- Admin UI can edit trial content, toggle active, adjust points
- Admin UI CANNOT create new voyages (that's a seed file change)
- "Reset to Seed" button reverts all runtime changes
- Admin warned if seed has voyages not reflected in DB

---

## 10. Anti-Patterns (Curriculum)

- ❌ **Empty voyages** — can't publish a voyage with 0 trials
- ❌ **Orphaned branches** — can't delete V2 if V3a/V3b depend on it
- ❌ **Silent deprecation** — students mid-voyage must be notified if voyage is deprecated
- ❌ **CSV import without validation** — every row checked before any insert
- ❌ **Version history without attribution** — every version records who edited
- ❌ **A/B test without timeout** — tests auto-resolve after 90 days if < 50 students
