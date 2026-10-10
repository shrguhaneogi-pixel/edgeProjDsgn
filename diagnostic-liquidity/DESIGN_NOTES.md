# Diagnostic Liquidity — Design Notes & Specification

## 1. Product Promise
Turn a crop-damage photograph into an explainable next step—not an opaque diagnosis or an automatic insurance denial.

## 2. Core User Journey
1. **Intake & Photo Selection (0-15s):** Farmer/Field Agent captures or selects a crop image (e.g. Maize Leaf Blight, Wheat Rust, Healthy Soy).
2. **Interactive Lesion Triage (15-45s):** Farmer inspects computer vision lesion detection boxes (`#FF00FF` / `#FF2A6D`), adjusts confidence threshold filter, and toggles heatmap overlays.
3. **Diagnostic Explanation (45-90s):** Farmer reviews disease diagnosis (Northern Leaf Blight), AI confidence score (92%), identified symptoms checklist, and crop damage severity ratio (38%).
4. **Parametric Claim Settlement (90-120s):** Field Agent advances claim through transparent lifecycle: `DRAFT` -> `INTAKE_SUBMITTED` -> `DIAGNOSTIC_EVALUATED` -> `ADJUDICATION_PENDING` -> `SUBSIDY_DISPATCHED` -> `SETTLED`.
5. **Accessible Audit & Export (120s+):** Field Agent switches to accessible case report mode or runs automated unit tests.

## 3. Screen Inventory
- **Screen 1: Mobile Field Crop Intake & Lesion Inspector (`LesionInspectorCanvas`)**
  - Top Bar: Farm Name ("Highland Valley Cooperative - Plot 4B"), Crop Type Selector (Maize, Wheat, Soy).
  - Left Panel: Photo Selector & Bounding Box Layer Toggles (Lesion Boxes, Severity Heatmap, Pixel Zoom Lens).
  - Center Canvas: HTML5 Canvas 2D Crop Image Inspector rendering lesion spatial bounding boxes (`#FF00FF`), symptom markers, and pixel damage highlights.
  - Right Panel: Explainable Diagnostic Card (Disease Name, Confidence %, Damage Severity %, Symptom Verification Checklist).
  - Bottom Bar: Parametric Subsidy Payout State Machine (`$3,230 USD Approved`).
- **Screen 2: Accessible Crop Case Report (`AccessibleCropCaseReport`)**
  - Accessible linear case report structure (`role="region"`) listing all diagnostic metrics, lesion coordinates, symptom checklists, and payment rail state.
- **Screen 3: Unit Test & Verification Modal (`TestRunnerModal`)**
  - Live in-app verification suite testing lesion area math, diagnostic confidence scoring, and subsidy settlement transitions.

## 4. Visual North Star & Design Tokens
Humane field-work tool: warm soil neutrals (`#0F1410`, `#161F18`), supportive botanical green (`#00E676`), crop harvest gold (`#FFAB00`), vibrant lesion highlight magenta/pink (`#FF00FF` / `#FF2A6D`), clear typography, and calm linear layout.

- **Background Surfaces:**
  - `surface-bg`: `#0F1410` (Deep Soil Neutrals)
  - `surface-card`: `#161F18` (Panel Background)
  - `surface-border`: `#2D3B30`
- **Color Palette:**
  - `accent-botanical`: `#00E676` (Healthy Leaf Green & Primary Actions)
  - `accent-lesion`: `#FF00FF` (Magenta - Lesion Bounding Box Highlight)
  - `accent-harvest`: `#FFAB00` (Harvest Gold & Warning Thresholds)
  - `status-danger`: `#FF2A6D` (Severe Blight / Damage)
  - `status-safe`: `#00E676` (Low Damage / Healthy)
  - `text-primary`: `#F0F6FC`
  - `text-muted`: `#8B949E`
- **Typography & Spacing:**
  - Monospace font (`JetBrains Mono`, `Fira Code`, `ui-monospace`) for confidence scores and financial payouts.
  - Sans-serif font (`Inter`, `system-ui`, `-apple-system`) for controls and headers.
  - Spacing scale: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`.

## 5. Data Visualization Math & Logic
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

## 6. Unverified Assumptions & Risk Mitigation
- *Assumption:* Real-time cloud ML lesion segmentation requires active API keys.
- *Mitigation:* Built-in deterministic computer vision bounding box dataset with procedural pixel inspection. 100% offline, zero API keys needed.

## 7. Accessibility & WCAG 2.1 AA Compliance
- Contrast ratio $\ge 4.5:1$ across dark soil background and status colors.
- Keyboard navigation with explicit focus outlines (`ring-2 ring-[#00E676]`).
- Screen reader ARIA live updates (`aria-live="polite"`) when crop photo or claim state changes.
- Linear accessible case report fallback (`AccessibleCropCaseReport`) for non-canvas users.
- Respects `prefers-reduced-motion: reduce`.
