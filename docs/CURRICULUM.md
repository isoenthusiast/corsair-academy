# Corsair Academy — Curriculum Design Rules

**Last Updated:** July 26, 2026 (v1.0.0)
**Purpose:** Defines the rules and strategy for creating trial questions aligned to the Island learning system.

---

## 1. Concept Mapping

| Game Concept | Educational Concept | Description |
|-------------|-------------------|-------------|
| **Sea** | Subject | Math, English, Science, Malay/Mandarin |
| **Voyage** | Stage / School Year | Maps to IGCSE Year 1-11. Represents a full academic year of content. |
| **Island** | Monthly Unit | ~12 per voyage plus entry/exit exams. Not necessarily mapped to specific syllabus modules — thematically grouped within the voyage. |
| **Trial** | Assessment Question | Evaluates understanding of island content. Pass/fail determines island completion. |

### Island Types

| Type | Position | Trials | Pass Threshold | Purpose |
|------|----------|--------|---------------|---------|
| `courage_challenge` | Island 0 (first) | 10 | ≥80% (8/10) | Entry exam — skip voyage if competent |
| `regular` | Islands 1-11 | 5 | ≥60% (3/5) | Monthly learning unit |
| `boss_fight` | Island 12 (last) | 10 | ≥80% (8/10) | Exit exam — master voyage to advance |

---

## 2. Trial Design Rules

### 2.1 Question Types

| Type | Code | Description | When to Use |
|------|------|-------------|-------------|
| Multiple Choice | `multi_choice` | 4 options, one correct answer (A/B/C/D) | Recognition & recall |
| Fill in the Blank | `fill_blank` | Sentence with `___` for missing word/phrase | Recall & application |
| Puzzle | `puzzle` | Short riddle, cipher, or logic challenge | Application & synthesis |
| Open-Ended | `open_ended` | Written response, AI-graded | Synthesis & evaluation |

### 2.2 Type Distribution (Per Island)

Default distribution for AI generation. Admin can override per island.

| Subject | MC | Fill-Blank | Puzzle | Open-Ended |
|---------|-----|-----------|--------|------------|
| **Mathematics** | 30% | 40% | 20% | 10% |
| **English / Language Arts** | 40% | 20% | 10% | 30% |
| **Science** | 35% | 25% | 25% | 15% |
| **Malay / Mandarin (Languages)** | 40% | 30% | 10% | 20% |

For a 5-trial regular island, this rounds to approximately:
- Math: 1-2 MC, 2 fill-blank, 1 puzzle, 0-1 open-ended
- English: 2 MC, 1 fill-blank, 0-1 puzzle, 1-2 open-ended
- Science: 2 MC, 1 fill-blank, 1 puzzle, 1 open-ended
- Languages: 2 MC, 1-2 fill-blank, 0-1 puzzle, 1 open-ended

### 2.3 Difficulty Rules

- **Flat within island**: All trials in an island share the same difficulty level.
- **Voyage difficulty (1-5)**: Set by admin. Maps to the voyage's school year:
  - 1-2 = Lower primary (Years 1-3)
  - 3 = Upper primary (Years 4-6)
  - 4 = Lower secondary (Years 7-9)
  - 5 = Upper secondary (Years 10-11)
- **Exam islands** (CC/Boss): Inherit voyage difficulty. All 10 questions at that level.

### 2.4 Points System

| Difficulty | Points per Trial |
|-----------|-----------------|
| 1 | 5 |
| 2 | 10 |
| 3 | 15 |
| 4 | 20 |
| 5 | 25 |

Points × skulls (1-3) = XP earned. Crowns = XP × crownRate.

### 2.5 Content Rules

1. **No duplicate questions** within the same island. AI must check existing questions before generating.
2. **No trick questions**. Every question must have a clear, defensible correct answer.
3. **Age-appropriate language**. Vocabulary and sentence complexity must match the voyage difficulty.
4. **One concept per question**. Don't test multiple unrelated skills in a single trial.
5. **Explanation required**. Every trial must include a brief educational explanation (1-2 sentences) of why the answer is correct — even for correct answers, to reinforce learning.
6. **Hint optional but recommended**. Hints should nudge toward the answer without revealing it. "Think about..." not "The answer is..."

---

## 3. Pirate Theme Integration

### 3.1 Theme Level: Light Framing

Questions are standard academic content with pirate-themed flavor text. The academic rigor comes first; the pirate theme is the delivery vehicle.

**Do:**
- "Captain Redbeard has 24 gold coins. He gives 1/3 to his first mate. How many coins remain?"
- "Complete the pirate oath: 'I solemnly swear to ___ the seven seas.'"

**Don't:**
- Force pirate jargon into every question. "Arr, me hearty, calculate ye the hypotenuse of this here triangle!" is exhausting.
- Sacrifice clarity for theme. If a concept doesn't fit the pirate metaphor, teach it plainly.
- Use violence or scary content. No walking the plank, no keelhauling, no ghost stories for young learners.

### 3.2 Themed Vocabulary Bank

Words that naturally fit questions without forcing:

| Category | Words |
|----------|-------|
| **Numbers** | gold coins, treasure chests, crew members, islands, ships, cannons |
| **Measurement** | nautical miles, knots, fathoms, leagues, tides |
| **Time** | tides, watches, voyages, sunset, dawn |
| **Geography** | islands, ports, coves, reefs, currents, trade winds |
| **Science** | gunpowder, compass, stars, weather, buoyancy, salt water |

---

## 4. Syllabus Alignment

### 4.1 Island Tagging

Islands have a `syllabusTags` field (`String[]`) for mapping to real curriculum outcomes:

```
Island: "Fractions & Decimals"
syllabusTags: ["IGCSE-Math-Y5-Numbers", "Fractions", "Decimals", "KS2-Year5"]
```

Tags are:
- **Optional**. Islands without tags are still valid.
- **Searchable**. Teachers can find islands by syllabus code.
- **Not validated**. No enforcement of tag format — freeform for flexibility across different syllabi (IGCSE, IB, National Curriculum, etc.).

### 4.2 Voyage Mapping

| Voyage Difficulty | Approximate Year | Example Syllabus |
|------------------|-----------------|------------------|
| 1 | Year 1-2 | Lower Primary |
| 2 | Year 3-4 | Upper Primary |
| 3 | Year 5-6 | Key Stage 2 |
| 4 | Year 7-9 | Key Stage 3 / Lower Secondary |
| 5 | Year 10-11 | IGCSE / Key Stage 4 |

---

## 5. AI Generation Strategy

### 5.1 Per-Island Generation

AI generates trials for a specific island. The system prompt must include:

1. **Subject context** — derived from the sea name
2. **Voyage difficulty** — determines point values and language complexity
3. **Island type** — determines trial count (5 or 10) and question mix
4. **Existing questions** — to avoid duplicates
5. **Island description** — learning objectives for the island
6. **Syllabus tags** — if present, used to focus question content

### 5.2 Generation Parameters

| Parameter | Regular Island | Exam Island |
|-----------|---------------|-------------|
| Trial count | 5 | 10 (enforced) |
| Temperature | 0.8 | 0.6 (more consistent for exams) |
| Max tokens | 4096 | 4096 |
| Duplicate check | Against island's existing trials | Against island's existing trials |

### 5.3 Quality Checks (Post-Generation)

After AI generates trials, the system should validate:
1. **Count**: Exactly the requested number of trials.
2. **Types**: Distribution roughly matches the subject profile (±1 per type).
3. **Answers**: Every trial has a non-empty answer.
4. **Explanations**: Every trial has a non-empty explanation.
5. **No duplicates**: No question text matches an existing trial in the same island.

Failed validations should reject the batch and prompt AI to regenerate.

---

## 6. Pass/Fail & Progression Rules

### 6.1 Regular Island (Islands 1-11)

- **Pass**: ≥60% trials correct (3/5).
- **Fail**: <60%. Student repeats the island with the same questions. No penalty — retry unlimited.
- **On pass**: Next island unlocks. Student earns XP/crowns based on trial performance.

### 6.2 Courage Challenge (Island 0)

- **Pass**: ≥80% trials correct (8/10).
- **On pass**: Skip entire voyage. Earn 50% of voyage XP/crowns. Next voyage unlocks.
- **On fail**: Island 1 unlocks. Student plays through the voyage normally.

### 6.3 Boss Fight (Island 12)

- **Pass**: ≥80% trials correct (8/10).
- **On pass**: Voyage marked "Mastered". Full completion bonus. Next voyage unlocks.
- **On fail**: Islands 1-11 reset (attemptCount incremented). AI generates fresh variant questions for each island. Island 1 unlocks for replay.

### 6.4 No Failure State

Students always earn at least 1 skull per trial attempted. There is no "you lose" screen — only different degrees of success. This applies to all island types, including exams.

---

## 7. Admin Curriculum Workflow

### 7.1 Setting Up a New Voyage

1. Admin creates voyage → 14 islands auto-generated (0=Courage Challenge, 1-12=regular, 13=Boss Fight)
2. Admin sets voyage difficulty, description, objectives
3. Admin optionally adds syllabus tags to islands
4. Admin uses **⚡ Prep All Islands** to generate trials for all empty islands, OR generates per-island with custom counts

### 7.2 Editing Existing Content

1. Admin selects voyage → sees island tabs
2. Clicks an island → sees its trials
3. Can edit individual trials (question, answer, type, points, explanation, hint)
4. Each edit creates a TrialVersion snapshot (version history preserved)
5. Can rollback a trial to any previous version

### 7.3 AI-Assisted Refinement

1. Admin uses AI Chat to describe desired changes: "Make Island 3 harder" or "Add more puzzle questions"
2. AI suggests modifications
3. Admin reviews and approves
4. Changes applied to the selected island

---

## 8. Design Principles (TL;DR)

1. **Academic rigor first, pirate theme second.** Questions must be educationally sound.
2. **No failure, only degrees of success.** Minimum 1 skull always awarded.
3. **Competency over seat time.** Courage Challenge lets competent students skip ahead.
4. **Mastery before advancement.** Boss Fight ensures genuine understanding before progressing.
5. **AI as assistant, not replacement.** Admin reviews and edits AI-generated content.
6. **Syllabus-agnostic, syllabus-aware.** Islands work without tags, but tags enable curriculum mapping.
7. **Consistent structure, flexible content.** Every island has the same framework but different content.
8. **Explain everything.** Every trial has an explanation — learning happens on correct answers too.
