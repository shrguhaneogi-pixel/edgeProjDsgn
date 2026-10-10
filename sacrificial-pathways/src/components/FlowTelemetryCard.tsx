import React from 'react';
import { HydraulicTelemetryState } from '../types/stateModel';

interface Props {
  telemetry: HydraulicTelemetryState;
  gateStatus: 'OPEN' | 'CLOSED';
}

export const FlowTelemetryCard: React.FC<Props> = ({ telemetry, gateStatus }) => {
  return (
    <div style={{ background: '#161B22', borderRadius: '8px', border: '1px solid #30363D', padding: '1.25rem' }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#F0F6FC', borderBottom: '1px solid #30363D', paddingBottom: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Hydraulic Physics & Formula Telemetry</span>
        <span style={{ fontSize: '0.75rem', color: '#8B949E', fontFamily: 'monospace' }}>Manning Kinematic Engine</span>
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {/* 1. Manning's Flow Velocity Equation */}
        <div style={{ background: '#0D1117', borderRadius: '6px', border: '1px solid #30363D', padding: '1rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#00A3FF', marginBottom: '0.5rem' }}>
            Manning's Kinematic Velocity Equation
          </div>
          <div style={{ fontFamily: 'monospace', background: '#161B22', padding: '0.5rem', borderRadius: '4px', border: '1px solid #30363D', fontSize: '0.825rem', color: '#F0F6FC', marginBottom: '0.75rem', textAlign: 'center' }}>
            V = (1 / n) × R_h^(2/3) × S_0^(1/2)
          </div>
          <div style={{ fontSize: '0.75rem', color: '#8B949E', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Channel Roughness (n):</span>
              <strong style={{ color: '#F0F6FC' }}>0.035 (paved urban channel)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Energy Slope (S_0):</span>
              <strong style={{ color: '#F0F6FC' }}>0.004 m/m</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Calculated Flow Velocity (V):</span>
              <strong style={{ color: '#00A3FF', fontFamily: 'monospace' }}>{telemetry.manningVelocityMPerSec} m/s</strong>
            </div>
          </div>
        </div>

        {/* 2. Sacrificial Weir Channel Diversion Equation */}
        <div style={{ background: '#0D1117', borderRadius: '6px', border: '1px solid #30363D', padding: '1rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FF3D00', marginBottom: '0.5rem' }}>
            Broad-Crested Weir Gate Equation
          </div>
          <div style={{ fontFamily: 'monospace', background: '#161B22', padding: '0.5rem', borderRadius: '4px', border: '1px solid #30363D', fontSize: '0.825rem', color: '#F0F6FC', marginBottom: '0.75rem', textAlign: 'center' }}>
            Q_sacrificial = C_d × b × (h_river - h_gate)^(3/2)
          </div>
          <div style={{ fontSize: '0.75rem', color: '#8B949E', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Gate Crest Width (b):</span>
              <strong style={{ color: '#F0F6FC' }}>15.0 m</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Discharge Coefficient (C_d):</span>
              <strong style={{ color: '#F0F6FC' }}>1.84</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Diverted Channel Flow (Q):</span>
              <strong style={{ color: gateStatus === 'OPEN' ? '#FF3D00' : '#8B949E', fontFamily: 'monospace' }}>
                {telemetry.divertedFlowM3PerSec} m³/s ({gateStatus})
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
