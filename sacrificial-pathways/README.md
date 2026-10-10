# Sacrificial Pathways — Topographic Flood Routing

> **Cinematic Hydraulic Flood Diversion Command Center & Risk Consequence Simulator**  
> Make the consequences of every proposed floodwater route visible before an emergency manager or civic engineer authorizes a diversion.

![Status](https://img.shields.io/badge/status-complete-success) ![Stack](https://img.shields.io/badge/stack-React%2019%20%7C%20TypeScript%20%7C%20Vite-blue) ![Accent](https://img.shields.io/badge/accent-%23FF3D00-orange)

---

## 1. Product Overview

**Sacrificial Pathways** is a design-first, deterministic geospatial flood command prototype. It simulates urban catchment terrain contours, hydraulic flow velocity vectors, sacrificial weir diversion gate mechanics, and sectoral asset valuation risk exposure.

The application allows emergency operators to model peak flood surges ($500 - 3000\text{ m}^3/\text{s}$) across 4 municipal sectors and evaluate the exact physical trade-off of opening a sacrificial bypass gate (`#FF3D00`): sacrificing $15M in low-density agricultural meadow land to reduce downstream commercial core inundation depth by **1.4 meters** and prevent **$135M USD** in high-value urban infrastructure damage.

---

## 2. Key Features & Signature Interactions

1. **HTML5 Canvas 2D Topographic Elevation Workspace (`TerrainCanvas2D`):**
   - 2.5D topographic contour rendering (`#30363D`, `#4A5568`).
   - Main river hydraulic channel (`#00A3FF`) & Sacrificial Bypass Channel (`#FF3D00`).
   - Interactive Sacrificial Gate marker (`OPEN` vs `CLOSED`).
   - Real-time hydraulic flow particle animation along active channels.
   - Interactive click selection of sectors directly on the canvas.

2. **Hydraulic Physics & Formula Breakdown (`FlowTelemetryCard`):**
   - **Manning's Kinematic Velocity Equation:** $V = \frac{1}{n} R_h^{2/3} S_0^{1/2}$ ($n = 0.035$, $S_0 = 0.004$).
   - **Broad-Crested Weir Diversion Flow Equation:** $Q_{sacrificial} = C_d \cdot b \cdot \max(0, h_{river} - h_{gate})^{3/2}$ ($C_d = 1.84$, $b = 15.0\text{ m}$).

3. **Sector Consequence & Asset Valuation Analyzer (`ConsequenceAnalyzer`):**
   - Real-time exposure breakdown cards for Downtown Commercial Core ($240M), Waterfront Industrial Park ($110M), North Heights Residential ($180M), and Sacrificial Agricultural Basin ($15M).
   - Dynamic asset risk exposure valuation ($USD) and status badges (`SAFE` | `WARNING` | `CRITICAL`).
   - Clear sacrificial bypass channel trade-off summary card.

4. **Accessibility & Complete System States:**
   - **Accessible Table Fallback (`AccessibleElevationTable`):** Full ARIA table structure (`role="table"`) with sortable headers and live region announcements (`aria-live="polite"`).
   - **Global Keyboard Navigation:** Shortcuts <kbd>1-3</kbd> (scenarios), <kbd>G</kbd> (gate toggle), <kbd>A</kbd> (accessible table), <kbd>T</kbd> (unit tests), <kbd>R</kbd> (reset).
   - **Reduced Motion Support:** Listens to `prefers-reduced-motion: reduce` to pause flow animations.
   - **Interactive In-App Unit Test Suite (`TestRunnerModal`):** Programmatically verifies hydraulic calculations and reducer state transitions.

---

## 3. Visual Identity & Design Tokens

- **Surface Background:** `#0D1117` (Deep Charcoal Command Palette)
- **Panel Surface:** `#161B22` (Raised Surface)
- **Border Surface:** `#30363D`
- **Primary Accent:** `#FF3D00` (Electric Orange — Sacrificial Bypass Path & Gate)
- **Hydraulic Water Accent:** `#00A3FF` (Main Channel Stream)
- **Status Danger:** `#FF2A6D` (Critical Inundation Risk)
- **Status Warning:** `#FFAB00` (Moderate Inundation Risk)
- **Status Safe:** `#00E676` (Protected Sector Elevation)
- **Focus Indicator:** 2px solid `#FF3D00` focus outline with 2px offset.

---

## 4. Run & Validation Commands

From the `sacrificial-pathways/` project directory:

```bash
# Install dependencies
npm install

# Start development server (Port 3002)
npm run dev

# Run TypeScript typecheck & linter (Zero error standard)
npm run lint

# Compile production build
npm run build
```

---

## 5. Two-Minute Demonstration Script

1. **Intake & Baseline State (0:00 - 0:30):**
   - Launch application (`npm run dev`). Observe default peak surge ($1,600\text{ m}^3/\text{s}$) under `Scenario A: Baseline Overtopping`.
   - Note the Sacrificial Diversion Gate is **CLOSED**. Downstream inundation depth in Downtown Core is **3.2 meters**, placing $168M USD in commercial assets at `CRITICAL` risk (`#FF2A6D`).

2. **Sacrificial Bypass Channel Diversion (0:30 - 1:00):**
   - Press <kbd>G</kbd> or click **"OPEN Sacrificial Bypass Gate (#FF3D00)"**.
   - Observe the Canvas 2D visualizer light up the bypass channel in Electric Orange (`#FF3D00`). Flow particles redirect into the Agricultural Retention Basin.
   - Telemetry updates instantly: Diverted flow $Q = 520\text{ m}^3/\text{s}$, reducing downstream depth by **1.4 meters** to **1.8 meters**, lowering Downtown risk to `WARNING` and saving **$135M USD** in asset exposure.

3. **Formula & Consequence Inspection (1:00 - 1:30):**
   - Inspect the **Flow Telemetry Math Card** showing live calculations for Manning's Kinematic Velocity $V$ and Weir Discharge $Q_{sacrificial}$.
   - Review the **Consequence Analyzer** callout explaining the explicit trade-off rationale: sacrificing low-density agricultural meadow land to protect high-density urban core.

4. **Accessibility & Test Suite Verification (1:30 - 2:00):**
   - Press <kbd>A</kbd> to switch to the **Accessible Table Fallback** (`role="table"`). Demonstrate keyboard column sorting and screen reader announcements (`aria-live="polite"`).
   - Press <kbd>T</kbd> to launch the **Hydraulic Engine Unit Test Suite**. Click **"Run Hydraulic Unit Test Suite"** and confirm all 5/5 unit assertions pass clean.
