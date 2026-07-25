# Corsair Academy — AI Test Plan

**Date:** July 25, 2026 (v2.1.0)
**Scope:** AI trial generation, tutor chat, grading, adaptive difficulty, personalization, cost management

---

## AIT1 — AI Trial Generation

| ID | Action | Expected |
|----|--------|----------|
| AIT1.1 | Admin navigates to trial generation panel | Form: sea selector, difficulty, type, count |
| AIT1.2 | Select Sea of Cunning, difficulty 2, multi_choice, count 10 | AI generates 10 trials |
| AIT1.3 | Verify generated trials | Each has: question, 4 options, answer, explanation, hint, points |
| AIT1.4 | Verify pirate theming | All questions reference ships, treasure, sea, pirates |
| AIT1.5 | Verify age-appropriate language | No complex vocabulary beyond age 10 level |
| AIT1.6 | Generated trial enters pool | Visible in admin curriculum view |
| AIT1.7 | Student replays voyage | Pulls fresh trials from pool (not same as last time) |
| AIT1.8 | Content hash prevents repeats | Same trial not served to same student within 30 days |
| AIT1.9 | Student flags a bad trial | Trial enters admin review queue |
| AIT1.10 | Admin reviews flagged trial | Can approve, edit, or remove |
| AIT1.11 | Trial flagged 3+ times | Auto-removed from pool |

## AIT2 — AI Tutor Chat

| ID | Action | Expected |
|----|--------|----------|
| AIT2.1 | Open any trial, click "🗣️ Ask the First Mate" | Chat panel opens alongside trial |
| AIT2.2 | Type "What is a noun?" | AI responds in pirate voice, explains concept |
| AIT2.3 | Verify AI does NOT give answer | Response explains principle, not solution |
| AIT2.4 | Ask follow-up question | AI maintains conversation context |
| AIT2.5 | Verify pirate character | Response uses "arr", "matey", pirate vocabulary |
| AIT2.6 | 6th message in same trial | Warning: "First Mate needs rest. Try on your own!" |
| AIT2.7 | Tutoring counts toward daily AI budget | Budget counter increments |
| AIT2.8 | Response time | Under 3 seconds (v4-flash latency target) |

## AIT3 — AI Grading

| ID | Action | Expected |
|----|--------|----------|
| AIT3.1 | Student submits open-ended trial answer | AI evaluates within seconds |
| AIT3.2 | AI assigns skulls (1-3) + feedback | Skulls + pirate-voiced encouraging feedback |
| AIT3.3 | Teacher views grading queue | Sees: student answer, AI skull suggestion, AI feedback |
| AIT3.4 | Teacher approves AI grade | Skulls applied, feedback shown to student |
| AIT3.5 | Teacher overrides skulls | Teacher's skull count used, AI feedback retained |
| AIT3.6 | Teacher adds personal note | Note appended to AI feedback |
| AIT3.7 | No teacher action in 48 hours | AI grade auto-applied |
| AIT3.8 | Minimal effort answer ("idk") | AI gives 1☠️ with encouragement to try again |

## AIT4 — Adaptive Difficulty

| ID | Action | Expected |
|----|--------|----------|
| AIT4.1 | Student gets 3☠️ on 3 consecutive trials | `currentDifficulty` increments by 1 |
| AIT4.2 | Next trial generated at higher difficulty | Question complexity increases |
| AIT4.3 | Student gets 1☠️ on 3 consecutive trials | `currentDifficulty` decrements by 1 |
| AIT4.4 | Difficulty never exceeds 5 | Capped at max |
| AIT4.5 | Difficulty never drops below 1 | Capped at min |
| AIT4.6 | Difficulty resets per voyage | New voyage starts at voyage's base difficulty |
| AIT4.7 | Admin can disable adaptive difficulty per student | Toggle in student settings |

## AIT5 — Personalization

| ID | Action | Expected |
|----|--------|----------|
| AIT5.1 | Student answers sea monster questions fastest | Theme profile updates: sea_monster weight increases |
| AIT5.2 | Next generated trial | 70% chance sea monster theme, 30% variety |
| AIT5.3 | Student struggles in Sea of Navigation (accuracy < 60%) | More Navigation trials surfaced |
| AIT5.4 | Failed concept reappears after 3 days | Spaced repetition surfaces the concept |
| AIT5.5 | Failed concept reappears after 7 days | Second review if still struggling |
| AIT5.6 | Admin disables personalization | Student gets random/variety trials (no bias) |

## AIT6 — Cost Management

| ID | Action | Expected |
|----|--------|----------|
| AIT6.1 | Admin sets monthly budget to $5 | Budget saved, tracking begins |
| AIT6.2 | AI calls accumulate | Dashboard shows $used / $5.00 |
| AIT6.3 | Usage reaches 80% ($4.00) | Warning banner: "AI budget at 80%. Consider increasing." |
| AIT6.4 | Usage reaches 95% ($4.75) | AI features disabled. "Budget exhausted. Resets on 1st." |
| AIT6.5 | New month begins | Budget resets to $0 used |
| AIT6.6 | Cost breakdown by feature | Dashboard shows: generation $X, tutoring $Y, grading $Z |

---

## Execution Log

| Test | Result | Notes |
|------|--------|-------|
| AIT1.1 | ⚠️ NOT BUILT | |
| AIT1.2 | ⚠️ NOT BUILT | |
| ... | | |
