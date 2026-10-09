# The Barter Bridge
> **Civic Preference AST Engine**  
> Turn conflicting community priorities into a decision process people can inspect, challenge, and understand.

![Status](https://img.shields.io/badge/status-design--brief-blueviolet) ![Focus](https://img.shields.io/badge/focus-UI%2FUX-ff69b4)

## 1. Product overview
The Barter Bridge is a civic participation experience that helps residents express trade-offs when a district cannot fund every desirable improvement. Rather than asking for a vague upvote, it guides people through structured forced choices—such as drainage versus road repair—and converts responses into a visible priority model. An abstract syntax tree (AST) represents the evaluation logic, allowing administrators and residents to inspect how individual choices influence an aggregate district recommendation.

## 2. Problem and opportunity
Public consultations often collect preferences without making trade-offs explicit. A simple poll can hide how priorities conflict, how responses are weighted, or how the final recommendation was produced. The product should make the decision method legible and provide a way to inspect assumptions rather than presenting a ranking as unquestionable truth.

## 3. Target users
- Residents participating in local planning
- Ward or district administrators facilitating consultation
- Civic researchers reviewing participation and methodology
- Moderators who need to explain how a recommendation was generated

## 4. Experience narrative / key user journey
### 01 · Set the context
A concise district briefing explains the available budget, candidate projects, and constraints in plain language. Every project has a short description, estimated cost range, and impact category.

### 02 · Make a trade-off
A guided choice interface presents two options at a time. The user sees the consequence of each option and can move backward to review prior choices. Avoid manipulative wording and make the ‘why this choice?’ prompt optional.

### 03 · Review my priorities
A personal summary visualizes the participant's choices as a ranked set of priorities, with an explanation of the trade-offs that shaped the result.

### 04 · Aggregate the district
An aggregate dashboard shows response volume, participation over time, project rankings, uncertainty, and differences between segments where ethically and statistically appropriate.

### 05 · Inspect the logic
An interactive AST/decision-tree view lets an administrator select a rule node and see its input, operation, output, and downstream effect. A plain-language explanation accompanies the technical diagram.

### 06 · Test a policy change
A sandbox allows an administrator to alter a weighting rule and compare the resulting ranking with the baseline. The UI labels this as a hypothetical simulation and records the rule version used.

## 5. Art direction and visual identity
Civic clarity with a playful but disciplined neo-brutalist edge. Use warm off-white or charcoal backgrounds, bold typography, lime as a focused accent, thick borders for interactive choices, and clear editorial spacing. The visual language should feel public-facing and trustworthy—not like a trading terminal or a gamified popularity contest. Use color to differentiate project categories, not to imply moral superiority.

### Design tokens to establish
- **Accent:** `#B2FF05` (use as a focused signal, not a substitute for accessible status labels).
- **Typography:** expressive display face for headlines paired with a highly legible UI sans; use monospace only for IDs, timestamps, technical values, and system labels.
- **Surface system:** define background, raised surface, border, muted text, focus ring, success, warning, and error tokens before building screens.
- **Iconography:** one consistent line-icon family; icons supplement labels rather than replacing them.
- **Data visualization:** every chart or spatial layer must have a legend, units, source, timestamp, and a non-visual or tabular equivalent where feasible.

## 6. Layout and responsive behavior
Resident flow: one decision per screen, large tap targets, progress indicator, concise context, and a persistent ‘review choices’ affordance. Admin flow: three-zone workspace with aggregate priority chart, AST canvas, and selected-node inspector. Keep the technical AST behind an understandable explanation, with a ‘show evaluation details’ layer for advanced users.

## 7. Signature UI components
- District/context header with budget and consultation period
- Two-option forced-choice cards with balanced descriptions
- Progress, back, skip/decline, and review controls
- Personal priority summary
- District ranking chart with response counts and uncertainty cues
- AST canvas with zoom, pan, node selection, and keyboard alternative
- Selected-node inspector showing input → operation → output
- Baseline-versus-simulation comparison
- Methodology and data-quality panel
- Exportable, anonymized summary

## 8. Motion and interaction principles
- Choice cards should respond to selection with a concise border/position change and a clear selected state.
- The AST should highlight the evaluated path rather than animate every node constantly.
- Ranking changes should interpolate briefly while retaining labels and previous values for comparison.
- Never use motion to pressure users into finishing or to imply that one answer is preferred.

## 9. Accessibility and inclusive design
- Offer a non-visual, linear explanation of the AST.
- Support keyboard-only choices and visible focus indicators.
- Use plain language and define civic/technical terms inline.
- Do not make a choice depend on color, drag-and-drop, or hover alone.
- Provide translations and mobile-first layout as a design requirement, even if the MVP ships one language.

## 10. MVP scope
- A curated set of district projects and a forced-choice questionnaire
- A deterministic local AST evaluator with transparent rules
- A mock or persisted response dataset and aggregate ranking
- Interactive AST diagram with node inspector
- A baseline-versus-weight-change simulator
- Editable SVG/diagram fallback if the live canvas fails

## 11. Success criteria
- A resident understands what each choice means before submitting.
- An administrator can trace a final ranking back to its rule and inputs.
- The interface distinguishes public preferences from an official policy decision.
- A changed weighting rule is visibly marked as a simulation, not silently applied.

## 12. Safety, trust, and product risks
- An AST can make a process inspectable but does not automatically make it fair or manipulation-proof.
- Avoid collecting unnecessary personal data; show aggregation thresholds for small groups.
- Document weighting, tie-breaking, missing responses, and uncertainty.
- Do not frame the output as a binding democratic mandate unless the governance process truly makes it one.

## 13. Proposed technology direction
Next.js / React / Tailwind CSS / Framer Motion; a canvas/SVG graph layer for AST interaction; FastAPI + Pydantic for typed evaluation endpoints; Supabase for versioned scenarios and responses; custom AST traversal and optional LLM-assisted clustering with human review.

> Technology names above are proposed directions inherited from or expanded from the supplied concept. Verify package versions and provider capabilities against current official documentation before implementation. Treat live integrations as optional until the core UX works with deterministic demo data.

## 14. Suggested repository structure
```text
app/resident/ · app/admin/ · components/choice-flow/ · components/priority-chart/ · components/ast-canvas/ · lib/ast/ · lib/scoring/ · data/demo-district.json · docs/methodology.md
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
The original uploaded portfolio describes **The Barter Bridge** as: The Barter Bridge is a civic participation experience that helps residents express trade-offs when a district cannot fund every desirable improvement. Rather than asking for a vague upvote, it guides people through structured forced choices—such as drainage versus road repair—and converts responses into a visible priority model. An abstract syntax tree (AST) represents the evaluation logic, allowing administrators and residents to inspect how individual choices influence an aggregate district recommendation.
This brief preserves the concept while expanding the UI/UX direction. Specific layouts, components, interaction patterns, and safety guidance are design recommendations, not claims that the original file already implemented them.
