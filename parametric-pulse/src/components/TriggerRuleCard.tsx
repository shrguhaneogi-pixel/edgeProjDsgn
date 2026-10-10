import React from 'react';
import { CycloneCheckpoint, CoastalAsset, ParametricRule } from '../types';
import { calculateHaversineDistance } from '../utils/geo';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface TriggerRuleCardProps {
  rule: ParametricRule;
  checkpoint: CycloneCheckpoint;
  asset: CoastalAsset;
}

export const TriggerRuleCard: React.FC<TriggerRuleCardProps> = ({ rule, checkpoint, asset }) => {
  const distanceKm = calculateHaversineDistance(
    checkpoint.lat,
    checkpoint.lng,
    asset.lat,
    asset.lng
  );

  const windCondition = checkpoint.windSpeedKts >= rule.minWindSpeedKts;
  const distanceCondition = distanceKm <= rule.maxDistanceKm;
  const isRuleSatisfied = windCondition && distanceCondition;

  const windProgressPercent = Math.min(100, Math.round((checkpoint.windSpeedKts / rule.minWindSpeedKts) * 100));

  return (
    <div
      style={{
        background: '#0B0F19',
        border: `1px solid ${isRuleSatisfied ? '#10B981' : '#1E293B'}`,
        borderRadius: '4px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
      }}
    >
      {/* Rule Title & Live Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {isRuleSatisfied ? <ShieldCheck size={20} color="#10B981" /> : <ShieldAlert size={20} color="#F59E0B" />}
          <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#F8FAFC' }}>
            PARAMETRIC RULE ENGINE
          </h3>
        </div>
        <div
          style={{
            background: isRuleSatisfied ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
            color: isRuleSatisfied ? '#10B981' : '#F59E0B',
            border: `1px solid ${isRuleSatisfied ? '#10B981' : '#F59E0B'}`,
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
          }}
        >
          {isRuleSatisfied ? '● TRIGGER SATISFIED' : '○ PENDING THRESHOLD'}
        </div>
      </div>

      {/* Structured Formula Box */}
      <div
        style={{
          background: '#06080F',
          border: '1px solid #1E293B',
          borderRadius: '4px',
          padding: '12px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.8rem',
          color: '#00E5FF',
        }}
      >
        <div style={{ fontSize: '0.7rem', color: '#64748B', marginBottom: '4px' }}>EVALUATION INEQUALITY</div>
        Trigger = (V_max ≥ {rule.minWindSpeedKts} kts) AND (Distance ≤ {rule.maxDistanceKm} km)
      </div>

      {/* Clause 1: Wind Speed Threshold */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94A3B8', marginBottom: '4px' }}>
          <span>1. Sustained Wind Speed (≥ {rule.minWindSpeedKts} kts)</span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: windCondition ? '#10B981' : '#F8FAFC' }}>
            {checkpoint.windSpeedKts} kts {windCondition ? '✓' : ''}
          </span>
        </div>
        <div style={{ width: '100%', height: '6px', background: '#1E293B', borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${windProgressPercent}%`,
              height: '100%',
              background: windCondition ? '#10B981' : '#00E5FF',
              transition: 'width 300ms ease-out',
            }}
          />
        </div>
      </div>

      {/* Clause 2: Proximity Distance Threshold */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: '#94A3B8' }}>
        <span>2. Proximity Distance (≤ {rule.maxDistanceKm} km)</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', color: distanceCondition ? '#10B981' : '#F59E0B' }}>
          {distanceKm} km {distanceCondition ? '✓' : '✗'}
        </span>
      </div>

      {/* Payout Summary Line */}
      <div
        style={{
          borderTop: '1px border #1E293B',
          paddingTop: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.85rem',
        }}
      >
        <span style={{ color: '#94A3B8' }}>QUALIFYING LIQUIDITY PAYOUT:</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: isRuleSatisfied ? '#10B981' : '#94A3B8', fontSize: '1rem' }}>
          ${(rule.payoutAmountUsd / 1_000_000).toFixed(2)}M USDC
        </span>
      </div>
    </div>
  );
};
