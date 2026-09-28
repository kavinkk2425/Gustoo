# Project Status & Prompt Changelog

> [!IMPORTANT]
> **Mandatory AI Agent Rule**: Every time a prompt modifies or creates routes, components, data files, types, or dependencies, the AI agent **MUST** update the tables and changelog in this file before finishing the response.

---

## 🗺️ Route Registry (`app/`)

| Route Path | File Path | Status | Owner | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | 🟡 Boilerplate | Member 1 | Root landing page (currently default Next.js starter; ready for Symposium Hero & Sections). |
| `/events` | `app/events/page.tsx` | ⚪ Planned | Member 2 | Technical & Non-Technical events directory with filters. |
| `/events/[slug]` | `app/events/[slug]/page.tsx` | ⚪ Planned | Member 2 | Dynamic event details, rules, rounds, prize pool, and coordinators. |
| `/schedule` | `app/schedule/page.tsx` | ⚪ Planned | Member 2 | Symposium timeline and venue schedule. |
| `/register` | `app/register/page.tsx` | ⚪ Planned | Member 3 | Participant / team registration page. |
| `/about` | `app/about/page.tsx` | ⚪ Planned | Member 1 | About the college, department, and Gusto '26 symposium. |
| `/contact` | `app/contact/page.tsx` | ⚪ Planned | Member 3 | Student/staff coordinators, venue map, and FAQs. |

---

## 🧱 Shared Components & Data Registry

| Category | Path | Status | Description |
| :--- | :--- | :--- | :--- |
| **Root Layout** | `app/layout.tsx` | 🟢 Active | Root HTML shell with Geist Sans & Geist Mono fonts. |
| **Global Styles** | `app/globals.css` | 🟢 Active | Structured 4-section Tailwind CSS v4 stylesheet with semantic surface & brand tokens (`--background`, `--surface`, `--brand-primary`, etc.) and Geist font binding. |
| **Types** | `types/symposium.ts` | ⚪ Planned | Shared TypeScript interfaces for events, schedule, team, and sponsors. |
| **Data** | `data/*` | ⚪ Planned | Structured symposium data files (`site-config.ts`, `events.ts`, `schedule.ts`, `team.ts`). |
| **Layout UI** | `components/layout/*` | ⚪ Planned | Shared `Navbar.tsx` and `Footer.tsx`. |
| **UI Primitives** | `components/ui/*` | ⚪ Planned | Reusable buttons, badges, cards, modals, and inputs. |

---

## 📝 Prompt & Feature Changelog

All changes made across prompts by the 3 team members are recorded below in reverse chronological order:

### `2026-09-28` — Structured `app/globals.css` & GitHub Push
- **Summary**: Organized `app/globals.css` into 4 canonical Tailwind CSS v4 sections (`Design Tokens`, `@theme inline`, `Base Element Defaults`, `Shared Symposium Utilities`), fixed `body` font-family to inherit `--font-geist-sans`, added semantic surface/brand tokens, and added strict `app/globals.css` maintenance rules to `AGENTS.md` and `docs/ARCHITECTURE_AND_STACK.md`.
- **Files Added/Updated**:
  - `app/globals.css`
  - `AGENTS.md`
  - `docs/ARCHITECTURE_AND_STACK.md`
  - `docs/CHANGELOG_AND_STATUS.md`

### `2026-09-28` — Initial Documentation & Multi-Member Agent Rules Setup
- **Summary**: Created `docs/` directory (`README.md`, `PROJECT_STRUCTURE.md`, `ARCHITECTURE_AND_STACK.md`, `TEAM_WORKFLOW.md`, `CHANGELOG_AND_STATUS.md`) and updated `AGENTS.md` with mandatory pre-prompt and post-prompt rules so all 3 team members maintain the canonical project structure and documentation on every prompt.
- **Files Added/Updated**:
  - `AGENTS.md`
  - `docs/README.md`
  - `docs/PROJECT_STRUCTURE.md`
  - `docs/ARCHITECTURE_AND_STACK.md`
  - `docs/TEAM_WORKFLOW.md`
  - `docs/CHANGELOG_AND_STATUS.md`
