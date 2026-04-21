# Synthetic Eye — PhotoApp Admin Dashboard

> **A data-driven PM dashboard that serves as both an analytical tool AND a living product strategy argument.**

Built for the PhotoApp Web PM recruitment case. This isn't just a dashboard, it's a functional prototype that directly answers case questions through interactive data visualization.

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

| Choice                    | Rationale                                                                       |
| ------------------------- | ------------------------------------------------------------------------------- |
| **React 19 + Vite**       | Fast HMR, modern build tooling, TypeScript-first                                |
| **Tailwind CSS v4**       | CSS-first `@theme` tokens — no config file, design system lives in CSS          |
| **Recharts**              | Composable React chart library that respects the component model                |
| **Framer Motion**         | Declarative animations (page transitions, number counters, staggered entrances) |
| **React Router v7**       | Standard routing with `<Outlet>` layout pattern                                 |
| **CSS Custom Properties** | 40+ theme variables for dark/light mode — no runtime JS for theming             |

## Design System: "The Synthetic Eye"

- **Tonal Layering** — No borders for sectioning. Depth via background color shifts (`surface` → `surface-container-low` → `surface-container-high`)
- **Ghost Borders** — `outline-variant` at 15% opacity. Felt, not seen.
- **Glassmorphism** — `backdrop-blur(20px)` on tooltips and callouts
- **Dual Typography** — Manrope (headlines) + Inter (body/labels)
- **Dark/Light Mode** — Full theme toggle with 40+ CSS custom properties, persisted to `localStorage`

## Pages & Case Question Mapping

| Dashboard Page  | Case Questions Answered                                                 |
| --------------- | ----------------------------------------------------------------------- |
| **Acquisition** | §4 Q1 — Event tracking (sessions, sources, UTM campaigns)               |
| **Activation**  | §4 Q1-Q2 — User milestone progression, Time-to-Value distribution       |
| **Conversion**  | §4 Q3 — Funnel visualization, conversion metrics, feature adoption      |
| **Retention**   | §4 Q3 — Cohort retention heatmap, churn analysis                        |
| **Revenue**     | §4 Q3 — MRR growth, plan distribution, revenue by feature               |
| **A/B Testing** | §4 Q4-Q5 — First 2 A/B tests with hypothesis, significance, and results |

### A/B Testing Lab — The Differentiator

This page is an **original creation** (not from any mockup) that directly answers:

- _"What would be your first 2 A/B tests? Why?"_ → Visualized with full PM reasoning
- _"Create an A/B testing plan for paywall + Video Enhance CTA"_ → Interactive experiment cards with statistical significance meters

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

---

_Built with React 19, Tailwind CSS v4, Recharts, Framer Motion, and TypeScript._
