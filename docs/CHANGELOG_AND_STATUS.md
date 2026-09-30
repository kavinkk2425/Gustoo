# Project Status & Prompt Changelog

> [!IMPORTANT]
> **Mandatory AI Agent Rule**: Every time a prompt modifies or creates routes, components, data files, types, or dependencies, the AI agent **MUST** update the tables and changelog in this file before finishing the response.

---

## 🗺️ Route Registry (`app/`)

| Route Path | File Path | Status | Owner | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `app/page.tsx` | 🟢 Active | Team | Complete GUSTO 2K26 landing page with Neo-Brutalist / Retro Pop Gaming Behance design. |
| `/events/[slug]` | `app/events/[slug]/page.tsx` | 🟢 Active | Team | Dynamic individual event detail route with full rules, rounds, coordinators, and register CTA. |

---

## 🧱 Shared Components & Data Registry

| Category | Path | Status | Description |
| :--- | :--- | :--- | :--- |
| **Root Layout** | `app/layout.tsx` | 🟢 Active | Root HTML shell with Geist fonts, metadata, and styling. |
| **Global Styles** | `app/globals.css` | 🟢 Active | Tailwind CSS v4 with retro yellow grid and neo-brutalist box/button utilities. |
| **Data: Events** | `src/data/events.ts` | 🟢 Active | All 9 Technical and Non-Technical events with rules, venues, deadlines, and coordinators. |
| **Data: About** | `src/data/about.ts` | 🟢 Active | Verified symposium details, GCEE institution info, and IT department highlights. |
| **Data: Contacts** | `src/data/contacts.ts` | 🟢 Active | Student Secretaries, Registration Desks, and dynamic Event Coordinators extracted from events. |
| **Data: Gallery** | `src/data/gallery.ts` | 🟢 Active | Curated photos from `public/gallery/` with categorizations and captions. |
| **Data: Transport** | `src/data/transport.ts` | 🟢 Active | Transit hubs (Erode, Chithode, Bhavani), GCEE address, and college bus facility notices. |
| **Data: YouTube** | `src/data/youtube.ts` | 🟢 Active | Official YouTube channel and embed promo video data (`gLGls1Asibw`). |
| **Stickers & Mascot** | `components/ui/RetroStickers.tsx` | 🟢 Active | Retro gamepad mascot, 90s console, cartridges, rotating stamp badge, and fireball. |
| **Layout: Navbar** | `components/layout/Navbar.tsx` | 🟢 Active | Neo-brutalist sticky navigation with pink gamepad pill logo, search, and register CTA. |
| **Layout: Footer** | `components/layout/Footer.tsx` | 🟢 Active | Neo-brutalist footer with leadership contacts, venue details, and college logos. |
| **Section: Hero** | `components/sections/hero/HeroSection.tsx` | 🟢 Active | Iconic "Let The Gusto Begin" typography with cute mascot, arcade countdown, and stickers. |
| **Section: About** | `components/sections/about/AboutSection.tsx` | 🟢 Active | Retro gaming cartridge boxes with grip ridges, screws, LED blinkers, RPG stat pills, and gold edge-connector pins. |
| **Section: Events** | `components/sections/events/EventsSection.tsx` | 🟢 Active | Retro game cartridge comic cards with category filter, search, and slot badges. |
| **Section: Rules** | `components/sections/rules/RulesSection.tsx` | 🟢 Active | Arcade mission manual supporting multi-round level breakdowns and regulations. |
| **Section: Gallery** | `components/sections/gallery/GallerySection.tsx` | 🟢 Active | Polaroid / trading card photo gallery with Lightbox modal. |
| **Section: YouTube** | `components/sections/youtube/YouTubeSection.tsx` | 🟢 Active | Retro arcade TV cabinet video player with channel link. |
| **Section: Transport** | `components/sections/transport/TransportSection.tsx` | 🟢 Active | Transit guidance from Erode, Chithode, and Bhavani with Google Maps. |
| **Section: Contact** | `components/sections/contact/ContactSection.tsx` | 🟢 Active | Retro player ID cards for student secretaries and coordinators. |
| **Section: Register** | `components/sections/register/RegisterModal.tsx` | 🟢 Active | Neo-brutalist registration flow with UPI QR code, event selector, and pass generator. |
| **Gamification: Background** | `components/gamification/GamingBackground.tsx` | 🟢 Active | Reactive canvas particles, floating 8-bit loot, XP awards, and toggleable CRT scanlines. |
| **Gamification: HUD** | `components/gamification/GamerHUD.tsx` | 🟢 Active | Floating gamer dock with level, XP bar, quest log, audio mute, and achievement toasts. |
| **Gamification: Arcade** | `components/gamification/ArcadeStation.tsx` | 🟢 Active | Retro 8-bit playable arcade canvas minigame (Cyber Dash 2K26) with score tracking. |
| **Audio Engine** | `src/lib/arcadeAudio.ts` | 🟢 Active | Pure Web Audio API synthesized 8-bit sound effects (coin, jump, powerup, victory). |
| **Loader Screen** | `components/ui/PacmanGhostLoader.tsx` | 🟢 Active | Minimalist retro loader featuring centered animated 8-bit Pac-Man ghost (Blinky) and energizer dots. |

---

## 📝 Prompt & Feature Changelog

### `2026-09-30` — Clean Separated College Banner & Retro Background Color Harmony
- **Summary**: Refactored the college name banner for visual separation from the sticky navbar and harmonious aesthetic integration with the `#fec800` retro yellow grid:
  - **Clean Navbar Separation**: Increased hero container top padding (`pt-16 sm:pt-20`) and bottom spacing (`mb-6 sm:mb-9`), detaching the banner completely from the sticky navigation bar border.
  - **Background-Harmonized Styling**: Built a crisp white retro gaming capsule with neo-brutalist solid black borders (`border-[3px] border-black shadow-[4px_4px_0px_#000]`), high-contrast dark typography (`GOVERNMENT COLLEGE OF ENGINEERING, ERODE`), vibrant `#ec4899` department badge, matching `#fec800` autonomous chip, and pulsing live status diode.
  - **Glow & Shimmer Corner Brand**: Kept `GUSTO '26` moving gradient shimmer wave and luminous glow.
  - **Expanded Navbar Navigation**: Maintained enlarged 42px gaming font buttons with wide spacing (`gap-5 lg:gap-6 xl:gap-8 2xl:gap-10`).

### `2026-09-30` — Clean Minimalist Pac-Man Loading Screen
- **Summary**: Refactored the initial loading screen (`components/ui/PacmanGhostLoader.tsx`) into a clean animation-only presentation:
  - **Removed Text & Arcade Overlays**: Stripped out `★ INSERT COIN ★`, `PLAYER 1 READY • PUSH START`, `CREDIT 01`, and the top arcade score bar (`1UP`, `HIGH SCORE`, `2UP`).
  - **Centered Animation Focus**: Perfectly centered the animated 8-bit Pac-Man Ghost (Blinky) with bobbing body, moving pupils, animated tentacle skirt, and pulsing energizer dots trail.
  - **Smooth Transition Preserved**: Kept key/click-to-skip and auto-exit after duration with smooth fade-out.

### `2026-09-30` — Hyper-Realistic Highway Track Progress System & Racing Telemetry
- **Summary**: Transformed the top game scroll progress bar into an authentic, realistic Grand Prix racetrack and telemetry highway system:
  - **FIA Racing Kerbs (Rumble Strips)**: Integrated red and white alternating diagonal kerbs along the boundary of the track with 3D drop-shading.
  - **Multi-Tone Asphalt & Dynamic Motion**: Dark textured tarmac with a highway yellow centerline that shifts backwards as you scroll, creating realistic asphalt velocity.
  - **Illuminated Night-Drive Trail & Laser Tip**: Driven portion glows with deep purple-magenta neon road lighting and a crisp laser contact beam at the car's leading edge.
  - **Sector Distance Markers (`S1 25%`, `MID 50%`, `S3 75%`)**: Mini track milestone posts that turn from subtle white to bright green as the car crosses them.
  - **Live Racing Telemetry Cockpit (Sky HUD)**:
    - Real-time digital speedometer (`SPD: 000 - 240 KM/H`) responding to dynamic scroll velocity.
    - Active gear transmission indicator (`GEAR: N ➔ 1 ➔ 2 ➔ 3 ➔ 4 ➔ 5`).
    - High-contrast `GUSTO GP • [pct]%` race progress pill.
  - **Checkered Finish Gantry & Signal Lights**: Multi-tier race light pillar (red/amber/green) and waved checkered flag at the 100% finish mark.
  - **Realistic GT Sports Car Integration**: Road-projecting LED headlight beam, spinning alloy wheels, dual exhaust puffs, and suspension rumble.

### `2026-09-29` — Interactive Gusto Letter Jumping Wave on Click
- **Summary**: Implemented an arcade letter-moving effect that triggers when the user clicks the "Gusto" name:
  - **Staggered Wave Jump (`animate-letter-jump`)**: Split "Gusto" into individual animated letter spans (`G`, `u`, `s`, `t`, `o`). Each letter springs into the air (`-28px` elevation, `-10deg` rotation, and scale pop to `1.22`) with an authentic cartoon physics spring curve (`cubic-bezier(0.34, 1.56, 0.64, 1)`).
  - **Cascading 70ms Stagger**: Letters jump one after another (`G` ➔ `u` ➔ `s` ➔ `t` ➔ `o`), creating an arcade domino wave across the badge.
  - **Letter Hover Micro-Interactions**: Hovering over any letter individually causes a playful mini-jump (`hover:-translate-y-3 hover:scale-110`).
  - **Repeatable Click State**: Re-clicking the name increments `letterAnimationKey`, instantly triggering a new jump wave without delay.
  - **Web Audio Jump Chime**: Wired `arcadeAudio.playJump()` to synthesize an 8-bit rising jump tone on every click.

### `2026-09-29` — GUSTO Banner Moving Float & Dynamic Color Cycling
- **Summary**: Implemented dynamic retro gaming movement and color-shifting effects on the iconic GUSTO speech bubble banner in the Hero section:
  - **Dynamic Moving Effect (`animate-gusto-float`)**: Added gentle organic floating, tilting bobbing motion (`-1.5deg` to `+1.5deg` tilt with `-8px` lift) that gives the header an authentic lively arcade mascot feel.
  - **Harmonious Color Cycling (`animate-gusto-color` & `animate-gusto-tail`)**: Synchronized background and pointer tail transitions smoothly shifting between vibrant retro arcade colors:
    - Electric Lime (`#84cc16`)
    - Cyber Cyan (`#06b6d4`)
    - Neon Pink (`#ec4899`)
    - Arcade Purple (`#a855f7`)
  - **Gleaming Lettering Shine (`animate-gusto-text`)**: The "Gusto" typography cycles with a radiant glow and luminous text shimmer.
  - **8-Bit Pixel Star Accents**: Integrated playful floating gaming star indicators (`★`, `✦`, `◆`) with independent spin, bounce, and pulse micro-animations.
  - **Interactive Power-Up Chime**: Tapping or clicking the GUSTO badge triggers an authentic synthesized Web Audio 8-bit power-up melody (`arcadeAudio.playPowerUp()`).

### `2026-09-29` — Application Data Removal & Safe Backup
- **Summary**: Performed complete data reset across the entire application as requested, while safely preserving an archival copy in `src/data_backup/`:
  - **Archival Backup**: Created `src/data_backup/` containing all original event datasets, rules, schedules, and coordinators before clearing.
  - **Data Cleared**:
    - `src/data/about.ts`: Wiped specific symposium names, institution details, dates, fee, descriptions, and venue address to clean empty templates.
    - `src/data/events.ts`: Cleared all 9 events to an empty `GUSTO_EVENTS = []` array.
    - `src/data/contacts.ts`: Cleared all core leadership and event coordinator contacts to empty arrays (`CORE_CONTACTS = []`, `EVENT_CONTACTS = []`, `ALL_CONTACTS = []`).
    - `src/data/gallery.ts`: Emptied `GALLERY_ITEMS = []`.
    - `src/data/transport.ts`: Cleared all transit routes, hub directions, and bus notices.
    - `src/data/youtube.ts`: Cleared promo video IDs and channel links.
  - **Component Null-Safety & Empty States**:
    - `RulesSection.tsx`: Added safe null-handling for empty `GUSTO_EVENTS` to prevent runtime `TypeError: Cannot read properties of undefined (reading 'rules')`. Shows a friendly empty state when no events exist.
    - `GallerySection.tsx`: Added friendly empty state card when photos are empty.
    - `TransportSection.tsx`: Added safe conditional rendering for transit hubs and venue location.
    - `HeroSection.tsx`: Cleaned duplicate closing markup.
  - **Build Verification**: Verified with `npm run build` — compiled with zero errors across all static pages.

### `2026-09-29` — Retro Gaming Cartridge Boxes in About Section
- **Summary**: Transformed the three plain white about cards into authentic, collectible **Retro Gaming Cartridge Boxes**:
  - **Tactile Cartridge Grip Notches**: Added 3 embossed grip ridges across the top of each cartridge shell with metallic corner assembly screws (`✚`).
  - **Hardware LED Diode Header**: Built distinct cartridge identification bars with live pulsing status LEDs:
    - `ROM-01 // GUSTO_OS (64-BIT)`
    - `SECTOR-02 // GCEE_CORE (ESTD 1984)`
    - `UNIT-03 // AIT_GUILD (ACTIVE)`
  - **RPG Attribute Stat Badges**: Added gaming stat chips into each cartridge:
    - Gusto '26: `QUESTS: 9 EVENTS`, `TIER: NATIONAL`, `REWARDS: ₹ CASH`
    - GCEE Erode: `FOUNDED: 1984 IRTT`, `TYPE: GOVT ENGG`, `CAMPUS: ERODE`
    - IT Dept: `SKILLS: CODE / AI`, `EVENTS: HACKATHONS`, `STATUS: VERIFIED`
  - **Gold Circuit Edge Connector Pins**: Integrated an authentic row of 12 metallic gold circuit connector pins (`GUSTO-PIN-BUS`) along the bottom edge of each cartridge card.
  - **Tactile Hover Dynamics**: Cartridges slide upwards (`-translate-y-2`) with expanded 3D drop-shadows on hover.

### `2026-09-29` — Navbar Alignment & Interactive Clicking Animations
- **Summary**: Refactored the sticky desktop & mobile navigation bar (`components/layout/Navbar.tsx`) for pixel-perfect vertical alignment and tactile neo-brutalist click interactions:
  - **Fixed Multi-Line Wrapping**: Enforced `whitespace-nowrap` across all navigation links and action buttons (`ALL EVENTS`, `Register (₹250)`), eliminating ugly vertical wrapping and height misalignments.
  - **Standardized Heights & Vertical Alignment**: Sized the search pill input and Register button to a harmonious `h-9` with exact `items-center` centering and responsive gap padding.
  - **Tactile Click Feedback**: Added arcade button plunge feedback (`active:translate-y-1 active:scale-95 active:shadow-none`) on all navigation links and CTAs.
  - **Active Section Scroll Spy & Indicators**: Added dynamic scroll spy using `useEffect` with smooth scroll offset (`80px`), highlighting the active route with a retro pill badge and glowing indicator dot.
  - **Logo & Register Micro-Interactions**: Added a bouncy gamepad wiggle (`active:rotate-[12deg] active:scale-90`) with return-to-top scroll, spinning sparkle on registration CTA, and animated mobile drawer toggle.
  - **Retro Arcade Synth Chimes**: Integrated Web Audio API 8-bit blip synthesized feedback on link and button clicks.

### `2026-09-29` — Mobile Viewport Overflow & Header Layout Fixes
- **Summary**: Resolved mobile horizontal scrolling and header truncation identified in user device testing:
  - **Header & Navigation Bar**: Eliminated line wrap on `"GUSTO '26"` using `whitespace-nowrap` and sized brand elements and action buttons so the mobile hamburger menu button is always 100% visible on small mobile screens.
  - **Eliminated 550px Pill Overflow**: Replaced the overflowing institution pill with a responsive version showing `"GCEE ERODE • IT DEPARTMENT"` on mobile screens and full title on desktop with `max-w-[95%]`.
  - **Contained Subtitle & Stats Cards**: Added strict width constraints and responsive typography to the subtitle card and 4 quick stat blocks (`March 06, 2026`, `9 Total Events`, `GCEE, Erode`) so cards never clip.
  - **Typography Contrast**: Enhanced `"Let The [ Gusto ] Begin"` with high-contrast vibrant retro violet fill (`#581c87`), clean black stroke, and crisp 3D drop-shadow.
  - **Viewport Meta & Strict Containment**: Added `viewport` export in `app/layout.tsx` and `max-width: 100vw; overflow-x: hidden` to `html, body` in `app/globals.css`.
  - **Production Build**: Verified with `npm run build` — `13/13` static pages compiled with 0 errors.
