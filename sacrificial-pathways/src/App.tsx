import { useEffect, useReducer, useState } from 'react';
import { AccessibleElevationTable } from './components/AccessibleElevationTable';
import { ConsequenceAnalyzer } from './components/ConsequenceAnalyzer';
import { FlowTelemetryCard } from './components/FlowTelemetryCard';
import { RouteSelector } from './components/RouteSelector';
import { TerrainCanvas2D } from './components/TerrainCanvas2D';
import { appReducer, createInitialState } from './state/appReducer';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, undefined, () => createInitialState());
  const [isLoading, setIsLoading] = useState(true);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [hasError, setHasError] = useState(false);

  const { selectedSectorId, sectorRisks, telemetry, gateStatus, dischargeM3PerSec } = state;
  const selectedSector = sectorRisks.find(r => r.sectorId === selectedSectorId);

  // Simulate initial heightmap raster loading & network offline listener
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (hasError) {
    return (
      <div style={{ padding: '3rem', textAlign: 'center', background: '#0D1117', color: '#FF2A6D', minHeight: '100vh', fontFamily: 'system-ui' }}>
        <h2>Simulation Runtime Exception</h2>
        <p style={{ color: '#8B949E' }}>An unexpected state evaluation error occurred in the hydraulic engine.</p>
        <button
          onClick={() => { setHasError(false); dispatch({ type: 'RESET_SIMULATION' }); }}
          style={{ padding: '0.6rem 1.2rem', background: '#FF3D00', color: '#FFF', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
        >
          Reset Simulation State
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0D1117', color: '#F0F6FC', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '1.5rem' }}>
      {/* Offline Banner */}
      {isOffline && (
        <div style={{ background: '#FFAB00', color: '#0D1117', padding: '0.4rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>
          Network Connection Offline — Running on Local Deterministic GIS Data & Hydraulic Engine
        </div>
      )}

      {/* Top Header */}
      <header style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363D', paddingBottom: '1rem' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#FF3D00', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Sacrificial Pathways</span>
            <span style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem', background: 'rgba(255, 61, 0, 0.15)', border: '1px solid #FF3D00', borderRadius: '12px', color: '#FF3D00' }}>
              Topographic Flood Routing
            </span>
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#8B949E' }}>
            Cinematic hydraulic flood diversion command center & risk consequence simulator.
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <button
            onClick={() => dispatch({ type: 'TOGGLE_ACCESSIBILITY_VIEW' })}
            style={{
              padding: '0.5rem 0.85rem',
              background: state.isAccessibilityView ? '#FF3D00' : '#161B22',
              border: '1px solid #30363D',
              color: state.isAccessibilityView ? '#FFFFFF' : '#8B949E',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            {state.isAccessibilityView ? 'Switch to Canvas View' : 'Accessible Table Fallback'}
          </button>
        </div>
      </header>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div style={{ padding: '4rem 2rem', textAlign: 'center', background: '#161B22', borderRadius: '8px', border: '1px solid #30363D' }}>
          <div style={{ fontSize: '1rem', color: '#00A3FF', fontWeight: 600, marginBottom: '0.5rem' }}>
            Initializing Catchment Topographic Heightmap Raster...
          </div>
          <div style={{ fontSize: '0.8rem', color: '#8B949E' }}>
            Evaluating hydraulic velocity vectors & sectoral inundation thresholds.
          </div>
        </div>
      ) : (
        /* Main Grid Workspace */
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem' }}>
          {/* Left Workspace */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {state.isAccessibilityView ? (
              <AccessibleElevationTable
                sectorRisks={sectorRisks}
                gateStatus={gateStatus}
                dischargeM3PerSec={dischargeM3PerSec}
              />
            ) : (
              <TerrainCanvas2D state={state} dispatch={dispatch} />
            )}

            {/* Flow Telemetry Math Card */}
            <FlowTelemetryCard telemetry={telemetry} gateStatus={gateStatus} />

            {/* Consequence Analyzer Breakdown Card */}
            <ConsequenceAnalyzer
              sectorRisks={sectorRisks}
              gateStatus={gateStatus}
              selectedSectorId={selectedSectorId}
              onSelectSector={id => dispatch({ type: 'SELECT_SECTOR', payload: id })}
            />
          </div>

          {/* Right Sidebar: Controls & Sector Inspector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <RouteSelector state={state} dispatch={dispatch} />

            {/* Sector Inspector Card */}
            {selectedSector && (
              <div style={{ background: '#161B22', borderRadius: '8px', border: '1px solid #30363D', padding: '1rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#8B949E', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Selected Sector Inspector
                </div>
                <h4 style={{ margin: '0.35rem 0', color: '#F0F6FC', fontSize: '1rem' }}>
                  {selectedSector.sectorName}
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0.5rem 0', fontSize: '0.85rem' }}>
                  <span style={{ color: '#8B949E' }}>Inundation Depth:</span>
                  <strong style={{ color: selectedSector.riskStatus === 'CRITICAL' ? '#FF2A6D' : selectedSector.riskStatus === 'WARNING' ? '#FFAB00' : '#00E676' }}>
                    {selectedSector.inundationDepthMeters} m ({selectedSector.riskScorePercent}%)
                  </strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                  <span style={{ color: '#8B949E' }}>Exposed Asset Valuation:</span>
                  <strong style={{ color: '#F0F6FC', fontFamily: 'monospace' }}>
                    ${(selectedSector.exposedAssetValueUsd / 1_000_000).toFixed(1)}M USD
                  </strong>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
