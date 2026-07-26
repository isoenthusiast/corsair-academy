# TEST PLAN — Curriculum Management v3.0 (Split-Panel)

**Date:** 2026-07-26
**Scope:** Replaces `/admin/voyages` with split-panel layout + AI grilling chat + AIContext table

---

## C1 — Page Layout & Navigation

- [ ] C1.1 Navigate to `/admin/voyages` — page renders with left panel (Seas list) and right panel (empty state)
- [ ] C1.2 Click a Sea header — expands to show voyages beneath (collapsible)
- [ ] C1.3 Click a second Sea — first collapses, second expands (accordion or independent toggle)
- [ ] C1.4 Click a voyage in left panel — right panel loads voyage details + trials list
- [ ] C1.5 Left panel highlights selected voyage (active state styling)
- [ ] C1.6 Right panel shows voyage metadata: title, difficulty, status, objectives, estimated time, tags
- [ ] C1.7 Trials list shows each trial: type badge, question preview, points, edit button
- [ ] C1.8 Empty state when no voyage selected: "Select a voyage from the left" message

## C2 — Trial Edit Modal

- [ ] C2.1 Click "Edit" on a trial — modal opens with all 6 fields pre-filled (question, options, answer, explanation, hint, points)
- [ ] C2.2 Edit fields and save — trial updates, modal closes, trials list refreshes
- [ ] C2.3 Save creates TrialVersion record (version history preserved)
- [ ] C2.4 Cancel / close × / backdrop click — modal closes without saving
- [ ] C2.5 Validation: empty question → error, invalid points → error

## C3 — Voyage Metadata Edit

- [ ] C3.1 Voyage title/difficulty/status editable inline or via edit button
- [ ] C3.2 Save voyage metadata — updates immediately

## C4 — AI Grilling Chat

- [ ] C4.1 AI section visible at bottom of right panel when a voyage is selected
- [ ] C4.2 Type a prompt (e.g., "Add more puzzle trials about fractions") and send
- [ ] C4.3 AI responds with clarifying questions (multi-turn)
- [ ] C4.4 Chat history persists in the UI during the session
- [ ] C4.5 User says "generate" or "looks good, generate" → AI creates 3-5 trials
- [ ] C4.6 Generated trials appear in the trials list
- [ ] C4.7 Each message exchange is saved to AIContext table
- [ ] C4.8 Final generation creates a summary AIContext record

## C5 — AIContext Table

- [ ] C5.1 AIContext record created with userId, content (markdown), appFeature, voyageId (optional), seaId (optional)
- [ ] C5.2 GET `/api/admin/ai-context?appFeature=trials&voyageId=X` returns past contexts
- [ ] C5.3 Past contexts displayable in the AI chat as reference

## C6 — Edge Cases

- [ ] C6.1 No seas exist — left panel shows "No seas created yet"
- [ ] C6.2 Sea has no voyages — expanded sea shows "No voyages in this sea"
- [ ] C6.3 Voyage has no trials — "No trials yet" with "Generate with AI" CTA
- [ ] C6.4 AI API fails — error message in chat, no trials created, context saved with error note
- [ ] C6.5 DeepSeek API key missing — AI section shows "AI features not configured"
- [ ] C6.6 Non-admin access — redirects to / (middleware handles)
