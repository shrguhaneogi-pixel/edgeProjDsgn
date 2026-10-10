import React from 'react';
import { ViewMode } from '../types/stateModel';
import { Scale, Layers, UserCheck, FileText, FlaskConical } from 'lucide-react';

interface HeaderProps {
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
  onOpenTestRunner: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  onSetViewMode,
  onOpenTestRunner,
}) => {
  return (
    <header
      style={{
        background: '#FFFFFF',
        borderBottom: '2px solid #000000',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 2px 0px #000000',
      }}
    >
      {/* Brand & District Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: '#B2FF05', border: '2px solid #000000', padding: '8px', display: 'flex' }}>
          <Scale size={20} color="#000000" />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
            THE BARTER BRIDGE
          </h1>
          <span style={{ fontSize: '0.75rem', color: '#71717A', fontFamily: 'JetBrains Mono, monospace' }}>
            CIVIC PREFERENCE AST ENGINE // DISTRICT 4 CONSULTATION
          </span>
        </div>
      </div>

      {/* Budget Allocation Pill */}
      <div
        style={{
          background: '#F9F8F6',
          border: '2px solid #000000',
          padding: '4px 12px',
          fontSize: '0.8rem',
          fontFamily: 'JetBrains Mono, monospace',
          fontWeight: 700,
        }}
      >
        DISTRICT BUDGET: $5,000,000 USD
      </div>

      {/* View Mode Navigation Buttons */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => onSetViewMode('RESIDENT_SURVEY')}
          style={{
            background: viewMode === 'RESIDENT_SURVEY' ? '#B2FF05' : '#FFFFFF',
            color: '#000000',
            border: '2px solid #000000',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Layers size={14} />
          SURVEY FLOW
        </button>

        <button
          onClick={() => onSetViewMode('PERSONAL_SUMMARY')}
          style={{
            background: viewMode === 'PERSONAL_SUMMARY' ? '#B2FF05' : '#FFFFFF',
            color: '#000000',
            border: '2px solid #000000',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <UserCheck size={14} />
          MY SUMMARY
        </button>

        <button
          onClick={() => onSetViewMode('ADMIN_AST')}
          style={{
            background: viewMode === 'ADMIN_AST' ? '#B2FF05' : '#FFFFFF',
            color: '#000000',
            border: '2px solid #000000',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <Scale size={14} />
          ADMIN AST
        </button>

        <button
          onClick={() => onSetViewMode('ACCESSIBLE_TREE')}
          style={{
            background: viewMode === 'ACCESSIBLE_TREE' ? '#B2FF05' : '#FFFFFF',
            color: '#000000',
            border: '2px solid #000000',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <FileText size={14} />
          ARIA TREE
        </button>

        <button
          onClick={onOpenTestRunner}
          style={{
            background: '#18181B',
            color: '#B2FF05',
            border: '2px solid #000000',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <FlaskConical size={14} />
          RUN TESTS
        </button>
      </div>
    </header>
  );
};
