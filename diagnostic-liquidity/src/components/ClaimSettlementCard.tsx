import React from 'react';
import { ClaimStatus, CropPhotoSample } from '../types';
import { DiagnosticAssessmentState } from '../types/stateModel';

interface ClaimSettlementCardProps {
  sample: CropPhotoSample;
  assessment: DiagnosticAssessmentState;
  claimStatus: ClaimStatus;
  onAdvanceStatus: () => void;
  onResetState: () => void;
}

const CLAIM_STEPS: { status: ClaimStatus; label: string; icon: string }[] = [
  { status: 'DRAFT', label: 'Draft Intake', icon: '📝' },
  { status: 'INTAKE_SUBMITTED', label: 'Photo Uploaded', icon: '📷' },
  { status: 'DIAGNOSTIC_EVALUATED', label: 'AI Diagnosed', icon: '🔬' },
  { status: 'ADJUDICATION_PENDING', label: 'Adjudicated', icon: '⚡' },
  { status: 'SUBSIDY_DISPATCHED', label: 'Dispatched', icon: '💸' },
  { status: 'SETTLED', label: 'Settled', icon: '✅' },
];

export const ClaimSettlementCard: React.FC<ClaimSettlementCardProps> = ({
  sample,
  assessment,
  claimStatus,
  onAdvanceStatus,
  onResetState,
}) => {
  const currentStepIndex = CLAIM_STEPS.findIndex((s) => s.status === claimStatus);
  const isFullySettled = claimStatus === 'SETTLED';

  const dRatio = sample.damageSeverityPercent;
  const dThreshold = 15;
  const hectares = sample.plotHectares;
  const baseRate = sample.baseSubsidyRatePerHectareUsd;
  const maxPotential = hectares * baseRate;

  return (
    <section aria-label="Parametric Subsidy Claim Settlement" style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleGroupStyle}>
          <span style={iconStyle}>💸</span>
          <div>
            <h3 style={titleStyle}>Parametric Claim Settlement Rail</h3>
            <p style={subtitleStyle}>Algorithmic crop insurance disbursement engine</p>
          </div>
        </div>
        <div
          style={{
            ...statusBadgeStyle,
            background: assessment.isThresholdMet ? '#00E67622' : '#8B949E22',
            color: assessment.isThresholdMet ? '#00E676' : '#8B949E',
            borderColor: assessment.isThresholdMet ? '#00E67666' : '#8B949E66',
          }}
        >
          {assessment.isThresholdMet ? 'ELIGIBLE FOR PAYOUT' : 'BELOW THRESHOLD (0 USD)'}
        </div>
      </div>

      {/* Parametric Formula Card */}
      <div style={formulaBoxStyle}>
        <div style={formulaTitleStyle}>📐 Parametric Subsidy Formula Card</div>
        <div style={formulaCodeStyle}>
          P_subsidy = BaseRate × Hectares × [(D_ratio - D_threshold) / (1 - D_threshold)]
        </div>

        <div style={paramsGridStyle}>
          <div style={paramItemStyle}>
            <span style={paramLabelStyle}>Damage Ratio (D_ratio)</span>
            <span style={paramValueStyle}>{dRatio}%</span>
          </div>
          <div style={paramItemStyle}>
            <span style={paramLabelStyle}>Eligibility Threshold</span>
            <span style={paramValueStyle}>{dThreshold}%</span>
          </div>
          <div style={paramItemStyle}>
            <span style={paramLabelStyle}>Field Area (Hectares)</span>
            <span style={paramValueStyle}>{hectares.toFixed(1)} ha</span>
          </div>
          <div style={paramItemStyle}>
            <span style={paramLabelStyle}>Base Rate / Hectare</span>
            <span style={paramValueStyle}>${baseRate}/ha</span>
          </div>
        </div>

        <div style={payoutHighlightRowStyle}>
          <div>
            <div style={payoutLabelStyle}>Max Potential Coverage</div>
            <div style={payoutSubValueStyle}>${maxPotential.toLocaleString()} USD</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={payoutLabelStyle}>Calculated Liquidity Dispatched</div>
            <div
              style={{
                ...payoutMainValueStyle,
                color: assessment.eligibleSubsidyUsd > 0 ? '#00E676' : '#8B949E',
              }}
            >
              ${assessment.eligibleSubsidyUsd.toLocaleString()} USD
            </div>
          </div>
        </div>
      </div>

      {/* Claim Lifecycle Stepper */}
      <div style={stepperContainerStyle}>
        <h4 style={stepperTitleStyle}>Claim Lifecycle Stepper</h4>
        <div style={stepsListStyle}>
          {CLAIM_STEPS.map((step, idx) => {
            const isPassed = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.status}
                style={{
                  ...stepNodeStyle,
                  background: isCurrent
                    ? '#1A271E'
                    : isPassed
                    ? '#0F1812'
                    : '#090D0A',
                  borderColor: isCurrent
                    ? '#00E676'
                    : isPassed
                    ? '#2D3B30'
                    : '#1F2C21',
                }}
              >
                <div
                  style={{
                    ...stepIconStyle,
                    background: isCurrent ? '#00E67622' : 'transparent',
                    color: isPassed ? '#00E676' : '#8B949E',
                  }}
                >
                  {step.icon}
                </div>
                <div style={stepLabelStyle}>{step.label}</div>
              </div>
            );
          })}
        </div>

        {/* Action Controls */}
        <div style={actionsRowStyle}>
          <button
            onClick={onAdvanceStatus}
            disabled={isFullySettled}
            style={{
              ...advanceButtonStyle,
              opacity: isFullySettled ? 0.5 : 1,
              cursor: isFullySettled ? 'not-allowed' : 'pointer',
            }}
          >
            {isFullySettled ? '✅ Claim Fully Settled' : `➡️ Advance to Next Step (${CLAIM_STEPS[Math.min(currentStepIndex + 1, CLAIM_STEPS.length - 1)].label})`}
          </button>

          <button onClick={onResetState} style={resetButtonStyle}>
            🔄 Reset Claim State
          </button>
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
  flexWrap: 'wrap',
  gap: '0.5rem',
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

const statusBadgeStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 700,
  padding: '0.3rem 0.7rem',
  borderRadius: '6px',
  border: '1px solid transparent',
  fontFamily: 'monospace',
};

const formulaBoxStyle: React.CSSProperties = {
  background: '#121A14',
  border: '1px solid #2D3B30',
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '1rem',
};

const formulaTitleStyle: React.CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: 600,
  color: '#8B949E',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
  marginBottom: '0.4rem',
};

const formulaCodeStyle: React.CSSProperties = {
  background: '#090D0A',
  border: '1px solid #1F2C21',
  padding: '0.6rem 0.8rem',
  borderRadius: '6px',
  fontSize: '0.8rem',
  fontFamily: 'monospace',
  color: '#00E676',
  marginBottom: '0.85rem',
};

const paramsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
  gap: '0.75rem',
  marginBottom: '0.85rem',
};

const paramItemStyle: React.CSSProperties = {
  background: '#090D0A',
  padding: '0.5rem 0.65rem',
  borderRadius: '4px',
  border: '1px solid #1F2C21',
};

const paramLabelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.65rem',
  color: '#8B949E',
  textTransform: 'uppercase',
  letterSpacing: '0.03em',
};

const paramValueStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: 700,
  color: '#E6EDE6',
  fontFamily: 'monospace',
  marginTop: '0.15rem',
};

const payoutHighlightRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTop: '1px dashed #2D3B30',
  paddingTop: '0.75rem',
};

const payoutLabelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: '#8B949E',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const payoutSubValueStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  color: '#8B949E',
  fontFamily: 'monospace',
};

const payoutMainValueStyle: React.CSSProperties = {
  fontSize: '1.3rem',
  fontWeight: 800,
  fontFamily: 'monospace',
};

const stepperContainerStyle: React.CSSProperties = {
  background: '#121A14',
  border: '1px solid #2D3B30',
  borderRadius: '8px',
  padding: '1rem',
};

const stepperTitleStyle: React.CSSProperties = {
  margin: '0 0 0.75rem 0',
  fontSize: '0.8rem',
  color: '#8B949E',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

const stepsListStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
  gap: '0.5rem',
  marginBottom: '1rem',
};

const stepNodeStyle: React.CSSProperties = {
  padding: '0.6rem 0.4rem',
  borderRadius: '6px',
  border: '1px solid #2D3B30',
  textAlign: 'center',
  transition: 'all 0.2s ease',
};

const stepIconStyle: React.CSSProperties = {
  fontSize: '1.1rem',
  marginBottom: '0.2rem',
};

const stepLabelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  fontWeight: 600,
  color: '#E6EDE6',
};

const actionsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.75rem',
  flexWrap: 'wrap',
};

const advanceButtonStyle: React.CSSProperties = {
  flex: 2,
  background: '#00E676',
  color: '#0F1410',
  border: 'none',
  borderRadius: '6px',
  padding: '0.65rem 1rem',
  fontSize: '0.85rem',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};

const resetButtonStyle: React.CSSProperties = {
  flex: 1,
  background: '#1A271E',
  color: '#00E676',
  border: '1px solid #2D3B30',
  borderRadius: '6px',
  padding: '0.65rem 1rem',
  fontSize: '0.85rem',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
};
