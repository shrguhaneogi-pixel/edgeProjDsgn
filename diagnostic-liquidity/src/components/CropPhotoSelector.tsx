import React from 'react';
import { CropPhotoSample } from '../types';
import { calculateParametricSubsidyPayout } from '../utils/diagnosticEvaluator';

interface CropPhotoSelectorProps {
  samples: CropPhotoSample[];
  selectedSampleId: string;
  onSelectSample: (sampleId: string) => void;
}

export const CropPhotoSelector: React.FC<CropPhotoSelectorProps> = ({
  samples,
  selectedSampleId,
  onSelectSample,
}) => {
  return (
    <section aria-label="Crop Photo Case Selection" style={containerStyle}>
      <div style={headerStyle}>
        <span style={headerIconStyle}>🌾</span>
        <h2 style={titleStyle}>Agricultural Case Intake</h2>
        <span style={badgeCountStyle}>{samples.length} Cases Loaded</span>
      </div>

      <div style={gridStyle}>
        {samples.map((sample) => {
          const isSelected = sample.id === selectedSampleId;
          const isHealthy = sample.damageSeverityPercent < 15;
          const isCritical = sample.damageSeverityPercent >= 50;

          const { eligibleSubsidyUsd } = calculateParametricSubsidyPayout(
            sample.damageSeverityPercent,
            sample.plotHectares,
            sample.baseSubsidyRatePerHectareUsd
          );

          const cardBorderColor = isSelected
            ? '#00E676'
            : isCritical
            ? '#FF2A6D'
            : '#2D3B30';

          return (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample.id)}
              style={{
                ...cardStyle,
                borderColor: cardBorderColor,
                boxShadow: isSelected ? '0 0 12px rgba(0, 230, 118, 0.25)' : 'none',
                background: isSelected ? '#1A271E' : '#121A14',
              }}
              aria-pressed={isSelected}
            >
              <div style={cardHeaderStyle}>
                <span style={cropBadgeStyle}>{sample.cropType}</span>
                <span
                  style={{
                    ...severityBadgeStyle,
                    background: isHealthy ? '#00E67622' : isCritical ? '#FF2A6D22' : '#FFAB0022',
                    color: isHealthy ? '#00E676' : isCritical ? '#FF2A6D' : '#FFAB00',
                    borderColor: isHealthy ? '#00E67666' : isCritical ? '#FF2A6D66' : '#FFAB0066',
                  }}
                >
                  {isHealthy ? 'HEALTHY' : isCritical ? 'CRITICAL' : 'SEVERE'}
                </span>
              </div>

              <h3 style={caseTitleStyle}>{sample.plotName}</h3>
              <p style={locationStyle}>👤 {sample.farmerName}</p>

              <div style={pathologyBoxStyle}>
                <span style={pathologyLabel}>Diagnosis:</span>
                <span style={pathologyValue}>{sample.diseaseDiagnosis}</span>
              </div>

              <div style={metricsRowStyle}>
                <div>
                  <div style={metricLabelStyle}>Damage Ratio (D_ratio)</div>
                  <div style={metricValueStyle}>{sample.damageSeverityPercent}%</div>
                </div>
                <div>
                  <div style={metricLabelStyle}>Est. Payout</div>
                  <div
                    style={{
                      ...metricValueStyle,
                      color: eligibleSubsidyUsd > 0 ? '#00E676' : '#8B949E',
                    }}
                  >
                    ${eligibleSubsidyUsd.toLocaleString()} USD
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#0F1410',
  borderRadius: '12px',
  border: '1px solid #2D3B30',
  padding: '1.25rem',
  marginBottom: '1.5rem',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '1rem',
};

const headerIconStyle: React.CSSProperties = {
  fontSize: '1.25rem',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#E6EDE6',
};

const badgeCountStyle: React.CSSProperties = {
  marginLeft: 'auto',
  fontSize: '0.75rem',
  background: '#1A271E',
  color: '#00E676',
  padding: '0.2rem 0.6rem',
  borderRadius: '12px',
  border: '1px solid #2D3B30',
  fontFamily: 'monospace',
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
  gap: '1rem',
};

const cardStyle: React.CSSProperties = {
  textAlign: 'left',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #2D3B30',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  outline: 'none',
};

const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem',
};

const cropBadgeStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  color: '#8B949E',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const severityBadgeStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 600,
  padding: '0.15rem 0.5rem',
  borderRadius: '4px',
  border: '1px solid transparent',
};

const caseTitleStyle: React.CSSProperties = {
  margin: '0 0 0.25rem 0',
  fontSize: '0.95rem',
  color: '#FFFFFF',
  fontWeight: 600,
};

const locationStyle: React.CSSProperties = {
  margin: '0 0 0.75rem 0',
  fontSize: '0.75rem',
  color: '#8B949E',
};

const pathologyBoxStyle: React.CSSProperties = {
  background: '#090D0A',
  padding: '0.4rem 0.6rem',
  borderRadius: '4px',
  marginBottom: '0.75rem',
  display: 'flex',
  gap: '0.4rem',
  fontSize: '0.75rem',
};

const pathologyLabel: React.CSSProperties = {
  color: '#8B949E',
};

const pathologyValue: React.CSSProperties = {
  color: '#E6EDE6',
  fontWeight: 500,
};

const metricsRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  borderTop: '1px solid #2D3B30',
  paddingTop: '0.5rem',
};

const metricLabelStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  color: '#8B949E',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const metricValueStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: 700,
  color: '#E6EDE6',
  fontFamily: 'monospace',
};
