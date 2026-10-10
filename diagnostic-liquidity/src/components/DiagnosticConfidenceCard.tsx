import React from 'react';
import { DiagnosticAssessmentState } from '../types/stateModel';
import { SymptomMatch } from '../types';

interface DiagnosticConfidenceCardProps {
  assessment: DiagnosticAssessmentState;
  symptoms: SymptomMatch[];
  confidenceFilter: number;
  onSetConfidenceFilter: (value: number) => void;
}

export const DiagnosticConfidenceCard: React.FC<DiagnosticConfidenceCardProps> = ({
  assessment,
  symptoms,
  confidenceFilter,
  onSetConfidenceFilter,
}) => {
  const cScore = assessment.confidenceScorePercent;

  return (
    <section aria-label="Diagnostic Confidence Engine" style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleGroupStyle}>
          <span style={iconStyle}>🧠</span>
          <div>
            <h3 style={titleStyle}>Explainable AI Confidence Engine</h3>
            <p style={subtitleStyle}>Pathology pattern matching & symptom verification</p>
          </div>
        </div>
        <div style={scoreBadgeStyle}>
          <span style={scoreLabelStyle}>C_score:</span>
          <span style={scoreValueStyle}>{cScore}%</span>
        </div>
      </div>

      {/* Primary Diagnosis & Confidence Gauge */}
      <div style={diagnosisBoxStyle}>
        <div style={diagnosisLabelStyle}>Primary Diagnosis</div>
        <div style={diagnosisTitleStyle}>{assessment.diseaseDiagnosis}</div>

        <div style={gaugeWrapperStyle}>
          <div style={gaugeHeaderStyle}>
            <span style={gaugeLabelStyle}>Diagnostic Confidence Score</span>
            <span style={{ color: cScore >= 85 ? '#00E676' : '#FFAB00', fontWeight: 700 }}>
              {cScore >= 85 ? 'HIGH CONFIDENCE' : 'MODERATE CONFIDENCE'}
            </span>
          </div>
          <div style={trackStyle}>
            <div
              style={{
                ...fillStyle,
                width: `${cScore}%`,
                background: cScore >= 85 ? '#00E676' : '#FFAB00',
              }}
            />
          </div>
        </div>
      </div>

      {/* Confidence Filter Slider */}
      <div style={sliderContainerStyle}>
        <div style={sliderHeaderStyle}>
          <label htmlFor="confidence-slider" style={sliderLabelStyle}>
            Confidence Threshold Filter: <strong style={{ color: '#00E676' }}>{confidenceFilter}%</strong>
          </label>
          <span style={sliderHintStyle}>Hide regions below threshold</span>
        </div>
        <input
          id="confidence-slider"
          type="range"
          min="0"
          max="100"
          value={confidenceFilter}
          onChange={(e) => onSetConfidenceFilter(Number(e.target.value))}
          style={rangeInputStyle}
        />
      </div>

      {/* Symptom Verification Checklist */}
      <div style={checklistSectionStyle}>
        <h4 style={checklistTitleStyle}>Verified Pathological Symptoms ({symptoms.length})</h4>
        <div style={symptomListStyle}>
          {symptoms.map((symptom) => {
            const isVisible = symptom.matchScorePercent >= confidenceFilter;
            return (
              <div
                key={symptom.id}
                style={{
                  ...symptomCardStyle,
                  opacity: isVisible ? 1 : 0.4,
                  borderColor: symptom.matched ? '#2D3B30' : '#3A2020',
                }}
              >
                <div style={symptomHeaderStyle}>
                  <span
                    style={{
                      ...matchStatusBadgeStyle,
                      background: symptom.matched ? '#00E67622' : '#FF2A6D22',
                      color: symptom.matched ? '#00E676' : '#FF2A6D',
                      borderColor: symptom.matched ? '#00E67666' : '#FF2A6D66',
                    }}
                  >
                    {symptom.matched ? '✓ MATCHED' : '✗ UNMATCHED'}
                  </span>
                  <span style={matchScoreStyle}>{symptom.matchScorePercent}% Match</span>
                </div>
                <div style={symptomNameStyle}>{symptom.symptomName}</div>
                <div style={symptomDescStyle}>{symptom.description}</div>
              </div>
            );
          })}
        </div>
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
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
};

const titleGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.6rem',
};

const iconStyle: React.CSSProperties = {
  fontSize: '1.4rem',
};

const titleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.1rem',
  fontWeight: 600,
  color: '#FFFFFF',
};

const subtitleStyle: React.CSSProperties = {
  margin: '0.15rem 0 0 0',
  fontSize: '0.75rem',
  color: '#8B949E',
};

const scoreBadgeStyle: React.CSSProperties = {
  background: '#1A271E',
  border: '1px solid #00E67644',
  padding: '0.4rem 0.8rem',
  borderRadius: '8px',
  display: 'flex',
  gap: '0.4rem',
  alignItems: 'center',
};

const scoreLabelStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#8B949E',
  fontFamily: 'monospace',
};

const scoreValueStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: 800,
  color: '#00E676',
  fontFamily: 'monospace',
};

const diagnosisBoxStyle: React.CSSProperties = {
  background: '#121A14',
  border: '1px solid #2D3B30',
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1rem',
};

const diagnosisLabelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: '#8B949E',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: '0.25rem',
};

const diagnosisTitleStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  fontWeight: 700,
  color: '#00E676',
  marginBottom: '0.8rem',
};

const gaugeWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
};

const gaugeHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: '0.75rem',
};

const gaugeLabelStyle: React.CSSProperties = {
  color: '#8B949E',
};

const trackStyle: React.CSSProperties = {
  width: '100%',
  height: '8px',
  background: '#090D0A',
  borderRadius: '4px',
  overflow: 'hidden',
};

const fillStyle: React.CSSProperties = {
  height: '100%',
  transition: 'width 0.4s ease',
};

const sliderContainerStyle: React.CSSProperties = {
  background: '#121A14',
  border: '1px solid #2D3B30',
  borderRadius: '8px',
  padding: '0.85rem 1rem',
  marginBottom: '1rem',
};

const sliderHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.5rem',
  fontSize: '0.8rem',
};

const sliderLabelStyle: React.CSSProperties = {
  color: '#E6EDE6',
};

const sliderHintStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: '#8B949E',
};

const rangeInputStyle: React.CSSProperties = {
  width: '100%',
  accentColor: '#00E676',
  cursor: 'pointer',
};

const checklistSectionStyle: React.CSSProperties = {};

const checklistTitleStyle: React.CSSProperties = {
  margin: '0 0 0.75rem 0',
  fontSize: '0.85rem',
  color: '#8B949E',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const symptomListStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.6rem',
};

const symptomCardStyle: React.CSSProperties = {
  background: '#090D0A',
  borderRadius: '6px',
  border: '1px solid #2D3B30',
  padding: '0.75rem',
  transition: 'opacity 0.2s ease',
};

const symptomHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '0.35rem',
};

const matchStatusBadgeStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 700,
  padding: '0.1rem 0.4rem',
  borderRadius: '4px',
  border: '1px solid transparent',
};

const matchScoreStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#E6EDE6',
  fontFamily: 'monospace',
  fontWeight: 600,
};

const symptomNameStyle: React.CSSProperties = {
  fontSize: '0.85rem',
  fontWeight: 600,
  color: '#FFFFFF',
  marginBottom: '0.2rem',
};

const symptomDescStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#8B949E',
};
