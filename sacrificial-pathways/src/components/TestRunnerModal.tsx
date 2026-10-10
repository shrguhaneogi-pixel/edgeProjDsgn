import React, { useState } from 'react';
import { runFlowCalculatorUnitTests, TestResult } from '../utils/flowCalculator.test';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TestRunnerModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [hasRun, setHasRun] = useState(false);

  if (!isOpen) return null;

  const handleRunTests = () => {
    const results = runFlowCalculatorUnitTests();
    setTestResults(results);
    setHasRun(true);
  };

  const allPassed = testResults.length > 0 && testResults.every(r => r.passed);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(13, 17, 23, 0.85)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <div
        style={{
          background: '#161B22',
          border: '1px solid #30363D',
          borderRadius: '8px',
          padding: '1.5rem',
          maxWidth: '600px',
          width: '90%',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          color: '#F0F6FC'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #30363D', paddingBottom: '0.75rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#FF3D00', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Hydraulic Engine Unit Test Suite</span>
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#8B949E', fontSize: '1.2rem', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <p style={{ fontSize: '0.85rem', color: '#8B949E', marginBottom: '1.25rem' }}>
          Execute in-app verification suite testing Manning velocity, sacrificial weir flow, sector exposure valuation, and depth reduction deltas.
        </p>

        {!hasRun ? (
          <button
            onClick={handleRunTests}
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#FF3D00',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            Run Hydraulic Unit Test Suite
          </button>
        ) : (
          <div>
            <div style={{ marginBottom: '1rem', padding: '0.6rem 0.85rem', borderRadius: '6px', background: allPassed ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 42, 109, 0.15)', border: `1px solid ${allPassed ? '#00E676' : '#FF2A6D'}`, color: allPassed ? '#00E676' : '#FF2A6D', fontSize: '0.85rem', fontWeight: 'bold' }}>
              {allPassed ? '✓ ALL UNIT TESTS PASSED CLEAN (5/5 Assertions Succeeded)' : '✕ UNIT TEST SUITE DETECTED FAILURES'}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxHeight: '280px', overflowY: 'auto', marginBottom: '1.25rem' }}>
              {testResults.map((result, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#0D1117',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '6px',
                    border: '1px solid #30363D',
                    fontSize: '0.8rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                    <strong style={{ color: '#F0F6FC' }}>{result.name}</strong>
                    <span style={{ color: result.passed ? '#00E676' : '#FF2A6D', fontWeight: 'bold' }}>
                      {result.passed ? 'PASS' : 'FAIL'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#8B949E', fontFamily: 'monospace' }}>
                    {result.message}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleRunTests}
                style={{ flex: 1, padding: '0.55rem', background: '#0D1117', border: '1px solid #30363D', color: '#F0F6FC', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                Re-run Tests
              </button>
              <button
                onClick={onClose}
                style={{ flex: 1, padding: '0.55rem', background: '#FF3D00', border: 'none', color: '#FFFFFF', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
              >
                Close Suite
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
