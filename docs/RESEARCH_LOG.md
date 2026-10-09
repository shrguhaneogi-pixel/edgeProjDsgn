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
- **Research Topics:** Storm track temporal scrubbing, wind intensity threshold rules, exposure calculations, deterministic state machine for payouts.
- **Status:** Detailed research in progress for Phase 1.

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
