# Test Plan — AI Trial Generation

**Feature:** B1 — AI-Powered Trial Generation via DeepSeek v4-pro
**Date:** 2026-07-26

---

## 1. API — DeepSeek Integration

| # | Test | Expected |
|---|------|----------|
| 1.1 | Send prompt to DeepSeek API with valid key | Returns 200 with choices array |
| 1.2 | Send prompt with invalid API key | Returns 401, handled gracefully |
| 1.3 | DeepSeek API timeout (>30s) | Returns error, no trials created |
| 1.4 | DeepSeek returns malformed JSON | Parsed gracefully, partial trials saved if possible |
| 1.5 | DeepSeek returns trials with missing fields | Skipped, only valid trials saved |

## 2. Trial Generation

| # | Test | Expected |
|---|------|----------|
| 2.1 | Generate 3 trials for an English voyage | 3 trials created with diverse types |
| 2.2 | Generate 5 trials for a Maths voyage | 5 trials with math-appropriate content |
| 2.3 | Generated trials have all required fields | type, question, answer, explanation, points, difficulty |
| 2.4 | Multi-choice trials include options array | JSON array of 4 strings |
| 2.5 | Fill-blank trials have blank marked with `___` | Answer is the missing word |
| 2.6 | Puzzle trials have a clear task description | Question describes the puzzle |
| 2.7 | Points are within range 5-20 | Proportional to difficulty |
| 2.8 | Difficulty matches voyage difficulty | Within ±1 of voyage difficulty |

## 3. Content Quality

| # | Test | Expected |
|---|------|----------|
| 3.1 | Questions are pirate-themed | References to ships, treasure, seas, pirates |
| 3.2 | Questions match the voyage subject | English = language, Mandarin = Chinese, Maths = math, Science = science |
| 3.3 | Explanations are educational | Explains why the answer is correct |
| 3.4 | Hints are helpful but don't give away answer | Nudges toward correct answer |
| 3.5 | No duplicate questions within same voyage | Each question is unique |
| 3.6 | No questions identical to existing trials | Doesn't duplicate already-existing trials |

## 4. UI — Voyage Editor

| # | Test | Expected |
|---|------|----------|
| 4.1 | "🤖 Generate Trials" button visible on voyage editor | Below existing trials list |
| 4.2 | Click button, select count (3 or 5) | Dropdown or radio buttons |
| 4.3 | Submit generation request | Loading state shown |
| 4.4 | On success, page refreshes with new trials | New trials appear in list |
| 4.5 | On error, error message displayed | "AI generation failed. Try again." |
| 4.6 | Generated trials are editable | Click Edit to modify AI-generated content |
| 4.7 | Only Admin can access generate API | Non-admin returns 403 |

## 5. Edge Cases

| # | Test | Expected |
|---|------|----------|
| 5.1 | Voyage has no description/objectives | Prompt uses title + sea name only |
| 5.2 | Voyage already has 20+ trials | Warns before generating more |
| 5.3 | Generate for a voyage with 0 existing trials | Works fine (no context to avoid dupes) |
| 5.4 | Rapid successive generations | Each adds new trials, no duplicates |
| 5.5 | Very long voyage title/description | Truncated in prompt to fit token limits |
| 5.6 | Special characters in voyage content | Properly escaped in JSON prompt |
