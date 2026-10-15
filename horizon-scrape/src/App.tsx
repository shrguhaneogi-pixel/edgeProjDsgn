import { useReducer, useEffect } from 'react';
import { initialAppState, appReducer } from './state/appReducer';
import { EcosystemNav } from './components/EcosystemNav';
import { ComparisonSlider } from './components/ComparisonSlider';
import { ObservationMap } from './components/ObservationMap';
import { MethodologyPanel } from './components/MethodologyPanel';
import { PhotoUploadModal } from './components/PhotoUploadModal';
import { AccessibleObservationList } from './components/AccessibleObservationList';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const activeObs =
    state.observations.find((o) => o.id === state.activeObservationId) || state.observations[0];

  // Auto-play interval for 24-hour time scrubber
  useEffect(() => {
    let interval: number;
    if (state.isPlayingTime) {
      interval = window.setInterval(() => {
        dispatch({
          type: 'SET_CURRENT_HOUR',
          payload: (state.currentHour + 1) % 24,
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [state.isPlayingTime, state.currentHour]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === '1' && state.observations[0]) {
        dispatch({ type: 'SELECT_OBSERVATION', payload: state.observations[0].id });
      } else if (e.key === '2' && state.observations[1]) {
        dispatch({ type: 'SELECT_OBSERVATION', payload: state.observations[1].id });
      } else if (e.key === '3' && state.observations[2]) {
        dispatch({ type: 'SELECT_OBSERVATION', payload: state.observations[2].id });
      } else if (e.key === 'm' || e.key === 'M') {
        dispatch({
          type: 'SET_VIEW_MODE',
          payload: state.viewMode === 'MAP_VIEW' ? 'LIST_VIEW' : 'MAP_VIEW',
        });
      } else if (e.key === 'u' || e.key === 'U') {
        dispatch({ type: 'TOGGLE_UPLOAD_MODAL' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.observations, state.viewMode]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0F172A',
        color: '#F8FAFC',
        fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Ecosystem Cross-App Navigation */}
      <EcosystemNav currentApp="horizon-scrape" />

      {/* Fallback Dataset Notice Banner */}
      <div
        style={{
          backgroundColor: 'rgba(255, 214, 0, 0.12)',
          borderBottom: '1px solid rgba(255, 214, 0, 0.25)',
          padding: '6px 16px',
          fontSize: '11px',
          color: '#FFD600',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              padding: '1px 6px',
              backgroundColor: '#FFD600',
              color: '#0F172A',
              fontWeight: 800,
              borderRadius: '3px',
              fontSize: '10px',
            }}
          >
            DEMO OBSERVATIONS
          </span>
          <span>
            Deterministic Atmospheric Haze Observatory dataset active. Values illustrate optical attenuation modeling, not official PM2.5 advisories.
          </span>
        </div>
        <span style={{ fontSize: '10px', color: '#94A3B8' }}>
          Keyboard: [1-3] Select Obs • [M] Map/Table • [U] Upload
        </span>
      </div>

      {/* App Header */}
      <header
        style={{
          borderBottom: '1px solid #1E293B',
          backgroundColor: '#0B1120',
          padding: '14px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#FFD600',
                  borderRadius: '2px',
                  boxShadow: '0 0 10px rgba(255, 214, 0, 0.7)',
                }}
              />
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#F8FAFC', letterSpacing: '-0.02em' }}>
                Horizon-Scrape
              </h1>
              <span
                style={{
                  fontSize: '11px',
                  color: '#94A3B8',
                  background: '#1E293B',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  border: '1px solid #334155',
                }}
              >
                Ambient Optical Smog Canvas
              </span>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94A3B8' }}>
              Crowdsourced horizon photography with Dark-Channel Dehazing & explainable visibility proxies.
            </p>
          </div>

          {/* Navigation Mode Tabs & Upload CTA */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: '#1E293B', borderRadius: '6px', padding: '3px', border: '1px solid #334155' }}>
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'MAP_VIEW' })}
                style={{
                  background: state.viewMode === 'MAP_VIEW' ? '#38BDF8' : 'transparent',
                  color: state.viewMode === 'MAP_VIEW' ? '#0F172A' : '#CBD5E1',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Canvas Observatory
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'LIST_VIEW' })}
                style={{
                  background: state.viewMode === 'LIST_VIEW' ? '#38BDF8' : 'transparent',
                  color: state.viewMode === 'LIST_VIEW' ? '#0F172A' : '#CBD5E1',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Accessible Table
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'METHODOLOGY' })}
                style={{
                  background: state.viewMode === 'METHODOLOGY' ? '#38BDF8' : 'transparent',
                  color: state.viewMode === 'METHODOLOGY' ? '#0F172A' : '#CBD5E1',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Methodology
              </button>
            </div>

            <button
              type="button"
              onClick={() => dispatch({ type: 'TOGGLE_UPLOAD_MODAL' })}
              style={{
                background: '#FFD600',
                color: '#0F172A',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(255, 214, 0, 0.25)',
              }}
            >
              + Submit Observation
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Body */}
      <main
        style={{
          flex: 1,
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          padding: '20px 24px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {state.viewMode === 'METHODOLOGY' ? (
          <MethodologyPanel />
        ) : state.viewMode === 'LIST_VIEW' ? (
          <AccessibleObservationList
            observations={state.observations}
            activeObservationId={state.activeObservationId}
            onSelectObservation={(id) => dispatch({ type: 'SELECT_OBSERVATION', payload: id })}
          />
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(12, 1fr)',
              gap: '20px',
            }}
          >
            {/* Left 7 Columns: Dual Stage Comparison & Observation Details */}
            <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <ComparisonSlider
                observation={activeObs}
                sliderPosition={state.sliderPosition}
                onSliderChange={(pos) => dispatch({ type: 'SET_SLIDER_POSITION', payload: pos })}
              />

              {/* Observation Detail Card */}
              <div
                style={{
                  background: '#1E293B',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #334155',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '15px', color: '#F8FAFC' }}>
                      {activeObs.title}
                    </h3>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                      {activeObs.neighborhood} • Recorded {activeObs.timestamp}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '11px',
                      color: activeObs.status === 'live' ? '#4ADE80' : activeObs.status === 'stale' ? '#FB923C' : '#38BDF8',
                      backgroundColor: 'rgba(255,255,255,0.06)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                    }}
                  >
                    {activeObs.status} Data
                  </span>
                </div>

                <p style={{ margin: '0 0 12px', fontSize: '12px', color: '#CBD5E1', lineHeight: '1.5' }}>
                  {activeObs.originalDescription}
                </p>

                {/* Telemetry Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '8px',
                    fontSize: '11px',
                    background: '#0F172A',
                    padding: '10px',
                    borderRadius: '6px',
                    border: '1px solid #334155',
                  }}
                >
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Relative Humidity</span>
                    <strong style={{ color: '#F8FAFC' }}>{activeObs.humidityPercent}%</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Solar Zenith Angle</span>
                    <strong style={{ color: '#F8FAFC' }}>{activeObs.sunAngleDegrees}°</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Image Quality Score</span>
                    <strong style={{ color: '#38BDF8' }}>{activeObs.qualityScore}/100</strong>
                  </div>
                  <div>
                    <span style={{ color: '#64748B', display: 'block' }}>Optical Instrument</span>
                    <strong style={{ color: '#F8FAFC' }}>{activeObs.cameraInfo}</strong>
                  </div>
                </div>

                {/* Explanatory Boundary */}
                <div
                  style={{
                    marginTop: '10px',
                    fontSize: '11px',
                    color: '#94A3B8',
                    borderLeft: '2px solid #FFD600',
                    paddingLeft: '10px',
                    lineHeight: '1.5',
                  }}
                >
                  <strong>Epistemological Context:</strong> {activeObs.methodologyNotes}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Map & 24h Time Scrubber */}
            <div style={{ gridColumn: 'span 5', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <ObservationMap
                observations={state.observations}
                activeObservationId={state.activeObservationId}
                onSelectObservation={(id) => dispatch({ type: 'SELECT_OBSERVATION', payload: id })}
                currentHour={state.currentHour}
                onHourChange={(h) => dispatch({ type: 'SET_CURRENT_HOUR', payload: h })}
                showOfficialSensors={state.showOfficialSensors}
                onToggleOfficialSensors={() => dispatch({ type: 'TOGGLE_OFFICIAL_SENSORS' })}
                isPlaying={state.isPlayingTime}
                onTogglePlayback={() => dispatch({ type: 'TOGGLE_PLAYBACK' })}
              />
            </div>
          </div>
        )}
      </main>

      {/* Upload Modal */}
      <PhotoUploadModal
        isOpen={state.isUploadModalOpen}
        onClose={() => dispatch({ type: 'TOGGLE_UPLOAD_MODAL' })}
        onSubmit={(newObs) => dispatch({ type: 'ADD_OBSERVATION', payload: newObs })}
      />
    </div>
  );
}
