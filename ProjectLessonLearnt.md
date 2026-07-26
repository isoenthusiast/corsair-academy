# Project Lessons Learned — Corsair Academy & Associated Projects

**Last Updated:** 2026-07-26 (Login redirect fix: hardcoded route → middleware delegation)
**Purpose:** Consolidated knowledge from all sessions. **Must be scanned before starting any new work.**

---

## 🔴 Prisma & Database

### Schema Design
- **Prisma 7 driver adapter** solves Windows ARM64 compatibility — pure JS, no native binary needed
- **Prisma 7 requires**: `prisma.config.ts`, no `url` in datasource, `output` in generator, `@prisma/adapter-pg`
- **Bidirectional relations mandatory** in Prisma 7 — adding `Assignment.voyage` requires `Voyage.assignments[]`
- **Optional lists NOT supported**: `String[]?` → use `String[] @default([])`
- **Ambiguous relations**: any model with 2+ relations to the same target needs `@relation(<name>)` on ALL sides
- **Self-relations**: only the scalar FK side gets `fields`/`references`; the array side just names the relation
- **Enum formatting**: Prisma 7 prefers multi-line enums over single-line
- **Composite unique constraints** needed for multi-company tables: `@@unique([field, companyId])` not `@unique`
- **Polymorphic tables** (no FK possible) need manual cascade cleanup in DELETE handlers
- **`@updatedAt` columns** have NO default in DB — raw SQL INSERTs must set them explicitly with `NOW()`
- **Prisma field naming**: trust generated client types, not schema — `streaks` vs `streak` varies by query context
- **Generated Prisma client should be committed** to repo — avoids needing `prisma generate` during Docker build

### Query Patterns
- **Before writing Prisma queries**, verify field names with `grep_search` on `schema.prisma`
- **Prisma `where` can't have two `OR` blocks** at same level — duplicate JS key. Filter one condition in JS or use raw SQL
- **Never parallelize >10 raw DB queries** — exhausts connection pool. Use batch SQL or ANALYZE approach
- **`npx tsx` scripts don't load `.env`** — they fall back to localhost. Always use app API routes for production DB ops
- **`@prisma/adapter-pg` caches schema** on first connect. New tables need dev server restart after `prisma generate`
- **PostgreSQL `n_live_tup` unreliable** after DB restores — run `ANALYZE` before querying
- **FK orphan queries**: `WHERE child.fk IS NOT NULL AND parent.id IS NULL` — exclude NULL FKs
- **`ON CONFLICT DO NOTHING` needs a business-key unique constraint** — not just PK

### Migrations & sync-schema.ts
- **sync-schema.ts runs on EVERY deploy** — audit for destructive INSERT/UPDATE/DELETE
- **Only DDL allowed in deploy scripts**: CREATE/ALTER/DROP TABLE/COLUMN/INDEX. Never INSERT backfills
- **sync-schema.ts must stay in sync** with Prisma schema unique constraints — ON CONFLICT clauses break on schema changes
- **CREATE UNIQUE INDEX needs dedup DELETE first** if existing data violates the constraint

---

## 🔵 TypeScript & JSX

### JSX Patterns
- **Sibling elements in conditionals need fragment wrapper**: `{cond && (<> <A/> <B/> </>)}`
- **Ternary in template literals needs parentheses**: `style={{ width: \`${progress ? (x)*100 : 0}%\` }}`
- **JSX ternary closing braces**: `{cond ? <a/> : <b>{arr.map(x => (<c/>))}</b>}` — count your `{` and `}`
- **Server components can't use browser APIs** (navigator, clipboard, localStorage) — extract `"use client"` wrapper
- **`useSearchParams` requires `Suspense` boundary** in Next.js App Router
- **Function declarations hoisted** — use `function`, not `const`, for helper components at end of file
- **Single-file multi-component modules**: always trace `function` boundaries before adding JSX
- **Deeply nested files**: prefer `confirm()`/`alert()` over React modals when JSX insertion risks parse tree breakage

### TypeScript Fixes
- **Never trust Turbopack's type checking** — always `npm run build` before pushing (catches errors Turbopack skips)
- **`Object.values()` returns `unknown[]`** — cast to expected type
- **Never use `{}` as a type** — use `Record<string, string>` or `object`
- **Combine multiple `useState` into single state object** to avoid cascading renders
- **Initialize variables with defaults** in conditional branches to satisfy strict mode

---

## 🟢 Next.js & NextAuth

### Auth
- **NextAuth v5 JWT strategy**: split `auth.config.ts` (Edge-safe, no Prisma) vs `auth.ts` (full with Prisma)
- **Auth route needs `runtime = "nodejs"`** — Prisma 7 client uses Node APIs not available on Edge
- **Middleware role routing**: explicit home-route mapping for all 4 roles (Student→/map, Teacher→/class, etc.)
- **CSRF + cookie chain** for API testing: CSRF endpoint → cookie → credentials callback → session cookie
- **Server-side cookie clearing**: `response.cookies.set("authjs.session-token", "", { maxAge: 0 })` for redirect-based auth
- **Impersonation**: HMAC-signed tokens with 60s expiry, `_impersonate_` special credentials, `impersonatedBy` in JWT

### Routing & Pages
- **Turbopack caches aggressively** — delete `.next/` when imports/routes appear broken
- **Dynamic route slugs must be consistent** across nested routes (`[id]` not `[voyageId]`)
- **Stale route compilation**: touch the file to force Turbopack recompilation if route returns 404
- **Consistent admin pattern**: Server Page + POST API + `redirect()`

---

## 🟡 Railway & Deployment

### Build & Deploy
- **Always run `npm run build` locally before pushing** — catches TS errors Railway will reject
- **`engines.node` in `package.json`** forces Nixpacks to use correct Node version (Prisma 7 needs 22+)
- **`railway.toml`**: set `[nixpacks] providers = ["nodejs_22"]` explicitly
- **preDeployCommand order**: `generate → db push → seed` (not push before generate)
- **Railway preDeployCommand runs on EVERY deploy** — audit for destructive operations
- **For production DB mutations**, use app API endpoints, not external scripts
- **Folder names with spaces break Nixpacks**: `00 Ref` → cache mount path splits at space → build crashes. Use `docs/` or `00_Ref/` instead
- **`.dockerignore` is essential**: exclude `.env` to prevent Nixpacks from injecting secrets as Docker ARG/ENV

### Security
- **Never expose secrets in Docker ARG/ENV**: Nixpacks reads `.env` and creates ARG/ENV for each variable — these are visible in image layers forever
- **`.env` must be in `.gitignore`** AND `.dockerignore` — gitignore prevents commits, dockerignore prevents build injection
- **Set production secrets in Railway Dashboard → Variables**, not in repo files
- **`.env.example`** with placeholders is safe to commit — documents required vars without exposing values
- **Generated Prisma client in repo** means build doesn't need DATABASE_URL at build time — reduces attack surface
- **Use Railway CLI for variable management**: `railway variables set KEY="value"` — the web UI's CodeMirror editor is fragile to programmatic manipulation. Setting `cmContent.textContent` on a CodeMirror parent element collapses all `.cm-line` elements into a single malformed text node
- **Railway reference variables**: `${{Postgres.DATABASE_PUBLIC_URL}}` auto-resolves to the actual connection string. Use public URL for preDeployCommand if private network isn't available yet

---

## 🟣 AI & DeepSeek

### API Integration
- **DeepSeek API is OpenAI-compatible** — standard `fetch` to `/v1/chat/completions` with Bearer token
- **System prompt design**: define role, output format, field descriptions, explicit rules
- **JSON mode**: instruct "Return ONLY valid JSON. No markdown, no code fences." Parse defensively (strip ```json)
- **Temperature**: 0.7-0.8 for creative generation, 0.3-0.5 for structured extraction/grading
- **Always validate AI output** before DB insert — check required fields, valid types, clean data
- **Always provide fallback** for AI API failures — network issues, rate limits, timeouts are common
- **Persona prompts** (tutor): strict rules (hints not answers, short responses, stay in character)

---

## 🟠 PowerShell & Tooling

### PowerShell
- **Bracket escaping**: use `-LiteralPath` for paths with `[` `]` (PowerShell treats them as glob patterns)
- **Python `-c` broken in PowerShell** — always write `.py` files
- **Multiline git commits hang** in PowerShell — use single-line messages
- **`grep_search` unreliable for TS patterns** with special chars — use PowerShell `Select-String`
- **Folder names with spaces break CI/CD**: Nixpacks, Docker, and shell scripts all choke on spaces. Use `kebab-case`, `snake_case`, or `CamelCase` only.

### VS Code & Terminal
- **Terminal output frequently empty** with `mode=sync` — use VS Code tasks for output visibility
- **Truncated output ≠ failure** — verify data state with lightweight read query before re-running
- **Playwright `click_element` times out** in Turbopack dev — use `page.evaluate()` + `form.requestSubmit()`
- **Fast Refresh doesn't pick up new `function` declarations** — manual browser reload needed

---

## ⚪ Testing

### Test Infrastructure
- **CookieJar class** for maintaining sessions across API test requests
- **NextAuth testing**: CSRF → login → session cookie chain must be preserved
- **Test `status < 400`** not `status === 200` — Next.js returns 304 for cached pages
- **Separate login per role** into reusable session instances
- **Test runner**: single file, no dependencies beyond `fetch`, run with `npx tsx`
- **5-step build workflow**: Test plan → Build → Update docs → Lessons learned → Commit

---

## 📋 Kanban Board

### Design Decisions
- **Single table over multiple types**: `KanbanCard` with `type` enum + polymorphic `sourceTable`/`sourceId` avoids table-per-card-type explosion. Same pattern as AttachmentMapping.
- **Native HTML5 drag-and-drop**: `onDragStart`/`onDragOver`/`onDrop` with visual feedback. Zero dependencies, works in all modern browsers. Trade-off: no touch support (mobile/tablet).
- **Auto-archive in GET, not cron**: Done cards >30 days are archived server-side on next GET request. Simpler than cron, but means archive timing depends on page visits.
- **5-card pagination**: Show 5 cards per column, "Show More" button reveals all. Prevents board overload for large card sets while keeping initial view clean.
- **Role-scoped queries**: Admin=all, Teacher=own students via ClassTeacher→StudentClass, Parent=linked children via StudentParent. Single API, 3 different query shapes.
- **Prisma `@relation` naming for dual FK to User**: `assignee` (KanbanAssigned) and `creator` (KanbanCreated) both point to User. Without explicit relation names, Prisma would reject the ambiguous relation.

### Lessons
- **Drag-and-drop state sync**: After `onDrop`, optimistic UI update (move card in local state), then PATCH API. If API fails, revert local state. Prevents UI lag.
- **Enums need annotation in Prisma 7**: `@map("KanbanType")` on enum to match DB naming convention, or let Prisma auto-generate PascalCase. Our enums map to native Postgres enums for type safety.

### Patterns
- **Grill-with-docs before building**: settle specs in Q&A, capture in CONTEXT.md + ADRs
- **One test plan per domain** (game mechanics, learning, AI), not per page
- **Document relationships**: cross-reference between philosophy docs, APP_DESIGN.md as central hub
- **Consistent admin feature pattern**: Server Page + POST API + `redirect()` — no client state needed
- **`Crypto.randomUUID()`** for secure tokens — URL-safe, globally unique, no library needed
- **Documentation audit as final phase**: after major feature phases, audit all docs for version numbers and feature completeness. Our docs were at v2.1.0 while app was at v2.7.0. ADMIN_PHILOSOPHY.md was missing Phase 3 features. AI_PHILOSOPHY.md still listed features as planned, not built. USER_PHILOSOPHY.md was missing impersonation flow
- **CLAUDE.md**: used as agent instructions file — place in project root for AI agent context
- **Middleware is the single source of truth for role-based routing**: All auth guards should `redirect("/")` (not `/map` or `/admin`). The middleware already maps role→home route in one place. Hardcoding a route in a page bypasses this and causes drift — e.g., admin login went to `/map` because `page.tsx` hardcoded `router.push("/map")` instead of `router.push("/")`. **Audit rule**: any `router.push` or `redirect` to a role-specific home page (`/map`, `/admin`, `/class`, `/captain`) is a bug. Always redirect to `/` and let middleware route. The one exception is post-action redirects to specific sub-pages (e.g., `redirect("/admin/users")` after creating a user).

---

> **Instructions:** This file is the single source of truth for all project lessons. 
> Before starting any work, scan relevant sections. After fixing a mistake, add a new entry here.
> Old individual lesson files in `/memories/` are superseded by this consolidated document.
