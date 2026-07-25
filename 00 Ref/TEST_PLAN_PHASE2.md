# Corsair Academy — Phase 2 Test Plan

**Date:** July 25, 2026 (v2.1.0)
**Scope:** User editor, economy panel, parent linking, analytics, moderation, settings, templates, invites

---

## P2T1 — User Editor (/admin/users/[id])
| ID | Action | Expected |
|----|--------|----------|
| P2T1.1 | Click Edit on any user | Form pre-filled with name, username, role, status, age, bio |
| P2T1.2 | Change role from Student to Teacher | Role updated, class enrollments cleared |
| P2T1.3 | Adjust crowns (+100) | CrownTransaction created, balance updated |
| P2T1.4 | Set status to Inactive | User can't log in |
| P2T1.5 | Reset password | mustChangePassword=true, temp password generated |
| P2T1.6 | Soft delete user | deletedAt set, restore button appears |

## P2T2 — Economy Panel (/admin/economy)
| ID | Action | Expected |
|----|--------|----------|
| P2T2.1 | Change crown rate from 0.5 to 0.75 | New trials award 75% of XP |
| P2T2.2 | Change shop item price | Tavern shows new price |
| P2T2.3 | Change rank XP threshold | Rank calculation uses new value |
| P2T2.4 | Reset to defaults | All values revert |

## P2T3 — Parent Linking (/admin/parents)
| ID | Action | Expected |
|----|--------|----------|
| P2T3.1 | Search student "Andrew" | Shows Andrew with current parents |
| P2T3.2 | Link parent2 to Andrew | StudentParent created |
| P2T3.3 | Attempt 3rd parent link | Button disabled, tooltip shown |
| P2T3.4 | Unlink parent | StudentParent deleted |

## P2T4 — Analytics (/admin/analytics)
| ID | Action | Expected |
|----|--------|----------|
| P2T4.1 | View dashboard | Engagement, completion, accuracy charts |
| P2T4.2 | Select time range 7d | Data filters |
| P2T4.3 | Export CSV | Downloads file |

## P2T5 — Moderation (/admin/moderation)
| ID | Action | Expected |
|----|--------|----------|
| P2T5.1 | View flagged trials | Sorted by flag count |
| P2T5.2 | Approve trial | Flags dismissed |
| P2T5.3 | Remove trial | Deleted from pool |

## P2T6 — Settings (/admin/settings)
| ID | Action | Expected |
|----|--------|----------|
| P2T6.1 | Toggle maintenance mode | Non-admin users see maintenance page |
| P2T6.2 | Toggle feature flag | Feature disabled immediately |
| P2T6.3 | Change app name | Reflects in layout title |

## P2T7 — Templates (/admin/templates)
| ID | Action | Expected |
|----|--------|----------|
| P2T7.1 | Create template | Name + select voyages + set due days |
| P2T7.2 | Apply to class | All voyages assigned with due dates |

## P2T8 — Invite (/invite/[token])
| ID | Action | Expected |
|----|--------|----------|
| P2T8.1 | Open valid invite link | Form: name, username, password |
| P2T8.2 | Submit form | Account created, token consumed |
| P2T8.3 | Open expired link | "This invite has expired" |

---

## Execution Log

| Test | Result | Notes |
|------|--------|-------|
| P2T1.1 | | |
