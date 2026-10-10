import React from 'react';
import { PairwiseComparison } from '../types';
import { Check, ArrowRight } from 'lucide-react';

interface PairwiseChoiceCardProps {
  comparison: PairwiseComparison;
  selectedProjectId?: string;
  onSelectOption: (projectId: string) => void;
  currentStep: number;
  totalSteps: number;
}

export const PairwiseChoiceCard: React.FC<PairwiseChoiceCardProps> = ({
  comparison,
  selectedProjectId,
  onSelectOption,
  currentStep,
  totalSteps,
}) => {
  const { projectA, projectB, tradeoffRationale } = comparison;

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '2px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        borderRadius: '4px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header & Step Tracker */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000000', paddingBottom: '12px' }}>
        <div>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', fontWeight: 700, color: '#71717A' }}>
            CIVIC TRADE-OFF QUESTIONNAIRE
          </span>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
            CHOICE STEP {currentStep} OF {totalSteps}
          </h2>
        </div>
        <div
          style={{
            background: '#B2FF05',
            border: '2px solid #000000',
            padding: '4px 12px',
            fontWeight: 700,
            fontSize: '0.875rem',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          STEP {currentStep}/{totalSteps}
        </div>
      </div>

      {/* Rationale Context Banner */}
      <div style={{ background: '#F9F8F6', border: '1px solid #000000', padding: '12px 16px', fontSize: '0.875rem', color: '#18181B' }}>
        <strong>Trade-Off Context:</strong> {tradeoffRationale}
      </div>

      {/* Two Option Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Option A */}
        <div
          onClick={() => onSelectOption(projectA.id)}
          style={{
            background: selectedProjectId === projectA.id ? 'rgba(178, 255, 5, 0.2)' : '#FFFFFF',
            border: selectedProjectId === projectA.id ? '3px solid #000000' : '2px solid #000000',
            boxShadow: selectedProjectId === projectA.id ? '6px 6px 0px #000000' : '2px 2px 0px #000000',
            padding: '20px',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 150ms ease-out',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span
              style={{
                background: '#18181B',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontFamily: 'JetBrains Mono, monospace',
                padding: '2px 8px',
                fontWeight: 700,
              }}
            >
              {projectA.category}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 700, color: '#18181B' }}>
              ${(projectA.costUsd / 1_000_000).toFixed(1)}M
            </span>
          </div>

          <h3 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
            OPTION A: {projectA.title}
          </h3>

          <p style={{ margin: 0, fontSize: '0.875rem', color: '#52525B', flex: 1, lineHeight: 1.4 }}>
            {projectA.impactSummary}
          </p>

          <button
            style={{
              background: selectedProjectId === projectA.id ? '#B2FF05' : '#18181B',
              color: selectedProjectId === projectA.id ? '#000000' : '#FFFFFF',
              border: '2px solid #000000',
              padding: '10px',
              fontWeight: 700,
              fontSize: '0.875rem',
              fontFamily: 'Space Grotesk, sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '8px',
            }}
          >
            {selectedProjectId === projectA.id ? <Check size={16} /> : <ArrowRight size={16} />}
            {selectedProjectId === projectA.id ? 'SELECTED' : 'SELECT OPTION A'}
          </button>
        </div>

        {/* Option B */}
        <div
          onClick={() => onSelectOption(projectB.id)}
          style={{
            background: selectedProjectId === projectB.id ? 'rgba(178, 255, 5, 0.2)' : '#FFFFFF',
            border: selectedProjectId === projectB.id ? '3px solid #000000' : '2px solid #000000',
            boxShadow: selectedProjectId === projectB.id ? '6px 6px 0px #000000' : '2px 2px 0px #000000',
            padding: '20px',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            cursor: 'pointer',
            transition: 'all 150ms ease-out',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <span
              style={{
                background: '#18181B',
                color: '#FFFFFF',
                fontSize: '0.7rem',
                fontFamily: 'JetBrains Mono, monospace',
                padding: '2px 8px',
                fontWeight: 700,
              }}
            >
              {projectB.category}
            </span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', fontWeight: 700, color: '#18181B' }}>
              ${(projectB.costUsd / 1_000_000).toFixed(1)}M
            </span>
          </div>

          <h3 style={{ margin: 0, fontSize: '1.1rem', fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
            OPTION B: {projectB.title}
          </h3>

          <p style={{ margin: 0, fontSize: '0.875rem', color: '#52525B', flex: 1, lineHeight: 1.4 }}>
            {projectB.impactSummary}
          </p>

          <button
            style={{
              background: selectedProjectId === projectB.id ? '#B2FF05' : '#18181B',
              color: selectedProjectId === projectB.id ? '#000000' : '#FFFFFF',
              border: '2px solid #000000',
              padding: '10px',
              fontWeight: 700,
              fontSize: '0.875rem',
              fontFamily: 'Space Grotesk, sans-serif',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '8px',
            }}
          >
            {selectedProjectId === projectB.id ? <Check size={16} /> : <ArrowRight size={16} />}
            {selectedProjectId === projectB.id ? 'SELECTED' : 'SELECT OPTION B'}
          </button>
        </div>
      </div>
    </div>
  );
};
