import { useReducer, useState, useEffect } from 'react';
import { createInitialState, appReducer } from './state/appReducer';
import { DEMO_CROP_SAMPLES } from './data/demoCropData';
import { CropPhotoSelector } from './components/CropPhotoSelector';
import { LesionInspectorCanvas } from './components/LesionInspectorCanvas';
import { DiagnosticConfidenceCard } from './components/DiagnosticConfidenceCard';
import { ClaimSettlementCard } from './components/ClaimSettlementCard';
import { AccessibleCropCaseReport } from './components/AccessibleCropCaseReport';
import { TestRunnerModal } from './components/TestRunnerModal';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, undefined, () => createInitialState());
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState<boolean>(false);

  // Monitor network online/offline state
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Monitor prefers-reduced-motion accessibility setting
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches && state.isScanAnimating) {
      dispatch({ type: 'TOGGLE_SCAN_ANIMATION' });
    }
  }, []);

  // Global Keyboard Navigation Shortcuts (1-3, S, B, H, A, T, R)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      switch (e.key) {
        case '1':
          handleSelectSample(DEMO_CROP_SAMPLES[0].id);
          break;
        case '2':
          handleSelectSample(DEMO_CROP_SAMPLES[1].id);
          break;
        case '3':
          handleSelectSample(DEMO_CROP_SAMPLES[2].id);
          break;
        case 's':
        case 'S':
          dispatch({ type: 'TOGGLE_SCAN_ANIMATION' });
          break;
        case 'b':
        case 'B':
          dispatch({ type: 'TOGGLE_BOUNDING_BOXES' });
          break;
        case 'h':
        case 'H':
          dispatch({ type: 'TOGGLE_HEATMAP' });
          break;
        case 'a':
        case 'A':
          dispatch({ type: 'TOGGLE_ACCESSIBILITY_VIEW' });
          break;
        case 't':
        case 'T':
          setIsTestModalOpen((prev) => !prev);
          break;
        case 'r':
        case 'R':
          dispatch({ type: 'RESET_CLAIM_STATE' });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle sample selection with temporary loading state
  const handleSelectSample = (sampleId: string) => {
    setIsLoading(true);
    dispatch({ type: 'SELECT_SAMPLE', payload: sampleId });
    setTimeout(() => setIsLoading(false), 200);
  };

  const activeSample =
    state.samples.find((s) => s.id === state.activeSampleId) || DEMO_CROP_SAMPLES[0];

  return (
    <div style={appContainerStyle}>
      {/* Offline Alert Banner (if offline) */}
      {!isOnline && (
        <div style={offlineBannerStyle} role="alert">
          ⚡ <strong>OFFLINE MODE:</strong> Running on local deterministic AI models & zero-latency edge cache.
        </div>
      )}

      {/* Runtime Error Fallback */}
      {runtimeError && (
        <div style={errorBannerStyle} role="alert">
          ⚠️ <strong>RUNTIME ERROR:</strong> {runtimeError}
          <button onClick={() => setRuntimeError(null)} style={errorResetButtonStyle}>
            Dismiss
          </button>
        </div>
      )}

      {/* Header */}
      <header style={headerStyle}>
        <div style={headerTitleGroupStyle}>
          <div style={logoBadgeStyle}>🌱 DL-AI</div>
          <div>
            <h1 style={titleStyle}>Diagnostic Liquidity</h1>
            <p style={subtitleStyle}>
              Algorithmic Crop Subsidy & Mobile Image Triage Engine
            </p>
          </div>
        </div>

        {/* Quick Toolbar */}
        <div style={toolbarGroupStyle}>
          <button
            onClick={() => setIsTestModalOpen(true)}
            style={{
              ...buttonStyle,
              borderColor: '#00E676',
              color: '#00E676',
            }}
          >
            🧪 Unit Tests (T)
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_ACCESSIBILITY_VIEW' })}
            style={{
              ...buttonStyle,
              background: state.isAccessibilityView ? '#00E676' : '#1A271E',
              color: state.isAccessibilityView ? '#0F1410' : '#00E676',
            }}
          >
            ♿ Accessible Report ({state.isAccessibilityView ? 'ON' : 'OFF'})
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_SCAN_ANIMATION' })}
            style={{
              ...buttonStyle,
              background: state.isScanAnimating ? '#00E676' : '#1A271E',
              color: state.isScanAnimating ? '#0F1410' : '#00E676',
            }}
          >
            {state.isScanAnimating ? '🛑 Pause Scan' : '📡 Trigger Scan'}
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_BOUNDING_BOXES' })}
            style={{
              ...buttonStyle,
              borderColor: state.showBoundingBoxes ? '#FF00FF' : '#2D3B30',
              color: state.showBoundingBoxes ? '#FF00FF' : '#8B949E',
            }}
          >
            🎯 Boxes ({state.showBoundingBoxes ? 'ON' : 'OFF'})
          </button>

          <button
            onClick={() => dispatch({ type: 'TOGGLE_HEATMAP' })}
            style={{
              ...buttonStyle,
              borderColor: state.showHeatmap ? '#FFAB00' : '#2D3B30',
              color: state.showHeatmap ? '#FFAB00' : '#8B949E',
            }}
          >
            🔥 Heatmap ({state.showHeatmap ? 'ON' : 'OFF'})
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={mainContentStyle}>
        {/* Case Intake Selector */}
        <CropPhotoSelector
          samples={state.samples}
          selectedSampleId={state.activeSampleId}
          onSelectSample={handleSelectSample}
        />

        {/* Loading State Overlay / Skeleton */}
        {isLoading ? (
          <div style={loadingSkeletonStyle}>
            <div style={spinnerStyle} />
            <p style={{ margin: '0.5rem 0 0 0', color: '#00E676', fontWeight: 600 }}>
              Running Edge Diagnostics & Lesion Triage...
            </p>
          </div>
        ) : state.isAccessibilityView ? (
          /* Accessible ARIA Data Table Fallback View */
          <AccessibleCropCaseReport
            sample={activeSample}
            assessment={state.assessment}
            claimStatus={state.claimStatus}
          />
        ) : (
          /* Primary Visual Workspace */
          <>
            {/* HTML5 Canvas 2D Lesion Inspector */}
            <LesionInspectorCanvas
              sample={activeSample}
              showBoundingBoxes={state.showBoundingBoxes}
              showHeatmap={state.showHeatmap}
              selectedBoxId={state.selectedBoxId}
              onSelectBox={(boxId) => dispatch({ type: 'SELECT_BOUNDING_BOX', payload: boxId })}
              isScanning={state.isScanAnimating}
              confidenceFilter={state.confidenceThresholdFilter}
            />

            {/* Two Column Grid for Telemetry & Settlement */}
            <div style={gridTwoColStyle}>
              {/* Column 1: Explainable AI Confidence Engine */}
              <DiagnosticConfidenceCard
                assessment={state.assessment}
                symptoms={activeSample.symptoms}
                confidenceFilter={state.confidenceThresholdFilter}
                onSetConfidenceFilter={(val) =>
                  dispatch({ type: 'SET_CONFIDENCE_FILTER', payload: val })
                }
              />

              {/* Column 2: Parametric Claim Settlement Rail */}
              <ClaimSettlementCard
                sample={activeSample}
                assessment={state.assessment}
                claimStatus={state.claimStatus}
                onAdvanceStatus={() => dispatch({ type: 'ADVANCE_CLAIM_STATUS' })}
                onResetState={() => dispatch({ type: 'RESET_CLAIM_STATE' })}
              />
            </div>
          </>
        )}

        {/* Keyboard Shortcuts Legend Bar */}
        <footer style={legendContainerStyle}>
          <div style={legendTitleStyle}>⌨️ Keyboard Shortcuts Legend:</div>
          <div style={legendItemsStyle}>
            <span><kbd style={kbdStyle}>1-3</kbd> Case Select</span>
            <span><kbd style={kbdStyle}>S</kbd> Laser Scan</span>
            <span><kbd style={kbdStyle}>B</kbd> Bounding Boxes</span>
            <span><kbd style={kbdStyle}>H</kbd> Heatmap</span>
            <span><kbd style={kbdStyle}>A</kbd> Accessible View</span>
            <span><kbd style={kbdStyle}>T</kbd> Unit Tests</span>
            <span><kbd style={kbdStyle}>R</kbd> Reset Claim</span>
          </div>
        </footer>

        {/* Interactive In-App Unit Test Modal */}
        <TestRunnerModal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
        />
      </main>
    </div>
  );
}

const appContainerStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: '#060A07',
  color: '#E6EDE6',
  padding: '1.5rem',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const offlineBannerStyle: React.CSSProperties = {
  background: '#3A2800',
  color: '#FFAB00',
  border: '1px solid #FFAB0066',
  padding: '0.6rem 1rem',
  borderRadius: '8px',
  marginBottom: '1rem',
  fontSize: '0.8rem',
};

const errorBannerStyle: React.CSSProperties = {
  background: '#3A1010',
  color: '#FF2A6D',
  border: '1px solid #FF2A6D66',
  padding: '0.6rem 1rem',
  borderRadius: '8px',
  marginBottom: '1rem',
  fontSize: '0.8rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const errorResetButtonStyle: React.CSSProperties = {
  background: '#FF2A6D',
  color: '#FFFFFF',
  border: 'none',
  padding: '0.2rem 0.6rem',
  borderRadius: '4px',
  cursor: 'pointer',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '1.25rem',
  marginBottom: '1.5rem',
  borderBottom: '1px solid #2D3B30',
  flexWrap: 'wrap',
  gap: '1rem',
};

const headerTitleGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

const logoBadgeStyle: React.CSSProperties = {
  background: '#00E67622',
  color: '#00E676',
  border: '1px solid #00E67666',
  padding: '0.4rem 0.8rem',
  borderRadius: '8px',
  fontWeight: 800,
  fontSize: '0.9rem',
  letterSpacing: '0.05em',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.4rem',
  fontWeight: 700,
  color: '#FFFFFF',
};

const subtitleStyle: React.CSSProperties = {
  margin: '0.2rem 0 0 0',
  fontSize: '0.85rem',
  color: '#8B949E',
};

const toolbarGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.5rem',
  flexWrap: 'wrap',
};

const buttonStyle: React.CSSProperties = {
  background: '#121A14',
  border: '1px solid #2D3B30',
  borderRadius: '6px',
  padding: '0.5rem 0.9rem',
  fontSize: '0.8rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  outline: 'none',
};

const mainContentStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
};

const gridTwoColStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
  gap: '1.5rem',
};

const loadingSkeletonStyle: React.CSSProperties = {
  background: '#0F1410',
  border: '1px solid #2D3B30',
  borderRadius: '12px',
  padding: '3rem 1.5rem',
  textAlign: 'center',
};

const spinnerStyle: React.CSSProperties = {
  width: '32px',
  height: '32px',
  border: '4px solid #1F2C21',
  borderTopColor: '#00E676',
  borderRadius: '50%',
  margin: '0 auto',
  animation: 'spin 0.8s linear infinite',
};

const legendContainerStyle: React.CSSProperties = {
  background: '#0F1410',
  borderRadius: '8px',
  border: '1px solid #2D3B30',
  padding: '0.75rem 1rem',
  marginTop: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '0.75rem',
  fontSize: '0.75rem',
};

const legendTitleStyle: React.CSSProperties = {
  color: '#8B949E',
  fontWeight: 600,
};

const legendItemsStyle: React.CSSProperties = {
  display: 'flex',
  gap: '1rem',
  flexWrap: 'wrap',
  color: '#E6EDE6',
};

const kbdStyle: React.CSSProperties = {
  background: '#1A271E',
  border: '1px solid #2D3B30',
  color: '#00E676',
  padding: '0.1rem 0.35rem',
  borderRadius: '4px',
  fontSize: '0.7rem',
  fontFamily: 'monospace',
  marginRight: '0.3rem',
};
