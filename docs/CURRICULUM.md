# Corsair Academy — Curriculum Design Rules

**Last Updated:** July 26, 2026 (v3.0.0 — Syllabus-driven content strategy)
**Purpose:** Defines the rules and strategy for creating trial questions aligned to the Island learning system.

---

## 1. Concept Mapping

| Game Concept | Educational Concept | Description |
|-------------|-------------------|-------------|
| **Sea** | Subject | Math, English, Science, Malay/Mandarin |
| **Voyage** | IGCSE Topic | One topic within a subject (e.g., "Number", "Enzymes", "Reading"). 3-21 per subject per year. |
| **Island** | Sub-Topic | Sub-topic within a voyage. Count = syllabus sub-topic count (3-12 per voyage). |
| **Trial** | Assessment Question | Evaluates understanding of island content. Pass/fail determines island completion. |

### Island Types

| Type | Position | Trials | Pass Threshold | Purpose |
|------|----------|--------|---------------|---------|
| `courage_challenge` | Island 0 (first) | 10 | ≥80% (8/10) | Entry exam — skip voyage if competent |
| `regular` | Islands 1-N | 5 | ≥60% (3/5) | Sub-topic learning unit |
| `boss_fight` | Last island | 10 | ≥80% (8/10) | Exit exam — master voyage to advance |

### Content Strategy: Topic-Driven Islands

**Voyage = IGCSE Topic, Island = Sub-Topic.** The syllabus defines the structure — we don't force 12 arbitrary months.

| Subject | Voyage (Topic) | Example Islands (Sub-Topics) |
|---------|---------------|------------------------------|
| Mathematics | Number | Types of Numbers, Multiples/Factors/Primes, Squares/Cubes/Roots, Reciprocals, Sets |
| Mathematics | Algebra & Sequences | Introduction to Algebra, Linear Equations, Inequalities, Simultaneous Equations, Sequences |
| Mathematics | Geometry | Symmetry & Shapes, Angle Properties, Polygons & Parallel Lines, Bearings, Circle Theorems |
| Biology | Enzymes | Enzymes |
| Biology | Human Nutrition | Human Diet & Digestion |
| Biology | Transport in Animals | Circulatory Systems, Heart & Blood Vessels |
| English | Reading | Overview, Comprehension, Summary, Short-Answer, Language Task, Extended Response |
| English | Writing | Directed Writing, Composition |

### Year Progression (Voyage Chains)

Within each Sea (subject), voyages chain via `requiredVoyageId` across school years:

```
Sea of Navigation (Mathematics)
├── Voyage: "Number" (Year 1-2) → CC → I1-I3 → Boss → unlocks →
├── Voyage: "Algebra & Sequences" (Year 3-4) → CC → I1-I9 → Boss → unlocks →
├── Voyage: "Geometry" (Year 5-6) → CC → I1-I5 → Boss → unlocks →
├── Voyage: "Coordinate Geometry & Graphs" (Year 7-9) → CC → I1-I2 → Boss → unlocks →
├── Voyage: "Pythagoras & Trigonometry" (Year 10-11) → CC → I1-I2 → Boss → IGCSE Complete!
└── ...
```

Student enters Year 5 → sees all Year 5 voyages → can take Courage Challenge on any → skip if competent → play through if not. Boss Fight gates advancement to next year.

### Island Count by Voyage

| Voyage Type | Regular Islands | Notes |
|------------|----------------|-------|
| Small topic (e.g., Enzymes) | 1-3 | Minimal sub-topics |
| Medium topic (e.g., Geometry) | 4-6 | Standard IGCSE topic |
| Large topic (e.g., Algebra & Sequences) | 7-12 | Broad topic with many sub-topics |

**Always:** Courage Challenge (Island 0) + Boss Fight (last island) + regular islands (1-N).

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

### 7.1 Setting Up a New Voyage (IGCSE Topic)

1. **Choose the topic** from the IGCSE syllabus tree (see Section 9 or Cambridge Section 10)
2. **Create the voyage** — title = IGCSE topic name (e.g., "Number", "Enzymes")
3. **Set difficulty** — maps to year level (1-2=Primary, 3=Upper Primary, 4=Lower Secondary, 5=IGCSE)
4. **Add description & objectives** — what the student should master
5. **Tag islands with syllabus codes** — use the convention `IGCSE-CIE-{Subject}-{Topic}`
6. **⚡ Prep All Islands** — generates 5 trials for each island, 10 for Courage Challenge & Boss Fight
7. **Review and edit** — adjust any AI-generated trials that need correction

### 7.2 Renaming Existing Voyages to IGCSE Topics

Existing voyages have generic titles ("Message in a Bottle", "Treasure Counting"). Rename to match IGCSE:

| Current Title | New IGCSE Title | Sea | Difficulty |
|--------------|----------------|-----|------------|
| Message in a Bottle | Reading Comprehension | 📚 Sea of Cunning | 2 |
| The Captain's Log | Writing Skills | 📚 Sea of Cunning | 3 |
| Treasure Counting | Number | 🧮 Sea of Navigation | 2 |
| Plunder Addition | Addition & Subtraction | 🧮 Sea of Navigation | 2 |
| Multiplication Armada | Multiplication | 🧮 Sea of Navigation | 3 |
| Division Depths | Division | 🧮 Sea of Navigation | 3 |
| Island Bestiary | Characteristics & Classification | 🔬 Sea of Brews | 3 |
| Storm Chasers | Weather & Climate | 🔬 Sea of Brews | 3 |

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

---

## 9. IGCSE Syllabus Topic Trees

> Source: [SaveMyExams IGCSE Revision](https://www.savemyexams.com/igcse/) — Cambridge (CIE) syllabus.
> Each topic below maps to a **Voyage**. Sub-topics map to **Islands** (numbered sequentially).
> Use `syllabusTags` to tag islands with the topic codes shown.

### 9.1 📚 Sea of Cunning — English Language

**Source:** [Cambridge (CIE) IGCSE English Language Revision Notes](https://www.savemyexams.com/igcse/english-language/cie/20/revision-notes/)
**Exam Codes:** 0500 & 0990

| # | Voyage (Topic) | Islands (Sub-Topics) | URL |
|---|---------------|---------------------|-----|
| 1 | **Paper 1: Reading** | Overview, Comprehension, Summary, Short-Answer Questions, Language Task, Extended Response | [Reading Notes](https://www.savemyexams.com/igcse/english-language/cie/20/revision-notes/1-paper-1-reading/) |
| 2 | **Paper 2: Writing** | Paper 2 Overview, Directed Writing, Composition | [Writing Notes](https://www.savemyexams.com/igcse/english-language/cie/20/revision-notes/2-paper-2-writing/) |
| 3 | **Coursework** | Assignment 1, Assignment 2, Assignment 3 | [Coursework Notes](https://www.savemyexams.com/igcse/english-language/cie/20/revision-notes/3-coursework/) |

---

### 9.2 🧮 Sea of Navigation — Mathematics

**Source:** [Cambridge (CIE) IGCSE International Maths: Core Revision Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/)
**Exam Code:** 0607
**Tiers:** Core | [Extended](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/revision-notes/)

| # | Voyage (Topic) | Islands (Sub-Topics) | URL |
|---|---------------|---------------------|-----|
| 1 | **Number** | Types of Numbers, Multiples/Factors/Primes, Squares/Cubes/Roots, Reciprocals, Reading & Ordering Numbers, Operations with Numbers & Decimals, Sets | [Number Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/number/) |
| 2 | **Algebra & Sequences** | Introduction to Algebra, Simplifying Algebraic Fractions, Roots & Indices, Expanding & Factorising Brackets, Linear Equations, Inequalities, Rearranging Formulas, Simultaneous Equations, Sequences | [Algebra Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/algebra-and-sequences/) |
| 3 | **Coordinate Geometry & Graphs** | Coordinates & Straight Line Graphs, Using Calculators for Graphs & Equations | [Graphs Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/coordinate-geometry-and-graphs/) |
| 4 | **Geometry** | Symmetry & Shapes, Basic Angle Properties, Angles in Polygons & Parallel Lines, Bearings, Circle Theorems | [Geometry Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/geometry/) |
| 5 | **Lengths, Areas & Volumes** | Area & Perimeter, Circles/Arcs/Sectors, Volume & Surface Area, Congruence & Similarity | [Measure Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/lengths-areas-and-volumes/) |
| 6 | **Pythagoras & Trigonometry** | Pythagoras, Trigonometry | [Trig Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/pythagoras-and-trigonometry/) |
| 7 | **Transformations** | Transformations | [Transform Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/transformations/) |
| 8 | **Probability** | Introduction to Probability, Probability Diagrams & Multiple Events | [Probability Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/probability/) |
| 9 | **Statistics** | Averages/Ranges & Comparing Data, Statistical Diagrams, Scatter Graphs & Correlation | [Statistics Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/statistics/) |

**Extended Tier** adds depth to all topics above plus additional content.
[Extended Revision Notes](https://www.savemyexams.com/igcse/maths/cie/international-maths/23/extended/revision-notes/)

---

### 9.3 🔬 Sea of Brews — Science

#### Biology

**Source:** [Cambridge (CIE) IGCSE Biology Revision Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/)
**Exam Codes:** 0610 & 0970

| # | Voyage (Topic) | Islands (Sub-Topics) | URL |
|---|---------------|---------------------|-----|
| 1 | **Characteristics & Classification of Living Organisms** | Characteristics of Living Organisms, Concept & Uses of Classification Systems | [Ch.1 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/1-characteristics-and-classification-of-living-organisms/) |
| 2 | **Organisation of the Organism** | Cell Structure & Size of Specimens | [Ch.2 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/2-organisation-of-the-organism/) |
| 3 | **Movement into & out of Cells** | Diffusion, Osmosis & Active Transport | [Ch.3 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/3-movement-into-and-out-of-cells/) |
| 4 | **Biological Molecules** | Biological Molecules | [Ch.4 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/4-biological-molecules/) |
| 5 | **Enzymes** | Enzymes | [Ch.5 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/5-enzymes/) |
| 6 | **Plant Nutrition** | Photosynthesis & Leaf Structure | [Ch.6 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/6-plant-nutrition/) |
| 7 | **Human Nutrition** | Human Diet & Digestion | [Ch.7 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/7-human-nutrition/) |
| 8 | **Transport in Plants** | Transport in Plants | [Ch.8 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/8-transport-in-plants/) |
| 9 | **Transport in Animals** | Circulatory Systems, Heart & Blood Vessels | [Ch.9 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/9-transport-in-animals/) |
| 10 | **Diseases & Immunity** | Diseases & Immunity | [Ch.10 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/10-diseases-and-immunity/) |
| 11 | **Gas Exchange in Humans** | Gas Exchange in Humans | [Ch.11 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/11-gas-exchange-in-humans/) |
| 12 | **Respiration** | Respiration | [Ch.12 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/12-respiration/) |
| 13 | **Excretion in Humans** | Excretion in Humans | [Ch.13 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/13-excretion-in-humans/) |
| 14 | **Coordination & Response** | Coordination, Response & Homeostasis | [Ch.14 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/14-coordination-and-response/) |
| 15 | **Drugs** | Drugs in Medicine | [Ch.15 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/15-drugs/) |
| 16 | **Reproduction** | Reproduction in Plants & Humans | [Ch.16 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/16-reproduction/) |
| 17 | **Inheritance** | Inheritance, Genes & Cell Division | [Ch.17 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/17-inheritance/) |
| 18 | **Variation & Selection** | Variation & Natural Selection | [Ch.18 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/18-variation-and-selection/) |
| 19 | **Organisms & Their Environment** | Energy & Feeding Relationships | [Ch.19 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/19-organisms-and-their-environment/) |
| 20 | **Human Influences on Ecosystems** | Human Impact: Biodiversity, Pollution & Conservation | [Ch.20 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/20-human-influences-on-ecosystems/) |
| 21 | **Biotechnology & Genetic Modification** | Biotechnology & Genetic Modification | [Ch.21 Notes](https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/21-biotechnology-and-genetic-modification/) |

#### Additional Science Subjects

| Subject | Source URL |
|---------|-----------|
| **Chemistry** | [CIE IGCSE Chemistry](https://www.savemyexams.com/igcse/chemistry/cie/23/revision-notes/) |
| **Physics** | [CIE IGCSE Physics](https://www.savemyexams.com/igcse/physics/cie/23/revision-notes/) |
| **Combined Science** | [CIE IGCSE Combined Science](https://www.savemyexams.com/igcse/science/cie/) |
| **Co-ordinated Sciences (Double Award)** | [CIE Co-ordinated Sciences](https://www.savemyexams.com/igcse/science/cie/co-ordinated/) |

---

### 9.4 🀄 Sea of Whispers — Languages

> Chinese / Malay / Additional Languages follow a similar structure to English Language:
> Reading comprehension, Writing (directed + composition), Oral/Listening components.
> Source structure available at [SaveMyExams IGCSE Subjects](https://www.savemyexams.com/igcse/).

---

### 9.5 How to Use This Mapping

1. **Create a Voyage** for each numbered topic (e.g., "Number", "Algebra & Sequences")
2. **Islands auto-generated** — admin adds syllabus tags from the table above
3. **AI generation** uses island title + syllabus tags to create focused questions
4. **Teachers** can search by tag (e.g., "IGCSE-Bio-Ch.6") to find relevant voyages
5. **Difficulty** maps to the voyage level: Core=3, Extended=5; Biology chapters are IGCSE-level (difficulty 4-5)

### Syllabus Tag Convention

```
Format: {Board}-{Subject}-{Chapter}
Examples:
  IGCSE-CIE-Math-Number
  IGCSE-CIE-Bio-Enzymes
  IGCSE-CIE-Eng-Reading
  IGCSE-CIE-Math-Algebra
```

---

## 10. Cambridge Official Curriculum Structure

> Source: [Cambridge International Sitemap](https://www.cambridgeinternational.org/sitemap/) & [Programmes & Qualifications](https://www.cambridgeinternational.org/programmes-and-qualifications/)
> The Cambridge Pathway has **4 stages** (not 11 year-levels). IGCSE is one stage within this pathway.

### 10.1 The Cambridge Pathway

| Stage | Age Range | Our Voyage Difficulty | Corsair Mapping |
|-------|----------|----------------------|-----------------|
| **Cambridge Early Years** | 3-5 | 1 | Foundation voyages |
| **Cambridge Primary** | 5-11 | 2-3 | Primary voyages |
| **Cambridge Lower Secondary** | 11-14 | 3-4 | Lower secondary voyages |
| **Cambridge Upper Secondary (IGCSE)** | 14-16 | 4-5 | IGCSE voyages |
| **Cambridge Advanced (AS & A Level)** | 16-19 | 5 | Advanced voyages (future) |

### 10.2 Cambridge Primary Subjects (Ages 5-11)

**Source:** [Cambridge Primary Curriculum](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/)

| Subject | Code | Corsair Sea |
|---------|------|-------------|
| Art & Design | 0067 | — |
| Computing | 0059 | — |
| Digital Literacy | 0072 | — |
| **English** | 0058 | 📚 Sea of Cunning |
| English as a Second Language | 0057 | 🀄 Sea of Whispers |
| Global Perspectives | 0838 | — |
| Humanities | 0065 | — |
| **Mathematics** | 0096 | 🧮 Sea of Navigation |
| Modern Foreign Language | 0064 | 🀄 Sea of Whispers |
| Music | 0068 | — |
| Physical Education | 0069 | — |
| **Science** | 0097 | 🔬 Sea of Brews |
| Wellbeing | 0034 | — |

### 10.3 Cambridge Lower Secondary Subjects (Ages 11-14)

**Source:** [Cambridge Lower Secondary Curriculum](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/)

| Subject | Code | Corsair Sea |
|---------|------|-------------|
| Art & Design | 0073 | — |
| Computing | 0860 | — |
| Digital Literacy | 0082 | — |
| **English** | 0861 | 📚 Sea of Cunning |
| English as a Second Language | 0876 | 🀄 Sea of Whispers |
| Global Perspectives | 1129 | — |
| Humanities | 0839 | — |
| **Mathematics** | 0862 | 🧮 Sea of Navigation |
| Modern Foreign Language | 0771 | 🀄 Sea of Whispers |
| Music | 0078 | — |
| Physical Education | 0081 | — |
| **Science** | 0893 | 🔬 Sea of Brews |
| Wellbeing | 0859 | — |

### 10.4 Cambridge IGCSE Subjects (Ages 14-16)

**Source:** [Cambridge IGCSE Subjects](https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/)

70+ subjects across 5 groups. Core academic subjects:

| Subject | Code(s) | Corsair Sea |
|---------|---------|-------------|
| **English - First Language** | 0500, 0990 | 📚 Sea of Cunning |
| English - Literature | 0475, 0992 | 📚 Sea of Cunning |
| English as a Second Language | 0510, 0511, 0991, 0993 | 🀄 Sea of Whispers |
| **Mathematics** | 0580, 0980 | 🧮 Sea of Navigation |
| International Mathematics | 0607 | 🧮 Sea of Navigation |
| Additional Mathematics | 0606 | 🧮 Sea of Navigation |
| **Biology** | 0610, 0970 | 🔬 Sea of Brews |
| **Chemistry** | 0620, 0971 | 🔬 Sea of Brews |
| **Physics** | 0625, 0972 | 🔬 Sea of Brews |
| Combined Science | 0653, 0973 | 🔬 Sea of Brews |
| Co-ordinated Sciences (Double) | 0654 | 🔬 Sea of Brews |
| Chinese (Mandarin) | 0547, 0523 | 🀄 Sea of Whispers |
| Malay | 0546 | 🀄 Sea of Whispers |
| Computer Science | 0478, 0984 | — |
| Geography | 0460, 0976 | — |
| History | 0470, 0977 | — |
| Business Studies | 0450, 0986 | — |
| Economics | 0455, 0987 | — |
| Accounting | 0452, 0985 | — |

### 10.5 Key URLs

| Resource | URL |
|----------|-----|
| Cambridge Sitemap | https://www.cambridgeinternational.org/sitemap/ |
| Cambridge Programmes | https://www.cambridgeinternational.org/programmes-and-qualifications/ |
| Cambridge IGCSE Subjects | https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-upper-secondary/cambridge-igcse/subjects/ |
| Cambridge Primary Curriculum | https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-primary/curriculum/ |
| Cambridge Lower Secondary | https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-lower-secondary/curriculum/ |
| SaveMyExams IGCSE Revision | https://www.savemyexams.com/igcse/ |
| SaveMyExams Maths Core | https://www.savemyexams.com/igcse/maths/cie/international-maths/23/core/revision-notes/ |
| SaveMyExams Biology | https://www.savemyexams.com/igcse/biology/cie/23/revision-notes/ |
| SaveMyExams English Language | https://www.savemyexams.com/igcse/english-language/cie/20/revision-notes/ |
