# The Barter Bridge
> **Civic Preference AST Engine & Trade-Off Simulator**  
> Turn conflicting community priorities into an auditable, inspectable decision process.

![Status](https://img.shields.io/badge/status-completed_prototype-success) ![Stack](https://img.shields.io/badge/stack-React_19_|_TypeScript_|_SVG_AST-B2FF05) ![Build](https://img.shields.io/badge/build-passing-brightgreen)

---

## 1. Product Overview & Core Narrative
The Barter Bridge is a civic participation experience that helps residents express trade-offs when a municipality or district cannot fund every desirable infrastructure project. Rather than asking for a vague upvote or star rating, it guides people through structured forced pairwise choices—such as *Stormwater Drainage* versus *Road Resurfacing*—and converts responses into a visible priority model.

An Abstract Syntax Tree (AST) represents the evaluation logic, allowing administrators and residents to inspect how individual choices and category weightings influence an aggregate district recommendation.

---

## 2. Implemented Features & Signature Components
- **PairwiseChoiceCard (`src/components/PairwiseChoiceCard.tsx`):** Interactive Neo-Brutalist forced-choice survey component comparing two projects at a time with category tags, $USD costs, impact summaries, and high-visibility selection triggers (`2px solid #000000`, background `#B2FF05`).
- **ASTCanvasSVG (`src/components/ASTCanvasSVG.tsx`):** Interactive SVG visualizer for the Abstract Syntax Tree rendering Root, Operator, Category, and Leaf nodes with connecting vector edges and selectable node highlights.
- **ASTNodeInspector (`src/components/ASTNodeInspector.tsx`):** Side drawer inspecting selected AST node attributes and tuning category policy weights.
- **RankingChart (`src/components/RankingChart.tsx`):** Bar chart comparing baseline public preference rankings with policy simulation overrides and rank diff badges (`+1`, `-1`).
- **PersonalSummary (`src/components/PersonalSummary.tsx`):** Individual participant priority matrix card summarizing survey choices.
- **ARIATreeFallback (`src/components/ARIATreeFallback.tsx`):** Full ARIA-compliant nested HTML tree structure (`role="tree"`) for screen reader accessibility (WCAG 2.1 AA).
- **TestRunnerModal (`src/components/TestRunnerModal.tsx`):** In-app unit test runner executing test suites for Borda pairwise scoring, AST evaluation, and policy simulation rank diffs.

---

## 3. Technology Stack & Architecture
- **Framework:** React 19 + TypeScript + Vite (`barter-bridge/`)
- **Rendering Layer:** Custom SVG AST Canvas + Neo-Brutalist HTML Choice Cards
- **Visual System:** Warm Off-White (`#F9F8F6`), Deep Charcoal (`#18181B`), Vibrant Lime Accent (`#B2FF05`), 2px Solid Black Borders (`#000000`)
- **Data Boundary:** 100% Deterministic Local Data Modules (`src/data/demoDistrictData.ts`) — Zero required external paid APIs.

---

## 4. Installation & Local Execution

```bash
# Navigate to project directory
cd barter-bridge

# Install dependencies
npm install

# Run development server (Port 3001)
npm run dev

# Run TypeScript type check
npm run lint

# Build production bundle
npm run build
```

---

## 5. Two-Minute Live Demonstration Script
1. **Introduction (0:00 - 0:20):** Open the workspace. Explain the core problem: traditional public polls ask what people want without exposing trade-offs. The Barter Bridge makes budget constraints explicit.
2. **Resident Forced-Choice Survey (0:20 - 0:50):** Step through the 5-step pairwise choice survey. Compare Option A (*River Basin Flood Barrier* [$2.1M]) vs Option B (*Solar Microgrid* [$1.8M]). Select choices and click **VIEW MY SUMMARY**.
3. **Personal Priority Matrix (0:50 - 1:10):** Review the participant summary card showing derived personal project rankings based on pairwise choices. Click **INSPECT DISTRICT AST**.
4. **Admin AST Workspace & Node Inspection (1:10 - 1:40):** Point to the SVG AST Canvas. Select Node `node-cat-safety`. The AST Node Inspector populates raw inputs, operator `WEIGHTED_SUM`, and current category weight (0.30).
5. **Policy Weight Simulation Sandbox (1:40 - 2:00):** Adjust the *Sustainability* weight slider from 0.25 to 0.60. Watch the District Priority Ranking Chart update in real time with rank diff badges (`+1`, `-1`). Click **RUN TESTS** to execute the unit test runner.

---

## 6. Deterministic Demo Dataset
- **5 Municipal Projects ($5.0M Total Budget):**
  1. *River Basin Flood Barrier & Drainage* ($2.1M, Safety)
  2. *Regional Emergency Medical Clinic* ($1.5M, Health)
  3. *Community Solar Power Microgrid* ($1.8M, Sustainability)
  4. *Main Street Transit & Road Resurfacing* ($1.2M, Infrastructure)
  5. *Public Library Digital & Tech Hub* ($0.8M, Education)
- **250 Seeded Public Responses:** Aggregated into baseline preference scores.

---

## 7. Accessibility & Keyboard Support
- **WCAG 2.1 AA Compliant:** High contrast ratio ($\ge 7:1$), 3px lime focus ring with 2px black offset.
- **Keyboard Navigation:** Choice selection via `KeyA`/`KeyB` or `ArrowLeft`/`ArrowRight`.
- **ARIA Treeview:** Click **ARIA TREE** in the header for a screen reader nested tree view with `ArrowUp`/`ArrowDown` keyboard navigation.
