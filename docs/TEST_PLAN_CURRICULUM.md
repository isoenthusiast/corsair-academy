# Corsair Academy — Curriculum Test Plan

**Date:** July 25, 2026 (v2.1.0)
**Scope:** Voyage CRUD, branching, metadata, lifecycle, bundles, version history, bulk ops

---

## CT1 — Voyage Structure

| ID | Action | Expected |
|----|--------|----------|
| CT1.1 | Admin views voyage editor | All 5 trials listed with type badges |
| CT1.2 | Voyage has < 5 trials | Warning: "Recommended: exactly 5 trials" |
| CT1.3 | Voyage has no fill_blank | Warning: "Add at least one fill_blank for recall practice" |
| CT1.4 | 3+ consecutive multi_choice | Warning: "Consider alternating trial types" |
| CT1.5 | Gauntlet final trial not open_ended | Warning: "Captain's Gauntlet strongly recommends open_ended finale" |

## CT2 — Voyage Metadata

| ID | Action | Expected |
|----|--------|----------|
| CT2.1 | Admin sets objectives | "By the end, you will: recognize all 26 letters" |
| CT2.2 | Admin sets estimated time | 10 minutes |
| CT2.3 | Admin adds tags | ["phonics", "alphabet"] |
| CT2.4 | Admin adds skills | ["letter-recognition"] |
| CT2.5 | Admin sets prerequisite knowledge | "Knows letters A-M" |
| CT2.6 | Metadata visible on student voyage card | Shows time estimate, objectives tooltip |

## CT3 — Voyage Branching

| ID | Action | Expected |
|----|--------|----------|
| CT3.1 | Admin creates branch V3b | Selects parent V2, sets label "Creative Path" |
| CT3.2 | Student reaches V2 | Sees choice: "Grammar Path" vs "Creative Path" |
| CT3.3 | Student chooses branch | V3a or V3b unlocked based on choice |
| CT3.4 | Student switches branches | Progress in old branch preserved, new branch starts fresh |
| CT3.5 | Student completes any gauntlet | Sea marked "Mastered" |
| CT3.6 | Admin deletes branch | Warns if students are mid-branch |

## CT4 — Voyage Lifecycle

| ID | Action | Expected |
|----|--------|----------|
| CT4.1 | Admin creates voyage in Draft | Visible in admin only |
| CT4.2 | Admin publishes voyage | Visible to all users, no longer editable |
| CT4.3 | Admin deprecates voyage | Students who started it can finish. New students don't see it. |
| CT4.4 | Admin sets up A/B test | Two voyages, groups "A" and "B", same branch parent |
| CT4.5 | Students randomly assigned A or B | 50% each, consistent per student |
| CT4.6 | 50 students complete both | Admin sees comparison dashboard |
| CT4.7 | Admin declares winner | Winner → Published, loser → Deprecated |
| CT4.8 | A/B test runs 90 days with < 50 students | Auto-resolves. Both stay if tied. |

## CT5 — Voyage Bundles

| ID | Action | Expected |
|----|--------|----------|
| CT5.1 | Admin creates bundle "Pirate Starter Pack" | Selects V1 from 4 seas, sets order |
| CT5.2 | Teacher sees "Apply Bundle" on class page | Clicks → all 4 voyages assigned |
| CT5.3 | Due dates auto-calculated | Day 1: V1, Day 8: V1, Day 15: V1, Day 22: V1 (7-day intervals) |
| CT5.4 | Admin edits bundle | Add/remove voyages, reorder |
| CT5.5 | Teacher reapplies edited bundle | New voyages added, removed ones stay (don't unassign) |

## CT6 — Trial Version History

| ID | Action | Expected |
|----|--------|----------|
| CT6.1 | Admin edits trial question | TrialVersion created: version 2 |
| CT6.2 | Version timeline visible | Sidebar shows: v1 (original), v2 (current) |
| CT6.3 | Admin clicks v1 in timeline | Preview of old question content |
| CT6.4 | Admin clicks "Rollback to v1" | Creates v3 with v1's content. v1 and v2 preserved. |
| CT6.5 | Diff view between v1 and v2 | Highlights changed words |

## CT7 — Bulk Operations

| ID | Action | Expected |
|----|--------|----------|
| CT7.1 | Drag voyage to reorder | New order saved, reflected on student map |
| CT7.2 | Drag trial to reorder | New order saved, reflected in voyage player |
| CT7.3 | Multi-select 3 trials → Delete | Confirmation dialog, trials deleted |
| CT7.4 | Clone voyage | New voyage: "[Original] (Copy)" with all trials duplicated |
| CT7.5 | Move trial to different voyage | Trial transferred, order adjusted |
| CT7.6 | Export CSV | Downloads template with all trials pre-filled |
| CT7.7 | Import valid CSV | Preview → confirm → trials created |
| CT7.8 | Import CSV with duplicate questions | Validation error: row flagged |
| CT7.9 | Clone entire sea | Copies sea + all voyages + all trials |

## CT8 — Seed File Sync

| ID | Action | Expected |
|----|--------|----------|
| CT8.1 | Admin clicks "Reset to Seed" | All runtime changes reverted to seed values |
| CT8.2 | Seed has new voyage not in DB | Admin sees banner: "Seed has 1 new voyage. Import?" |
| CT8.3 | DB has voyage not in seed | Admin sees banner: "1 voyage exists only in DB. Add to seed?" |

---

## Execution Log

| Test | Result | Notes |
|------|--------|-------|
| CT1.1 | ⚠️ NOT BUILT | |
| ... | | |
