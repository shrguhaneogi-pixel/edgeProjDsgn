# Diagnostic Liquidity
> **Algorithmic Crop Subsidy**  
> Turn a crop-damage photo into an explainable next step—not an opaque diagnosis or an automatic denial.

![Status](https://img.shields.io/badge/status-design--brief-blueviolet) ![Focus](https://img.shields.io/badge/focus-UI%2FUX-ff69b4)

## 1. Product overview
Diagnostic Liquidity is a crop-damage intake and triage experience for smallholders and cooperative managers. A farmer submits a leaf or crop photo with optional crop, location, and symptom details. A multimodal model proposes a likely issue with confidence and caveats; a structured review workflow turns the result into a mock damage attestation and a pre-qualification record for an insurance or seed-support process. The interface makes the evidence, uncertainty, and claim status understandable to users with different levels of technical literacy.

## 2. Problem and opportunity
Farmers may have limited access to timely crop diagnostics and may struggle to document damage for support or insurance. A photo-based classifier can speed up triage, but image quality, regional disease variation, and lookalike symptoms mean that a model output should not be presented as a definitive diagnosis or as automatic proof of financial eligibility.

## 3. Target users
- Smallholder farmers submitting crop concerns
- Cooperative field officers reviewing multiple submissions
- Agricultural advisors validating suggested diagnoses
- Micro-insurance or seed-support administrators tracking case status

## 4. Experience narrative / key user journey
### 01 · Start a crop report
A mobile-first screen asks the farmer to photograph a leaf or plant and shows examples of useful versus poor images. The form uses short labels, large controls, and optional voice-friendly descriptions.

### 02 · Add context
The farmer selects crop type, approximate location, planting stage, and visible symptoms. Explain why each field helps and mark optional fields clearly.

### 03 · Review the image
A preview lets the user retake, crop, or remove the image before submission. Upload progress, offline/retry errors, and file constraints are explicit.

### 04 · See the AI assessment
The result screen shows the suggested issue, confidence band, visual evidence or symptom matches where available, and alternative possibilities. It includes a plain-language warning that the result is a preliminary assessment.

### 05 · Create a case
The user confirms the information and receives a case ID. The status is ‘submitted’, ‘needs review’, or ‘reviewed’—not ‘approved for payout’ unless a separate authorized process has made that decision.

### 06 · Cooperative overview
Managers see incoming cases, location clusters, crop/disease filters, image thumbnails, and review status. Opening a case shows evidence, model version, timestamps, and a human review checklist.

### 07 · Demonstrate the support workflow
A mock attestation token or claim record is created in demo mode. The UI explicitly distinguishes a database case record, a simulated token, and any real on-chain transaction.

## 5. Art direction and visual identity
A humane field-work tool rather than a fintech terminal. Use warm paper/soil neutrals, botanical green as a supportive accent, high-quality crop imagery, clear cards, and strong typography. Keep the farmer experience calm and linear; the cooperative dashboard can be denser. Magenta may be retained as the source concept's brand accent, but use it sparingly for key actions or selected states rather than every panel.

### Design tokens to establish
- **Accent:** `#FF00FF` (use as a focused signal, not a substitute for accessible status labels).
- **Typography:** expressive display face for headlines paired with a highly legible UI sans; use monospace only for IDs, timestamps, technical values, and system labels.
- **Surface system:** define background, raised surface, border, muted text, focus ring, success, warning, and error tokens before building screens.
- **Iconography:** one consistent line-icon family; icons supplement labels rather than replacing them.
- **Data visualization:** every chart or spatial layer must have a legend, units, source, timestamp, and a non-visual or tabular equivalent where feasible.

## 6. Layout and responsive behavior
Farmer mobile flow: single-column, one task per step, image preview near the top, sticky primary action, and clear recovery controls. Manager desktop: queue/table on the left, map or case distribution summary above, selected-case detail drawer on the right. Provide list view even when a map is available.

## 7. Signature UI components
- Camera/upload dropzone with example image guidance
- Crop/context form with optional fields
- Image preview, retake, and crop affordances
- Assessment result card with confidence and caveats
- Alternative diagnosis / ‘not enough evidence’ state
- Case ID and status timeline
- Cooperative case queue with filters and search
- Map-based aggregation only when location precision is appropriate
- Human review checklist and decision notes
- Mock attestation/claim record with explicit demo label

## 8. Motion and interaction principles
- Upload progress should be accurate and never imply the model is still running when it has failed.
- Reveal the assessment in a calm staged sequence: status, suggested issue, confidence, next step.
- Use subtle clustering transitions on the manager dashboard, but keep data labels stable.
- Respect reduced-motion preferences and avoid alarming animations for disease results.

## 9. Accessibility and inclusive design
- Use plain language, icon-plus-text labels, and large touch targets.
- Do not rely on image-only instructions; provide text guidance.
- Support low-bandwidth states, retries, and clear upload errors.
- Do not show precise farmer locations to all dashboard users by default.
- Make the uncertainty and human-review path at least as prominent as the suggested diagnosis.

## 10. MVP scope
- Photo upload with a sample-image path for demo reliability
- One multimodal classification call or a clearly labelled deterministic mock
- Result page with confidence/caveat and next steps
- Case ID and case-status workflow
- Manager dashboard with seeded cases and filters
- Mock claim/attestation object; no real financial decisioning

## 11. Success criteria
- A farmer understands the result and the next action without needing to interpret ML jargon.
- A manager can find and review a case quickly.
- Low-confidence or ambiguous results route to human review rather than false certainty.
- The demo works without an external model API and labels fallback results honestly.

## 12. Safety, trust, and product risks
- Image-based diagnosis can be wrong; do not prescribe treatment or determine eligibility solely from a model output.
- Confidence scores may be poorly calibrated; explain them as model estimates, not probability of truth unless validated.
- GPS and farm data are sensitive; minimize collection and restrict access.
- Keep mock claim IDs and tokens clearly distinct from real insurance approvals or blockchain assets.

## 13. Proposed technology direction
Next.js / React / Tailwind CSS / accessible component primitives; FastAPI + Pydantic for validated image metadata and case contracts; Gemini Flash multimodal as an optional diagnostic provider; Supabase for cases and storage; Docker/CI. Keep model-provider code behind a replaceable interface and ship a seeded demo mode.

> Technology names above are proposed directions inherited from or expanded from the supplied concept. Verify package versions and provider capabilities against current official documentation before implementation. Treat live integrations as optional until the core UX works with deterministic demo data.

## 14. Suggested repository structure
```text
app/farmer/ · app/cooperative/ · components/image-intake/ · components/assessment-card/ · components/case-queue/ · lib/diagnosis-provider/ · lib/cases/ · data/demo-cases.json · docs/privacy.md · docs/model-evaluation.md
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
The original uploaded portfolio describes **Diagnostic Liquidity** as: Diagnostic Liquidity is a crop-damage intake and triage experience for smallholders and cooperative managers. A farmer submits a leaf or crop photo with optional crop, location, and symptom details. A multimodal model proposes a likely issue with confidence and caveats; a structured review workflow turns the result into a mock damage attestation and a pre-qualification record for an insurance or seed-support process. The interface makes the evidence, uncertainty, and claim status understandable to users with different levels of technical literacy.
This brief preserves the concept while expanding the UI/UX direction. Specific layouts, components, interaction patterns, and safety guidance are design recommendations, not claims that the original file already implemented them.
