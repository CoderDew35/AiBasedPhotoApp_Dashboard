# Synthetic Eye — PhotoApp Admin Dashboard

> **A data-driven PM dashboard that serves as both an analytical tool AND a living product strategy argument.**

Built for the PhotoApp Web PM recruitment case. This isn't just a dashboard — it's a functional prototype that directly answers case questions through interactive data visualization.

---

## Quick Start

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Architecture

```
src/
├── components/
│   ├── layout/          # DashboardLayout, SideNavBar, TopAppBar, ThemeToggle
│   └── ui/              # MetricCard, FunnelWidget, ChartContainer, CohortHeatmap,
│                        # StatusChip, InsightCallout, LoadingSkeleton
├── pages/               # 7 route-level pages (AARRR + A/B Testing + ComingSoon)
├── data/
│   └── mockData.ts      # Centralized mock data store
├── App.tsx              # Router configuration
└── index.css            # Tailwind v4 design tokens + utility classes
```

## Technology Choices (and Why)

| Choice | Rationale |
|--------|-----------|
| **React 19 + Vite** | Fast HMR, modern build tooling, TypeScript-first |
| **Tailwind CSS v4** | CSS-first `@theme` tokens — no config file, design system lives in CSS |
| **Recharts** | Composable React chart library that respects the component model |
| **Framer Motion** | Declarative animations (page transitions, number counters, staggered entrances) |
| **React Router v7** | Standard routing with `<Outlet>` layout pattern |
| **CSS Custom Properties** | 40+ theme variables for dark/light mode — no runtime JS for theming |

### What I Intentionally Did NOT Use

| Library | Why Not |
|---------|---------|
| **Zustand / Redux** | No cross-component shared state that justifies a store. Each page reads from static mock data. Adding a state manager here would be cargo cult engineering — signaling knowledge of library names without understanding when they're appropriate. |
| **TanStack Query** | Designed for server state caching and deduplication. With mock data (no API), using it would misrepresent its purpose. In a production version with real endpoints, this would be the first addition. |
| **Tailwind v3 config** | Tailwind v4 uses CSS-native `@theme` — cleaner, faster, and demonstrates awareness of the ecosystem's direction. |

> **This restraint is deliberate.** YAGNI (You Ain't Gonna Need It) is a core engineering principle. A CTO's job isn't to add technology — it's to add the *right* technology at the *right* time.

## Design System: "The Synthetic Eye"

The visual language follows the [DESIGN.md](./new_design/obsidian_matrix/DESIGN.md) specification:

- **Tonal Layering** — No borders for sectioning. Depth via background color shifts (`surface` → `surface-container-low` → `surface-container-high`)
- **Ghost Borders** — `outline-variant` at 15% opacity. Felt, not seen.
- **Glassmorphism** — `backdrop-blur(20px)` on tooltips and callouts
- **Dual Typography** — Manrope (headlines) + Inter (body/labels)
- **Dark/Light Mode** — Full theme toggle with 40+ CSS custom properties, persisted to `localStorage`

## Pages & Case Question Mapping

| Dashboard Page | Case Questions Answered |
|---|---|
| **Acquisition** | §4 Q1 — Event tracking (sessions, sources, UTM campaigns) |
| **Activation** | §4 Q1-Q2 — User milestone progression, Time-to-Value distribution |
| **Conversion** | §4 Q3 — Funnel visualization, conversion metrics, feature adoption |
| **Retention** | §4 Q3 — Cohort retention heatmap, churn analysis |
| **Revenue** | §4 Q3 — MRR growth, plan distribution, revenue by feature |
| **A/B Testing** | §4 Q4-Q5 — First 2 A/B tests with hypothesis, significance, and results |

### A/B Testing Lab — The Differentiator

This page is an **original creation** (not from any mockup) that directly answers:
- *"What would be your first 2 A/B tests? Why?"* → Visualized with full PM reasoning
- *"Create an A/B testing plan for paywall + Video Enhance CTA"* → Interactive experiment cards with statistical significance meters

## Key Engineering Decisions

### Component Composition (DRY)
- `MetricCard` — Reused across all 5 AARRR pages with configurable props (trend direction, progress bar, target/extra info)
- `ChartContainer` — Consistent card wrapper with title/subtitle/legend/action slots
- `FunnelWidget` — Self-contained with hover-activated PM insight tooltips
- `StatusChip` — Shared status badge vocabulary across feature adoption and A/B testing

### Accessibility (WCAG AA)
- Focus indicators: `2px solid primary` with `2px` offset on all interactive elements
- Semantic HTML: One `<h1>` per page, proper heading hierarchy
- `aria-label` on all icon-only buttons
- `prefers-reduced-motion` media query disables all animations

### Responsive Strategy
- Sidebar: hidden on mobile (hamburger), expanded on desktop
- Metric grids: 1-col → 2-col → 4-col across breakpoints
- Charts: stacked on mobile, side-by-side on desktop
- Data tables: horizontal scroll on small screens

## Production Readiness Notes

If this were a real production dashboard, the next steps would be:

1. **TanStack Query** for API integration with caching, deduplication, and optimistic updates
2. **Zustand** for global filter state (date range, segment, comparison mode) once filters affect multiple components
3. **Vitest + Testing Library** for component tests
4. **Playwright** for E2E flow tests
5. **Sentry** for error monitoring
6. **Environment-based config** for API endpoints

---

*Built with React 19, Tailwind CSS v4, Recharts, Framer Motion, and TypeScript.*
