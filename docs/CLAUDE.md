# CLAUDE.md — Gamified Learning App

A gamified learning platform for kids. Think Duolingo meets Khan Academy — powered by AI, driven by game mechanics.

## Quick Reference
- **Stack:** Next.js 16 + Prisma + PostgreSQL + NextAuth v5
- **AI:** DeepSeek V4 Pro (`deepseek-v4-pro`) for content generation + chat
- **Port:** 3200 (dev) / Railway (prod)
- **Auth:** NextAuth v5, credentials provider
- **DB:** PostgreSQL (local dev: `postgresql://postgres:postgres@localhost:5432/gamified_learning`)

## Project Philosophy
- **Learning is play** — every interaction rewards curiosity
- **Progress over perfection** — streaks, milestones, mastery paths
- **AI as tutor** — generates personalized questions, explains concepts, adapts difficulty
- **Parent visibility** — dashboard shows what's being learned, where they're stuck

## ⚠️ Lessons Learned (from SAMS project)
1. **Never trust Turbopack's type checking** — always `npx next build` before deploy
2. **Prisma db push drops non-Prisma columns** — audit after every push
3. **DeepSeek model**: `deepseek-v4-pro` (NOT `deepseek-chat`)
4. **PowerShell `python -c` is broken** — always use `.py` files
5. **Test data must be cleaned up** after testing
6. **Post-deploy**: verify schema ↔ DB ↔ docs are in sync

username : parent
password : learning123

## Document Map
- `APP_DESIGN.md` — technical specification
- `CONTEXT.md` — design philosophy, domain language
- `SETUP.md` — installation and first-run guide
