# Horizon-Scrape
> **Ambient Optical Smog Canvas**  
> Make the air’s reduced visibility visible—while showing exactly what a photo can and cannot tell you.

![Status](https://img.shields.io/badge/status-design--brief-blueviolet) ![Focus](https://img.shields.io/badge/focus-UI%2FUX-ff69b4)

## 1. Product overview
Horizon-Scrape is a crowdsourced environmental observation concept in which people submit photos of a local horizon. An image-processing pipeline estimates haze-related optical attenuation and combines the observation with location, time, and contextual data to create a map of visual conditions. The product focuses on temporal comparison and neighborhood-level pattern discovery. It must carefully distinguish a photo-derived haze proxy from a calibrated PM2.5 measurement, because visibility can be affected by humidity, lighting, distance, camera processing, and other factors.

## 2. Problem and opportunity
Official air-quality monitors are not evenly distributed everywhere, and people may want a more local picture of changing visibility. Citizen photos can provide useful supplementary observations, but raw visual appearance is not a direct or universally reliable measurement of particulate concentration. The design must communicate this limitation as part of the core experience.

## 3. Target users
- Residents documenting local visibility conditions
- Community science groups exploring environmental patterns
- Researchers reviewing crowdsourced images and derived indicators
- Civic organizations comparing observations with official monitoring data

## 4. Experience narrative / key user journey
### 01 · Explore the canvas
The landing dashboard presents a city-scale map with observation points, a time range, and a clearly labelled ‘visibility proxy’ legend. Official sensor data, if present, is shown as a distinct layer.

### 02 · Submit a horizon photo
The user captures or uploads an image, sees composition guidance, and confirms approximate location and timestamp. The UI warns against photographing private spaces or including identifiable people.

### 03 · Inspect image quality
The system checks basic suitability such as exposure, blur, and presence of a horizon. If the photo is unsuitable, it explains why and invites a retake rather than manufacturing a score.

### 04 · View the estimate
A result screen shows the original photo, a processed comparison, the derived optical indicator, and factors that may affect interpretation. PM2.5 is shown only when supported by a separately calibrated model or external sensor, with its source clearly identified.

### 05 · Compare time and place
The user scrubs through days or weeks, compares selected neighborhoods, and sees observation count and data-quality context alongside any heat layer.

### 06 · Understand a pattern
A detail panel shows nearby observations, weather/context where available, methodology, and a ‘what this does not prove’ note. Users can report a bad observation or inspect the source record.

## 5. Art direction and visual identity
An editorial environmental observatory: warm yellow as a high-visibility accent, dark ink or slate surfaces, horizon photography as the emotional anchor, and restrained chart/map overlays. Use a large image comparison stage—original versus processed—alongside a clean time-series view. Avoid making a dramatic heat map look more scientifically certain than the underlying observations support.

### Design tokens to establish
- **Accent:** `#FFD600` (use as a focused signal, not a substitute for accessible status labels).
- **Typography:** expressive display face for headlines paired with a highly legible UI sans; use monospace only for IDs, timestamps, technical values, and system labels.
- **Surface system:** define background, raised surface, border, muted text, focus ring, success, warning, and error tokens before building screens.
- **Iconography:** one consistent line-icon family; icons supplement labels rather than replacing them.
- **Data visualization:** every chart or spatial layer must have a legend, units, source, timestamp, and a non-visual or tabular equivalent where feasible.

## 6. Layout and responsive behavior
Desktop: map/canvas on roughly two-thirds of the page, observation detail rail on the right, and a bottom time scrubber with date and count. The submission flow is a focused modal or dedicated route. Mobile: map and list toggle, large upload CTA, stacked observation cards, and a compact timeline with accessible date controls.

## 7. Signature UI components
- City observation map with clustering and time filters
- Map/list toggle for non-map users
- Photo capture/upload with composition guidance
- Image-quality check and retake state
- Original/processed image comparison slider with keyboard alternative
- Optical attenuation/visibility indicator and method notes
- Time-series chart and observation-count display
- Separate layer for official sensor data, if integrated
- Observation detail sheet with timestamp and approximate location
- Data-quality and uncertainty legend

## 8. Motion and interaction principles
- The comparison slider should be user-controlled and keyboard-accessible.
- Time scrubbing updates the map and chart together and clearly displays the selected date range.
- Map clustering transitions should be subtle and never hide the observation count.
- Use slow, restrained transitions; the environmental imagery should remain the focus.

## 9. Accessibility and inclusive design
- Never communicate air quality through color alone; include labels, values, and patterns.
- Offer a list/table alternative to the map and a text summary for charts.
- Avoid automatically animating the map or photo comparison.
- Explain uncertainty in plain language near the metric, not only in documentation.
- Provide image privacy guidance and a way to remove a submitted observation where applicable.

## 10. MVP scope
- Photo upload and metadata form
- A documented dark-channel-prior or other baseline dehazing/visibility proxy pipeline
- A result page comparing original and processed images
- Seeded geo-observations on a map with time filtering
- An honest fallback dataset labelled DEMO OBSERVATIONS
- A methodology panel explicitly stating that visual proxy values are not equivalent to calibrated PM2.5 readings

## 11. Success criteria
- Users understand the distinction between a visual haze proxy and measured pollutant concentration.
- The map communicates observation density and uncertainty, not just a colorful surface.
- A user can compare observations over time and inspect the original image.
- The app remains useful when image processing or map services are unavailable.

## 12. Safety, trust, and product risks
- A dehazing coefficient is not automatically a valid PM2.5 estimate; calibration and validation against reference instruments are necessary.
- Camera models, exposure, humidity, sun angle, and distance can confound comparisons.
- Geolocation can expose a person's routine; use approximate public display locations and consent.
- Do not present crowdsourced estimates as official public-health guidance.

## 13. Proposed technology direction
Next.js / React / Tailwind CSS / Canvas API / Framer Motion; FastAPI + Pydantic; OpenCV for image processing; Gemini only for scoped metadata/description assistance, not as an unvalidated pollution sensor; Supabase for observations and storage; optional map library chosen after confirming licensing and mobile performance.

> Technology names above are proposed directions inherited from or expanded from the supplied concept. Verify package versions and provider capabilities against current official documentation before implementation. Treat live integrations as optional until the core UX works with deterministic demo data.

## 14. Suggested repository structure
```text
app/ · components/observation-map/ · components/photo-compare/ · components/visibility-chart/ · lib/image-processing/ · lib/observations/ · data/demo-observations.json · docs/methodology.md · docs/privacy-and-location.md
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
The original uploaded portfolio describes **Horizon-Scrape** as: Horizon-Scrape is a crowdsourced environmental observation concept in which people submit photos of a local horizon. An image-processing pipeline estimates haze-related optical attenuation and combines the observation with location, time, and contextual data to create a map of visual conditions. The product focuses on temporal comparison and neighborhood-level pattern discovery. It must carefully distinguish a photo-derived haze proxy from a calibrated PM2.5 measurement, because visibility can be affected by humidity, lighting, distance, camera processing, and other factors.
This brief preserves the concept while expanding the UI/UX direction. Specific layouts, components, interaction patterns, and safety guidance are design recommendations, not claims that the original file already implemented them.
