# Corsair Academy — Game Design Philosophy

**Last Updated:** July 26, 2026 (Reviewed — accurate) (v2.0.0 — Pirate Overhaul)
**Code Name:** "Corsair Academy" (formerly "QuestLab")

---

## 1. Core Vision

A learning platform disguised as a **pirate adventure RPG**. Andrew doesn't "study English" — he **sharpens his Cunning** in the Sea of Cunning. He doesn't "do math drills" — he **charts the stars** in the Sea of Navigation. Every academic subject is a **pirate attribute** that strengthens his character.

**Thesis:** Learning is the side effect of a great game, not the other way around.

---

## 2. Why Pirates?

| Design Goal | How Pirates Deliver It |
|-------------|----------------------|
| **Progression fantasy** | 9 pirate ranks (Deckhand → Sea Lord) — a clear, aspirational ladder |
| **Identity & ownership** | Wanted Poster, bounty, ship upgrades — the kid IS the character |
| **Collection drive** | Sea charms, ship upgrades, achievements — always something to earn |
| **Loss avoidance** | Streak = "sailing streak" — "don't lose the wind in your sails!" |
| **Epic meaning** | "You're training to become Sea Lord" vs "you're doing homework" |

---

## 3. Subject → Attribute Mapping

Each academic subject is re-framed as a **pirate attribute**:

| Subject | Sea | Attribute | Pirate Framing |
|---------|-----|-----------|----------------|
| English | 📚 Sea of Cunning | **Cunning** | Silver-tongued pirates master words, wit & deception |
| Mandarin | 🀄 Sea of Whispers | **Diplomacy** | Ancient Eastern tongues unlock forbidden trade routes |
| Maths | 🧮 Sea of Navigation | **Navigation** | Chart the stars, count the plunder, outsmart the navy |
| Science | 🔬 Sea of Brews | **Alchemy** | Brew potions, survive storms, master the elements |

---

## 4. Visual Language

Inspired by **One Piece** (カラー, energy, adventure) but with original names to avoid IP issues:

| Element | Design |
|---------|--------|
| **Palette** | Warm golds (#F7C948), deep navy (#0D1B2A), parchment (#F4E4BC), bounty red (#D32F2F) |
| **Typography** | Pirata One for headings (rough, adventurous), system sans-serif for body (readable for kids) |
| **Dashboard** | Treasure map aesthetic with island cards and dotted paths between voyages |
| **Trial UI** | Parchment scroll with frayed edges — warm, tactile, "ancient wisdom" feel |
| **Rank display** | **Wanted Poster** — bounty increases with rank, skull rating system |
| **Navigation** | Dotted treasure trails between voyages, compass and anchor motifs |

---

## 5. Pirate Ranks (9 Levels)

```
Deckhand       ▓░░░░░░░░  0 XP     — "Every legend starts in the bilge"
Swabbie        ▓▓░░░░░░░  100 XP   — "You've learned the ropes"
Gunner         ▓▓▓░░░░░░  300 XP   — "Your aim grows deadly"
Boatswain      ▓▓▓▓░░░░░  600 XP   — "The crew respects your command"
Quartermaster  ▓▓▓▓▓░░░░  1,000 XP — "You divide the plunder fairly"
First Mate     ▓▓▓▓▓▓░░░  1,500 XP — "The captain's right hand"
Captain        ▓▓▓▓▓▓▓░░  2,500 XP — "Your own ship, your own code"
Commodore      ▓▓▓▓▓▓▓▓░  4,000 XP — "A fleet at your command"
Sea Lord       ▓▓▓▓▓▓▓▓▓  6,000 XP — "The seas are yours"
```

---

## 6. Dual Economy

| Currency | Purpose | Earning |
|----------|---------|---------|
| **XP** | Determines pirate rank (permanent, never spent) | Trials: 10-30 XP. Gauntlets: 50-200 XP |
| **🪙 Crowns** | Spent at Tavern & Shipwright (earned & spent) | Trials: XP÷2. Voyages: diff×25. Streak bonuses |

### Ship Upgrades (Permanent)

| Upgrade | Cost | Benefit |
|---------|------|---------|
| 🛡️ Reinforced Hull | 300 🪙 | +1 free hint per voyage |
| 🔭 Crow's Nest | 500 🪙 | Preview trial type before starting |
| 📦 Treasure Hold | 1,000 🪙 | +20% crowns from all activities |
| 💥 Cannon Array | 2,000 🪙 | Gauntlets give 2× rewards |
| 👻 Phantom Sails | 5,000 🪙 | Streak freeze lasts 3 days |

### Sea Charms (Consumable)

| Charm | Cost | Effect |
|-------|------|--------|
| 📜 Whisper Scroll | 20 🪙 | Reveals one trial hint |
| ⛈️ Storm Pass | 50 🪙 | Skip one trial |
| 💨 Fortune Wind | 100 🪙 | Double XP for 1 hour |
| ⚓ Anchor Charm | 150 🪙 | Freeze streak for 1 day |

---

## 7. Daily Streak Economy

| Streak Day | Chest | Contents |
|------------|-------|----------|
| 1 | 🪵 Wooden Crate | 10 🪙 |
| 3 | 📦 Sealed Barrel | 25 🪙 + random charm |
| 7 | 🧰 Sailor's Chest | 100 🪙 + 2 items |
| 14 | 💎 Strongbox | 250 🪙 + rare cosmetic chance |
| 30 | 👑 Captain's Coffer | 500 🪙 + guaranteed rare item |

Missing a day resets chest quality but **does NOT reset pirate rank**.

---

## 8. Key Design Choices

| Choice | Rationale |
|--------|-----------|
| **No failure state** | Wrong answers give hints + partial skulls. "Not yet" not "wrong." |
| **3-skull system** | 1☠️ for attempt, 2☠️ for correct, 3☠️ for correct + no hints. Everyone progresses. |
| **5 trials per voyage** | Keeps sessions to 5-10 minutes. Designed for attention spans. |
| **Captain's Gauntlet** | Every 5th voyage is a boss level. Must pass to unlock next sea segment. |
| **Computed pirate rank** | Based on total XP — transparent, never taken away. |
| **Ship upgrades are permanent** | Unlike charms, upgrades are forever. Long-term goal. |
| **Parent = Captain's Quarters** | Parents see fleet reports, never "you failed X times." |

---

## 9. Anti-Patterns (What We Avoid)

- ❌ **Grinding for grinding's sake** — every trial teaches something
- ❌ **Losing progress** — rank never decreases, only plateaus
- ❌ **Pay-to-win** — no microtransactions. Everything earned through learning.
- ❌ **Shaming wrong answers** — red X's are demotivating. We use "Close, sailor!" + hint.
- ❌ **Marathon sessions** — capped at 5 trials per voyage.

---

## 10. Future Seas (Expansion)

Once Andrew masters the 4 core seas, new seas can be added:

- 🎨 **Sea of Creation** — Art, music, creative writing
- 🏛️ **Sea of History** — World events, civilizations
- 🗺️ **Sea of Exploration** — Geography, cultures
- 💻 **Sea of Code** — Programming, logic
