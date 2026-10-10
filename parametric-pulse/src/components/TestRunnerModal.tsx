import React, { useState } from 'react';
import { runTests } from '../utils/geo.test';
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
        background: 'rgba(6, 8, 15, 0.85)',
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
          background: '#0B0F19',
          border: '1px solid #1E293B',
          borderRadius: '6px',
          padding: '24px',
          maxWidth: '600px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.125rem', color: '#00E5FF', fontFamily: 'JetBrains Mono, monospace' }}>
              UNIT TEST SUITE
            </h2>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
              Geospatial Math & Parametric Rule Evaluator
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <button
          onClick={handleRun}
          style={{
            background: '#00E5FF',
            color: '#06080F',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            justifyContent: 'center',
          }}
        >
          <Play size={16} />
          EXECUTE ALL UNIT TESTS
        </button>

        {testResults && (
          <div style={{ background: '#06080F', border: '1px solid #1E293B', borderRadius: '4px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '16px', fontWeight: 600, fontSize: '0.875rem' }}>
              <span style={{ color: '#10B981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={16} /> {testResults.passed} PASSED
              </span>
              <span style={{ color: '#EF4444', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <XCircle size={16} /> {testResults.failed} FAILED
              </span>
            </div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', color: '#94A3B8', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
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
