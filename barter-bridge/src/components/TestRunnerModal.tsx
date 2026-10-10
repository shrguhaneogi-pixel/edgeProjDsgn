import React, { useState } from 'react';
import { runTests } from '../utils/astEvaluator.test';
import { CheckCircle2, XCircle, Play, X } from 'lucide-react';

interface TestRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestRunnerModal: React.FC<TestRunnerModalProps> = ({ isOpen, onClose }) => {
  const [testResults, setTestResults] = useState<{ passed: number; failed: number; logs: string[] } | null>(null);

  if (!isOpen) return null;

  const handleRun = () => {
    const results = runTests();
    setTestResults(results);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(249, 248, 246, 0.85)',
        backdropFilter: 'blur(6px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          background: '#FFFFFF',
          border: '2px solid #000000',
          boxShadow: '8px 8px 0px #000000',
          borderRadius: '6px',
          padding: '24px',
          maxWidth: '600px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#18181B', fontFamily: 'Space Grotesk, sans-serif' }}>
              UNIT TEST SUITE
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#71717A', fontFamily: 'JetBrains Mono, monospace' }}>
              AST Scoring & Ranking Simulator Verification
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#18181B', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <button
          onClick={handleRun}
          style={{
            background: '#B2FF05',
            color: '#000000',
            border: '2px solid #000000',
            padding: '10px 16px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            justifyContent: 'center',
            fontFamily: 'Space Grotesk, sans-serif',
          }}
        >
          <Play size={16} />
          EXECUTE ALL UNIT TESTS
        </button>

        {testResults && (
          <div style={{ background: '#F9F8F6', border: '2px solid #000000', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '16px', fontWeight: 700, fontSize: '0.9rem', fontFamily: 'Space Grotesk, sans-serif' }}>
              <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={16} /> {testResults.passed} PASSED
              </span>
              <span style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <XCircle size={16} /> {testResults.failed} FAILED
              </span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#18181B', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
              {testResults.logs.map((log, i) => (
                <div key={i} style={{ color: log.startsWith('✓') ? '#10B981' : '#EF4444' }}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
