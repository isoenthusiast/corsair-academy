# Corsair Academy — Learning Design Philosophy

**Last Updated:** July 25, 2026 (v2.0.0)
**Related:** `GAME_PHILOSOPHY.md` (theme & economy), `APP_DESIGN.md` (technical)

---

## 1. Core Learning Thesis

**Every trial is a micro-lesson disguised as a pirate challenge.**

The game loop: `teach → test → explain → reward`. Andrew never "fails" a question — he either succeeds or learns why. The explanation is the real payload. The pirate framing is the delivery mechanism.

---

## 2. The Retrieval Practice Ladder

Four trial types, ordered by cognitive demand:

```
Recognition  →  Recall  →  Application  →  Synthesis
(multi_choice)  (fill_blank)  (puzzle)       (open_ended)
```

| Type | Mental Process | Weight | When Used |
|------|---------------|--------|-----------|
| **🔤 Multi-Choice** | Recognition — identify the correct answer from options | ~40% | All voyages, especially early in each |
| **✍️ Fill-in-Blank** | Recall — retrieve the answer from memory without cues | ~35% | Mid-voyage, after recognition builds confidence |
| **🧩 Puzzle** | Application — use knowledge to solve a novel problem | ~10% | Higher difficulties (future expansion) |
| **💭 Open-Ended** | Synthesis — create, explain, express in own words | ~15% | Captain's Gauntlets only (every 5th voyage) |

### Why This Ladder?

- **Multi-choice first** — low cognitive load. Andrew sees the answer among options. Even if he guesses, the *explanation* teaches. Builds momentum.
- **Fill-in-blank second** — forces active retrieval. The blank creates "productive struggle" — the brain works harder, which strengthens long-term memory (testing effect).
- **Puzzle third** — transfers knowledge to a new context. "Take what you learned and use it somewhere new."
- **Open-ended last** — reserved for boss levels. Creative synthesis. No "wrong" answer — effort-based reward. Encourages expression.

### Mix Within a Voyage

A typical 5-trial voyage alternates types:

```
Trial 1: multi_choice   ← easy win, builds confidence
Trial 2: fill_blank     ← active recall
Trial 3: multi_choice   ← pattern recognition
Trial 4: fill_blank     ← deeper recall
Trial 5: multi_choice   ← (or open_ended if Captain's Gauntlet)
```

Never 5 of the same type in a row. Variety maintains engagement and exercises different cognitive muscles.

---

## 3. Trial Anatomy (6 Components)

Every trial, regardless of type, has exactly these fields:

```
┌──────────────────────────────────────────┐
│ 1. TYPE BADGE    🔤 Multiple Choice      │
│ 2. DIFFICULTY    ☠️☠️ (level 2)           │
│                                          │
│ 3. QUESTION                              │
│    "Where does a pirate sleep after      │
│     a long voyage?"                      │
│                                          │
│ 4. OPTIONS (multi-choice only)           │
│    ○ Galley    ○ Captain's Quarters      │
│    ○ Crow's Nest   ○ Brig               │
│                                          │
│ 5. HINT (optional, costs 1 skull)        │
│    "Where the CAPTAIN rests"             │
│                                          │
│ 6. EXPLANATION (shown after answering)   │
│    "The Captain's Quarters — finest      │
│     room on the ship! 🛏️"                │
│                                          │
│ ANSWER: "Captain's Quarters"             │
│ POINTS: 10 (× skull multiplier)          │
└──────────────────────────────────────────┘
```

**Design rules for each component:**

| Component | Rule |
|-----------|------|
| **Question** | Always pirate-framed. Never "What is 5+3?" — always "5 doubloons + 3 doubloons = ?" |
| **Options** | For multi-choice: exactly 4. One correct, three plausible distractors. No trick answers. |
| **Hint** | Nudges toward the answer without giving it. "Sing the alphabet shanty" not "The answer is B." |
| **Explanation** | ALWAYS shown, even for correct answers. This is the real teaching moment. Includes emoji for emotional anchoring. |
| **Answer** | Single canonical answer. Case-insensitive matching for fill-in-blank. |

---

## 4. The Skull Rating System

Replaces traditional stars/fails. 1-3 skulls per trial:

| Skulls | Requirement | Message |
|--------|-------------|---------|
| ☠️ | Attempted (even if wrong) | "You showed up. That counts." |
| ☠️☠️ | Correct answer | "Well aimed, sailor!" |
| ☠️☠️☠️ | Correct + no hints + fast (<30s) | "Dead eye! Perfect shot!" |

**Key insight:** The minimum is 1 skull, never 0. Andrew always progresses. There is no failure state — only "not yet at full mastery." This prevents the demotivation spiral that kills learning apps.

---

## 5. The Hint Economy

Hints are scaffolding, not cheating:

- Every trial has a hint — no dead ends
- Using a hint caps max skulls at 2 (from 3)
- Hints cost nothing in-game (they're free to use)
- Sea Charms (Whisper Scrolls) provide EXTRA hints beyond the built-in one
- Built-in hint is always available. Charms are bonus.

**Philosophy:** We WANT Andrew to use hints when stuck. A hint that leads to learning beats a guess that leads to confusion. The skull penalty is mild — it signals "you could have done better" without punishing.

---

## 6. Difficulty Progression

### Per Sea (5 Voyages)

```
Voyage 1 (⭐)  →  Voyage 2 (⭐⭐)  →  Voyage 3 (⭐⭐⭐)  →  Voyage 4 (⭐⭐⭐⭐)  →  Voyage 5 ⚔️ (⭐⭐⭐⭐⭐)
Foundation        Building           Applying            Mastering            Gauntlet
```

| Stage | Cognitive Goal | Point Range |
|-------|---------------|-------------|
| ⭐ Foundation | Introduce core concepts. High success rate. | 10 XP |
| ⭐⭐ Building | Expand vocabulary/skills. Slightly harder recall. | 10-15 XP |
| ⭐⭐⭐ Applying | Use knowledge in new contexts. Word problems. | 15-20 XP |
| ⭐⭐⭐⭐ Mastering | Nuanced understanding. Synonyms, exceptions. | 15-20 XP |
| ⭐⭐⭐⭐⭐ ⚔️ Gauntlet | Cumulative. Everything from voyages 1-4. | 20-30 XP |

### Per Subject (Sea)

| Sea | V1 Foundation | V2 Building | V3 Applying | V4 Mastering | V5 ⚔️ Gauntlet |
|-----|--------------|-------------|-------------|--------------|----------------|
| 📚 Cunning | Alphabet | Word Building | Sentences | Vocabulary | Story Analysis |
| 🀄 Whispers | Greetings | Numbers | Family | Food & Market | Conversation |
| 🧮 Navigation | Counting | Addition | Subtraction | Multiplication | Division |
| 🔬 Brews | Living World | Earth Science | Forces | Chemistry | Astronomy |

---

## 7. The Explanation Principle

The explanation is the most important field. Rules:

1. **Always shown** — whether answer was correct or not
2. **Teaches the "why"** — not just "Correct!" but WHY it's correct
3. **Pirate-framed** — maintains theme while teaching
4. **One sentence** — concise. Not a textbook paragraph.
5. **Includes emoji** — emotional anchoring for memory

**Example (good):**
> "7×8=56! The tricky one: 5-6-7-8 (56=7×8)! 🔢"

**Example (bad — what we avoid):**
> "Correct. 7 multiplied by 8 equals 56 because multiplication is repeated addition where 7 is added 8 times."

The good version gives a mnemonic (5-6-7-8) and emotional punch (🔢). The bad version is a dry textbook.

---

## 8. Pirate Dual-Coding

Every question uses pirate theming as a **memory hook**. This is based on dual-coding theory — pairing verbal information with vivid imagery improves recall.

| Academic Concept | Generic Question | Pirate-Framed Question |
|-----------------|-----------------|----------------------|
| Letter after A | "What letter comes after A?" | "Which letter follows A in the pirate alphabet?" |
| Noun identification | "Which word is a noun?" | "Which word names a THING on a pirate ship?" |
| 5 + 3 | "What is 5 + 3?" | "5 doubloons + 3 doubloons = ?" |
| Plant needs | "What do plants need to grow?" | "What do island palms need to grow tall?" |

**Why it works:** Andrew remembers "the cat question" or "the doubloon math" — vivid pirate imagery creates retrieval paths that generic questions don't.

---

## 9. The Captain's Gauntlet Pattern

Every 5th voyage in a sea is a `captainGauntlet: true`. These are different:

| Feature | Normal Voyage | Captain's Gauntlet |
|---------|--------------|-------------------|
| Trial count | 5 | 5 |
| Final trial type | multi_choice or fill_blank | **Always open_ended** |
| Point range | 10-20 XP | 20-30 XP |
| Completion bonus | Standard | 50-200 XP + crown bonus |
| Unlocks | Next voyage in sea | Nothing (end of sea chain) |
| Pass condition | Complete all trials | Complete all trials (open-ended always "passes") |

The gauntlet is a **celebration of mastery**, not a gate. The open-ended question lets Andrew show off what he's learned in his own words.

---

## 10. Reward Timing

Immediate, frequent, transparent:

```
Trial answered → instant skull animation + XP popup + crown chime
Voyage complete → voyage completion banner + bonus XP/crowns
Gauntlet cleared → special "Gauntlet Conquered!" animation
Rank up → Wanted Poster updates on next page load
Streak day → chest claim on first trial of the day
```

**Rule:** Never delay a reward. The dopamine hit must be immediate. The explanation (learning) and reward (XP/crowns) appear on the same screen.

---

## 11. Anti-Patterns (Learning)

- ❌ **Trick questions** — distractors are plausible, never misleading
- ❌ **"Gotcha" answers** — fill-in-blank accepts case-insensitive, trims whitespace
- ❌ **Progress gates** — open-ended trials always "pass." The only gate is voyage order (must complete V1 to unlock V2)
- ❌ **Punishing wrong answers** — wrong answers get "💪 Close, sailor!" + the correct answer + the explanation. Always encouraging.
- ❌ **Same type fatigue** — never more than 2 consecutive trials of the same type
- ❌ **Textbook language** — explanations are conversational, pirate-voiced, one sentence

---

## 12. Future: Adaptive Difficulty & AI Generation

The `aiGenerated: false` flag on all current trials is a placeholder for:

- **Adaptive difficulty** — if 3☠️ three times consecutively, auto-bump difficulty up one level
- **AI-generated trials** — same 6-component structure, generated via prompt template
- **Spaced repetition** — reintroduce concepts Andrew struggled with at 3, 7, 14-day intervals
- **Personalized theming** — if Andrew loves sea monsters, bias generation toward sea monster contexts

---

## 13. Multi-User Architecture (v2.1.0)

### Roles & Permissions

| Role | Scope | Can Do |
|------|-------|--------|
| **Student** | Self + classes | Complete voyages, earn crowns, class leaderboard, assignments |
| **Teacher** | Own classes | View roster, student progress, class leaderboard, create assignments & announcements |
| **Parent** | Linked children (max 2) | Fleet view — monitor all children's progress side-by-side |
| **Admin** | Everything | Manage content (voyages/trials), users, classes, economy, system settings |

### Relationships

```
Student ─┬── StudentParent (max 2 parents per student)
         │
         └── StudentClass (student in many classes)
                │
                └── Class (1 teacher per class)
                      │
                      ├── Assignment (voyage assigned to class)
                      └── Announcement (teacher posts)
```

### Design Rules

- **2-parent limit** — enforced by app logic (count before insert)
- **Shared curriculum** — voyages/trials have no owner; admin manages all content
- **Teacher scope** — filtered by `teacherId` on Class; sees only their students
- **Parent scope** — filtered by `StudentParent` junction; sees only linked children
- **Admin bypass** — no filters; sees all data
- **Fleet view** — parent dashboard shows all children in one scrollable page
- **Class leaderboard** — ranked by total XP within a class

### Route Access Matrix

| Route | Student | Teacher | Parent | Admin |
|-------|---------|---------|--------|-------|
| `/map` | ✅ | → `/class/[id]` | → `/captain` | → `/admin` |
| `/voyage/[id]` | ✅ | ❌ | ❌ | ✅ |
| `/profile` | ✅ | ❌ | ❌ | ✅ |
| `/captain` | ❌ | ❌ | ✅ | ✅ |
| `/class/[id]` | ❌ | ✅ | ❌ | ✅ |
| `/tavern` | ✅ | ❌ | ❌ | ❌ |
| `/ship` | ✅ | ❌ | ❌ | ❌ |
| `/admin` | ❌ | ❌ | ❌ | ✅ |
