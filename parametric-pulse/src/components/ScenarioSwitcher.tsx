import React from 'react';
import { CycloneScenario } from '../types';

interface ScenarioSwitcherProps {
  scenarios: CycloneScenario[];
  activeScenarioId: string;
  onSelectScenario: (id: string) => void;
}

export const ScenarioSwitcher: React.FC<ScenarioSwitcherProps> = ({
  scenarios,
  activeScenarioId,
  onSelectScenario,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: '#0B0F19',
        border: '1px solid #1E293B',
        padding: '8px 16px',
        borderRadius: '4px',
      }}
    >
      <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#94A3B8' }}>
        DEMO SCENARIOS:
      </span>
      <div style={{ display: 'flex', gap: '8px' }}>
        {scenarios.map((sc) => {
          const isActive = sc.id === activeScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => onSelectScenario(sc.id)}
              style={{
                background: isActive ? '#00E5FF' : '#06080F',
                color: isActive ? '#06080F' : '#F8FAFC',
                border: `1px solid ${isActive ? '#00E5FF' : '#1E293B'}`,
                borderRadius: '4px',
                padding: '6px 12px',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              {sc.name} {sc.qualifiesForPayout ? '(QUALIFYING)' : '(NON-TRIGGER)'}
            </button>
          );
        })}
      </div>
    </div>
  );
};
