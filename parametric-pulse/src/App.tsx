import { useReducer, useEffect } from 'react';
import { initialAppState, appReducer } from './state/appReducer';
import { demoScenarios } from './data/demoScenarios';
import { interpolateTrackPoint } from './utils/geo';
import { Header } from './components/Header';
import { StormCanvas2D } from './components/StormCanvas2D';
import { TimeScrubber } from './components/TimeScrubber';
import { TelemetryInspector } from './components/TelemetryInspector';
import { TriggerRuleCard } from './components/TriggerRuleCard';
import { PayoutStateMachine } from './components/PayoutStateMachine';
import { AccessibleTableFallback } from './components/AccessibleTableFallback';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, {
    ...initialAppState,
    scenarios: demoScenarios,
  });

  const activeScenario =
    state.scenarios.find((s) => s.id === state.activeScenarioId) || demoScenarios[0];

  const currentCheckpoint = interpolateTrackPoint(
    activeScenario.checkpoints,
    state.currentHourIndex
  );

  const selectedAsset =
    activeScenario.assets.find((a) => a.id === state.selectedAssetId) ||
    activeScenario.assets[0];

  // Auto-play interval effect
  useEffect(() => {
    let interval: number;
    if (state.isPlaying) {
      interval = window.setInterval(() => {
        dispatch({
          type: 'SET_HOUR_INDEX',
          payload: (state.currentHourIndex + 1) % 49,
        });
      }, 1000 / state.playbackSpeed);
    }
    return () => clearInterval(interval);
  }, [state.isPlaying, state.currentHourIndex, state.playbackSpeed]);

  // Handle demo payout step sequence simulation
  const handleExecutePayout = () => {
    dispatch({ type: 'SET_PAYOUT_STEP', payload: 'EVALUATING' });
    setTimeout(() => {
      dispatch({ type: 'SET_PAYOUT_STEP', payload: 'TRIGGERED' });
      setTimeout(() => {
        dispatch({ type: 'SET_PAYOUT_STEP', payload: 'LIQUIDITY_LOCKED' });
        setTimeout(() => {
          dispatch({ type: 'SET_PAYOUT_STEP', payload: 'PAYOUT_DISPATCHED' });
          setTimeout(() => {
            dispatch({ type: 'SET_PAYOUT_STEP', payload: 'CONFIRMED' });
          }, 800);
        }, 800);
      }, 800);
    }, 800);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#06080F', color: '#F8FAFC', display: 'flex', flexDirection: 'column' }}>
      {/* Header Navigation */}
      <Header
        scenarios={state.scenarios}
        activeScenarioId={state.activeScenarioId}
        onSelectScenario={(id) => dispatch({ type: 'SET_SCENARIO', payload: id })}
        viewMode={state.viewMode}
        onSetViewMode={(mode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode })}
      />

      {/* Main Content View */}
      <main style={{ flex: 1, padding: '24px', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {state.hasError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #EF4444', color: '#EF4444', padding: '16px', borderRadius: '4px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={20} />
              <span>{state.errorMessage || 'An error occurred during telemetry processing.'}</span>
            </div>
            <button
              onClick={() => dispatch({ type: 'SET_ERROR', payload: null })}
              style={{ background: '#EF4444', color: '#FFF', border: 'none', borderRadius: '4px', padding: '6px 12px', cursor: 'pointer' }}
            >
              DISMISS
            </button>
          </div>
        )}

        {state.viewMode === 'ACCESSIBLE_TABLE' ? (
          <AccessibleTableFallback
            checkpoints={activeScenario.checkpoints}
            currentHour={state.currentHourIndex}
            assets={activeScenario.assets}
            rule={activeScenario.rule}
            onSelectHour={(h) => dispatch({ type: 'SET_HOUR_INDEX', payload: h })}
          />
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            {/* Left 8 Columns: Storm Scene & Scrubber */}
            <div style={{ gridColumn: 'span 8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <StormCanvas2D
                checkpoints={activeScenario.checkpoints}
                currentCheckpoint={currentCheckpoint}
                assets={activeScenario.assets}
                selectedAssetId={state.selectedAssetId}
                onSelectCheckpointHour={(h) => dispatch({ type: 'SET_HOUR_INDEX', payload: h })}
                onSelectAsset={(id) => dispatch({ type: 'SET_SELECTED_ASSET', payload: id })}
                reducedMotion={state.reducedMotion}
              />
              <TimeScrubber
                currentHour={state.currentHourIndex}
                maxHour={48}
                isPlaying={state.isPlaying}
                playbackSpeed={state.playbackSpeed}
                onHourChange={(h) => dispatch({ type: 'SET_HOUR_INDEX', payload: h })}
                onTogglePlay={() => dispatch({ type: 'TOGGLE_PLAYBACK' })}
                onSpeedChange={(s) => dispatch({ type: 'SET_PLAYBACK_SPEED', payload: s })}
              />
            </div>

            {/* Right 4 Columns: Telemetry, Rule Inspector, & Payout Engine */}
            <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TelemetryInspector
                checkpoint={currentCheckpoint}
                assets={activeScenario.assets}
                selectedAssetId={state.selectedAssetId}
                onSelectAsset={(id) => dispatch({ type: 'SET_SELECTED_ASSET', payload: id })}
              />
              <TriggerRuleCard
                rule={activeScenario.rule}
                checkpoint={currentCheckpoint}
                asset={selectedAsset}
              />
              <PayoutStateMachine
                currentStep={state.payoutStep}
                payoutAmountUsd={activeScenario.rule.payoutAmountUsd}
                onExecutePayout={handleExecutePayout}
                onReset={() => dispatch({ type: 'RESET_PAYOUT' })}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: '#0B0F19', borderTop: '1px solid #1E293B', padding: '16px 24px', textAlign: 'center', fontSize: '0.75rem', color: '#64748B', fontFamily: 'JetBrains Mono, monospace' }}>
        PARAMETRIC PULSE v1.0 // RE-DESIGN VERIFIED // NO PAID EXTERNAL APIS REQUIRED
      </footer>
    </div>
  );
}
