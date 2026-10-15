# Edge Systems — Design-First Suite Monorepo

A standardized monorepo of five civic, climate, and agricultural decision systems built with Vite, React 19, TypeScript, and HTML5 Canvas/SVG visualization engines. Each sub-project operates as an independently buildable Single-Page Application (SPA) while integrating into a unified ecosystem via a zero-dependency cross-app navigation bar (`EcosystemNav`) and multi-mode deployment gateways.

---

## Architecture & Port Matrix

All five applications are standardized with deterministic dev/preview ports (`strictPort: true`) and dynamic base paths (`env.VITE_BASE_PATH || '/<slug>/'`):

| Folder | Application | Experience Focus | Local Port | Default Base Path | Visual Accent |
|---|---|---|:---:|:---:|:---:|
| `.` (Root) | **Ecosystem Hub** | Gateway directory, architecture overview, and launchpad | `5173` | `/` | `#38BDF8` |
| `barter-bridge/` | **The Barter Bridge** | Civic trade-offs, AST rule evaluation, Borda ranking | `5173` | `/barter-bridge/` | `#B2FF05` |
| `diagnostic-liquidity/` | **Diagnostic Liquidity** | Mobile crop intake, Canvas 2D lesion HUD, subsidy triage | `5174` | `/diagnostic-liquidity/` | `#00E676` |
| `horizon-scrape/` | **Horizon-Scrape** | Dual-stage photo dehazing, smog map, 24h scrubber | `5175` | `/horizon-scrape/` | `#FFD600` |
| `parametric-pulse/` | **Parametric Pulse** | Cyclone trajectory spline, trigger inspector, payout state machine | `5176` | `/parametric-pulse/` | `#00E5FF` |
| `sacrificial-pathways/` | **Sacrificial Pathways** | 2.5D topographic elevation, weir bypass diversion, risk analysis | `5177` | `/sacrificial-pathways/` | `#FF3D00` |

---

## Shared Cross-Application Navigation (`EcosystemNav`)

Every application mounts `EcosystemNav` (`src/components/EcosystemNav.tsx`) at the top of its layout. The navigation bar operates with **zero runtime npm dependencies** using high-contrast dark glassmorphism styling (`backdrop-filter: blur(10px)`, `z-index: 9999`) and features a 3-tier environment-aware URL resolution engine:

1. **Explicit Subdomain Override (Strategy B)**: Inspects `import.meta.env.VITE_APP_<UPPER_SNAKE_NAME>_URL` for custom production subdomains.
2. **Local Multi-Server Dev Fallback (`import.meta.env.DEV`)**: Directs to `http://localhost:<assigned-port>/<project-slug>/` so developers can switch between simultaneously running local servers with a single click.
3. **Production Subpath Default (Strategy A & C)**: Routes to `/<project-slug>/` for single-domain subpath deployments.

---

## Tri-Mode Deployment Guide

The repository is architected to deploy seamlessly under three distinct operational strategies without modifying application source code:

### Strategy A: Subpath Reverse Proxy (Microservices)
Host each of the five applications as an independent Vercel project (e.g. `barter-bridge.vercel.app`, `diagnostic-liquidity.vercel.app`), then route them under a single root domain via root `vercel.json` rewrites:

```json
{
  "rewrites": [
    { "source": "/barter-bridge/:path*", "destination": "https://barter-bridge.vercel.app/barter-bridge/:path*" },
    { "source": "/diagnostic-liquidity/:path*", "destination": "https://diagnostic-liquidity.vercel.app/diagnostic-liquidity/:path*" },
    { "source": "/horizon-scrape/:path*", "destination": "https://horizon-scrape.vercel.app/horizon-scrape/:path*" },
    { "source": "/parametric-pulse/:path*", "destination": "https://parametric-pulse.vercel.app/parametric-pulse/:path*" },
    { "source": "/sacrificial-pathways/:path*", "destination": "https://sacrificial-pathways.vercel.app/sacrificial-pathways/:path*" }
  ]
}
```

### Strategy B: Custom Subdomains (Decoupled Multi-Domain)
Deploy each project to its own top-level subdomain or domain (e.g. `https://pulse.example.com/`):
1. Set `VITE_BASE_PATH=/` in the project's build environment.
2. Provide cross-app URL overrides in `.env` (refer to `.env.example`):
   ```bash
   VITE_APP_BARTER_BRIDGE_URL=https://barter.example.com/
   VITE_APP_PARAMETRIC_PULSE_URL=https://pulse.example.com/
   ```

### Strategy C: Unified Static Monorepo Build (Single Host / Cloudflare Pages / Netlify)
Assemble the entire suite into a single, merged static `dist/` directory:
```bash
npm run build:unified
```
This executes `scripts/build-unified.mjs`, which:
1. Runs `npm run build` in all 5 sub-projects.
2. Creates root `dist/` and copies `index.html` (the Landing Hub) to `dist/index.html`.
3. Copies each project's compiled bundle into `dist/<project-slug>/`.
4. Emits `dist/_redirects` and `dist/vercel.json` with subpath SPA fallback rules (`/<slug>/* /<slug>/index.html 200`) so direct deep-links resolve accurately.

---

## Local Development Workflow

### 1. Install Dependencies
```bash
npm run install:all
```

### 2. Run Applications Simultaneously
Each application runs on its assigned port without port collision:
```bash
# Terminal 1: Barter Bridge (Port 5173)
cd barter-bridge && npm run dev

# Terminal 2: Diagnostic Liquidity (Port 5174)
cd diagnostic-liquidity && npm run dev

# Terminal 3: Horizon-Scrape (Port 5175)
cd horizon-scrape && npm run dev

# Terminal 4: Parametric Pulse (Port 5176)
cd parametric-pulse && npm run dev

# Terminal 5: Sacrificial Pathways (Port 5177)
cd sacrificial-pathways && npm run dev
```

### 3. Build & Validate Monorepo
```bash
# Run type checks across all 5 applications
npm run lint:all

# Execute unified production build
npm run build:unified
```

---

## Repository Philosophy

- **Design before integrations.** Prototype the core journey with deterministic sample data first.
- **Make data semantics visible.** Label sources, units, timestamps, confidence, and demo/live status.
- **Treat 3D & Canvas as information architecture.** Spatial elements must explain system state, not merely decorate the page.
- **Build the failure states.** A polished fallback is part of the product, not a last-minute patch.
- **Make claims proportionate to evidence.** Surface uncertainty, methodology, and human review boundaries.
- **Zero External Dependencies for Gateway.** Infrastructure orchestration, routing fallbacks, and ecosystem navigation rely solely on standard Node.js, TypeScript, and modern browser APIs.
