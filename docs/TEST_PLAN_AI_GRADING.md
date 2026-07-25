# Test Plan — AI Grading (Open-Ended Trials)

**Feature:** B3 — AI-Powered Grading via DeepSeek v4-flash
**Date:** 2026-07-26

---

## 1. API Grading

| # | Test | Expected |
|---|------|----------|
| 1.1 | Submit a correct open-ended answer | Returns correct=true, skulls=3, positive feedback |
| 1.2 | Submit a partially correct answer | Returns correct=true, skulls=2, feedback with suggestions |
| 1.3 | Submit a completely wrong answer | Returns correct=false, skulls=1, encouraging feedback |
| 1.4 | Submit an empty answer | Returns correct=false, skulls=1 |
| 1.5 | Submit a very short answer (1-2 words) | Graded appropriately |
| 1.6 | Submit a detailed paragraph answer | Full evaluation with specific feedback |

## 2. Trial Player Integration

| # | Test | Expected |
|---|------|----------|
| 2.1 | Open-ended trial shows "💭 Your Answer" badge | Textarea input visible |
| 2.2 | Submit answer → AI grading in progress | "Grading..." loading state |
| 2.3 | AI returns result → show skulls + feedback | Explanation replaces generic feedback |
| 2.4 | Correct answer shows "Bullseye!" with AI feedback | AI-generated explanation shown |
| 2.5 | Wrong answer shows "Close, sailor!" with AI feedback | Shows expected answer + AI suggestions |
| 2.6 | Multi-choice trials NOT sent to AI | Graded locally as before |

## 3. Feedback Quality

| # | Test | Expected |
|---|------|----------|
| 3.1 | Feedback is encouraging for wrong answers | Never harsh or demotivating |
| 3.2 | Feedback references specific parts of answer | "You mentioned X, but Y..." |
| 3.3 | Feedback is pirate-themed | Uses pirate language naturally |
| 3.4 | Feedback is age-appropriate | Simple language for kids 8-14 |

## 4. Performance

| # | Test | Expected |
|---|------|----------|
| 4.1 | AI grading completes within 5 seconds | DeepSeek v4-flash is fast |
| 4.2 | API timeout after 15 seconds | Returns default grading (local fallback) |
| 4.3 | Concurrent grading requests | Each handled independently |
| 4.4 | DeepSeek API error → local fallback | Grade without AI, show generic feedback |
