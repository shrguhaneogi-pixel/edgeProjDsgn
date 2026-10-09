# Edge Systems — Design-First Project Collection

A curated collection of five civic/climate/agriculture software concepts expanded into UI/UX-first project briefs. Each project has its own folder and README, so it can later become an independent application or be developed as a monorepo.

## Projects

| Folder | Project | Experience focus |
|---|---|---|
| `parametric-pulse/` | Parametric Pulse | Storm trajectory, trigger inspector, payout timeline |
| `barter-bridge/` | The Barter Bridge | Guided civic trade-offs, explainable priority logic |
| `sacrificial-pathways/` | Sacrificial Pathways | 3D terrain, flood-route comparison, uncertainty |
| `diagnostic-liquidity/` | Diagnostic Liquidity | Mobile crop intake, explainable triage, case queue |
| `horizon-scrape/` | Horizon-Scrape | Photo comparison, observation map, time-series canvas |

## Repository philosophy

- **Design before integrations.** Prototype the core journey with deterministic sample data first.
- **Make data semantics visible.** Label sources, units, timestamps, confidence, and demo/live status.
- **Treat 3D as information architecture.** Spatial elements must explain system state, not merely decorate the page.
- **Build the failure states.** A polished fallback is part of the product, not a last-minute patch.
- **Make claims proportionate to evidence.** Climate, health/agriculture, and civic decision tools must surface uncertainty and human review.
- **Keep each project independently understandable.** Each folder contains a self-contained product and design brief.

## Suggested next steps

1. Create a GitHub repository and upload these folders.
2. For the project you choose first, make a `DESIGN.md` with wireframes and token definitions, then create a clickable prototype.
3. Implement a seeded/demo data mode before external APIs.
4. Build one polished primary journey end-to-end before expanding scope.
5. Add a README section with screenshots/GIFs once the actual interface exists.

## Official documentation consulted

- [Next.js App Router](https://nextjs.org/docs/app) — current app structure and routing concepts.
- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — page metadata and share previews.
- [Solana program quick start](https://solana.com/docs/intro/quick-start/build-first-program) — Anchor workflow and local testing/deployment basics.
- [Solana Program Derived Addresses](https://solana.com/docs/core/pda) — deterministic program-derived addresses.
- [Anchor documentation](https://www.anchor-lang.com/docs) — Solana program development concepts.

These references inform the implementation direction; the project briefs are product/design specifications, not implementation guarantees.
