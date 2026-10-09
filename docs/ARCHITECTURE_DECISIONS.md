# Architecture Decision Records (ADR) — Edge Systems Collection

## ADR-001: Phase 0 Repository Structure & Deterministic Local Architecture
- **Status:** Approved
- **Date:** 2026-10-10
- **Context:** The repository contains 5 distinct creative engineering product briefs. The projects must run deterministically, operate locally without paid external API keys, and maintain distinct visual identities and self-contained builds.
- **Decision:** 
  1. Maintain 5 standalone project directories: `parametric-pulse/`, `barter-bridge/`, `sacrificial-pathways/`, `diagnostic-liquidity/`, and `horizon-scrape/`.
  2. Implement each project using a deterministic local architecture with typed data contracts, seeded mock data, explainable rules engines, and graceful offline fallbacks.
  3. Keep zero secret credentials in version control; mark all simulated data explicitly with `DEMO SCENARIO` indicators in both the interface and code.
- **Consequences:** Ensures 100% testability and reliability in offline and demo environments without breaking external service dependencies.

## ADR-002: Workflow Progression & Strict Phase Gates
- **Status:** Approved
- **Date:** 2026-10-10
- **Context:** To avoid context drift and ensure complete stage verification, execution must follow a strict per-project phase loop (Phase 1 -> Phase 2 -> Phase 3 Stages A-G).
- **Decision:** Require explicit user authorization (`PROCEED` / Stage Approval) after completing each Phase and each Stage before advancing to subsequent stages.
- **Consequences:** Maximizes verification, commit discipline, and adherence to the AntiGravity Master Engineering Directive.
