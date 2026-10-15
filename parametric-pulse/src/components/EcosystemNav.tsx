import React, { useState } from 'react';

export interface EcosystemNavProps {
  currentApp?: 'hub' | 'barter-bridge' | 'diagnostic-liquidity' | 'horizon-scrape' | 'parametric-pulse' | 'sacrificial-pathways';
}

interface AppItem {
  id: 'hub' | 'barter-bridge' | 'diagnostic-liquidity' | 'horizon-scrape' | 'parametric-pulse' | 'sacrificial-pathways';
  name: string;
  slug: string;
  port: number;
  envKey: string;
  description: string;
}

const APPS: AppItem[] = [
  {
    id: 'hub',
    name: 'Hub',
    slug: '',
    port: 5173,
    envKey: 'VITE_APP_HUB_URL',
    description: 'Landing Hub Gateway'
  },
  {
    id: 'barter-bridge',
    name: 'Barter Bridge',
    slug: 'barter-bridge',
    port: 5173,
    envKey: 'VITE_APP_BARTER_BRIDGE_URL',
    description: 'Civic Preference AST Engine'
  },
  {
    id: 'diagnostic-liquidity',
    name: 'Diagnostic Liquidity',
    slug: 'diagnostic-liquidity',
    port: 5174,
    envKey: 'VITE_APP_DIAGNOSTIC_LIQUIDITY_URL',
    description: 'Algorithmic Crop Subsidy Triage'
  },
  {
    id: 'horizon-scrape',
    name: 'Horizon Scrape',
    slug: 'horizon-scrape',
    port: 5175,
    envKey: 'VITE_APP_HORIZON_SCRAPE_URL',
    description: 'Ambient Optical Smog Canvas'
  },
  {
    id: 'parametric-pulse',
    name: 'Parametric Pulse',
    slug: 'parametric-pulse',
    port: 5176,
    envKey: 'VITE_APP_PARAMETRIC_PULSE_URL',
    description: 'Smart-Contract Cyclone Liquidity'
  },
  {
    id: 'sacrificial-pathways',
    name: 'Sacrificial Pathways',
    slug: 'sacrificial-pathways',
    port: 5177,
    envKey: 'VITE_APP_SACRIFICIAL_PATHWAYS_URL',
    description: 'Topographic Floodwater Routing'
  }
];

export const EcosystemNav: React.FC<EcosystemNavProps> = ({ currentApp }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-detect active app if not explicitly passed
  const activeAppId = currentApp || (() => {
    if (typeof window === 'undefined') return 'hub';
    const path = window.location.pathname.toLowerCase();
    const host = window.location.hostname.toLowerCase();
    for (const app of APPS) {
      if (app.slug && (path.includes(app.slug) || host.includes(app.slug))) {
        return app.id;
      }
    }
    const port = parseInt(window.location.port, 10);
    const matchedByPort = APPS.find(a => a.id !== 'hub' && a.port === port);
    if (matchedByPort) return matchedByPort.id;
    return 'hub';
  })();

  const resolveAppUrl = (app: AppItem): string => {
    // 1. Explicit Subdomain/Custom URL Override (Strategy B)
    const envUrl = (import.meta.env as Record<string, string | undefined>)[app.envKey];
    if (envUrl && envUrl.trim() !== '') {
      return envUrl;
    }

    // 2. Hub special-case resolution
    if (app.id === 'hub') {
      if (import.meta.env.DEV) {
        return 'http://localhost:5173/';
      }
      return '/';
    }

    // 3. Local Multi-Server Dev Fallback (Strategy Local Dev)
    if (import.meta.env.DEV) {
      return `http://localhost:${app.port}/${app.slug}/`;
    }

    // 4. Production Subpath Default (Strategy A & C)
    return `/${app.slug}/`;
  };

  return (
    <nav
      aria-label="Edge Systems Suite Cross-Application Navigation"
      style={{
        width: '100%',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(10, 15, 29, 0.92)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        color: '#E2E8F0',
        fontSize: '12px',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'relative',
        zIndex: 9999,
        transition: 'all 0.2s ease-in-out'
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '6px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap'
        }}
      >
        {/* Left: Suite Brand Badge & Collapse Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <a
            href={resolveAppUrl(APPS[0])}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              color: '#F8FAFC',
              fontWeight: 700,
              fontSize: '12px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase'
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#38BDF8',
                boxShadow: '0 0 8px #38BDF8'
              }}
            />
            <span>EDGE SUITE</span>
          </a>

          <span style={{ color: 'rgba(255, 255, 255, 0.2)', fontSize: '12px' }}>/</span>

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-expanded={!isCollapsed}
            aria-label="Toggle ecosystem apps menu"
            style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '4px',
              color: '#94A3B8',
              padding: '2px 6px',
              fontSize: '10px',
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            {isCollapsed ? 'Show Suite ▾' : 'Hide ▴'}
          </button>
        </div>

        {/* Center / Right: App Navigation Pills */}
        {!isCollapsed && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              overflowX: 'auto',
              WebkitOverflowScrolling: 'touch',
              padding: '2px 0'
            }}
          >
            {APPS.map((app) => {
              const isActive = activeAppId === app.id;
              const targetUrl = resolveAppUrl(app);

              return (
                <a
                  key={app.id}
                  href={targetUrl}
                  aria-current={isActive ? 'page' : undefined}
                  title={`${app.name} — ${app.description}${import.meta.env.DEV ? ` (Port ${app.port})` : ''}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '11px',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? '#FFFFFF' : '#94A3B8',
                    backgroundColor: isActive ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                    border: isActive
                      ? '1px solid rgba(56, 189, 248, 0.5)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    transition: 'all 0.15s ease',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {isActive && (
                    <span
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#38BDF8'
                      }}
                    />
                  )}
                  <span>{app.name}</span>
                  {import.meta.env.DEV && app.id !== 'hub' && (
                    <span
                      style={{
                        fontSize: '9px',
                        color: isActive ? '#38BDF8' : '#64748B',
                        fontFamily: 'monospace'
                      }}
                    >
                      :{app.port}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};
