# QuestLab — Setup Guide

## Prerequisites

### 1. Install Tools

| Tool | Version | Install |
|------|---------|---------|
| **Node.js** | ≥20 LTS | `winget install OpenJS.NodeJS.LTS` or https://nodejs.org |
| **PostgreSQL** | ≥16 | `winget install PostgreSQL.PostgreSQL.16` or https://postgresql.org |
| **Git** | ≥2.40 | `winget install Git.Git` |

### 2. VS Code Extensions

Install these from the VS Code marketplace:

| Extension | ID | Purpose |
|-----------|-----|---------|
| **Prisma** | `Prisma.prisma` | Syntax highlighting, formatting, auto-complete for `.prisma` files |
| **Tailwind CSS IntelliSense** | `bradlc.vscode-tailwindcss` | Class auto-complete, hover previews |
| **ES7+ React snippets** | `dsznajder.es7-react-js-snippets` | Quick component scaffolding |
| **GitLens** | `eamodio.gitlens` | Git blame, history, comparison |
| **Thunder Client** | `rangav.vscode-thunder-client` | API testing (alternative to Postman) |
| **Markdown Preview Mermaid** | `bierner.markdown-mermaid` | Renders diagrams in .md files |
| **Pretty TypeScript Errors** | `yoavbls.pretty-ts-errors` | Human-readable TS errors |

### 3. VS Code Settings

Add to `.vscode/settings.json`:
```json
{
  "[prisma]": { "editor.defaultFormatter": "Prisma.prisma" },
  "editor.formatOnSave": true,
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

## First-Time Setup

```bash
# 1. Clone or copy this folder to your new project
cp -r "99 Gamified Learning" ~/projects/questlab
cd ~/projects/questlab

# 2. Install dependencies
npm install

# 3. Create .env from example
cp .env.example .env
# Edit .env — add your DeepSeek API key and change AUTH_SECRET

# 4. Create the database
createdb gamified_learning
# Or via psql: CREATE DATABASE gamified_learning;

# 5. Push schema to database
npx prisma db push

# 6. Generate Prisma client
npx prisma generate

# 7. Seed initial data (worlds, starter quests, achievements)
npx tsx prisma/seed.ts

# 8. Start dev server
npm run dev
# Open http://localhost:3200
```

## Default Login
- **Username:** parent
- **Password:** learning123

## Project Structure (after building)

```
questlab/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── learn/         # Quest dashboard
│   │   ├── quest/[id]/    # Challenge player
│   │   ├── profile/       # Kid's profile
│   │   ├── parent/        # Parent dashboard
│   │   └── api/           # API routes
│   ├── components/        # Reusable UI components
│   ├── lib/               # Utilities, auth, AI
│   └── generated/prisma/  # Prisma client (auto-generated)
├── public/                # Static assets (avatars, sounds)
├── .env                   # Environment variables
├── CLAUDE.md              # AI assistant instructions
├── CONTEXT.md             # Design philosophy
├── APP_DESIGN.md          # Technical specification
└── package.json
```

## Key Differences from SAMS

| SAMS | QuestLab |
|------|----------|
| Assurance management | Learning gamification |
| Multi-company | Single-tenant (family) |
| Admin/Assessor roles | Parent/Learner roles |
| Controls + Requirements | Quests + Challenges |
| ORCA framework | Octalysis framework |
| Risk management | Knowledge mastery |
