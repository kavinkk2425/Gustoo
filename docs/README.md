# Gusto '26 (2.0) — College Symposium Website Documentation

Welcome to the central documentation hub for the **Gusto '26 (2.0)** College Symposium Website. Because **three team members** are actively developing this repository in parallel using AI coding assistants, **every developer and AI agent must read and maintain this `docs/` directory on every prompt.**

---

## 📚 Documentation Index

| Document | Purpose | When to Read / Update |
| :--- | :--- | :--- |
| [README.md](./README.md) | Master index, mandatory pre/post-prompt protocol, and quick start guide. | Read before every prompt. |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Canonical folder/file layout, naming conventions, and module boundaries. | Read before creating/moving files; update when adding new routes, components, or data files. |
| [ARCHITECTURE_AND_STACK.md](./ARCHITECTURE_AND_STACK.md) | Next.js 16.3.6, React 19, Tailwind CSS v4, TypeScript conventions, and design system rules. | Read before writing UI or server/client logic; update when adding packages or global tokens. |
| [TEAM_WORKFLOW.md](./TEAM_WORKFLOW.md) | 3-member role split, Git branching strategy, conflict prevention, and prompt templates. | Read before starting a feature or editing shared files. |
| [CHANGELOG_AND_STATUS.md](./CHANGELOG_AND_STATUS.md) | Living registry of routes, components, data models, and recent prompt changes. | **MUST be updated after every prompt** that modifies code or structure. |

---

## 🤖 Mandatory AI Agent Protocol (Runs on Every Prompt)

### 1. Pre-Prompt Checklist (Before Writing Code)
1. **Inspect Context**: Read [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) and [CHANGELOG_AND_STATUS.md](./CHANGELOG_AND_STATUS.md) to verify what routes, components, types, and data files already exist.
2. **Check Next.js 16 Docs**: Check `node_modules/next/dist/docs/` before using routing, metadata, or server/client APIs (Next.js 16 uses async `params`/`searchParams`, global `PageProps`/`LayoutProps`, and `proxy.ts` instead of legacy patterns).
3. **Prevent Duplication & Conflicts**:
   - Never create ad-hoc folders outside the canonical structure in [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).
   - Reuse existing primitives in `components/ui/` and types in `types/` instead of duplicating them inside route folders.
   - Keep symposium content (event lists, schedules, coordinator contacts, rules) in `data/` rather than hardcoded in JSX.

### 2. Post-Prompt Checklist (Before Finishing Response)
1. **Sync `docs/CHANGELOG_AND_STATUS.md`**: Log every newly created or modified route, component, data file, or dependency in the status tables and changelog.
2. **Sync `docs/PROJECT_STRUCTURE.md`**: If new directories, routes, or shared modules were introduced, update the directory tree in [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md).
3. **Feature Docs**: When introducing a complex subsystem (e.g., registration flow, payment/QR verification, admin/sheet sync, or custom animations), create or update a dedicated markdown file inside `docs/` and link it in the table above.
