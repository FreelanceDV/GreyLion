# Icon System Migration + Section Nav Redesign

Date: 2026-09-07
Status: Approved — implementing directly (no separate plan/execute handoff; user authorized implementation in-session).

## Problem

1. Icons across the public landing page are a mix of raw emoji characters and 9 hand-rolled inline-SVG icon components (`AboutIcon`, `HeroIcon`, `CargoTypeIcon`, `ServicesIcon`, `MachineryIcon`, `ProcessIcon`, `ShowcaseIcon`, `FaqIcon`, `WhatsAppIcon`, `WorkWithUsIcon`). No shared icon library — inconsistent visual weight/style across the site ("no symmetry").
2. The lateral section-navigation dot indicator (`SectionIndicator.tsx`) only lists 5 of the page's 13 real content sections, so most of the page can't be jumped to from it.

## Scope

- **In scope:** public landing page (`src/app/page.tsx` tree) only.
- **Out of scope:** `src/app/admin/page.tsx` — internal tool, ~25 emoji instances in status logs/buttons, not customer-facing. Left as-is (explicit user decision).

## Part 1 — Icon Library: Lucide React

Install `lucide-react`. Chosen because its icon geometry (24×24 viewBox, `stroke="currentColor"`, `strokeWidth`, round caps/joins) already matches the hand-rolled custom icons' style, so the migration is close to 1:1 with no visual regression, and it's the most common pairing with Next.js/Tailwind projects today.

### 1a. Custom icon components → Lucide-backed

Each `XxxIcon({ name, className, strokeWidth })` component keeps its existing public interface (so every call site is untouched). Internally, the `Record<XxxIconName, ReactNode>` path map is replaced by a `Record<XxxIconName, LucideIcon>` component map, and the wrapper renders the resolved Lucide component instead of a raw `<svg>`.

Files: `about-company/AboutIcon.tsx`, `hero/HeroIcon.tsx`, `cargo-types/CargoTypeIcon.tsx`, `services/ServicesIcon.tsx`, `machinery/MachineryIcon.tsx`, `process/ProcessIcon.tsx`, `showcase/ShowcaseIcon.tsx`, `faq/FaqIcon.tsx`, `whatsapp-button/WhatsAppIcon.tsx`, `work-with-us/WorkWithUsIcon.tsx`.

Icon name → Lucide icon assignments are chosen per existing semantic meaning (route→`Route`, shield→`ShieldCheck`, check→`Check`, container→`Container`, etc.) at implementation time, preserving each name's intent.

### 1b. Emoji → Lucide (public landing only)

| File | Emoji | Replacement |
|---|---|---|
| `globe/MapModeToggle.tsx` | 🗺️ | `Map` |
| `globe/MapModeToggle.tsx` | 📡 | `Radar` |
| `navbar/data.ts` (+ consumer render) | ⚙ | `Cog` |
| `whatsapp-button/data.ts` (+ consumer render) | ⚙ | `Cog` |
| `comparison/ComparisonCard.tsx` | ✓ | `Check` |
| `whatsapp-button/QuickReplyButton.tsx` | ✓ | `Check` |
| `footer/FooterContactColumn.tsx` | ✉ | `Mail` |

`data.ts` files currently store icon as a literal emoji string; these switch to storing a Lucide component reference (or a name key resolved via a small local map), consumer renders `<Icon className="..." />` instead of interpolating the string.

## Part 2 — Section Nav Redesign: "Ruta de Navío"

Full replacement of `SectionIndicator.tsx`. Combines two directions validated visually with the user (browser mockup companion): a floating glassmorphism capsule (backdrop-blur, subtle border, `rgba(13,18,32,.55)`) + a maritime "route" motif — a `Ship` icon travels down a vertical line as the user scrolls, each section is a "port" stop.

**Chosen variant:** icons-only, tooltip-on-hover (matches current nav's interaction pattern — no persistent text labels, avoids clutter with 13 stops).

### Sections (13, footer and CTA banner excluded — not "content", avoids noise at the end of the route)

| # | id | Label (tooltip) | Lucide icon |
|---|---|---|---|
| 1 | `inicio` | Inicio | `Anchor` |
| 2 | `red-global` *(new)* | Red Global | `Globe2` |
| 3 | `mision-vision` | Misión & Visión | `Compass` |
| 4 | `objetivos` | Objetivos | `Flag` |
| 5 | `porque-elegirnos` | Por Qué Elegirnos | `ShieldCheck` |
| 6 | `operaciones` | Modalidades | `Layers` |
| 7 | `servicios` | Servicios | `Briefcase` |
| 8 | `tipos-carga` *(new)* | Tipos de Carga | `Package` |
| 9 | `proceso` *(new)* | Proceso | `Workflow` |
| 10 | `servicios-medida` | A la Medida | `SlidersHorizontal` |
| 11 | `maquinaria` | Maquinaria | `Cog` |
| 12 | `opiniones` | Opiniones | `Quote` |
| 13 | `preguntas-frecuentes` | FAQ | `HelpCircle` |

Three ids marked *(new)* don't exist yet and must be added to `globe/index.tsx`, `cargo-types/index.tsx`, `process/index.tsx` respectively (same `scroll-mt-[100px]` pattern already used by other sections, so the fixed navbar doesn't overlap on jump).

### Behavior

- Active-section tracking: same scroll-midpoint algorithm already in `SectionIndicator.tsx` (`window.scrollY + innerHeight/2.5` against each section's bounding rect) — proven, reused as-is against the 13-id list.
- Route fill: vertical line inside the capsule fills with `#00a3ff` gradient proportional to the active section's index / 13 (mirrors current dot-scale-on-active pattern, extended to a continuous fill).
- Ship marker: `Ship` icon positioned at the active port's vertical offset, CSS `transition` for smooth movement between stops (no new animation library).
- Ports: small circle + Lucide icon. Not-yet-reached = dim/neutral. Passed = faint blue. Active = blue glow + hover tooltip (reuses existing tooltip markup/CSS from current component, blue accent `#00a3ff`, glass background).
- Position/visibility unchanged from current: `fixed top-1/2 right-8`, `max-[991px]:hidden` (desktop-only, same as today — no mobile equivalent in scope).

## Testing

- `npx tsc --noEmit` after each file batch.
- Visual check via dev server + browser: scroll through full page, confirm all 13 stops highlight correctly at their section, confirm smooth-scroll jump on click lands correctly under the fixed navbar, confirm hover tooltips render, confirm no emoji remain on public pages (admin excluded).
