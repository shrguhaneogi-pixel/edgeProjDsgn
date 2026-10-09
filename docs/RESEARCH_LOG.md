# Research Log — Edge Systems Collection

## Overview
This document logs technical and design research across all 5 engineering projects in `edgeProjDsgn`. All research entries cite official documentation, evaluation dates, and explicit verification statuses.

---

## Global Stack Research (2026-10-10)

### 1. Framework & Runtime Selection
- **Evaluated Options:** Next.js (App Router), Vite + React, Vanilla JS.
- **Official References:**
  - [Next.js App Router Documentation](https://nextjs.org/docs/app) (Checked: 2026-10-10)
  - [React 19 Documentation](https://react.dev) (Checked: 2026-10-10)
- **Decision:** Next.js / React with Tailwind CSS or Vite + React standalone per project, ensuring local deterministic execution without mandatory paid backend infrastructure.
- **Verification Status:** `VERIFIED` - Node.js v24.19.0 and npm 11.17.0 supported natively.

### 2. Visualization & Spatial Rendering Libraries
- **Parametric Pulse & Sacrificial Pathways:** WebGL / Three.js / Canvas 2D / Mapbox GL JS fallbacks.
- **The Barter Bridge:** D3.js / SVG AST Tree Rendering / Framer Motion graph inspector.
- **Diagnostic Liquidity:** Canvas 2D image processing / pixel inspection / upload triage flows.
- **Horizon-Scrape:** Canvas 2D image comparison (original vs processed visual haze filter) & Chart.js / Recharts time-series.
- **Verification Status:** `VERIFIED` - Canvas 2D and SVG rendering run locally with zero external network dependencies.

---

## Project Research Entries

### Project 01 — Parametric Pulse
- **Domain:** Parametric climate insurance & cyclone trajectory visualization.
- **Evaluation Date:** 2026-10-10
- **Evaluated Technical Approaches:**
  1. *Approach A (Custom Canvas 2D + SVG Layered Scene):* Renders cyclone radar, pressure contours, and track vector on an HTML Canvas 2D with interactive SVG spatial markers. **Selected**. Fully offline, highly performant, zero external key dependency.
  2. *Approach B (External WebGL Tile Map API - e.g. Mapbox/MapLibre):* Rich geospatial tiles, but requires network connection and API key. Kept as `UNVERIFIED` optional feature.
  3. *Approach C (Pure SVG / Accessible Table Representation):* Render spatial grid using structured SVG & HTML tables. **Selected as Mandatory Accessibility Fallback**.
- **Data & Visualization Mathematics:**
  - **Spline Track Interpolation:** Catmull-Rom / cubic Hermite interpolation between discrete track forecast points $(lat_i, lon_i, t_i, v_i, p_i)$.
  - **Wind Speed Classification (Saffir-Simpson Scale):**
    - Tropical Storm: 34–63 kts
    - Category 1: 64–82 kts
    - Category 2: 83–95 kts
    - Category 3: 96–112 kts
    - Category 4: 113–136 kts
    - Category 5: $\ge 137$ kts
  - **Parametric Trigger Evaluation Rule:**
    $$Trigger(t) = \mathbb{I}\left(V_{max}(t) \ge V_{threshold} \land Dist(Position(t), Asset) \le R_{hazard}\right)$$
    Where $V_{threshold} = 130\text{ kts}$ (Cat 4 threshold) over a 3-hour observation window.
- **Accessibility & Design System Standards:**
  - **WCAG 2.1 AA Compliance:** Text contrast ratio $\ge 4.5:1$ against surface background (`#0B0F19`), visual focus rings (`#00E5FF`) with 2px width.
  - **Keyboard Navigation:** Time scrubber slider bound to `ArrowLeft`/`ArrowRight` (1-hour step), `Home`/`End` (track start/end).
  - **Screen Reader Support:** Live region (`aria-live="polite"`) announcing: *"Forecast Checkpoint T+18h selected: Wind 135 knots, Pressure 928 hPa, Trigger Rule SATISFIED"*.
  - **Reduced Motion:** Disable particle swirl animations when `prefers-reduced-motion: reduce` is active.
- **Official References Consulted:**
  - [NOAA National Hurricane Center Data Specification](https://www.nhc.noaa.gov/data/) (Checked: 2026-10-10)
  - [W3C ARIA Authoring Practices Guide - Slider Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) (Checked: 2026-10-10)
- **Verification Status:** `VERIFIED` - All math and accessibility patterns tested locally.

### Project 02 — The Barter Bridge
- **Domain:** Civic preference AST & trade-off decision engine.
- **Research Topics:** Rule engine AST design, priority ranking algorithms, interactive graph node inspectors.
- **Status:** Scheduled for Phase 1 (Barter Bridge).

### Project 03 — Sacrificial Pathways
- **Domain:** Topographic urban flood routing.
- **Research Topics:** 3D/2D terrain elevation surfaces, flow vector visualization, sacrificial channel routing comparison.
- **Status:** Scheduled for Phase 1 (Sacrificial Pathways).

### Project 04 — Diagnostic Liquidity
- **Domain:** Algorithmic crop subsidy & mobile image triage.
- **Research Topics:** Image intake preview, disease feature annotation, explainable AI confidence scores, claims workflow.
- **Status:** Scheduled for Phase 1 (Diagnostic Liquidity).

### Project 05 — Horizon-Scrape
- **Domain:** Ambient optical smog & crowdsourced observation canvas.
- **Research Topics:** Image haze analysis algorithms, dual-canvas slider comparison, temporal PM2.5 proxy filtering.
- **Status:** Scheduled for Phase 1 (Horizon-Scrape).
