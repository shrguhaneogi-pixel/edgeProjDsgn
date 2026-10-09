# Parametric Pulse
> **Smart-Contract Cyclone Liquidity**  
> When a measurable disaster threshold is crossed, make emergency capital move with clarity, speed, and an auditable trail.

![Status](https://img.shields.io/badge/status-design--brief-blueviolet) ![Focus](https://img.shields.io/badge/focus-UI%2FUX-ff69b4)

## 1. Product overview
Parametric Pulse is a climate-risk interface for visualizing a cyclone's projected path, translating verified environmental measurements into transparent trigger conditions, and demonstrating how a qualifying event could initiate a parametric payout workflow. Instead of making users inspect a dense insurance spreadsheet, the product makes the relationship between storm movement, exposure, trigger thresholds, and payout state visible in one coherent operational workspace.

## 2. Problem and opportunity
After a severe weather event, emergency funding and insurance workflows can be slow, fragmented, and difficult to understand. Parametric insurance can reduce the need for case-by-case loss assessment when a policy is tied to an agreed measurable trigger, but the trigger, data source, confidence, and payment status must be communicated clearly.

## 3. Target users
- Municipal emergency-response teams monitoring exposed infrastructure
- Climate-risk and parametric-insurance operators reviewing trigger conditions
- Cooperatives or public agencies exploring transparent emergency liquidity workflows
- Judges and technical reviewers who need to understand the whole mechanism in a short live demo

## 4. Experience narrative / key user journey
### 01 · Situation room
The user lands on a dark, high-contrast operations dashboard. A large storm visualization establishes the geographic situation; compact status tiles show the selected scenario, trigger status, last data update, and payout state.

### 02 · Inspect the storm
The user rotates or pans the coastal scene, scrubs a forecast timeline, and selects forecast checkpoints. A side panel explains wind/rainfall or exposure values and distinguishes observed data from forecast data and demo data.

### 03 · Understand exposure
The user selects a coastal asset or region. The map highlights affected zones, displays an exposure summary, and connects the selected asset to its policy's trigger conditions.

### 04 · Inspect the rule
A trigger inspector presents the rule in plain language and as a structured condition: metric, threshold, observation window, source, and verification status. A timeline shows how the incoming values compare with the threshold.

### 05 · Simulate the event
In demo mode, the user switches between a non-triggering scenario and a qualifying cyclone scenario. The UI animates the threshold crossing and explains why the state changed; it never presents mocked inputs as live weather.

### 06 · Follow the payout
A transaction/activity rail shows each step—data received, trigger evaluated, rule satisfied, payout instruction prepared, testnet transaction submitted, confirmation or failure. The UI distinguishes a simulation from a real on-chain transaction.

## 5. Art direction and visual identity
Climate operations room meets premium scientific visualization. Use near-black navy surfaces, restrained cyan accents, fine grid lines, topographic contours, crisp monospace telemetry, and one dominant coastal scene. The storm should be the focal point, not a background ornament: its path, intensity bands, projected landfall, and exposed assets must encode actual interface state. Avoid generic crypto gradients, excessive glow, and red/green-only status communication.

### Design tokens to establish
- **Accent:** `#00E5FF` (use as a focused signal, not a substitute for accessible status labels).
- **Typography:** expressive display face for headlines paired with a highly legible UI sans; use monospace only for IDs, timestamps, technical values, and system labels.
- **Surface system:** define background, raised surface, border, muted text, focus ring, success, warning, and error tokens before building screens.
- **Iconography:** one consistent line-icon family; icons supplement labels rather than replacing them.
- **Data visualization:** every chart or spatial layer must have a legend, units, source, timestamp, and a non-visual or tabular equivalent where feasible.

## 6. Layout and responsive behavior
Desktop: 12-column dashboard with a slim utility header; 7–8 columns for the interactive storm/coast canvas; 4–5 columns for trigger and exposure details; a persistent bottom timeline or right-side event rail. Put critical state above the fold. Mobile: replace the full canvas with a simplified map and scenario selector, stack trigger details, and keep the current status and primary action visible.

## 7. Signature UI components
- Storm trajectory canvas with observed/forecast legend and time scrubber
- Asset/exposure selector and highlighted risk zones
- Trigger rule inspector with plain-language explanation
- Threshold chart showing measured value, threshold, and time window
- Scenario switcher labelled LIVE DATA / DEMO SCENARIO
- Payout state machine / event timeline
- Transaction details drawer with network, signature, and explorer link when real
- Data freshness, source, and confidence badges
- Fallback banner when APIs are unavailable

## 8. Motion and interaction principles
- Forecast scrubbing moves the storm marker along its path and updates the selected checkpoint; it must remain user-controlled.
- Threshold crossing uses a clear line/area transition and a brief state change, not a full-screen celebratory animation.
- Payout steps reveal sequentially as an event timeline; reduced-motion users get instant state changes.
- Map camera movement should be short and purposeful, with a reset-view control.

## 9. Accessibility and inclusive design
- Provide a keyboard-operable alternative to every map-only interaction.
- Pair colors with labels/icons and do not use cyan alone to communicate a trigger.
- Offer a text summary of storm position, exposure, and current trigger state.
- Respect prefers-reduced-motion and preserve readable contrast over the map.

## 10. MVP scope
- One coastal demo region and two clearly labelled scenarios
- A storm-path visualization with timeline scrubbing
- One policy trigger rule and a deterministic threshold evaluator
- An event log that demonstrates the full state transition
- Optional Solana Devnet transaction for the payout demonstration; otherwise label the transaction as simulated
- Mock JSON fallback that is visually and semantically marked DEMO DATA

## 11. Success criteria
- A first-time viewer can explain the trigger and payout sequence in under two minutes.
- Users can distinguish observed, forecast, and mocked data at a glance.
- Every state change has a visible reason and traceable event.
- The interface remains useful if the external weather service is unavailable.

## 12. Safety, trust, and product risks
- A forecast is not proof that a policy trigger has been met; clearly separate prediction from verified observation.
- A blockchain transaction cannot independently validate real-world weather; data-source/oracle assumptions must be explained.
- Do not imply that demo payouts are real funds or that the interface provides authoritative emergency instructions.
- A mocked fallback must never silently masquerade as live data.

## 13. Proposed technology direction
Next.js / React / Tailwind CSS / shadcn-style components; Spline or a custom WebGL map scene; Framer Motion for state transitions; FastAPI + Pydantic for validation; Supabase/PostgreSQL for scenarios and event history; optional Anchor program on Solana Devnet; Docker and CI as the project matures.

> Technology names above are proposed directions inherited from or expanded from the supplied concept. Verify package versions and provider capabilities against current official documentation before implementation. Treat live integrations as optional until the core UX works with deterministic demo data.

## 14. Suggested repository structure
```text
app/ · components/storm-scene/ · components/trigger-inspector/ · components/payout-timeline/ · lib/scenarios/ · lib/trigger-engine/ · data/demo-cyclone.json · docs/data-contracts.md · docs/demo-script.md
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
The original uploaded portfolio describes **Parametric Pulse** as: Parametric Pulse is a climate-risk interface for visualizing a cyclone's projected path, translating verified environmental measurements into transparent trigger conditions, and demonstrating how a qualifying event could initiate a parametric payout workflow. Instead of making users inspect a dense insurance spreadsheet, the product makes the relationship between storm movement, exposure, trigger thresholds, and payout state visible in one coherent operational workspace.
This brief preserves the concept while expanding the UI/UX direction. Specific layouts, components, interaction patterns, and safety guidance are design recommendations, not claims that the original file already implemented them.
