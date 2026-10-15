import React from 'react';
import { HorizonObservation } from '../types';

interface AccessibleObservationListProps {
  observations: HorizonObservation[];
  activeObservationId: string;
  onSelectObservation: (id: string) => void;
}

export const AccessibleObservationList: React.FC<AccessibleObservationListProps> = ({
  observations,
  activeObservationId,
  onSelectObservation,
}) => {
  return (
    <div
      style={{
        background: '#1E293B',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #334155',
        overflowX: 'auto',
      }}
      role="region"
      aria-label="Accessible observations data table"
    >
      <div style={{ marginBottom: '12px' }}>
        <h2 style={{ margin: 0, fontSize: '16px', color: '#F8FAFC' }}>
          Accessible Observation Records (Tabular View)
        </h2>
        <span style={{ fontSize: '11px', color: '#94A3B8' }}>
          Full screen-reader compatible alternative to interactive spatial canvas.
        </span>
      </div>

      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '12px',
          color: '#F8FAFC',
          textAlign: 'left',
        }}
      >
        <thead>
          <tr style={{ borderBottom: '1px solid #475569', color: '#94A3B8' }}>
            <th style={{ padding: '8px' }}>Neighborhood</th>
            <th style={{ padding: '8px' }}>Hour (UTC)</th>
            <th style={{ padding: '8px' }}>Optical Attenuation</th>
            <th style={{ padding: '8px' }}>Est. Range</th>
            <th style={{ padding: '8px' }}>Ground PM2.5</th>
            <th style={{ padding: '8px' }}>Humidity</th>
            <th style={{ padding: '8px' }}>Data Source</th>
            <th style={{ padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {observations.map((obs) => {
            const isSelected = obs.id === activeObservationId;

            return (
              <tr
                key={obs.id}
                style={{
                  borderBottom: '1px solid #334155',
                  backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                }}
              >
                <td style={{ padding: '8px', fontWeight: 600 }}>{obs.neighborhood}</td>
                <td style={{ padding: '8px', fontFamily: 'monospace' }}>{String(obs.hour).padStart(2, '0')}:00</td>
                <td style={{ padding: '8px', color: '#FFD600', fontFamily: 'monospace' }}>
                  {(obs.opticalAttenuation * 100).toFixed(0)}%
                </td>
                <td style={{ padding: '8px', color: '#38BDF8', fontFamily: 'monospace' }}>
                  {obs.visibilityEstimateKm} km
                </td>
                <td style={{ padding: '8px', fontFamily: 'monospace', color: obs.calibratedPM25 !== null ? '#4ADE80' : '#64748B' }}>
                  {obs.calibratedPM25 !== null ? `${obs.calibratedPM25} µg/m³` : 'Visual Proxy Only'}
                </td>
                <td style={{ padding: '8px' }}>{obs.humidityPercent}%</td>
                <td style={{ padding: '8px', fontSize: '11px', color: '#94A3B8' }}>{obs.sensorSource}</td>
                <td style={{ padding: '8px' }}>
                  <button
                    type="button"
                    onClick={() => onSelectObservation(obs.id)}
                    style={{
                      background: isSelected ? '#38BDF8' : 'rgba(255, 255, 255, 0.08)',
                      color: isSelected ? '#0F172A' : '#F8FAFC',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '4px 8px',
                      fontSize: '11px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    {isSelected ? 'Inspecting' : 'Select'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
