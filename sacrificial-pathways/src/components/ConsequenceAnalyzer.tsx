import React from 'react';
import { SectorRiskCalculation } from '../types';

interface Props {
  sectorRisks: SectorRiskCalculation[];
  gateStatus: 'OPEN' | 'CLOSED';
  selectedSectorId: string | null;
  onSelectSector: (id: string) => void;
}

export const ConsequenceAnalyzer: React.FC<Props> = ({
  sectorRisks,
  gateStatus,
  selectedSectorId,
  onSelectSector
}) => {
  const totalExposedValueUsd = sectorRisks.reduce((sum, s) => sum + s.exposedAssetValueUsd, 0);

  return (
    <div style={{ background: '#161B22', borderRadius: '8px', border: '1px solid #30363D', padding: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #30363D', paddingBottom: '0.75rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', color: '#F0F6FC' }}>
          Sector Consequence & Asset Exposure Analysis
        </h3>
        <div style={{ fontSize: '0.825rem', color: '#8B949E' }}>
          Total Asset Risk Exposure:{' '}
          <strong style={{ color: '#FF2A6D', fontFamily: 'monospace', fontSize: '0.95rem' }}>
            ${(totalExposedValueUsd / 1_000_000).toFixed(1)}M USD
          </strong>
        </div>
      </div>

      {/* Sector Exposure Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.25rem' }}>
        {sectorRisks.map(risk => {
          const isSelected = selectedSectorId === risk.sectorId;
          const statusColor = risk.riskStatus === 'CRITICAL' ? '#FF2A6D' : risk.riskStatus === 'WARNING' ? '#FFAB00' : '#00E676';

          return (
            <div
              key={risk.sectorId}
              onClick={() => onSelectSector(risk.sectorId)}
              style={{
                background: isSelected ? 'rgba(255, 61, 0, 0.08)' : '#0D1117',
                borderRadius: '6px',
                border: isSelected ? '2px solid #FF3D00' : '1px solid #30363D',
                padding: '0.85rem 1rem',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.85rem', color: isSelected ? '#FFFFFF' : '#F0F6FC' }}>
                  {risk.sectorName}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 'bold',
                    padding: '0.15rem 0.4rem',
                    borderRadius: '4px',
                    color: statusColor,
                    background: `${statusColor}20`,
                    border: `1px solid ${statusColor}`
                  }}
                >
                  {risk.riskStatus} ({risk.riskScorePercent}%)
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8B949E', marginBottom: '0.35rem' }}>
                <span>Elevation / Depth:</span>
                <strong style={{ color: '#F0F6FC', fontFamily: 'monospace' }}>
                  {risk.elevationMeters}m / {risk.inundationDepthMeters}m depth
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8B949E' }}>
                <span>Exposed Valuation:</span>
                <strong style={{ color: risk.exposedAssetValueUsd > 0 ? '#FF2A6D' : '#00E676', fontFamily: 'monospace' }}>
                  ${(risk.exposedAssetValueUsd / 1_000_000).toFixed(1)}M / ${(risk.assetValueUsd / 1_000_000).toFixed(0)}M
                </strong>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sacrificial Diversion Trade-off Summary Callout */}
      <div
        style={{
          background: gateStatus === 'OPEN' ? 'rgba(255, 61, 0, 0.1)' : 'rgba(255, 42, 109, 0.1)',
          border: `1px solid ${gateStatus === 'OPEN' ? '#FF3D00' : '#FF2A6D'}`,
          borderRadius: '6px',
          padding: '1rem',
          fontSize: '0.825rem',
          lineHeight: 1.4,
          color: '#F0F6FC'
        }}
      >
        <div style={{ fontWeight: 'bold', color: gateStatus === 'OPEN' ? '#FF3D00' : '#FF2A6D', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>Sacrificial Bypass Channel Trade-off Rationale</span>
          <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>(Gate: {gateStatus})</span>
        </div>
        {gateStatus === 'OPEN' ? (
          <span>
            Sacrificial bypass gate is <strong>OPEN (`#FF3D00`)</strong>. Diverting 520 m³/s into the agricultural retention basin increases rural meadow inundation depth, but reduces downstream commercial inundation depth by <strong>1.4 meters</strong>, preventing an estimated <strong>$135M USD</strong> in urban infrastructure damage.
          </span>
        ) : (
          <span>
            Sacrificial bypass gate is <strong>CLOSED</strong>. Natural river channel carries full surge discharge (1,600 m³/s), leading to heavy overtopping in the high-density Downtown Commercial Core ($168M USD exposure).
          </span>
        )}
      </div>
    </div>
  );
};
