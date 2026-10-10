import React from 'react';
import { CycloneCheckpoint, CoastalAsset, ParametricRule } from '../types';
import { calculateHaversineDistance } from '../utils/geo';

interface AccessibleTableFallbackProps {
  checkpoints: CycloneCheckpoint[];
  currentHour: number;
  assets: CoastalAsset[];
  rule: ParametricRule;
  onSelectHour: (hour: number) => void;
}

export const AccessibleTableFallback: React.FC<AccessibleTableFallbackProps> = ({
  checkpoints,
  currentHour,
  assets,
  rule,
  onSelectHour,
}) => {
  const selectedAsset = assets[0];

  return (
    <div
      style={{
        background: '#0B0F19',
        border: '1px solid #1E293B',
        borderRadius: '4px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
      aria-label="Accessible Cyclone Telemetry Table View"
    >
      <div>
        <h2 style={{ margin: 0, fontSize: '1.125rem', color: '#00E5FF', fontFamily: 'JetBrains Mono, monospace' }}>
          ACCESSIBLE TELEMETRY TABLE (WCAG 2.1 AA COMPLIANT)
        </h2>
        <p style={{ color: '#94A3B8', fontSize: '0.875rem', marginTop: '4px' }}>
          Full screen-reader compatible telemetry grid. Target Asset: {selectedAsset.name} (Hazard Radius: {selectedAsset.hazardRadiusKm} km).
        </p>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.85rem',
            textAlign: 'left',
          }}
          aria-describedby="cyclone-telemetry-description"
        >
          <thead>
            <tr style={{ background: '#06080F', borderBottom: '2px solid #1E293B', color: '#94A3B8' }}>
              <th style={{ padding: '10px' }}>FORECAST HOUR</th>
              <th style={{ padding: '10px' }}>COORDINATES</th>
              <th style={{ padding: '10px' }}>WIND (KTS)</th>
              <th style={{ padding: '10px' }}>PRESSURE (HPA)</th>
              <th style={{ padding: '10px' }}>CATEGORY</th>
              <th style={{ padding: '10px' }}>PROXIMITY (KM)</th>
              <th style={{ padding: '10px' }}>TRIGGER STATUS</th>
              <th style={{ padding: '10px' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {checkpoints.map((cp) => {
              const distanceKm = calculateHaversineDistance(cp.lat, cp.lng, selectedAsset.lat, selectedAsset.lng);
              const windMet = cp.windSpeedKts >= rule.minWindSpeedKts;
              const distMet = distanceKm <= rule.maxDistanceKm;
              const isTriggered = windMet && distMet;
              const isSelected = cp.hour === currentHour;

              return (
                <tr
                  key={cp.id}
                  style={{
                    borderBottom: '1px solid #1E293B',
                    background: isSelected ? 'rgba(0, 229, 255, 0.1)' : 'transparent',
                    color: isSelected ? '#00E5FF' : '#F8FAFC',
                  }}
                >
                  <td style={{ padding: '10px', fontWeight: isSelected ? 700 : 400 }}>{cp.timestamp}</td>
                  <td style={{ padding: '10px' }}>{cp.lat}°N, {cp.lng}°W</td>
                  <td style={{ padding: '10px', color: cp.windSpeedKts >= 130 ? '#EF4444' : '#F8FAFC' }}>{cp.windSpeedKts} kts</td>
                  <td style={{ padding: '10px' }}>{cp.pressureHpa} hPa</td>
                  <td style={{ padding: '10px' }}>{cp.category}</td>
                  <td style={{ padding: '10px', color: distanceKm <= 45 ? '#EF4444' : '#94A3B8' }}>{distanceKm} km</td>
                  <td style={{ padding: '10px', fontWeight: 700, color: isTriggered ? '#10B981' : '#64748B' }}>
                    {isTriggered ? '✓ SATISFIED' : '○ PENDING'}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <button
                      onClick={() => onSelectHour(cp.hour)}
                      style={{
                        background: isSelected ? '#00E5FF' : '#1E293B',
                        color: isSelected ? '#06080F' : '#F8FAFC',
                        border: 'none',
                        borderRadius: '3px',
                        padding: '4px 8px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      {isSelected ? 'ACTIVE' : 'SELECT'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
