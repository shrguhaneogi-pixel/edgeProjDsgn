import React, { useState } from 'react';
import { runDiagnosticTestSuite, TestResult } from '../utils/diagnosticEvaluator.test';

interface TestRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestRunnerModal: React.FC<TestRunnerModalProps> = ({ isOpen, onClose }) => {
  const [results, setResults] = useState<TestResult[]>(() => runDiagnosticTestSuite());
  const [isRunning, setIsRunning] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleRunTests = () => {
    setIsRunning(true);
    setTimeout(() => {
      setResults(runDiagnosticTestSuite());
      setIsRunning(false);
    }, 200);
  };

  const passCount = results.filter((r) => r.passed).length;
  const failCount = results.length - passCount;

  return (
    <div style={overlayStyle} role="dialog" aria-modal="true" aria-labelledby="test-modal-title">
      <div style={modalStyle}>
        <div style={headerStyle}>
          <div style={titleGroupStyle}>
            <span style={iconStyle}>🧪</span>
            <div>
              <h2 id="test-modal-title" style={titleStyle}>In-App Unit Test Suite Runner</h2>
              <p style={subtitleStyle}>Verification of mathematical formulas, confidence scoring & state transitions</p>
            </div>
          </div>
          <button onClick={onClose} style={closeButtonStyle} aria-label="Close Test Modal">
            ✕
          </button>
        </div>

        {/* Status Bar */}
        <div style={statusBarContainer}>
          <div style={summaryBadgeStyle}>
            Total Assertions: <strong>{results.length}</strong>
          </div>
          <div style={{ ...summaryBadgeStyle, color: '#00E676', border: '1px solid #00E67644' }}>
            Passed: <strong>{passCount}</strong>
          </div>
          {failCount > 0 && (
            <div style={{ ...summaryBadgeStyle, color: '#FF2A6D', border: '1px solid #FF2A6D44' }}>
              Failed: <strong>{failCount}</strong>
            </div>
          )}
          <button onClick={handleRunTests} disabled={isRunning} style={runButtonStyle}>
            {isRunning ? 'Running...' : '🔄 Re-Run Test Suite'}
          </button>
        </div>

        {/* Test Cases List */}
        <div style={testListStyle}>
          {results.map((test) => (
            <div
              key={test.id}
              style={{
                ...testCardStyle,
                borderColor: test.passed ? '#2D3B30' : '#5A2020',
                background: test.passed ? '#121A14' : '#1A0F0F',
              }}
            >
              <div style={testHeaderStyle}>
                <span
                  style={{
                    ...badgeStyle,
                    background: test.passed ? '#00E67622' : '#FF2A6D22',
                    color: test.passed ? '#00E676' : '#FF2A6D',
                    borderColor: test.passed ? '#00E67666' : '#FF2A6D66',
                  }}
                >
                  {test.passed ? '✓ PASS' : '✗ FAIL'}
                </span>
                <span style={testNameStyle}>{test.name}</span>
              </div>

              <div style={testDetailsStyle}>{test.details}</div>

              <div style={assertionGridStyle}>
                <div>
                  <span style={assertLabelStyle}>Actual Result:</span>
                  <span style={{ ...assertValueStyle, color: test.passed ? '#00E676' : '#FF2A6D' }}>
                    {test.actual}
                  </span>
                </div>
                <div>
                  <span style={assertLabelStyle}>Expected Value:</span>
                  <span style={assertValueStyle}>{test.expected}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'rgba(6, 10, 7, 0.85)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  padding: '1.5rem',
};

const modalStyle: React.CSSProperties = {
  background: '#0F1410',
  border: '1px solid #00E676',
  borderRadius: '12px',
  width: '100%',
  maxWidth: '750px',
  maxHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  boxShadow: '0 0 24px rgba(0, 230, 118, 0.2)',
  color: '#FFFFFF',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  borderBottom: '1px solid #2D3B30',
  paddingBottom: '0.75rem',
};

const titleGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
};

const iconStyle: React.CSSProperties = {
  fontSize: '1.4rem',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.15rem',
  fontWeight: 700,
  color: '#FFFFFF',
};

const subtitleStyle: React.CSSProperties = {
  margin: '0.15rem 0 0 0',
  fontSize: '0.75rem',
  color: '#8B949E',
};

const closeButtonStyle: React.CSSProperties = {
  background: '#1A271E',
  border: '1px solid #2D3B30',
  color: '#8B949E',
  borderRadius: '6px',
  padding: '0.3rem 0.6rem',
  cursor: 'pointer',
  fontSize: '1rem',
};

const statusBarContainer: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1rem',
  flexWrap: 'wrap',
};

const summaryBadgeStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  background: '#121A14',
  border: '1px solid #2D3B30',
  padding: '0.35rem 0.65rem',
  borderRadius: '6px',
  color: '#E6EDE6',
};

const runButtonStyle: React.CSSProperties = {
  marginLeft: 'auto',
  background: '#00E676',
  color: '#0F1410',
  border: 'none',
  padding: '0.45rem 0.85rem',
  borderRadius: '6px',
  fontWeight: 700,
  fontSize: '0.75rem',
  cursor: 'pointer',
};

const testListStyle: React.CSSProperties = {
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  paddingRight: '0.25rem',
};

const testCardStyle: React.CSSProperties = {
  borderRadius: '8px',
  border: '1px solid #2D3B30',
  padding: '0.85rem',
};

const testHeaderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.35rem',
};

const badgeStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 800,
  padding: '0.1rem 0.4rem',
  borderRadius: '4px',
  border: '1px solid transparent',
  fontFamily: 'monospace',
};

const testNameStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 700,
  color: '#FFFFFF',
};

const testDetailsStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#8B949E',
  marginBottom: '0.5rem',
};

const assertionGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.5rem',
  background: '#090D0A',
  padding: '0.45rem 0.65rem',
  borderRadius: '4px',
  fontSize: '0.7rem',
};

const assertLabelStyle: React.CSSProperties = {
  color: '#8B949E',
  marginRight: '0.3rem',
};

const assertValueStyle: React.CSSProperties = {
  fontFamily: 'monospace',
  fontWeight: 600,
  color: '#E6EDE6',
};
