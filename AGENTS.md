<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Gusto '26 (2.0) — Mandatory 3-Member Team & AI Agent Rules

Three developers are collaborating on this **College Symposium Website (`Gusto '26 2.0`)**. Every AI agent and developer **MUST** follow these instructions on **every single prompt** without exception:

## 1. Pre-Prompt Requirement (Before Writing or Modifying Any Code)
1. **Read Project Documentation First**:
   - Always check `docs/README.md`, `docs/PROJECT_STRUCTURE.md`, `docs/ARCHITECTURE_AND_STACK.md`, and `docs/CHANGELOG_AND_STATUS.md` before creating or editing files.
2. **Respect the Canonical Project Structure**:
   - Keep `app/` strictly for Next.js 16 routing (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`).
   - Place reusable UI primitives in `components/ui/`, layout shells (`Navbar`, `Footer`) in `components/layout/`, and page sections in `components/sections/<domain>/`.
   - Store all static symposium data (events, schedule, rules, coordinators, sponsors, FAQs) in `data/*.ts` and shared TypeScript interfaces in `types/symposium.ts` — **never hardcode symposium data arrays inside JSX components**.
   - Never create arbitrary top-level folders or duplicate existing components/utilities.
3. **Follow Next.js 16 + React 19 + Tailwind CSS v4 Standards & Maintain `app/globals.css`**:
   - Consult `node_modules/next/dist/docs/` before using Next.js APIs. Remember that `params` and `searchParams` are Promises (`await params`), and global `PageProps`/`LayoutProps` helpers are available.
   - Tailwind CSS v4 is configured in `app/globals.css` (`@import "tailwindcss";` and `@theme inline`). Do not create a legacy `tailwind.config.js` unless explicitly required.
   - **Maintain `app/globals.css` Strictly**:
     - Keep `app/globals.css` organized into its 4 canonical sections (`1. Design Tokens`, `2. @theme inline`, `3. Base Element Defaults`, `4. Shared Symposium Utilities & Keyframes`).
     - **Never** dump page-specific or component-specific styles into `app/globals.css` — use Tailwind utility classes inside your components instead.
     - Use the shared semantic theme tokens (`bg-background`, `text-foreground`, `bg-surface`, `bg-surface-elevated`, `border-border`, `text-muted`, `text-brand-primary`, `text-brand-secondary`, `text-brand-accent`) so all 3 members share a unified design system.

## 2. Post-Prompt Requirement (Before Completing Every Prompt)
1. **Maintain `.md` Documentation Inside `docs/`**:
   - **Every time a prompt adds, modifies, or removes a route, component, data file, type, package, or token in `app/globals.css`**, you **MUST** update `docs/CHANGELOG_AND_STATUS.md` (both the Route/Component Registry tables and the Prompt Changelog).
   - If the folder/file layout, architecture, or `app/globals.css` tokens change, you **MUST** also update `docs/PROJECT_STRUCTURE.md` and/or `docs/ARCHITECTURE_AND_STACK.md` (or add a dedicated feature `.md` inside `docs/` and link it in `docs/README.md`).
   - Do not consider any coding task complete until the `.md` files in `docs/` accurately reflect the latest state of the repository for the other two team members.

