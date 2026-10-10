# Parametric Pulse
> **Smart-Contract Cyclone Liquidity Operational Workspace**  
> When a measurable disaster threshold is crossed, emergency capital moves with transparency, speed, and an auditable on-chain trail.

![Status](https://img.shields.io/badge/status-completed_prototype-success) ![Stack](https://img.shields.io/badge/stack-React_19_|_TypeScript_|_Canvas_2D-00E5FF) ![Build](https://img.shields.io/badge/build-passing-brightgreen)

---

## 1. Product Overview & Core Narrative
Parametric Pulse is a climate-risk operational workspace for visualizing a tropical cyclone's projected path, translating verified environmental measurements into transparent parametric trigger conditions, and demonstrating how a qualifying extreme weather event automatically initiates a parametric liquidity payout.

Instead of making emergency directors inspect dense financial spreadsheets, Parametric Pulse unifies storm trajectory telemetry, exposed coastal infrastructure, rule evaluation formulas, and liquidity settlement into one operational interface.

---

## 2. Implemented Features & Signature Components
- **StormCanvas2D (`src/components/StormCanvas2D.tsx`):** High-performance HTML5 Canvas 2D storm trajectory visualizer. Features radar background grid, coastline vector geometry, Catmull-Rom spline forecast track, rotating hurricane eye swirl, pressure isobar rings, and selectable forecast nodes.
- **TimeScrubber (`src/components/TimeScrubber.tsx`):** Interactive timeline scrubber (T+0h to T+48h) with play/pause simulation playback, step controls, speed selector (1x, 2x, 4x), and full keyboard navigation.
- **TelemetryInspector (`src/components/TelemetryInspector.tsx`):** Real-time storm metrics panel displaying max sustained wind speed (knots), barometric central pressure (hPa), Saffir-Simpson category badges, and proximity distance to selected municipal assets.
- **TriggerRuleCard (`src/components/TriggerRuleCard.tsx`):** Parametric rule evaluator rendering structured inequality formulas ($V_{max} \ge 130\text{ kts} \land \text{Distance} \le 45\text{ km}$), wind speed progress bars, and live `SATISFIED`/`PENDING` status.
- **PayoutStateMachine (`src/components/PayoutStateMachine.tsx`):** Step-by-step auditable payout timeline (`IDLE` $\rightarrow$ `EVALUATING` $\rightarrow$ `TRIGGERED` $\rightarrow$ `LIQUIDITY_LOCKED` $\rightarrow$ `PAYOUT_DISPATCHED` $\rightarrow$ `CONFIRMED`) with simulated Solana devnet transaction hash.
- **AccessibleTableFallback (`src/components/AccessibleTableFallback.tsx`):** Full ARIA-compliant screen reader telemetry table view for accessibility (WCAG 2.1 AA) and low-spec hardware.
- **TestRunnerModal (`src/components/TestRunnerModal.tsx`):** In-app interactive test runner executing unit test suites for Haversine distance, Catmull-Rom spline interpolation, and parametric trigger logic.

---

## 3. Technology Stack & Architecture
- **Framework:** React 19 + TypeScript + Vite (`parametric-pulse/`)
- **Rendering Layer:** Custom HTML5 Canvas 2D + SVG Overlay Components
- **Icons & Styling:** Lucide React + Cybernetic Deep Navy System (`#06080F`, `#0B0F19`, `#00E5FF`)
- **Data Boundary:** 100% Deterministic Local Data Modules (`src/data/demoScenarios.ts`) — Zero required external paid APIs.

---

## 4. Installation & Local Execution

```bash
# Navigate to project directory
cd parametric-pulse

# Install dependencies
npm install

# Run development server (Port 3000)
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle
npm run build
```

---

## 5. Two-Minute Live Demonstration Script
1. **Introduction (0:00 - 0:20):** Open the workspace. Explain the core problem: parametric insurance speeds up emergency relief, but traditional trigger evaluation lacks visual transparency.
2. **Trajectory Scrubbing (0:20 - 0:50):** Drag the temporal scrubber from T+0h to T+24h. Watch the Canvas 2D storm advance along its spline track toward Port Aurora Deepwater Harbor, updating wind speed and pressure gauges in real time.
3. **Trigger Evaluation (0:50 - 1:20):** Point to the Trigger Rule Card. Show how at T+24h, Category 4 winds (135 kts) and 0km proximity cross the rule inequality threshold ($V \ge 130\text{ kts} \land d \le 45\text{ km}$), flipping status to **TRIGGER SATISFIED**.
4. **Auditable Payout Execution (1:20 - 1:40):** Click **EXECUTE DEMO PAYOUT**. Watch the state machine transition through Liquidity Locking, Payout Dispatching, and Settlement Confirmation ($1,500,000 USDC).
5. **Scenario Comparison & Unit Tests (1:40 - 2:00):** Switch to Scenario A (Category 2 Bypass). Demonstrate that the rule correctly remains **PENDING** due to bypassing the hazard radius. Click **RUN TESTS** in the header to execute the in-app test runner.

---

## 6. Deterministic Demo Scenarios
- **Scenario B (Qualifying):** Cyclone Maya (Category 4 Landfall, Max Wind 135 kts, Landfall Dist 18 km at T+24h). Trigger Status: `SATISFIED`. Payout Amount: `$1,500,000 USDC`.
- **Scenario A (Non-Qualifying):** Tropical Storm Nuri (Category 2 Bypass, Max Wind 90 kts, Landfall Dist 85 km). Trigger Status: `NOT SATISFIED`.

---

## 7. Accessibility & Keyboard Support
- **WCAG 2.1 AA Compliant:** High contrast ratio ($\ge 4.5:1$), 2px cyan focus indicators (`#00E5FF`).
- **Keyboard Controls:** `ArrowLeft`/`ArrowRight` to step scrubber hours; `Space` to toggle simulation playback.
- **ARIA Table View:** Click **ARIA TABLE** in the header for a structured table view with live screen reader announcements.
