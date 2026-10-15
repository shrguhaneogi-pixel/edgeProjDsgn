import { useReducer } from 'react';
import { initialAppState, appReducer } from './state/appReducer';
import { demoComparisons } from './data/demoDistrictData';
import { Header } from './components/Header';
import { EcosystemNav } from './components/EcosystemNav';
import { PairwiseChoiceCard } from './components/PairwiseChoiceCard';
import { PersonalSummary } from './components/PersonalSummary';
import { ASTCanvasSVG } from './components/ASTCanvasSVG';
import { ASTNodeInspector } from './components/ASTNodeInspector';
import { RankingChart } from './components/RankingChart';
import { ARIATreeFallback } from './components/ARIATreeFallback';
import { TestRunnerModal } from './components/TestRunnerModal';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialAppState);

  const currentComparison = demoComparisons[state.currentSurveyStep - 1] || demoComparisons[0];
  const selectedNode = state.selectedNodeId ? state.astNodes[state.selectedNodeId] || null : null;
  const currentSelectedChoice = state.userChoices[currentComparison.id];

  const handleSelectChoice = (projectId: string) => {
    dispatch({
      type: 'RECORD_CHOICE',
      payload: { stepId: currentComparison.id, selectedProjectId: projectId },
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F9F8F6', color: '#18181B', display: 'flex', flexDirection: 'column' }}>
      {/* Ecosystem Navigation */}
      <EcosystemNav currentApp="barter-bridge" />

      {/* Navigation Header */}
      <Header
        viewMode={state.viewMode}
        onSetViewMode={(mode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode })}
        onOpenTestRunner={() => dispatch({ type: 'TOGGLE_TEST_MODAL' })}
      />

      {/* Main Content Body */}
      <main style={{ flex: 1, padding: '24px', maxWidth: '1400px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* VIEW 1: RESIDENT FORCED-CHOICE SURVEY */}
        {state.viewMode === 'RESIDENT_SURVEY' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <PairwiseChoiceCard
              comparison={currentComparison}
              selectedProjectId={currentSelectedChoice}
              onSelectOption={handleSelectChoice}
              currentStep={state.currentSurveyStep}
              totalSteps={demoComparisons.length}
            />

            {/* Step Navigation Controls */}
            <div style={{ display: 'flex', gap: '12px', maxWidth: '800px', width: '100%', justifyContent: 'space-between' }}>
              <button
                onClick={() => dispatch({ type: 'SET_SURVEY_STEP', payload: state.currentSurveyStep - 1 })}
                disabled={state.currentSurveyStep === 1}
                style={{
                  background: '#FFFFFF',
                  color: state.currentSurveyStep === 1 ? '#A1A1AA' : '#18181B',
                  border: '2px solid #000000',
                  padding: '10px 16px',
                  fontWeight: 700,
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.875rem',
                  cursor: state.currentSurveyStep === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <ArrowLeft size={16} /> PREVIOUS STEP
              </button>

              <button
                onClick={() => dispatch({ type: 'RESET_SURVEY' })}
                style={{
                  background: '#FFFFFF',
                  color: '#71717A',
                  border: '2px solid #000000',
                  padding: '10px 16px',
                  fontSize: '0.85rem',
                  fontFamily: 'Space Grotesk, sans-serif',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <RotateCcw size={14} /> RESET SURVEY
              </button>

              {state.currentSurveyStep < demoComparisons.length ? (
                <button
                  onClick={() => dispatch({ type: 'SET_SURVEY_STEP', payload: state.currentSurveyStep + 1 })}
                  style={{
                    background: '#B2FF05',
                    color: '#000000',
                    border: '2px solid #000000',
                    padding: '10px 20px',
                    fontWeight: 700,
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  NEXT STEP <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'PERSONAL_SUMMARY' })}
                  style={{
                    background: '#10B981',
                    color: '#FFFFFF',
                    border: '2px solid #000000',
                    padding: '10px 20px',
                    fontWeight: 700,
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                  }}
                >
                  VIEW MY SUMMARY
                </button>
              )}
            </div>
          </div>
        )}

        {/* VIEW 2: PERSONAL PRIORITY SUMMARY */}
        {state.viewMode === 'PERSONAL_SUMMARY' && (
          <PersonalSummary
            userChoices={state.userChoices}
            projects={state.projects}
            onRestartSurvey={() => dispatch({ type: 'RESET_SURVEY' })}
            onViewAST={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'ADMIN_AST' })}
          />
        )}

        {/* VIEW 3: ADMIN AST WORKSPACE */}
        {state.viewMode === 'ADMIN_AST' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '24px' }}>
            {/* Left 3.5 Columns: District Rankings */}
            <div style={{ gridColumn: 'span 4' }}>
              <RankingChart rankings={state.rankings} />
            </div>

            {/* Center 5 Columns: AST Canvas */}
            <div style={{ gridColumn: 'span 5' }}>
              <ASTCanvasSVG
                nodes={state.astNodes}
                selectedNodeId={state.selectedNodeId}
                onSelectNode={(id) => dispatch({ type: 'SELECT_AST_NODE', payload: id })}
              />
            </div>

            {/* Right 3.5 Columns: Node Inspector */}
            <div style={{ gridColumn: 'span 3' }}>
              <ASTNodeInspector
                selectedNode={selectedNode}
                categoryWeights={state.categoryWeights}
                onWeightChange={(cat, w) =>
                  dispatch({ type: 'UPDATE_CATEGORY_WEIGHT', payload: { category: cat, weight: w } })
                }
                onResetWeights={() => dispatch({ type: 'RESET_SIMULATION_WEIGHTS' })}
              />
            </div>
          </div>
        )}

        {/* VIEW 4: ACCESSIBLE ARIA TREE VIEW */}
        {state.viewMode === 'ACCESSIBLE_TREE' && (
          <ARIATreeFallback
            nodes={state.astNodes}
            selectedNodeId={state.selectedNodeId}
            onSelectNode={(id) => dispatch({ type: 'SELECT_AST_NODE', payload: id })}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{ background: '#FFFFFF', borderTop: '2px solid #000000', padding: '16px 24px', textAlign: 'center', fontSize: '0.75rem', color: '#71717A', fontFamily: 'JetBrains Mono, monospace' }}>
        THE BARTER BRIDGE v1.0 // CIVIC PREFERENCE AST ENGINE // RE-DESIGN VERIFIED
      </footer>

      {/* Interactive Unit Test Runner Modal */}
      <TestRunnerModal isOpen={state.isTestModalOpen} onClose={() => dispatch({ type: 'TOGGLE_TEST_MODAL' })} />
    </div>
  );
}
