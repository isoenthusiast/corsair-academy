# Audit Reports

This folder contains dated project audits. Each subfolder is named `YYYY-MM-DD` and holds a complete audit snapshot for that date.

## Reports

| Date | Summary File |
|------|--------------|
| [2026-07-26](2026-07-26/AUDIT_SUMMARY.md) | Full project audit vs. design philosophy and app design |

## Adding a New Audit

1. Create a new folder named with the audit date: `docs/audit-report/YYYY-MM-DD/`.
2. Place all audit report files inside that folder.
3. Update this README to link the new audit.

## Future Audit Conventions

> Lessons learned from the 2026-07-26 audit cycle. Apply these on every subsequent audit.

1. **Compare design docs against as-built code.** `APP_DESIGN.md` and `DESIGN_PHILOSOPHY.md` describe intent; the codebase is the truth. Identify divergence in both directions — features designed but not built, and features built but not documented.

2. **Check every Prisma model for usage.** A model in the schema with zero application code references is dead weight. Check both `src/` and `scripts/` for model usage via `grep_search`.

3. **Verify every API route has auth.** Run a script that hits every API endpoint without a session and expects 401/403. The `test-security.ts` pattern (Jar-based cookie auth + systematic endpoint probing) is reusable.

4. **Audit preDeployCommand for DML.** Railway's `railway.toml` preDeployCommand runs on EVERY deploy. It must contain ONLY DDL (CREATE/ALTER TABLE, CREATE INDEX). Never put INSERT/UPDATE/DELETE or seed scripts in deploy hooks. One-time data operations belong in standalone scripts.

5. **Check for hardcoded constants.** Economy values (crown rates, shop prices, rank thresholds) must come from the database, not from `const` arrays in page files. Use `getEconomySettings()` / `getSystemSettings()` as the single source of truth.

6. **Validate client-supplied prices server-side.** Shop and upgrade costs sent from the client must be validated against the authoritative DB values before deducting currency. Never trust the client's `cost` field.

7. **Verify userId isolation.** Every gameplay API must derive the user from the session, never from the request body or form data. A student must not be able to post actions for another user.

8. **Produce a dated report folder.** Place all findings in `docs/audit-report/YYYY-MM-DD/` with a summary `AUDIT_SUMMARY.md` and topic-specific files. Update this README with a link.

9. **Sequence findings into a backlog.** After the audit, convert findings into actionable, sequenced blocks in `TODO.md` under a new phase. Order blocks by dependency: security hardening first, then data model, then gameplay, then polish, then testing/docs.

10. **Run `npm run build` after every block.** Turbopack dev mode silently swallows TypeScript errors. Always validate with a production build before committing.
