# 3-Member Team Collaboration & Prompt Workflow

Because **three developers** are working on **Gusto '26 (2.0)** simultaneously with AI assistants, following this workflow prevents Git merge conflicts, duplicate components, and broken builds.

---

## 👥 Recommended 3-Member Ownership Split

To minimize overlapping edits on the same files, divide work along clear module boundaries:

| Team Member | Primary Ownership Areas | Primary Directories / Files |
| :--- | :--- | :--- |
| **Member 1 (Core UI, Branding & Landing)** | Global theme/design system, Navbar/Footer, Home Landing Page (`/`), About Page (`/about`), Countdown & Hero animations. | `app/page.tsx`, `app/about/`, `components/layout/`, `components/ui/`, `components/sections/home/`, `app/globals.css` |
| **Member 2 (Events & Schedule)** | Events Catalog (`/events`), Dynamic Event Details (`/events/[slug]`), Category Filtering, Symposium Schedule/Timeline (`/schedule`). | `app/events/`, `app/schedule/`, `components/sections/events/`, `components/sections/schedule/`, `data/events.ts`, `data/schedule.ts` |
| **Member 3 (Registration, Sponsors & Contact)** | Registration Flow (`/register`), Form Validation/Submission, Sponsors showcase, Contact/Coordinators & FAQ (`/contact`). | `app/register/`, `app/contact/`, `app/api/`, `components/sections/register/`, `data/team.ts`, `data/sponsors.ts`, `data/faqs.ts` |

*(Note: Update this table if your team assigns different modules to Member 1, 2, and 3.)*

---

## 🔀 Git & Shared File Rules

1. **Branch Per Feature**:
   - Never push directly to `main` without pulling first.
   - Use descriptive branches: `feat/home-hero`, `feat/events-catalog`, `feat/registration-form`, `docs/update-events`.
2. **Shared Files Protocol**:
   - The following files are shared across all 3 members:
     - `app/layout.tsx` & `app/globals.css`
     - `types/symposium.ts`
     - `data/site-config.ts`
     - `package.json`
     - `docs/CHANGELOG_AND_STATUS.md`
   - When modifying a shared file, keep edits minimal and additive (e.g., adding new fields to an interface rather than renaming existing fields that another member depends on).
3. **Installing Packages**:
   - Before installing a new npm library (e.g., `lucide-react`, `framer-motion`/`motion`, `clsx`), check `package.json` and log the addition in `docs/ARCHITECTURE_AND_STACK.md` and `docs/CHANGELOG_AND_STATUS.md` so the other two members know to run `npm install` after pulling.

---

## 💬 How Team Members Should Prompt the AI

Because `AGENTS.md` is configured in the root of this repository, **Antigravity (and Claude/Cursor) automatically loads the project rules on every prompt.**

However, for best results when any of the 3 members starts a new session or gives a task, you can also say:

> *"Follow `AGENTS.md` and `docs/`. Build [your feature name] for our college symposium website, keep the canonical structure in `docs/PROJECT_STRUCTURE.md`, and update `docs/CHANGELOG_AND_STATUS.md` when done."*
