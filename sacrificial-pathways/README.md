# Sacrificial Pathways
> **Topographic Flood Routing**  
> Make the consequences of every proposed floodwater route visible before an operator compares alternatives.

![Status](https://img.shields.io/badge/status-design--brief-blueviolet) ![Focus](https://img.shields.io/badge/focus-UI%2FUX-ff69b4)

## 1. Product overview
Sacrificial Pathways is a geospatial decision-support prototype for exploring how floodwater might move through an urban basin and comparing candidate diversion routes toward designated lower-consequence catchment areas. Its signature experience is an interactive 3D terrain model where elevation, flow direction, candidate gates, vulnerable settlements, and predicted water paths are represented spatially. The interface is intended to help users understand a model's assumptions and compare scenarios—not autonomously direct real flood operations.

## 2. Problem and opportunity
Flood response decisions involve terrain, water flow, infrastructure, and competing risks. Static maps can hide elevation relationships and make it difficult to explain why one diversion route was proposed over another. A spatial interface can make the model easier to inspect, but only if uncertainty and affected communities remain visible.

## 3. Target users
- Flood-risk analysts and urban planners exploring hypothetical scenarios
- Emergency-management teams reviewing model outputs
- Researchers evaluating routing algorithms and geospatial datasets
- Public-sector stakeholders who need a clear explanation of trade-offs

## 4. Experience narrative / key user journey
### 01 · Choose a basin
The user opens a sample urban basin with a legend, scenario date, terrain source, and clear DEMO MODEL status. A small overview map anchors the 3D scene geographically.

### 02 · Read the terrain
The user tilts, pans, zooms, and switches between elevation, water-depth, and vulnerability layers. A probe tool reveals the elevation and model values at a selected point.

### 03 · Configure a scenario
The user adjusts a hypothetical rainfall/inflow input and selects candidate gates or routing constraints. Each input has units, bounds, and a reset-to-baseline action.

### 04 · Compare routes
The engine presents multiple candidate flow paths. The interface uses distinct line styles and labels to compare travel direction, estimated arrival windows, and the places potentially affected.

### 05 · Inspect consequences
Selecting a route opens a consequence panel with impacted zones, assumptions, confidence/uncertainty, and known limitations. Do not label an area ‘safe’ solely because a model assigns it lower consequence.

### 06 · Review the recommendation
A side-by-side scenario comparison records what changed, why a route scored differently, and which data layers were used. The user can export a static scenario report.

## 5. Art direction and visual identity
A cinematic terrain-analysis table: charcoal/navy controls, warm mineral terrain, electric orange route overlays, and restrained blue water. Use height, contour lines, flow arrows, and transparent overlays as semantic visual encodings. The 3D scene is the main workspace, but labels and charts must remain readable and the same data must be available in a 2D or tabular form.

### Design tokens to establish
- **Accent:** `#FF3D00` (use as a focused signal, not a substitute for accessible status labels).
- **Typography:** expressive display face for headlines paired with a highly legible UI sans; use monospace only for IDs, timestamps, technical values, and system labels.
- **Surface system:** define background, raised surface, border, muted text, focus ring, success, warning, and error tokens before building screens.
- **Iconography:** one consistent line-icon family; icons supplement labels rather than replacing them.
- **Data visualization:** every chart or spatial layer must have a legend, units, source, timestamp, and a non-visual or tabular equivalent where feasible.

## 6. Layout and responsive behavior
Desktop: 8-column 3D terrain canvas; 4-column scenario and consequence inspector; bottom dock for layer toggles, legend, and route comparison. Keep map controls in consistent corners. Mobile: switch to a simplified 2D map first, with a deliberate button to enter 3D mode; do not shrink the desktop canvas until it is unusable.

## 7. Signature UI components
- Interactive 3D basin/terrain canvas
- 2D overview map and orientation compass
- Layer toggles for elevation, flow direction, water depth, infrastructure, and vulnerability
- Terrain probe with elevation readout
- Rainfall/inflow scenario controls with units
- Candidate gate/route selector
- Animated flow-path overlays with direction markers
- Scenario comparison panel
- Uncertainty and assumptions drawer
- Exportable map/report with timestamp and scenario inputs

## 8. Motion and interaction principles
- Flow animation should explain direction and sequence, not simulate physically accurate fluid unless the model supports it.
- Camera transitions should preserve geographic orientation and offer reset/home.
- Layer transitions should be brief and include a visible legend update.
- When a route is selected, highlight the route and affected zones together so users can understand the relationship.

## 9. Accessibility and inclusive design
- Provide a 2D fallback and text/table representation for map content.
- Use line pattern, labels, and arrows in addition to color.
- Ensure all critical controls work by keyboard and touch.
- State the units, source, resolution, and timestamp of terrain/hydrology data.
- Display a persistent warning that the prototype is not for live emergency routing.

## 10. MVP scope
- One synthetic or openly licensed basin dataset with source attribution
- Elevation surface and a simple flow-direction visualization
- A deterministic route algorithm over a grid/graph
- Two or more scenarios and route comparison
- Mocked data fallback labelled as simulated
- A clear limitations panel and downloadable scenario summary

## 11. Success criteria
- Users can identify the input assumptions behind each route.
- The route comparison makes trade-offs more legible than a static map.
- A reviewer can tell the difference between calculated outputs and illustrative animation.
- The prototype never implies operational safety or replaces validated hydrological modelling.

## 12. Safety, trust, and product risks
- Flood routing is safety-critical; a visually persuasive 3D scene can create unjustified confidence.
- Real hydrological modelling needs validated data, boundary conditions, calibration, and expert review.
- A ‘low-consequence’ zone may contain people or assets; represent affected communities and uncertainty explicitly.
- Do not deploy the demo as a live dispatch tool.

## 13. Proposed technology direction
Next.js / React / Tailwind CSS; Spline or custom WebGL/Three.js terrain scene; FastAPI + Pydantic; Supabase with PostGIS if spatial queries are required; OpenCV/Gemini only for clearly scoped supporting tasks, not as a substitute for validated hydrology; Docker and CI.

> Technology names above are proposed directions inherited from or expanded from the supplied concept. Verify package versions and provider capabilities against current official documentation before implementation. Treat live integrations as optional until the core UX works with deterministic demo data.

## 14. Suggested repository structure
```text
app/ · components/terrain-scene/ · components/layer-control/ · components/route-inspector/ · lib/routing/ · lib/scenarios/ · data/demo-basin/ · docs/data-provenance.md · docs/model-limitations.md
```

## 15. Suggested screen inventory
1. **Overview / landing:** communicate the problem, current scenario, and primary action immediately.
2. **Primary workspace:** the main map, canvas, questionnaire, or intake experience.
3. **Detail / inspector:** explain a selected object, result, rule, or observation.
4. **History / comparison:** compare events, scenarios, or observations over time.
5. **Methodology / trust:** data sources, assumptions, limitations, privacy, and demo/live status.
6. **Responsive / empty / error states:** design these intentionally, not as afterthoughts.

## 16. States that must be designed
- Initial loading and first-use guidance
- Empty state with a useful next action
- Successful completion
- Partial data / stale data
- Validation error with recovery path
- External API unavailable
- Offline or slow connection where relevant
- Demo data versus live data
- Keyboard focus, disabled controls, and reduced motion

## 17. Two-minute demo script
1. State the real-world problem and introduce the primary workspace.
2. Perform one high-signal interaction (scrub the storm, submit a civic choice, compare a flood route, review a crop image, or scrub observations).
3. Open the inspector to show how the output was produced and what its limits are.
4. Trigger a deterministic demo scenario and show the resulting state/history.
5. Close with the trust boundary: what is live, what is simulated, and what the prototype does not claim to do.

## 18. Definition of design-ready
- [ ] One-sentence product promise and target user are clear.
- [ ] Low-fidelity flow covers the happy path and error/recovery paths.
- [ ] Desktop and mobile layouts are mapped.
- [ ] Color, typography, spacing, border, and motion tokens are documented.
- [ ] Every data visualization has a legend and clear semantics.
- [ ] Loading, empty, error, fallback, and demo states are specified.
- [ ] Accessibility review includes keyboard, contrast, reduced motion, and non-visual alternatives.
- [ ] The demo script can be completed without relying on a flaky live API.

## 19. Source concept and interpretation
The original uploaded portfolio describes **Sacrificial Pathways** as: Sacrificial Pathways is a geospatial decision-support prototype for exploring how floodwater might move through an urban basin and comparing candidate diversion routes toward designated lower-consequence catchment areas. Its signature experience is an interactive 3D terrain model where elevation, flow direction, candidate gates, vulnerable settlements, and predicted water paths are represented spatially. The interface is intended to help users understand a model's assumptions and compare scenarios—not autonomously direct real flood operations.
This brief preserves the concept while expanding the UI/UX direction. Specific layouts, components, interaction patterns, and safety guidance are design recommendations, not claims that the original file already implemented them.
