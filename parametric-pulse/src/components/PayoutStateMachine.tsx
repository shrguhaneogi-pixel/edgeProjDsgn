import { PayoutStepStatus } from '../types';
import { CheckCircle2, Clock } from 'lucide-react';

interface PayoutStateMachineProps {
  currentStep: PayoutStepStatus;
  payoutAmountUsd: number;
  onExecutePayout: () => void;
  onReset: () => void;
}

const stepsList: Array<{ step: PayoutStepStatus; title: string; desc: string }> = [
  { step: 'IDLE', title: 'Station Monitoring', desc: 'Oracle telemetry streaming active.' },
  { step: 'EVALUATING', title: 'Evaluating Thresholds', desc: 'Wind & distance metrics computed.' },
  { step: 'TRIGGERED', title: 'Trigger Rule Met', desc: 'Qualifying cyclone threshold crossed.' },
  { step: 'LIQUIDITY_LOCKED', title: 'Reserving Liquidity', desc: 'USDC vault funds locked on-chain.' },
  { step: 'PAYOUT_DISPATCHED', title: 'Dispatching Payout', desc: 'Parametric settlement transaction signed.' },
  { step: 'CONFIRMED', title: 'Settlement Confirmed', desc: 'Emergency funds received by municipality.' },
];

export const PayoutStateMachine: React.FC<PayoutStateMachineProps> = ({
  currentStep,
  payoutAmountUsd,
  onExecutePayout,
  onReset,
}) => {
  const getStepIndex = (step: PayoutStepStatus) => {
    return stepsList.findIndex((s) => s.step === step);
  };

  const currentIndex = getStepIndex(currentStep);

  return (
    <div
      style={{
        background: '#0B0F19',
        border: '1px solid #1E293B',
        borderRadius: '4px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#F8FAFC' }}>
            AUDITABLE PAYOUT WORKFLOW
          </h3>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}>
            SOLANA DEVNET SIMULATION ENGINE
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {currentStep === 'IDLE' || currentStep === 'EVALUATING' ? (
            <button
              onClick={onExecutePayout}
              style={{
                background: '#10B981',
                color: '#06080F',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 14px',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              EXECUTE DEMO PAYOUT
            </button>
          ) : (
            <button
              onClick={onReset}
              style={{
                background: '#1E293B',
                color: '#94A3B8',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                fontSize: '0.8rem',
                cursor: 'pointer',
              }}
            >
              RESET WORKFLOW
            </button>
          )}
        </div>
      </div>

      {/* Step Progression List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {stepsList.map((s, idx) => {
          const isDone = idx < currentIndex;
          const isCurrent = idx === currentIndex;

          return (
            <div
              key={s.step}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px 12px',
                borderRadius: '4px',
                background: isCurrent ? 'rgba(0, 229, 255, 0.08)' : '#06080F',
                border: isCurrent ? '1px solid #00E5FF' : '1px solid #1E293B',
              }}
            >
              <div style={{ color: isDone ? '#10B981' : isCurrent ? '#00E5FF' : '#64748B' }}>
                {isDone ? <CheckCircle2 size={18} /> : <Clock size={18} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#00E5FF' : isDone ? '#F8FAFC' : '#94A3B8' }}>
                  {s.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{s.desc}</div>
              </div>
              {isCurrent && (
                <span style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono, monospace', color: '#00E5FF', background: 'rgba(0, 229, 255, 0.15)', padding: '2px 6px', borderRadius: '3px' }}>
                  ACTIVE
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Simulated TX Signature Hash Box */}
      {currentStep === 'CONFIRMED' && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid #10B981',
            borderRadius: '4px',
            padding: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.75rem',
            color: '#10B981',
          }}
        >
          <div>✓ PAYOUT SETTLED: ${(payoutAmountUsd / 1_000_000).toFixed(2)}M USDC</div>
          <div style={{ color: '#94A3B8', marginTop: '4px', wordBreak: 'break-all' }}>
            TX HASH: 5Kx2...9PqL4zW8m7vN1bC3xR6yA8zB0
          </div>
        </div>
      )}
    </div>
  );
};
