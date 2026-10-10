# Diagnostic Liquidity — Algorithmic Crop Subsidy & Mobile Image Triage Engine

> **Project 04** of the Edge Systems Engineering Collection.  
> A mobile-first agricultural crop-damage intake, explainable lesion triage, and parametric claim settlement prototype built with React 19, TypeScript, Vite, and HTML5 Canvas 2D.

---

## 🌟 Overview & Key Capabilities

**Diagnostic Liquidity** solves agricultural crop-damage assessment latency by pairing mobile photo triage with an explainable AI confidence score ($C_{score}$) and algorithmic parametric claim settlement ($P_{subsidy}$).

### Key Prototype Features
1. **Case Intake Selector (`CropPhotoSelector.tsx`)**:
   - Deterministic case switching between Maize Northern Leaf Blight, Wheat Stem Rust, and Healthy Soybean.
   - Live estimated payout displays and risk severity badges.
2. **HTML5 Canvas 2D Lesion Inspector (`LesionInspectorCanvas.tsx`)**:
   - Interactive leaf viewport with procedural vein and necrotic lesion rendering.
   - Neon magenta (`#FF00FF`) AI bounding box overlays and target reticle corners.
   - Thermal Heatmap overlay mode (`showHeatmap`) for damage density mapping.
   - Real-time laser scanning line animation (`isScanAnimating`).
   - Tracking 2.5x magnification zoom lens previewing micro-level leaf pixel structure.
3. **Explainable AI Confidence Engine (`DiagnosticConfidenceCard.tsx`)**:
   - Transparent $C_{score}$ calculation breakdown based on verified pathological symptoms.
   - Interactive Confidence Threshold Scrubber (0% to 100%) for real-time bounding box filtering.
4. **Parametric Claim Settlement Rail (`ClaimSettlementCard.tsx`)**:
   - Instant calculation of parametric subsidy payout ($P_{subsidy}$) using $D_{ratio}$ damage ratio and $D_{threshold}$ eligibility threshold (15%).
   - Interactive claim status stepper (`DRAFT` → `INTAKE_SUBMITTED` → `DIAGNOSTIC_EVALUATED` → `ADJUDICATION_PENDING` → `SUBSIDY_DISPATCHED` → `SETTLED`).
5. **Accessible ARIA Report View (`AccessibleCropCaseReport.tsx`)**:
   - WCAG 2.1 AA screen reader fallback view with semantic `<table>`, `<dl>`, and live region announcements.
6. **In-App Unit Test Suite Runner (`TestRunnerModal.tsx`)**:
   - Interactive test runner modal verifying damage ratio math, confidence scoring, parametric formulas, and state reducer transitions.

---

## 📐 Mathematical Models & Formulas

### 1. Crop Damage Severity Ratio ($D_{ratio}$)
$$D_{ratio} = \min\left(1.0, \frac{\sum \text{Area}(\text{Lesion Box}_i)}{0.45 \times \text{Total Canvas Area}}\right) \times 100\%$$

### 2. Explainable AI Diagnostic Confidence Score ($C_{score}$)
$$C_{score} = \frac{1}{N} \sum_{i=1}^{N} \text{MatchScore}_i \quad \text{for all matched symptoms } s_i$$

### 3. Parametric Crop Subsidy Payout ($P_{subsidy}$)
$$P_{subsidy} = \begin{cases} 
0, & \text{if } D_{ratio} < D_{threshold} \\
\text{BaseRate} \times \text{Hectares} \times \left(\frac{D_{ratio} - D_{threshold}}{1 - D_{threshold}}\right), & \text{if } D_{ratio} \ge D_{threshold}
\end{cases}$$

---

## 🎨 Design System Tokens (Botanical Field Palette)

- **Canvas Dark Base**: `#060A07` (Deep Nitrogen Dark), `#0F1410` (Soil Charcoal), `#121A14` (Canopy Surface)
- **Supportive Botanical Green**: `#00E676` (Photosynthetic Green, primary accent & success)
- **Harvest Gold**: `#FFAB00` (Mature Crop Amber, moderate severity & heatmaps)
- **Lesion Magenta / Red**: `#FF00FF` / `#FF2A6D` (Necrotic Highlight, AI bounding boxes & critical alerts)
- **Borders & Grid Lines**: `#2D3B30` / `#1F2C21`

---

## ⌨️ Global Keyboard Navigation Shortcuts

| Key Shortcut | Action Description |
|---|---|
| <kbd>1</kbd> | Select **Maize Northern Leaf Blight** Case ($3,230 USD) |
| <kbd>2</kbd> | Select **Wheat Stem Rust** Case ($7,118 USD) |
| <kbd>3</kbd> | Select **Healthy Soybean** Case ($0 USD) |
| <kbd>S</kbd> | Toggle **Laser Scan Line Animation** |
| <kbd>B</kbd> | Toggle **AI Bounding Boxes Overlay** |
| <kbd>H</kbd> | Toggle **Thermal Damage Heatmap** |
| <kbd>A</kbd> | Toggle **Accessible ARIA Report View** |
| <kbd>T</kbd> | Open **In-App Unit Test Suite Runner** |
| <kbd>R</kbd> | Reset **Claim State & Parameters** |

---

## 🚀 Quick Start & Running Commands

```bash
# Navigate to project directory
cd diagnostic-liquidity

# Install dependencies (Node.js >= 18)
npm install

# Run Vite local development server (Port 3003)
npm run dev

# Execute TypeScript type checking
npm run lint

# Build production bundle
npm run build
```

---

## 🎬 2-Minute Demonstration Script

1. **Launch Prototype**: Run `npm run dev` and open `http://localhost:3003`.
2. **Case Intake**: Click on the **Maize Northern Leaf Blight** case card (Joseph K. Mwangi, 10 ha).
3. **HTML5 Canvas Inspection**:
   - Hover mouse over the leaf surface to view the **2.5x Zoom Magnifier Lens** in the top-right corner.
   - Click on bounding box `box-2` to highlight the necrotic foliar patch.
   - Click **🔥 Heatmap** in the top toolbar (or press <kbd>H</kbd>) to observe damage intensity gradient.
   - Click **🛑 Pause Scan** (or press <kbd>S</kbd>) to freeze laser scanning.
4. **Explainable AI Confidence Engine**:
   - Observe the $C_{score}$ gauge at **92% Confidence**.
   - Drag the **Confidence Threshold Filter** slider to `90%` to filter out low-confidence symptom matches.
5. **Parametric Claim Settlement Rail**:
   - Inspect the parametric formula card showing $D_{ratio} = 38\%$, $D_{threshold} = 15\%$, and calculated liquidity payout of **$2,300 USD**.
   - Click **➡️ Advance to Next Step** to cycle through claim lifecycle (`ADJUDICATION_PENDING` → `SUBSIDY_DISPATCHED` → `SETTLED`).
6. **In-App Testing & Accessibility**:
   - Press <kbd>T</kbd> to open the **In-App Unit Test Runner** modal and verify all 6 test assertions pass clean.
   - Press <kbd>A</kbd> to toggle the **Accessible ARIA Report View** for screen reader verification.
