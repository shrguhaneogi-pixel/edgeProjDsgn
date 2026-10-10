import React from 'react';
import { AppAction, AppState } from '../types/stateModel';

interface Props {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const RouteSelector: React.FC<Props> = ({ state, dispatch }) => {
  const { activeScenarioId, gateStatus, dischargeM3PerSec, waterLevelOffsetMeters, isAnimating, scenarios } = state;

  return (
    <div style={{ background: '#161B22', borderRadius: '8px', border: '1px solid #30363D', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <h3 style={{ margin: 0, fontSize: '1rem', color: '#F0F6FC', borderBottom: '1px solid #30363D', paddingBottom: '0.75rem' }}>
        Hydraulic Scenario & Gate Controls
      </h3>

      {/* 1. Scenario Selector Buttons */}
      <div>
        <label style={{ display: 'block', fontSize: '0.8rem', color: '#8B949E', marginBottom: '0.5rem', fontWeight: 600 }}>
          Select Flood Scenario
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {scenarios.map(scenario => {
            const isSelected = activeScenarioId === scenario.id;
            return (
              <button
                key={scenario.id}
                onClick={() => dispatch({ type: 'SELECT_SCENARIO', payload: scenario.id })}
                style={{
                  textAlign: 'left',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '6px',
                  border: isSelected ? '2px solid #FF3D00' : '1px solid #30363D',
                  background: isSelected ? 'rgba(255, 61, 0, 0.12)' : '#0D1117',
                  color: isSelected ? '#FFFFFF' : '#8B949E',
                  cursor: 'pointer',
                  fontSize: '0.825rem',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontWeight: 600, color: isSelected ? '#FF3D00' : '#F0F6FC', marginBottom: '0.2rem' }}>
                  {scenario.name}
                </div>
                <div style={{ fontSize: '0.75rem', opacity: 0.85, lineHeight: 1.3 }}>
                  {scenario.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Sacrificial Gate Toggle Button */}
      <div style={{ padding: '1rem', background: '#0D1117', borderRadius: '6px', border: '1px solid #30363D' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F0F6FC' }}>
            Sacrificial Diversion Gate
          </span>
          <span
            style={{
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              background: gateStatus === 'OPEN' ? 'rgba(255, 61, 0, 0.2)' : 'rgba(255, 42, 109, 0.2)',
              color: gateStatus === 'OPEN' ? '#FF3D00' : '#FF2A6D',
              border: `1px solid ${gateStatus === 'OPEN' ? '#FF3D00' : '#FF2A6D'}`
            }}
          >
            {gateStatus}
          </span>
        </div>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_SACRIFICIAL_GATE' })}
          style={{
            width: '100%',
            padding: '0.6rem',
            borderRadius: '6px',
            border: 'none',
            background: gateStatus === 'OPEN' ? '#FF3D00' : '#238636',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          {gateStatus === 'OPEN' ? 'CLOSE Sacrificial Gate' : 'OPEN Sacrificial Bypass Gate (#FF3D00)'}
        </button>
      </div>

      {/* 3. Hydraulic Discharge Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#8B949E', marginBottom: '0.35rem' }}>
          <span>Peak Surge Discharge (Q)</span>
          <strong style={{ color: '#00A3FF', fontFamily: 'monospace' }}>{dischargeM3PerSec} m³/s</strong>
        </div>
        <input
          type="range"
          min={500}
          max={3000}
          step={50}
          value={dischargeM3PerSec}
          onChange={e => dispatch({ type: 'SET_DISCHARGE_RATE', payload: Number(e.target.value) })}
          style={{ width: '100%', accentColor: '#00A3FF', cursor: 'pointer' }}
        />
      </div>

      {/* 4. Water Level Offset Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#8B949E', marginBottom: '0.35rem' }}>
          <span>Datum Water Offset (h)</span>
          <strong style={{ color: '#00E676', fontFamily: 'monospace' }}>{waterLevelOffsetMeters > 0 ? `+${waterLevelOffsetMeters}` : waterLevelOffsetMeters} m</strong>
        </div>
        <input
          type="range"
          min={-2.0}
          max={3.0}
          step={0.25}
          value={waterLevelOffsetMeters}
          onChange={e => dispatch({ type: 'SET_WATER_LEVEL_OFFSET', payload: Number(e.target.value) })}
          style={{ width: '100%', accentColor: '#00E676', cursor: 'pointer' }}
        />
      </div>

      {/* 5. Animation & Reset Actions */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <button
          onClick={() => dispatch({ type: 'TOGGLE_ANIMATION' })}
          style={{
            flex: 1,
            padding: '0.5rem',
            background: '#0D1117',
            border: '1px solid #30363D',
            color: '#8B949E',
            borderRadius: '4px',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          {isAnimating ? 'Pause Flow Anim' : 'Play Flow Anim'}
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET_SIMULATION' })}
          style={{
            flex: 1,
            padding: '0.5rem',
            background: '#0D1117',
            border: '1px solid #30363D',
            color: '#8B949E',
            borderRadius: '4px',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          Reset Simulation
        </button>
      </div>
    </div>
  );
};
