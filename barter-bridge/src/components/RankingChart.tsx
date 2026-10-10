import React from 'react';
import { DistrictRanking } from '../types';
import { BarChart3, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RankingChartProps {
  rankings: DistrictRanking[];
}

export const RankingChart: React.FC<RankingChartProps> = ({ rankings }) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '2px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        borderRadius: '4px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000000', paddingBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BarChart3 size={20} color="#18181B" />
          <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
            DISTRICT PRIORITY RANKINGS
          </h3>
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: '#71717A' }}>
          BASELINE VS SIMULATION
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {rankings.map((item) => {
          const isRankImproved = item.rankDiff > 0;
          const isRankDropped = item.rankDiff < 0;

          return (
            <div
              key={item.projectId}
              style={{
                background: '#F9F8F6',
                border: '1px solid #000000',
                padding: '12px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              {/* Rank Badge */}
              <div
                style={{
                  background: '#18181B',
                  color: '#FFFFFF',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.85rem',
                }}
              >
                #{item.rankSimulated}
              </div>

              {/* Title & Category */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#18181B', fontFamily: 'Space Grotesk, sans-serif' }}>
                  {item.projectTitle}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#71717A', fontFamily: 'JetBrains Mono, monospace' }}>
                  CATEGORY: {item.category}
                </div>
              </div>

              {/* Score Bar & Diff */}
              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: '#18181B' }}>
                    {(item.simulatedScore * 100).toFixed(0)}%
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#71717A' }}>SCORE</div>
                </div>

                {/* Diff Badge */}
                <div
                  style={{
                    background: isRankImproved ? '#10B981' : isRankDropped ? '#EF4444' : '#E4E4E7',
                    color: isRankImproved || isRankDropped ? '#FFFFFF' : '#71717A',
                    padding: '2px 8px',
                    borderRadius: '2px',
                    fontSize: '0.75rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px',
                  }}
                >
                  {isRankImproved && <TrendingUp size={12} />}
                  {isRankDropped && <TrendingDown size={12} />}
                  {!isRankImproved && !isRankDropped && <Minus size={12} />}
                  {item.rankDiff > 0 ? `+${item.rankDiff}` : item.rankDiff}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
