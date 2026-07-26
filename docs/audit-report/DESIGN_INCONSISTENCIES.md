# Design Inconsistencies — Corsair Academy Audit

Places where the as-built app contradicts or diverges from the documented philosophy.

---

## D1: "No Failure" Learning Philosophy Not Implemented

**Document:** Design Philosophy §2 — Skull Rating  
**Quote:** "Students always earn at least 1 skull. There is no failure — only different degrees of success."

**Code:** [src/app/voyage/[id]/TrialPlayer.tsx](../../corsair-app/src/app/voyage/[id]/TrialPlayer.tsx)

**Issue:** For `open_ended` trials, AI grading can return `correct=false`. The UI then shows "Close, sailor!" and displays the correct answer, creating a failure-like state. For other types, wrong answers show the same negative framing.

**Recommendation:** Frame all outcomes positively. Always show explanation. Ensure open-ended AI grading defaults to at least 1 skull and never a hard "wrong."

---

## D2: Fortune Wind Effect Contradicts Philosophy

**Document:** Design Philosophy §1 — Sea Charms  
**Quote:** "Fortune Wind: Double crowns from next trial."

**Code:** [src/app/tavern/page.tsx](../../corsair-app/src/app/tavern/page.tsx)

**Issue:** Shop description says "Double XP for 1 hour." Charms are also not consumed in gameplay.

**Recommendation:** Update description to match philosophy and implement crown-doubling effect.

---

## D3: Ship Upgrade Effects Missing

**Document:** Design Philosophy §1 — Ship Upgrades  
**Listed effects:** +10% XP, hint preview, +20% crowns, 2× skulls chance, unlock all difficulties.

**Code:** [src/app/api/trials/attempt/route.ts](../../corsair-app/src/app/api/trials/attempt/route.ts), [src/app/api/voyages/complete/route.ts](../../corsair-app/src/app/api/voyages/complete/route.ts)

**Issue:** Upgrades are purchasable but provide zero gameplay effect. The seed even uses different upgrade names/effects than the economy page UI.

**Recommendation:** Apply upgrade multipliers in trial attempt/complete reward calculations.

---

## D4: Captain's Gauntlet Not Rewarded 2×

**Document:** Design Philosophy §2 — Captain's Gauntlet  
**Quote:** "2× point values. Bonus XP + crowns on completion."

**Code:** [src/app/api/voyages/complete/route.ts](../../corsair-app/src/app/api/voyages/complete/route.ts)

**Issue:** Adds flat `100` bonus when `captainGauntlet=true`, but individual trial points are not doubled.

**Recommendation:** Multiply all trial rewards within a gauntlet voyage by 2×, or double the voyage completion bonus to match intent.

---

## D5: Voyage Branching Not Expressed in Student UI

**Document:** Design Philosophy §4 — Voyage Branching  
**Example:** Sea of Cunning branches into grammar vs. creative paths.

**Code:** [src/app/map/page.tsx](../../corsair-app/src/app/map/page.tsx)

**Issue:** Map locks voyages purely by array index (`idx > 0 && no progress`). `requiredVoyageId` and `branchParentId` are ignored.

**Recommendation:** Implement unlock logic based on `requiredVoyageId` and render branch labels/choices.

---

## D6: Adaptive Difficulty Is Global, Not Per-User

**Document:** Design Philosophy §2 — Difficulty Arc  
**Implied:** Adaptive difficulty should personalize per student.

**Code:** [src/app/api/adaptive/check/route.ts](../../corsair-app/src/app/api/adaptive/check/route.ts)

**Issue:** The route updates `Voyage.difficulty`, which is shared across all users. One student's performance changes the difficulty for everyone.

**Recommendation:** Store per-user difficulty adjustment on `UserVoyageProgress` or a new `UserAdaptiveSetting` model.

---

## D7: Hardcoded Role-Specific Redirect in `/class/page.tsx`

**Document:** ProjectLessonLearnt.md / App Design §5  
**Rule:** "All auth guards should `redirect("/")`. Never hardcode role-specific redirects."

**Code:** [src/app/class/page.tsx](../../corsair-app/src/app/class/page.tsx#L35)

**Issue:** `if (classes.length === 1 && session.user.role !== "Admin") { redirect(`/class/${classes[0].id}`); }`

**Recommendation:** Remove the redirect. Render a single-class teacher view directly, or use a Link. If redirect is unavoidable, redirect to `/` and let middleware route back.

---

## D8: Voyage Status Enum Mismatch

**Document:** Design Philosophy §4 — Voyage States  
**Documented states:** `Draft`, `Published`, `Deprecated`.

**Code:** [prisma/schema.prisma](../../corsair-app/prisma/schema.prisma)

**Issue:** `Voyage.status` is a plain `String` defaulting to `"Draft"`. The `VoyageStatus` enum (`Locked`, `Available`, `InProgress`, `Completed`, `Mastered`) is used only on `UserVoyageProgress`.

**Recommendation:** Introduce a `VoyageLifecycle` enum (`Draft`, `Published`, `Deprecated`) on `Voyage.status` and rename the progress enum to avoid naming confusion.

---

## D9: Streak Chest Rewards Not Implemented

**Document:** Design Philosophy §1 — Daily Streak Chests  
**Rewards:** Day 1/3/7/14/30 milestone chests.

**Code:** [src/app/api/trials/attempt/route.ts](../../corsair-app/src/app/api/trials/attempt/route.ts)

**Issue:** Streak is incremented but chest eligibility is never checked or claimed.

**Recommendation:** Add streak milestone check on trial completion and a claim UI on the map.

---

## D10: Rank Thresholds Duplicated

**Document:** Design Philosophy §1 — Pirate Ranks  
**Ranks:** Deckhand → Sea Lord with fixed XP thresholds.

**Code:** `RANK_XP` and `RANKS` arrays copied in:
- [map/page.tsx](../../corsair-app/src/app/map/page.tsx)
- [profile/page.tsx](../../corsair-app/src/app/profile/page.tsx)
- [captain/page.tsx](../../corsair-app/src/app/captain/page.tsx)
- [class/[id]/page.tsx](../../corsair-app/src/app/class/[id]/page.tsx)

**Issue:** No single source of truth. If economy panel changes thresholds, only some pages update.

**Recommendation:** Store rank thresholds in `EconomySettings` and expose via a shared helper.

---

## D11: Trial Generation Excludes `open_ended`

**Document:** Design Philosophy §2 — Trial Design  
**Quote:** "`open_ended` ~15%" and "Gauntlets end with `open_ended` trial."

**Code:** [src/app/api/admin/voyages/[id]/generate-trials/route.ts](../../corsair-app/src/app/api/admin/voyages/[id]/generate-trials/route.ts)

**Issue:** SYSTEM_PROMPT instructs AI to generate only `multi_choice | fill_blank | puzzle` with 50/30/20 mix.

**Recommendation:** Include `open_ended` in prompt, especially for gauntlet voyages.

---

## D12: Achievement System Underutilized

**Document:** Design Philosophy §1 — Achievements  
**Listed:** 15 achievements across streak, exploration, mastery, speed, collection.

**Code:** [src/app/api/voyages/complete/route.ts](../../corsair-app/src/app/api/voyages/complete/route.ts)

**Issue:** Only `first-steps` (≥1 voyage) and `getting-started` (≥10 voyages) are checked. Speed, streak, mastery, and collection achievements are never evaluated.

**Recommendation:** Add achievement evaluation service called from trial attempt/complete and streak update paths.

---

## Summary Table

| # | Inconsistency | Severity |
|---|--------------|----------|
| D1 | Failure state exists in UI | Medium |
| D2 | Fortune Wind says XP not crowns | Medium |
| D3 | Ship upgrades have no effect | High |
| D4 | Gauntlet not 2× rewarded | Medium |
| D5 | Voyage branching ignored | High |
| D6 | Adaptive difficulty is global | High |
| D7 | Hardcoded `/class/[id]` redirect | High |
| D8 | Voyage status enum mismatch | High |
| D9 | Streak chests missing | High |
| D10 | Rank thresholds duplicated | Medium |
| D11 | AI generation excludes open_ended | Medium |
| D12 | Achievements underutilized | Medium |
