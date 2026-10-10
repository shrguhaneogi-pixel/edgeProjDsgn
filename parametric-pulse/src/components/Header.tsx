import React from 'react';
import { CycloneScenario, ViewMode } from '../types';
import { ScenarioSwitcher } from './ScenarioSwitcher';
import { Activity, ShieldCheck, FileText, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  scenarios: CycloneScenario[];
  activeScenarioId: string;
  onSelectScenario: (id: string) => void;
  viewMode: ViewMode;
  onSetViewMode: (mode: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  scenarios,
  activeScenarioId,
  onSelectScenario,
  viewMode,
  onSetViewMode,
}) => {
  return (
    <header
      style={{
        background: '#0B0F19',
        borderBottom: '1px solid #1E293B',
        padding: '12px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}
    >
      {/* Title & Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: 'rgba(0, 229, 255, 0.15)', padding: '8px', borderRadius: '6px', border: '1px solid #00E5FF', display: 'flex' }}>
          <Activity size={20} color="#00E5FF" />
        </div>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: '#00E5FF', letterSpacing: '0.5px' }}>
            PARAMETRIC PULSE
          </h1>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>
            Smart-Contract Cyclone Liquidity Workspace
          </span>
        </div>
      </div>

      {/* Scenario Switcher */}
      <ScenarioSwitcher
        scenarios={scenarios}
        activeScenarioId={activeScenarioId}
        onSelectScenario={onSelectScenario}
      />

      {/* Right Tools & View Mode Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Offline Seeded Data Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#10B981',
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          <ShieldCheck size={14} />
          <span>100% SEEDED DEMO DATA</span>
        </div>

        {/* View Mode Buttons */}
        <div style={{ display: 'flex', gap: '4px', background: '#06080F', padding: '3px', borderRadius: '4px', border: '1px solid #1E293B' }}>
          <button
            onClick={() => onSetViewMode('OPERATIONS_DASHBOARD')}
            style={{
              background: viewMode === 'OPERATIONS_DASHBOARD' ? '#1E293B' : 'transparent',
              color: viewMode === 'OPERATIONS_DASHBOARD' ? '#00E5FF' : '#94A3B8',
              border: 'none',
              borderRadius: '3px',
              padding: '6px 10px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <LayoutDashboard size={14} />
            DASHBOARD
          </button>

          <button
            onClick={() => onSetViewMode('ACCESSIBLE_TABLE')}
            style={{
              background: viewMode === 'ACCESSIBLE_TABLE' ? '#1E293B' : 'transparent',
              color: viewMode === 'ACCESSIBLE_TABLE' ? '#00E5FF' : '#94A3B8',
              border: 'none',
              borderRadius: '3px',
              padding: '6px 10px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <FileText size={14} />
            ARIA TABLE
          </button>
        </div>
      </div>
    </header>
  );
};
