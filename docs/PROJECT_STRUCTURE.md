# Canonical Project Structure

To ensure all **three team members** can work in parallel without merge conflicts or disorganized files, this repository enforces a strict, predictable folder structure.

> [!IMPORTANT]
> **Rule for AI Agents & Developers**: Never create new top-level directories or place components/utilities in arbitrary locations without updating this document. Keep `app/` strictly for routing and page composition.

---

## 📁 Directory Tree

```text
gusto-26-2.0/
├── app/                          # Next.js 16 App Router (Routing & Page Composition ONLY)
│   ├── layout.tsx                # Root HTML/Body layout, global fonts, Navbar & Footer wrapper
│   ├── page.tsx                  # Home / Landing page (/)
│   ├── globals.css               # Tailwind CSS v4 (@import "tailwindcss") & CSS custom properties
│   ├── admin/                    # Registration & Attendance Management Dashboard (/admin)
│   │   └── page.tsx              # PIN passcode auth, search/filter, Drive proof lightbox, 1-click attendance
│   ├── events/                   # Events catalog & details routes
│   │   ├── page.tsx              # All Events listing & category filter (/events)
│   │   └── [slug]/               # Dynamic event detail route (/events/[slug])
│   │       └── page.tsx          # Individual event rules, rounds, coordinators, & register CTA
│   ├── schedule/                 # Symposium timeline & venue schedule (/schedule)
│   │   └── page.tsx
│   ├── register/                 # Participant / team registration flow (/register)
│   │   └── page.tsx
│   ├── about/                    # About college, department, & Gusto '26 (/about)
│   │   └── page.tsx
│   ├── contact/                  # Coordinators, venue map, & FAQ (/contact)
│   │   └── page.tsx
│   └── api/                      # Route Handlers (route.ts) for registration/webhooks if needed
│
├── components/                   # All React UI & Feature Components
│   ├── layout/                   # Global structural components (Navbar, Footer, MobileDrawer)
│   ├── ui/                       # Reusable atomic UI primitives (Button, Badge, Card, Modal, Input)
│   └── sections/                 # Page-specific feature sections
│       ├── home/                 # HeroSection, CountdownTimer, HighlightsBento, SponsorsMarquee
│       ├── events/               # EventCard, EventFilterBar, EventDetailHero, RulesAccordion
│       ├── schedule/             # TimelineTrack, ScheduleItemCard
│       └── register/             # RegisterModal (with Drive screenshot upload & schedule conflict checks)
│
├── src/data/                     # Structured static symposium data
│   ├── events.ts                 # Technical, Non-Technical, and Online event definitions
│   ├── about.ts                  # Symposium overview, registration fee, dates, and college info
│   ├── contacts.ts               # Student secretaries and registration coordinators
│   ├── mockRegistrations.ts      # Initial offline dataset & format for registered participants
│   ├── types.ts                  # Symposium, event, registration, and attendance TypeScript types
│   ├── gallery.ts                # Photo gallery data
│   ├── transport.ts              # Bus routes, college bus facilities, transit hubs
│   └── youtube.ts                # Promo video embed config
│
├── scripts/                      # Deployment & automation helpers
│   └── google-apps-script.js     # Turnkey Apps Script for Google Sheet row sync & Drive image saving
│
├── types/                        # Shared TypeScript interfaces & types
│   └── symposium.ts              # EventItem, EventCategory, ScheduleSlot, Coordinator, Sponsor, etc.
│
├── lib/                          # Pure utility functions, class mergers, formatters, validators
│   └── utils.ts                  # Shared helper functions
│
├── public/                       # Static assets served at `/`
│   ├── images/
│   │   ├── events/               # Event banners & thumbnails
│   │   ├── sponsors/             # Sponsor logos
│   │   └── gallery/              # Past symposium photos / college branding
│   └── brochure/                 # Downloadable PDF rulebooks / symposium brochure
│
├── docs/                         # Project documentation (MUST be maintained on every prompt)
│   ├── README.md                 # Documentation index & AI protocol
│   ├── PROJECT_STRUCTURE.md      # This file — canonical folder & file layout
│   ├── ARCHITECTURE_AND_STACK.md # Tech stack, Next.js 16 conventions, & styling guide
│   ├── TEAM_WORKFLOW.md          # 3-member ownership boundaries, Git rules, & prompt rules
│   ├── CHANGELOG_AND_STATUS.md   # Living feature status & prompt changelog
│   └── GOOGLE_APPS_SCRIPT_SETUP.md # Google Sheets & Drive backend webhook setup instructions
│
├── AGENTS.md                     # Auto-loaded rules for Antigravity / AI coding agents
├── CLAUDE.md                     # Pointer to @AGENTS.md
├── next.config.ts                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration (`@/*` mapped to `./*`)
└── package.json                  # Dependencies and scripts
```

---

## 📏 Naming & Organization Conventions

1. **Routes (`app/`)**:
   - Folder names inside `app/` must be **kebab-case** (`app/events/[slug]/page.tsx`).
   - Keep `page.tsx` files lean: fetch/import data from `data/` and compose sections from `components/sections/`.
2. **Components (`components/`)**:
   - Component files must use **PascalCase** (`EventCard.tsx`, `CountdownTimer.tsx`).
   - Default to **Server Components**. Only add `"use client"` at the top of leaf components that use React hooks (`useState`, `useEffect`), browser APIs, or event listeners.
3. **Data & Types (`data/`, `types/`)**:
   - Use **kebab-case** for filenames (`site-config.ts`, `symposium.ts`).
   - Export strongly typed arrays/objects typed against interfaces in `types/symposium.ts`.
4. **Imports**:
   - Always use the `@/` path alias (e.g., `import { events } from "@/data/events"` and `import type { EventItem } from "@/types/symposium"`).
