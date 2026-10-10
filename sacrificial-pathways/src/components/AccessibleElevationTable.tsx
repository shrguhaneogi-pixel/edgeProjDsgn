import React, { useState } from 'react';
import { SectorRiskCalculation } from '../types';

interface Props {
  sectorRisks: SectorRiskCalculation[];
  gateStatus: 'OPEN' | 'CLOSED';
  dischargeM3PerSec: number;
}

type SortField = 'sectorName' | 'elevationMeters' | 'inundationDepthMeters' | 'riskScorePercent' | 'exposedAssetValueUsd';

export const AccessibleElevationTable: React.FC<Props> = ({ sectorRisks, gateStatus, dischargeM3PerSec }) => {
  const [sortField, setSortField] = useState<SortField>('riskScorePercent');
  const [sortAscending, setSortAscending] = useState(false);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAscending(!sortAscending);
    } else {
      setSortField(field);
      setSortAscending(false);
    }
  };

  const sortedRisks = [...sectorRisks].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (typeof valA === 'string') valA = (valA as string).toLowerCase();
    if (typeof valB === 'string') valB = (valB as string).toLowerCase();

    if (valA < valB) return sortAscending ? -1 : 1;
    if (valA > valB) return sortAscending ? 1 : -1;
    return 0;
  });

  return (
    <div style={{ background: '#161B22', borderRadius: '8px', border: '1px solid #30363D', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #30363D', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1rem', color: '#F0F6FC' }}>
            Accessible Sector Elevation & Inundation Data Matrix
          </h3>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: '#8B949E' }}>
            Linear accessible tabular format for screen reader devices & non-canvas navigation.
          </p>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#8B949E', fontFamily: 'monospace' }}>
          ARIA Table Mode (`role="table"`)
        </div>
      </div>

      {/* Screen Reader ARIA Live Region */}
      <div
        aria-live="polite"
        role="status"
        style={{
          padding: '0.6rem 0.85rem',
          background: '#0D1117',
          borderRadius: '4px',
          border: '1px solid #30363D',
          fontSize: '0.8rem',
          color: '#00A3FF',
          marginBottom: '1rem'
        }}
      >
        <strong>Accessible Status Announcement:</strong> Peak Surge Discharge is {dischargeM3PerSec} m³/s. Sacrificial Bypass Gate is {gateStatus}.
      </div>

      {/* HTML Table */}
      <div style={{ overflowX: 'auto' }}>
        <table
          role="table"
          aria-label="Sector Elevation & Inundation Data Matrix"
          style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem', textAlign: 'left' }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid #30363D', background: '#0D1117', color: '#8B949E' }}>
              <th
                onClick={() => handleSort('sectorName')}
                style={{ padding: '0.75rem 0.5rem', cursor: 'pointer', userSelect: 'none' }}
              >
                Sector Name {sortField === 'sectorName' ? (sortAscending ? '▲' : '▼') : ''}
              </th>
              <th style={{ padding: '0.75rem 0.5rem' }}>Category</th>
              <th
                onClick={() => handleSort('elevationMeters')}
                style={{ padding: '0.75rem 0.5rem', cursor: 'pointer', userSelect: 'none' }}
              >
                Elevation {sortField === 'elevationMeters' ? (sortAscending ? '▲' : '▼') : ''}
              </th>
              <th
                onClick={() => handleSort('inundationDepthMeters')}
                style={{ padding: '0.75rem 0.5rem', cursor: 'pointer', userSelect: 'none' }}
              >
                Inundation Depth {sortField === 'inundationDepthMeters' ? (sortAscending ? '▲' : '▼') : ''}
              </th>
              <th
                onClick={() => handleSort('riskScorePercent')}
                style={{ padding: '0.75rem 0.5rem', cursor: 'pointer', userSelect: 'none' }}
              >
                Risk Score {sortField === 'riskScorePercent' ? (sortAscending ? '▲' : '▼') : ''}
              </th>
              <th
                onClick={() => handleSort('exposedAssetValueUsd')}
                style={{ padding: '0.75rem 0.5rem', cursor: 'pointer', userSelect: 'none' }}
              >
                Exposed Valuation {sortField === 'exposedAssetValueUsd' ? (sortAscending ? '▲' : '▼') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRisks.map(risk => {
              const statusColor = risk.riskStatus === 'CRITICAL' ? '#FF2A6D' : risk.riskStatus === 'WARNING' ? '#FFAB00' : '#00E676';
              return (
                <tr key={risk.sectorId} style={{ borderBottom: '1px solid #21262D' }}>
                  <td style={{ padding: '0.75rem 0.5rem', fontWeight: 600, color: '#F0F6FC' }}>
                    {risk.sectorName}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', color: '#8B949E' }}>
                    {risk.category}
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace' }}>
                    {risk.elevationMeters}m
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', color: risk.inundationDepthMeters > 0 ? '#FF2A6D' : '#00E676' }}>
                    {risk.inundationDepthMeters}m
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem' }}>
                    <span style={{ padding: '0.15rem 0.4rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', color: statusColor, background: `${statusColor}20`, border: `1px solid ${statusColor}` }}>
                      {risk.riskStatus} ({risk.riskScorePercent}%)
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem 0.5rem', fontFamily: 'monospace', fontWeight: 600 }}>
                    ${(risk.exposedAssetValueUsd / 1_000_000).toFixed(1)}M USD
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
