# Test Plan — Kanban Board

**Feature:** Admin Kanban Board
**Date:** 2026-07-26

---

## 1. Data Model

| # | Test | Expected |
|---|------|----------|
| 1.1 | Create card with type=FlaggedTrial | Persisted with correct enum |
| 1.2 | Create card with type=Task (manual) | sourceTable=null, sourceId=null |
| 1.3 | Create card with assigneeId | Links to student |
| 1.4 | Default status is Backlog | All new cards start in Backlog |
| 1.5 | Priority defaults to Medium | Overridable |
| 1.6 | updatedAt auto-set on status change | @updatedAt handles this |

## 2. Columns & Drag-and-Drop

| # | Test | Expected |
|---|------|----------|
| 2.1 | Move card Backlog→InProgress | Status updates, re-renders in correct column |
| 2.2 | Move card InProgress→Done | Status updates |
| 2.3 | Move card Done→Archive | archivedAt set |
| 2.4 | Move card backwards (Done→InProgress) | Allowed, status updates |
| 2.5 | Each column shows max 5 cards | "Show More (X more)" button visible |
| 2.6 | Click "Show More" | Expands to show all cards in column |
| 2.7 | Archive column shows cards archived in last 30 days | Older cards hidden |

## 3. Card Creation

| # | Test | Expected |
|---|------|----------|
| 3.1 | Admin creates manual task card | Title + description + priority form |
| 3.2 | System auto-creates card (flagged trial) | Card appears in Backlog |
| 3.3 | Teacher flags trial → card created | Card has sourceTable="TrialAttempt" |
| 3.4 | AI generates trials → card created | Card type=AITrial |

## 4. Access Control

| # | Test | Expected |
|---|------|----------|
| 4.1 | Admin sees all cards | No filtering |
| 4.2 | Teacher sees only their students' cards | Filtered by assignee's class |
| 4.3 | Parent sees only their children's cards | Filtered by StudentParent links |
| 4.4 | Student accesses /admin/kanban | Redirected (middleware) |
| 4.5 | Unauthenticated access | Redirected to login |

## 5. Auto-Archive

| # | Test | Expected |
|---|------|----------|
| 5.1 | Card in Done for 30+ days | Auto-moved to Archive |
| 5.2 | Card in Archive for 60+ days | Soft-deleted (hidden from UI) |
| 5.3 | Manual archive (drag to Archive column) | archivedAt set immediately |

## 6. UI

| # | Test | Expected |
|---|------|----------|
| 6.1 | Nav card on /admin dashboard | "📋 Kanban Board" card |
| 6.2 | Page loads with 4 columns | Backlog, In Progress, Done, Archive |
| 6.3 | Empty columns show placeholder | "No cards yet" message |
| 6.4 | Type badge visible on each card | Color-coded by type |
| 6.5 | Priority indicator | Low/Medium/High badge |
| 6.6 | "Create Task" button | Opens modal/form |
| 6.7 | Drag card to new column | Visual feedback during drag |
