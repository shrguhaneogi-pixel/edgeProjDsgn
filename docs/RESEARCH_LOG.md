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
- **Evaluation Date:** 2026-10-10
- **Evaluated Technical Approaches:**
  1. *Approach A (Custom SVG Interactive AST Canvas + Deterministic Rule Evaluator):* Renders an interactive decision tree with selectable rule nodes, live input/operator/output inspectors, and weight sliders. **Selected Primary**. 100% offline, zero external dependencies, high performance.
  2. *Approach B (External D3.js / Graphviz Library Integration):* Automatic force-directed layout, but adds bundle complexity and non-deterministic node positioning. Kept as `UNVERIFIED` optional feature.
  3. *Approach C (Nested HTML ARIA Tree Inspector):* Accessible linear tree hierarchy with standard keyboard navigation and ARIA attributes (`role="tree"`). **Selected as Mandatory Accessibility Fallback**.
- **Data & Visualization Mathematics:**
  - **Pairwise Bradley-Terry Trade-Off Scoring:**
    $$\text{Score}(P_i) = \sum_{j \neq i} w_{ij} \cdot \mathbb{I}(P_i \succ P_j)$$
  - **AST Rule Evaluation Structure:**
    $$\text{Root(District Priority)} \leftarrow \text{AND / WEIGHTED\_SUM} \leftarrow \{\text{Category Node}_k, \text{Constraint Node}_m\}$$
  - **Policy Simulation Weight Modification:**
    $$\text{Rank}_{sim}(P_i) = \sum_{c \in Categories} \alpha_c \cdot \text{Score}_{raw}(P_i, c)$$
- **Accessibility & Design System Standards:**
  - **Neo-Brutalist Civic Aesthetic:** Warm off-white background (`#F9F8F6`), deep charcoal text (`#18181B`), lime signal accent (`#B2FF05`), 2px crisp black borders (`#000000`).
  - **Keyboard Navigation:** Choice cards bound to `KeyA` / `KeyB` or `ArrowLeft` / `ArrowRight`. AST canvas keyboard tree navigation.
  - **Screen Reader Support:** Live region (`aria-live="polite"`) announcing: *"Choice 3 of 5 recorded: Flood Drainage prioritized over Street Lighting. Aggregate ranking updated."*
- **Official References Consulted:**
  - [W3C ARIA Treeview Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) (Checked: 2026-10-10)
  - [Stanford Participatory Budgeting Project](https://participatorybudgeting.stanford.edu/) (Checked: 2026-10-10)
- **Verification Status:** `VERIFIED` - AST evaluation algorithms and ARIA tree structures tested locally.

### Project 03 — Sacrificial Pathways
- **Domain:** Topographic urban flood routing & sacrificial channel diversion simulation.
- **Evaluation Date:** 2026-10-10
- **Evaluated Technical Approaches:**
  1. *Approach A (Custom HTML5 Canvas 2D Topographic Elevation Surface + Iso-contour & Flow Vector Layering):* Renders interactive terrain contours, elevation grid, flow direction vectors, water inundation overlays, and sacrificial channel bypass gates (`#FF3D00`). **Selected Primary**. 100% offline, lightweight, high performance on all devices without WebGL dependencies.
  2. *Approach B (External WebGL / Three.js 3D Elevation Mesh):* Provides 3D elevation mesh navigation, but introduces GPU context overhead and potential mobile WebGL crashes. Kept as `UNVERIFIED` fallback.
  3. *Approach C (Accessible Structured HTML/ARIA Elevation & Inundation Data Table):* Accessible table view (`AccessibleElevationTable`) providing elevation, flood risk, infrastructure assets exposed, and diversion state per sector with standard keyboard sorting. **Selected as Mandatory Accessibility Fallback**.
- **Data & Visualization Mathematics:**
  - **Terrain Elevation Surface Function $Z(x, y)$:**
    Synthetic topographic elevation mesh:
    $$Z(x, y) = Z_{base} + A_1 \cdot \cos(k_x x) \cdot \sin(k_y y) - d_{channel}(x,y)$$
  - **Hydraulic Flow Vector & Manning's Kinematic Wave Velocity Equation:**
    Flow velocity $V$ along slope gradient $\nabla Z = \left(\frac{\partial Z}{\partial x}, \frac{\partial Z}{\partial y}\right)$:
    $$V = \frac{1}{n} R_h^{2/3} S_0^{1/2}$$
    Where $n$ is Manning's roughness coefficient ($n = 0.035$ for urban channels, $n = 0.050$ for overland floodplains), $R_h$ is hydraulic radius (m), and $S_0 = |\nabla Z|$ is energy slope gradient.
  - **Sacrificial Channel Diversion Routing Equation:**
    When sacrificial gate diversion threshold $h_{gate}$ is breached or manually opened ($S_{gate} = 1$):
    $$Q_{total} = Q_{primary} + Q_{sacrificial}$$
    $$Q_{sacrificial} = C_d \cdot b \cdot (h_{river} - h_{gate})^{3/2}$$
    Where $C_d \approx 1.84$ (broad-crested weir coefficient), $b$ is gate width, reducing downstream residential inundation depth $h_{downstream}$ by:
    $$\Delta h = \frac{Q_{sacrificial}}{W_{river} \cdot V_{downstream}}$$
  - **Consequence / Risk Exposure Score:**
    $$\text{Risk Score} = \sum_{\text{sectors}} (\text{Inundation Depth}_s \times \text{Asset Value}_s \times \text{Vulnerability Weight}_s)$$
- **Accessibility & Design System Standards:**
  - **Cinematic Terrain Aesthetic:** Deep charcoal control panel (`#0D1117`, `#161B22`), mineral topographic contours (`#2D3748`, `#4A5568`), electric orange sacrificial diversion paths (`#FF3D00`), restrained hydraulic blue water (`#00A3FF`), critical warning red (`#FF2A6D`), safe green (`#00E676`).
  - **Keyboard Navigation:** Scenario switcher bound to `Key1` / `Key2` / `Key3`, sacrificial gate toggle bound to `Space` / `KeyG`, spatial grid navigation via `ArrowUp`/`ArrowDown`/`ArrowLeft`/`ArrowRight`.
  - **Screen Reader Support:** Live region (`aria-live="polite"`) announcing: *"Scenario B Selected: Sacrificial Bypass Gate OPEN. Downstream flood depth reduced by 1.4 meters. Residential District exposure: LOW."*
  - **Reduced Motion:** Pause water flow particle animation and transition instantly when `prefers-reduced-motion: reduce` is active.
- **Official References Consulted:**
  - [USACE HEC-RAS Hydraulic Reference Manual](https://www.hec.usace.army.mil/software/hec-ras/) (Checked: 2026-10-10)
  - [W3C ARIA Table Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/) (Checked: 2026-10-10)
- **Verification Status:** `VERIFIED` - Hydraulic routing equations and ARIA table structures verified locally.


### Project 04 — Diagnostic Liquidity
- **Domain:** Algorithmic crop subsidy & mobile-first crop damage intake triage.
- **Evaluation Date:** 2026-10-10
- **Evaluated Technical Approaches:**
  1. *Approach A (Custom HTML5 Canvas 2D Crop Image Inspector + Bounding Box & Lesion Heatmap Overlay Engine):* Renders uploaded/seeded crop photographs with interactive HTML5 Canvas 2D bounding boxes, lesion highlight overlays (`#FF00FF` / `#FF2A6D`), pixel inspection zoom magnifier, and severity threshold calculation. **Selected Primary**. 100% offline, lightweight, highly performant on mobile devices without external ML model server dependencies.
  2. *Approach B (External Cloud Computer Vision API - TensorFlow/PyTorch Server):* High accuracy on live data, but requires paid API keys, internet connectivity, and server backend. Kept as optional `UNVERIFIED` fallback.
  3. *Approach C (Accessible Structured HTML/ARIA Diagnostic Case Summary & Telemetry Matrix):* Accessible step-by-step case card with ARIA status regions (`role="region"`), keyboard focus, and text fallback listing all identified symptoms, severity metrics, and payout status. **Selected as Mandatory Accessibility Fallback**.
- **Data & Visualization Mathematics:**
  - **Crop Damage Severity Ratio $D_{ratio}$:**
    $$D_{ratio} = \frac{\sum \text{Area}(\text{Lesion Bounding Box}_k)}{\text{Total Crop Canopy Surface Area}}$$
  - **Explainable Diagnostic Confidence Score $C_{score}$:**
    $$C_{score} = \min\left(0.99, \sum_{s \in \text{Symptoms}} w_s \cdot \text{MatchConfidence}(s) \times (1 - \sigma_{\text{lighting}})\right)$$
  - **Parametric Subsidy Payout Formula $P_{subsidy}$:**
    $$P_{subsidy} = \begin{cases}
    0 & \text{if } D_{ratio} < D_{threshold} \quad (15\%) \\
    \text{BaseRate} \times \text{Hectares} \times \left(\frac{D_{ratio} - D_{threshold}}{1.0 - D_{threshold}}\right) & \text{if } D_{ratio} \ge D_{threshold}
    \end{cases}$$
    Where $\text{BaseRate} = \$850/\text{hectare}$, $D_{threshold} = 0.15$.
- **Accessibility & Design System Standards:**
  - **Botanical Field Aesthetic:** Deep soil background (`#0F1410`, `#161F18`), supportive botanical green (`#00E676`), crop harvest gold (`#FFAB00`), lesion accent (`#FF00FF`), high-contrast text (`#F0F6FC`).
  - **Keyboard Navigation:** Crop image selection bound to `Digit1` / `Digit2` / `Digit3`, claim adjudication state step bound to `Space` / `KeyS`, view switcher bound to `KeyA`.
  - **Screen Reader Support:** Live region (`aria-live="polite"`) announcing: *"Crop Photo Assessed: Maize Northern Leaf Blight detected with 92% confidence. Damage severity 38%. Subsidy claim eligible for $3,230 USD settlement."*
  - **Reduced Motion:** Disable scanning radar effect and pulse animations when `prefers-reduced-motion: reduce` is active.
- **Official References Consulted:**
  - [FAO Plant Disease Assessment Guide](https://www.fao.org/agriculture/crops/) (Checked: 2026-10-10)
  - [W3C ARIA Region Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/landmark/) (Checked: 2026-10-10)
- **Verification Status:** `VERIFIED` - Crop lesion scoring and parametric subsidy payout formulas verified locally.


### Project 05 — Horizon-Scrape
- **Domain:** Ambient optical smog & crowdsourced observation canvas.
- **Research Topics:** Image haze analysis algorithms, dual-canvas slider comparison, temporal PM2.5 proxy filtering.
- **Status:** Scheduled for Phase 1 (Horizon-Scrape).
