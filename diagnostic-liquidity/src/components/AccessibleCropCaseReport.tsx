import React from 'react';
import { CropPhotoSample, ClaimStatus } from '../types';
import { DiagnosticAssessmentState } from '../types/stateModel';

interface AccessibleCropCaseReportProps {
  sample: CropPhotoSample;
  assessment: DiagnosticAssessmentState;
  claimStatus: ClaimStatus;
}

export const AccessibleCropCaseReport: React.FC<AccessibleCropCaseReportProps> = ({
  sample,
  assessment,
  claimStatus,
}) => {
  return (
    <div
      role="region"
      aria-label="Accessible Agricultural Crop Case Report"
      tabIndex={0}
      style={containerStyle}
    >
      <div style={bannerStyle}>
        <span style={bannerTagStyle}>ACCESSIBLE ARIA REPORT VIEW</span>
        <h2 style={reportTitleStyle}>{sample.plotName} Case Summary</h2>
        <p style={reportSubtitleStyle}>Structured data alternative for screen readers & high-contrast view</p>
      </div>

      {/* General Case Meta */}
      <section style={sectionStyle} aria-labelledby="case-meta-heading">
        <h3 id="case-meta-heading" style={sectionTitleStyle}>1. Case & Plot Metadata</h3>
        <dl style={dlGridStyle}>
          <div style={dlGroupStyle}>
            <dt style={dtStyle}>Farmer / Landholder:</dt>
            <dd style={ddStyle}>{sample.farmerName}</dd>
          </div>
          <div style={dlGroupStyle}>
            <dt style={dtStyle}>Plot Identifier:</dt>
            <dd style={ddStyle}>{sample.plotName}</dd>
          </div>
          <div style={dlGroupStyle}>
            <dt style={dtStyle}>Crop Specie:</dt>
            <dd style={ddStyle}>{sample.cropType}</dd>
          </div>
          <div style={dlGroupStyle}>
            <dt style={dtStyle}>Field Area:</dt>
            <dd style={ddStyle}>{sample.plotHectares.toFixed(1)} Hectares</dd>
          </div>
          <div style={dlGroupStyle}>
            <dt style={dtStyle}>Primary Diagnosis:</dt>
            <dd style={{ ...ddStyle, color: '#00E676', fontWeight: 700 }}>{sample.diseaseDiagnosis}</dd>
          </div>
          <div style={dlGroupStyle}>
            <dt style={dtStyle}>Overall Diagnostic Confidence:</dt>
            <dd style={ddStyle}>{assessment.confidenceScorePercent}% Score</dd>
          </div>
        </dl>
      </section>

      {/* Detected Bounding Boxes Table */}
      <section style={sectionStyle} aria-labelledby="boxes-heading">
        <h3 id="boxes-heading" style={sectionTitleStyle}>
          2. Detected Pathological Lesion Regions ({sample.boundingBoxes.length})
        </h3>
        {sample.boundingBoxes.length === 0 ? (
          <p style={noDataStyle}>No lesion bounding boxes detected. Crop canopy evaluated as healthy.</p>
        ) : (
          <div style={tableWrapperStyle}>
            <table style={tableStyle} aria-label="Detected Lesion Regions Data Table">
              <thead>
                <tr>
                  <th scope="col" style={thStyle}>Region ID</th>
                  <th scope="col" style={thStyle}>Lesion Label</th>
                  <th scope="col" style={thStyle}>Severity Level</th>
                  <th scope="col" style={thStyle}>Confidence %</th>
                  <th scope="col" style={thStyle}>Grid Box [X, Y, W, H]</th>
                </tr>
              </thead>
              <tbody>
                {sample.boundingBoxes.map((box) => (
                  <tr key={box.id} style={trStyle}>
                    <td style={tdCodeStyle}>{box.id}</td>
                    <td style={tdStyle}>{box.label}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          color: box.severityLevel === 'SEVERE' ? '#FF2A6D' : '#FFAB00',
                          fontWeight: 700,
                        }}
                      >
                        {box.severityLevel}
                      </span>
                    </td>
                    <td style={tdCodeStyle}>{box.confidencePercent}%</td>
                    <td style={tdCodeStyle}>
                      [{box.x}, {box.y}, {box.width}, {box.height}]
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Symptoms Match Table */}
      <section style={sectionStyle} aria-labelledby="symptoms-heading">
        <h3 id="symptoms-heading" style={sectionTitleStyle}>
          3. Verified Pathological Symptoms ({sample.symptoms.length})
        </h3>
        <div style={tableWrapperStyle}>
          <table style={tableStyle} aria-label="Verified Symptoms Data Table">
            <thead>
              <tr>
                <th scope="col" style={thStyle}>Symptom Criterion</th>
                <th scope="col" style={thStyle}>Verification Status</th>
                <th scope="col" style={thStyle}>Pattern Match Score</th>
                <th scope="col" style={thStyle}>Diagnostic Explanation</th>
              </tr>
            </thead>
            <tbody>
              {sample.symptoms.map((symptom) => (
                <tr key={symptom.id} style={trStyle}>
                  <td style={{ ...tdStyle, fontWeight: 600 }}>{symptom.symptomName}</td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        color: symptom.matched ? '#00E676' : '#FF2A6D',
                        fontWeight: 700,
                      }}
                    >
                      {symptom.matched ? '✓ MATCHED' : '✗ UNMATCHED'}
                    </span>
                  </td>
                  <td style={tdCodeStyle}>{symptom.matchScorePercent}%</td>
                  <td style={tdStyle}>{symptom.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Parametric Settlement Breakdown Table */}
      <section style={sectionStyle} aria-labelledby="settlement-heading">
        <h3 id="settlement-heading" style={sectionTitleStyle}>4. Parametric Claim Settlement Breakdown</h3>
        <div style={tableWrapperStyle}>
          <table style={tableStyle} aria-label="Parametric Settlement Breakdown Table">
            <tbody>
              <tr style={trStyle}>
                <th scope="row" style={thStyle}>Current Claim Status</th>
                <td style={{ ...tdCodeStyle, color: '#00E676' }}>{claimStatus}</td>
              </tr>
              <tr style={trStyle}>
                <th scope="row" style={thStyle}>Evaluated Damage Ratio (D_ratio)</th>
                <td style={tdCodeStyle}>{assessment.damageSeverityPercent}%</td>
              </tr>
              <tr style={trStyle}>
                <th scope="row" style={thStyle}>Parametric Eligibility Threshold (D_threshold)</th>
                <td style={tdCodeStyle}>15% Damage Ratio</td>
              </tr>
              <tr style={trStyle}>
                <th scope="row" style={thStyle}>Base Subsidy Rate per Hectare</th>
                <td style={tdCodeStyle}>${sample.baseSubsidyRatePerHectareUsd} USD / ha</td>
              </tr>
              <tr style={trStyle}>
                <th scope="row" style={thStyle}>Total Eligible Subsidy Dispatched (P_subsidy)</th>
                <td
                  style={{
                    ...tdCodeStyle,
                    color: assessment.eligibleSubsidyUsd > 0 ? '#00E676' : '#8B949E',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                  }}
                >
                  ${assessment.eligibleSubsidyUsd.toLocaleString()} USD
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#0F1410',
  borderRadius: '12px',
  border: '2px solid #00E676',
  padding: '1.5rem',
  marginBottom: '1.5rem',
  color: '#FFFFFF',
};

const bannerStyle: React.CSSProperties = {
  borderBottom: '1px solid #2D3B30',
  paddingBottom: '1rem',
  marginBottom: '1.5rem',
};

const bannerTagStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 800,
  color: '#00E676',
  background: '#00E67622',
  padding: '0.2rem 0.6rem',
  borderRadius: '4px',
  border: '1px solid #00E67666',
};

const reportTitleStyle: React.CSSProperties = {
  margin: '0.5rem 0 0.25rem 0',
  fontSize: '1.3rem',
  fontWeight: 700,
  color: '#FFFFFF',
};

const reportSubtitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '0.8rem',
  color: '#8B949E',
};

const sectionStyle: React.CSSProperties = {
  marginBottom: '1.5rem',
};

const sectionTitleStyle: React.CSSProperties = {
  margin: '0 0 0.75rem 0',
  fontSize: '0.95rem',
  color: '#00E676',
  fontWeight: 700,
};

const dlGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
  gap: '1rem',
  background: '#121A14',
  padding: '1rem',
  borderRadius: '8px',
  border: '1px solid #2D3B30',
  margin: 0,
};

const dlGroupStyle: React.CSSProperties = {};

const dtStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: '#8B949E',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const ddStyle: React.CSSProperties = {
  margin: '0.2rem 0 0 0',
  fontSize: '0.95rem',
  fontWeight: 600,
  color: '#E6EDE6',
};

const tableWrapperStyle: React.CSSProperties = {
  overflowX: 'auto',
  background: '#121A14',
  borderRadius: '8px',
  border: '1px solid #2D3B30',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  textAlign: 'left',
  fontSize: '0.85rem',
};

const thStyle: React.CSSProperties = {
  background: '#1A271E',
  color: '#E6EDE6',
  fontWeight: 600,
  padding: '0.65rem 0.85rem',
  borderBottom: '1px solid #2D3B30',
};

const trStyle: React.CSSProperties = {
  borderBottom: '1px solid #1F2C21',
};

const tdStyle: React.CSSProperties = {
  padding: '0.65rem 0.85rem',
  color: '#E6EDE6',
};

const tdCodeStyle: React.CSSProperties = {
  padding: '0.65rem 0.85rem',
  fontFamily: 'monospace',
  color: '#00E676',
};

const noDataStyle: React.CSSProperties = {
  color: '#8B949E',
  fontStyle: 'italic',
  padding: '0.5rem',
};
