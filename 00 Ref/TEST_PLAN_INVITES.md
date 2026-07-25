# Test Plan — Invite Link System

**Feature:** A4 — Admin Invite Link Generation & Management
**Date:** 2026-07-26

---

## 1. Admin Generate Invite

| # | Test | Expected |
|---|------|----------|
| 1.1 | Navigate to `/admin/invites` as Admin | Page loads with generate form + empty list |
| 1.2 | Navigate to `/admin/invites` as Student/Teacher/Parent | Redirected to home (403 via middleware) |
| 1.3 | Submit form with role=Student, expires=7 days | Redirect back, new invite appears in list |
| 1.4 | Submit form with role=Teacher | Invite created with Teacher role |
| 1.5 | Submit form with role=Parent | Invite created with Parent role |
| 1.6 | Each invite has unique token (crypto.randomUUID) | No duplicates, 36-char UUID format |
| 1.7 | Expiry date is exactly 7 days from now | Within 1 minute tolerance |

## 2. Admin List Invites

| # | Test | Expected |
|---|------|----------|
| 2.1 | Active (unused, not expired) invites show with "Active" badge | Green badge |
| 2.2 | Used invites show with "Used by [name]" | Shows user who claimed it |
| 2.3 | Expired invites show with "Expired" badge | Red/amber badge |
| 2.4 | Invites sorted newest-first | Most recent at top |
| 2.5 | Copy link button copies full URL to clipboard | `http://localhost:3200/invite/<token>` |

## 3. Admin Revoke Invite

| # | Test | Expected |
|---|------|----------|
| 3.1 | Click revoke on active invite | Invite removed from list |
| 3.2 | Revoked invite token no longer works | `/invite/<token>` shows "expired" page |
| 3.3 | Cannot revoke already-used invite | Button hidden or disabled for used invites |

## 4. Invite Acceptance Flow

| # | Test | Expected |
|---|------|----------|
| 4.1 | Open `/invite/<valid-token>` | Shows "Join the Crew!" form with role displayed |
| 4.2 | Submit with name, username, password | Redirects to `/?invited=1`, user created |
| 4.3 | New user has correct role from invite | Student/Teacher/Parent as specified |
| 4.4 | New user gets starting charms + streak | 3 whisper_scrolls, 1 each of others, streak=0 |
| 4.5 | Invite marked as used (usedById set) | Cannot be reused |
| 4.6 | Open used invite link | Shows "Invite Expired" page |
| 4.7 | Open expired invite link | Shows "Invite Expired" page |
| 4.8 | Open invalid/nonexistent token | Shows "Invite Expired" page |

## 5. Edge Cases

| # | Test | Expected |
|---|------|----------|
| 5.1 | Duplicate username during accept | Error handled gracefully (redirect with error) |
| 5.2 | Password < 6 characters | Rejected by form validation |
| 5.3 | Admin role invite (should not be possible) | Role dropdown excludes Admin |
| 5.4 | Multiple invites created simultaneously | Each gets unique token |
