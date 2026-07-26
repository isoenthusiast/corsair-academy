# Test Coverage Gaps — Corsair Academy Audit

Comparison of `docs/test-plans/` against actual test scripts in `corsair-app/scripts/`.

---

## Test Scripts Inventory

| Script | Tests | Status |
|--------|-------|--------|
| [scripts/test-phase4.ts](../../corsair-app/scripts/test-phase4.ts) | 28 API/E2E tests | ✅ Exists |
| [scripts/test_kanban.py](../../corsair-app/scripts/test_kanban.py) | 21 Kanban API tests | ✅ Exists |
| [scripts/test-phase5.ts](../../corsair-app/scripts/test-phase5.ts) | Learning tests | ⚠️ Exists (22 of 28 per log) |
| Other test plans | — | ❌ No corresponding scripts |

---

## Test Plan vs. Implementation

| Test Plan | # Tests | Automated Script | Coverage | Gap |
|-----------|---------|------------------|----------|-----|
| `TEST_PLAN.md` | General | `test-phase4.ts` | Partial | UI rendering only |
| `TEST_PLAN_LEARNING.md` | 28 | `test-phase5.ts` | 22 executed | 6 not run (gauntlet navigation) |
| `TEST_PLAN_MULTIUSER.md` | ~20 | None | Manual only | Role scoping not automated |
| `TEST_PLAN_USERS.md` | ~45 | None | Manual only | Forced password change, status, CSV import not tested |
| `TEST_PLAN_CURRICULUM.md` | ~25 | None | Manual only | Versioning, branching not tested |
| `TEST_PLAN_CURRICULUM_V3.md` | ~15 | None | Manual only | Split-panel flows not tested |
| `TEST_PLAN_ADMIN.md` | 37 | None | **No automated tests** | Economy/settings stubs not caught |
| `TEST_PLAN_AI.md` | ~40 | `test-phase4.ts` (6 AI tests) | ~15% | Budget, cost, grading queue, content hash not tested |
| `TEST_PLAN_AI_GRADING.md` | ~15 | None | Manual only | Teacher override not built |
| `TEST_PLAN_AI_TRIALS.md` | ~20 | Partial | Some generation tests | Anti-repeat, content hash not built |
| `TEST_PLAN_IMPERSONATION.md` | ~8 | None | Manual only | Audit logging not tested |
| `TEST_PLAN_INVITES.md` | ~10 | Partial | Basic flow tested | Edge cases not tested |
| `TEST_PLAN_KANBAN.md` | 21 | `test_kanban.py` | ✅ Full | Good coverage |
| `TEST_PLAN_PHASE2.md` | Phase 2 admin | Partial | Outdated | Superseded by newer plans |
| `TEST_PLAN_PHASE4.md` | 28 | `test-phase4.ts` | ✅ Full | Good coverage |
| `TEST_PLAN_PHASE5.md` | Phase 5 learning | `test-phase5.ts` | 22/28 | Minor gaps |

---

## Key Uncovered Risks

Because many test plans have no automated scripts, the following bugs were not caught before production:

1. **Economy/settings APIs are stubs** — no automated admin tests exist.
2. **Auth status checks missing** — user management tests are manual.
3. **Client `userId` privilege escalation** — gameplay APIs not tested with mismatched session vs. body userId.
4. **Charm/upgrade effects missing** — learning tests do not validate reward multipliers.
5. **Voyage branching ignored** — curriculum tests do not validate `requiredVoyageId` unlocking.
6. **Adaptive difficulty global mutation** — not tested with multiple users.

---

## Recommendations

1. **Create `scripts/test-admin.ts`** covering:
   - Economy GET/POST persistence (once fixed)
   - Settings GET/POST persistence (once fixed)
   - User CRUD with status enforcement
   - Impersonation + audit log write
2. **Extend `test-phase4.ts`** or create `test-security.ts` for:
   - Session userId isolation
   - Inactive/suspended/deleted user login rejection
   - Admin self-role-change prevention
3. **Extend learning tests** to verify:
   - Charm consumption and effects
   - Ship upgrade multipliers
   - Gauntlet 2× rewards
   - Streak chest claims
4. **Add curriculum tests** for:
   - `requiredVoyageId` unlocking
   - Branching paths
   - Trial version history/rollback
5. **Run all automated tests in CI** before Railway deploy.
