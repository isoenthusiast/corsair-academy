# Corsair Academy — AI Design Philosophy

**Last Updated:** July 26, 2026 (v3.0.0 — AI grilling chat + AIContext persistence added)
**Models:** `deepseek-v4-pro` (generation, adaptation, personalization) + `deepseek-v4-flash` (tutoring, grading)
**Related:** `ADMIN_PHILOSOPHY.md`, `LEARNING_PHILOSOPHY.md`

---

## 1. AI Role — "The First Mate"

AI is the **silent crew member** — it generates, grades, tutors, and adapts. Students interact with it as a helpful pirate companion. Teachers and admins use it to scale their impact.

### AI Commandments

1. **Never give the answer** — tutor mode explains concepts, not solutions
2. **Stay in character** — all AI output is pirate-voiced, age-appropriate
3. **Learn from flags** — if a student reports a bad trial, AI learns and improves
4. **Respect the budget** — admin-set monthly cap; throttle when near limit
5. **Be invisible when wrong** — AI mistakes get flagged, not punished

---

## 2. Feature → Model Mapping

| Feature | Model | Why | Status |
|---------|-------|-----|--------|
| 🎲 AI-Generated Trials | `deepseek-v4-pro` | Creative generation needs highest quality output | ✅ Built |
| 🧠 AI Tutor Chat | `deepseek-v4-flash` | Real-time conversation needs low latency | ✅ Built |
| 📝 AI Grading | `deepseek-v4-flash` | Evaluative scoring needs speed, not creativity | ✅ Built |
| 📈 Adaptive Difficulty | Rule-based (no AI) | 3-perfect → +0.5, 5-weak → -0.5 | ✅ Built |
| 🎯 Personalization | Rule-based (no AI) | Sea progress + avg skulls → recommendation | ✅ Built |

**Implementation Summary (July 26):**

- **Trial Generation**: `POST /api/admin/voyages/[id]/generate-trials` — structured prompt with voyage context → DeepSeek → validate → save. UI: GenerateTrialsButton with 3/5 count selector.
- **Tutor Chat**: `POST /api/tutor/chat` — "Captain Corsair" persona, hints not answers. UI: floating 🦜 button → slide-out chat panel on voyage page.
- **Grading**: `POST /api/trials/grade` — evaluates open-ended answers. Fallback on API error. Empty answers handled locally.
- **Adaptive**: `POST /api/adaptive/check` — called non-blocking after each trial. ±0.5 difficulty steps, bounds 1-5.
- **Personalization**: `GET /api/personalize/recommend` — sea completion % + avg skull performance. UI: RecommendedVoyage card on map.

**Principle:** `v4-pro` for batch/analytical tasks where quality matters. `v4-flash` for real-time user-facing interactions where latency matters.

---

## 3. AI-Generated Trials

### How It Works

```
Admin defines criteria → AI generates pool → Students pull from pool
                         ↓
                    Flagged by student → Admin reviews → Improve/Remove
```

### Generation Criteria

Admin specifies:

- **Sea** (Cunning, Whispers, Navigation, Brews)
- **Difficulty** (1-5)
- **Trial Type** (multi_choice, fill_blank, puzzle, open_ended)
- **Count** (how many to generate, e.g., 50)

### Prompt Template

```
You are a pirate tutor creating learning trials for a {age}-year-old student.
Generate a {type} trial for the Sea of {sea} at difficulty {difficulty}/5.

Rules:
- Question must be pirate-themed (ships, treasure, sea monsters, islands)
- For multi_choice: exactly 4 options, one correct, three plausible distractors
- For fill_blank: one word answer, case-insensitive
- Hint must nudge toward answer without giving it
- Explanation must be one sentence with emoji, teaching the "why"
- Age-appropriate vocabulary for a {age}-year-old

Return JSON:
{
  "question": "...",
  "options": ["A","B","C","D"],  // multi_choice only
  "answer": "...",
  "explanation": "...",
  "hint": "...",
  "points": {base_points}
}
```

### Anti-Repeat

- Each generated trial gets a content hash
- Before serving a trial, check hash against student's history
- If hash exists in last 30 days for this student, skip and pull next
- Pool size should be 5× voyage trial count (25 trials → 125 pool minimum)

### Trust but Verify

- AI-generated trials go live immediately
- Each trial has a "🚩 Report" button (visible to students and teachers)
- Flagged trials enter admin review queue
- Admin can: approve (keep), edit (fix and keep), remove (delete from pool)
- Trials flagged 3+ times are auto-removed

---

## 4. AI Tutor Chat — "Ask the First Mate"

### Context

Available on every trial page as a button: **"🗣️ Ask the First Mate"**

### Behavior

- Opens chat panel alongside the trial
- Student types a question in natural language
- AI responds in pirate character, explaining the concept
- **Never gives the direct answer** — explains the principle, not the solution

### Example

```
Student: "I don't understand what a noun is"
First Mate: "Arr! A noun be a person, place, or thing ye can touch!
            Like 'anchor' ⚓, 'captain' 🏴‍☠️, or 'treasure island' 🏝️.
            Which o' these be a noun in yer question, matey?"
```

### Prompt Template

```
You are the First Mate, a friendly pirate tutor helping a {age}-year-old student
named {name}. They are stuck on this trial:

Question: "{question}"
Type: {type}
Subject: {sea}

The student asks: "{student_question}"

Rules:
- Explain the CONCEPT, not the answer
- Use pirate language (arr, matey, ye, sail, treasure)
- One paragraph max
- End with an encouraging question to check understanding
- Never say the correct answer directly
```

### Rate Limiting

- Max 5 tutor messages per trial (to prevent dependency)
- Counts toward daily AI budget

---

## 5. AI Grading — Open-Ended Trials

### Current State

Open-ended trials always award 3☠️ (auto-pass). No evaluation.

### Proposed: Teacher + AI Hybrid

```
Student submits answer
    ↓
AI evaluates → suggests skulls (1-3) + feedback
    ↓
Teacher sees: student answer + AI suggestion
    ↓
Teacher can: approve AI grade, override skulls, add personal note
    ↓
If no teacher action in 48 hours → AI grade auto-applied
```

### AI Evaluation Criteria

| Skulls | Criteria |
|--------|----------|
| 1☠️ | Attempted but minimal effort (one word, off-topic) |
| 2☠️ | On-topic, shows understanding, could be more detailed |
| 3☠️ | Thoughtful, creative, demonstrates mastery |

### Prompt Template

```
Evaluate this {age}-year-old student's response to an open-ended trial.

Question: "{question}"
Subject: {sea}
Student's answer: "{answer}"

Rate 1-3 skulls:
1 = minimal effort or off-topic
2 = on-topic, shows understanding
3 = thoughtful, creative, demonstrates mastery

Return JSON: { "skulls": 2, "feedback": "encouraging pirate-voiced feedback" }
```

---

## 6. Adaptive Difficulty

### Per-Trial Adjustment

```
If 3☠️ × 3 consecutive trials → difficulty +1 (max 5)
If 1☠️ × 3 consecutive trials → difficulty -1 (min 1)
Difficulty resets per voyage
```

### Implementation

- Track in `User` model: `currentDifficulty Int @default(1)`
- On trial completion, check last 3 attempts
- If all 3 are 3☠️ at current difficulty → bump `currentDifficulty`
- Next AI-generated trial uses `currentDifficulty` instead of voyage default

---

## 7. Personalization

### Theme Personalization

- Track which trial themes the student engages with fastest (time-to-answer)
- Categories: sea monsters, treasure, ships, islands, battles, potions, stars
- AI biases future trial generation toward favorite themes (70% favorite, 30% variety)

### Subject Personalization

- Track per-sea accuracy and completion rate
- If Sea of Navigation accuracy < 60% → surface more Navigation trials
- Spaced repetition: reintroduce failed concepts at 3, 7, 14-day intervals

### Privacy

- All personalization data stays in DB
- No data sent to DeepSeek beyond the current prompt context
- Personalization can be disabled per student (admin toggle)

---

## 8. Cost Management

### Budget Model

- Admin sets monthly AI budget (e.g., $50/month)
- System tracks DeepSeek API costs per call
- Dashboard shows: used / remaining / projected

### Call Costs (Estimated)

| Task | Model | Est. Tokens/ Call | Est. Cost/ Call | Calls/ $1 |
|------|-------|-------------------|-----------------|-----------|
| Generate 1 trial | `v4-pro` | ~500 | ~$0.002 | 500 |
| Generate 50-trial pool | `v4-pro` | ~25,000 | ~$0.10 | 10 |
| Tutor chat message | `v4-flash` | ~300 | ~$0.0003 | 3,333 |
| Grade 1 open-ended | `v4-flash` | ~400 | ~$0.0004 | 2,500 |
| Adaptive difficulty check | `v4-pro` | ~200 | ~$0.0008 | 1,250 |
| Personalization update | `v4-pro` | ~300 | ~$0.0012 | 833 |

### Monthly Budget — $5.00 (1 Student, 1 Teacher, 2 Parents)

| Activity | Volume | Model | Cost |
|----------|--------|-------|------|
| Generate 4 trial pools (1 per sea) | 4 × 50 trials | `v4-pro` | $0.40 |
| Tutor messages (~50/day) | 1,500 | `v4-flash` | $0.45 |
| Grade open-ended (~10/day) | 300 | `v4-flash` | $0.12 |
| Adaptive difficulty checks (~20/day) | 600 | `v4-pro` | $0.48 |
| Personalization updates (1/day) | 30 | `v4-pro` | $0.04 |
| **Total** | | | **~$1.49** |

💡 At current scale (1 student), you're using only 30% of the $5 budget. Plenty of headroom for growth to 3-4 students before needing a budget increase.

### Budget Tiers (for future scaling)

| Students | Recommended Budget | Est. Usage |
|----------|-------------------|------------|
| 1 | $5/mo | 30% utilized |
| 3-5 | $10/mo | ~60% utilized |
| 6-10 | $20/mo | ~70% utilized |
| 11-20 | $50/mo | ~80% utilized |

### Throttling

- When 80% of monthly budget consumed → warning banner on admin
- When 95% consumed → AI features disabled, manual-only
- Budget resets on 1st of month

---

## 9. Anti-Patterns (AI)

- ❌ **AI replacing teachers** — AI suggests, teachers decide. Human in the loop for grading.
- ❌ **Black-box grading** — students see WHY they got their skulls. AI feedback is transparent.
- ❌ **Burning budget on idle** — no background AI tasks. All AI work is user-triggered.
- ❌ **Sending PII to AI** — only trial content and anonymized student response goes to DeepSeek. No names, ages, or personal data.
- ❌ **AI-generated content without pirate voice** — all prompts enforce pirate theming. Out-of-character output is filtered.
---

## 10. AI Grilling Chat (v3.0.0)

**Route:** `/admin/voyages/[id]/ai-chat` — Multi-turn conversational AI for refining trial generation requests before execution.

### Philosophy

Instead of one-shot generation (old B1), the admin now has a conversation with the AI to clarify what they want. This prevents misaligned generations and reduces wasted API calls.

### Flow

```
Admin: "Add more puzzle trials about fractions"
  ↓
AI: "Aye! A few questions: Should these replace existing trials or be added?
     What difficulty level? Any specific pirate scenarios you'd like woven in?"
  ↓
Admin: "Add them after the existing ones. Difficulty 3. Use treasure division scenarios."
  ↓
AI: "Understood! 3 puzzle trials, difficulty 3, treasure division theme, 
     appended after current trials. Ready to generate when you give the word."
  ↓
Admin: "generate"
  ↓
AI: "GENERATE_READY: 3 puzzle trials about fraction-based treasure division..."
→ Generate button appears → Admin clicks → Trials created
```

### Technical Design

- Uses DeepSeek v4-flash (fast, cheap) for the conversation
- System prompt instructs AI to ask clarifying questions, not generate actual trials
- AI signals readiness with `GENERATE_READY` prefix — client detects this and shows the Generate button
- Each message exchange is stored in `AIContext` table as individual records (`isFinal: false`)
- When generation completes, a summary record is created (`isFinal: true`)

### AIContext Table

Stores AI conversation transcripts for audit, reuse, and analysis:

| Field | Purpose |
|-------|---------|
| `userId` | Who initiated the conversation |
| `content` | Markdown transcript (e.g., `**User:** ... **AI:** ...`) |
| `appFeature` | Context: trials, voyages, seas, kanban, announcements |
| `voyageId` | Optional link to specific voyage |
| `seaId` | Optional link to specific sea |
| `isFinal` | `false` = individual message, `true` = generation summary |

### Budget Impact

- Chat messages use v4-flash (~$0.14/1M tokens input, ~$0.28/1M output) — very cheap
- Typical grilling session: 4-6 messages totalling ~2K tokens ≈ $0.001
- Trial generation still uses v4-pro for quality — unchanged from B1