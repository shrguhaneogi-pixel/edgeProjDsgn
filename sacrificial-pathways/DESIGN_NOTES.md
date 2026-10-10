# Sacrificial Pathways — Design Notes & Specification

## 1. Product Promise
Make the consequences of every proposed urban floodwater route and sacrificial bypass channel visible before an emergency manager or civic engineer authorizes a diversion.

## 2. Core User Journey
1. **Intake & Baseline Assessment (0-15s):** Operator views the basin terrain contour map during peak surge ($1500\text{ m}^3/\text{s}$). Observe baseline inundation threatening the high-value Downtown Commercial Core.
2. **Scenario Comparison (15-45s):** Operator toggles between Scenario A (Baseline Natural Channel Overflow) and Scenario B (Sacrificial Bypass Channel Activated).
3. **Interactive Control & Gate Manipulation (45-90s):** Operator adjusts water discharge rate ($1000 - 2500\text{ m}^3/\text{s}$) and manually toggles the Sacrificial Diversion Gate (`#FF3D00`).
4. **Consequence Analysis (90-120s):** Telemetry cards update in real time showing diverted flow volume, downstream inundation reduction ($-1.4\text{ m}$), and sectoral asset exposure diff (Commercial: $-82\%$, Agricultural Bypass Channel: $+35\%$).
5. **Accessible Audit & Export (120s+):** Operator switches to the tabular fallback (`AccessibleElevationTable`) or runs automated system validation unit tests.

## 3. Screen Inventory
- **Screen 1: Topographic Flood Command Center (Main Canvas workspace)**
  - Top Bar: Basin Name ("Val-des-Monts Urban Catchment"), Surge Peak Status indicator, Scenario Selector (`Baseline` vs `Bypass Sacrificial` vs `Extreme Overtopping`).
  - Left Panel: Hydraulic Controls (Discharge slider $Q$, Gate Status Toggle, Water Level Offset $h_{base}$).
  - Center Canvas: HTML5 Canvas 2D Topographic Elevation Surface with 2.5D contours, hydraulic vector arrows, sector markers, and sacrificial channel path (`#FF3D00`).
  - Right Panel: Sector Consequence & Asset Exposure Inspector (Downtown, Industrial, Residential, Agricultural Sacrificial Zone).
  - Bottom Bar: Live Telemetry & Manning's Kinematic Flow Equation breakdown.
- **Screen 2: Accessible Sector Elevation & Inundation Data Matrix (`AccessibleElevationTable`)**
  - Accessible HTML Table (`role="table"`) listing all terrain sectors with elevation ($Z$), water depth ($h$), flow velocity ($V$), exposed asset value, and risk status.
- **Screen 3: Unit Test & Verification Modal (`TestRunnerModal`)**
  - Live in-app test suite checking hydraulic calculations, gate diversion logic, and state transitions.

## 4. Visual North Star & Design Tokens
Cinematic terrain-analysis table: charcoal/navy controls (`#0D1117`, `#161B22`), warm mineral terrain elevation surface (`#1E2640` to `#3B486B`), electric orange route overlays (`#FF3D00`), restrained hydraulic blue water (`#00A3FF`), critical warning red (`#FF2A6D`), safe green (`#00E676`).

- **Background Surfaces:**
  - `surface-bg`: `#0D1117`
  - `surface-card`: `#161B22`
  - `surface-border`: `#30363D`
- **Color Palette:**
  - `accent-sacrificial`: `#FF3D00` (Electric Orange - Primary Brand & Sacrificial Gate)
  - `accent-water`: `#00A3FF` (Hydraulic Water Overlay)
  - `accent-contour`: `#4A5568` (Elevation Contour Lines)
  - `status-danger`: `#FF2A6D` (High Inundation Risk)
  - `status-safe`: `#00E676` (Protected Sector)
  - `text-primary`: `#F0F6FC`
  - `text-muted`: `#8B949E`
- **Typography & Spacing:**
  - Monospace font (`JetBrains Mono`, `Fira Code`, `ui-monospace`) for numerical telemetry.
  - Sans-serif font (`Inter`, `system-ui`, `-apple-system`) for controls and headers.
  - Spacing scale: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`.

## 5. Data Visualization Math & Logic
- **Terrain Surface Elevation Grid $Z(x,y)$:**
  $$Z(x, y) = Z_{base} + A_1 \cdot \cos(k_x x) \cdot \sin(k_y y) - d_{channel}(x,y)$$
- **Manning's Hydraulic Flow Velocity $V$:**
  $$V = \frac{1}{n} R_h^{2/3} S_0^{1/2}$$
  Where $n = 0.035$ (paved channel), $S_0 = |\nabla Z|$ (elevation gradient).
- **Sacrificial Channel Weir Diversion Flow $Q_{sacrificial}$:**
  $$Q_{sacrificial} = C_d \cdot b \cdot \max(0, h_{river} - h_{gate})^{3/2}$$
  Where $C_d = 1.84$, $b = 15\text{ m}$.
- **Sector Net Inundation Risk Score:**
  $$\text{Risk}_s = \min(100, \text{Depth}_s \times 25 \times \text{AssetWeight}_s)$$

## 6. Unverified Assumptions & Risk Mitigation
- *Assumption:* High-resolution elevation raster GIS data requires Mapbox/Cesium GL keys.
- *Mitigation:* Built-in deterministic procedural 2D elevation grid with spline interpolation. 100% offline, zero API keys needed.

## 7. Accessibility & WCAG 2.1 AA Compliance
- Contrast ratio $\ge 4.5:1$ across dark background and status colors.
- Keyboard navigation with explicit focus outlines (`ring-2 ring-[#FF3D00]`).
- Screen reader ARIA live updates (`aria-live="polite"`) when gate or scenario changes.
- Tabular data fallback (`AccessibleElevationTable`) for screen reader users unable to view canvas.
- Respects `prefers-reduced-motion: reduce`.
