import React from 'react';
import { DistrictProject } from '../types';
import { UserCheck, ArrowRight, RotateCcw } from 'lucide-react';

interface PersonalSummaryProps {
  userChoices: Record<string, string>;
  projects: DistrictProject[];
  onRestartSurvey: () => void;
  onViewAST: () => void;
}

export const PersonalSummary: React.FC<PersonalSummaryProps> = ({
  userChoices,
  projects,
  onRestartSurvey,
  onViewAST,
}) => {
  // Count frequency of selections
  const choiceCounts: Record<string, number> = {};
  Object.values(userChoices).forEach((projId) => {
    choiceCounts[projId] = (choiceCounts[projId] || 0) + 1;
  });

  const rankedProjects = [...projects].sort(
    (a, b) => (choiceCounts[b.id] || 0) - (choiceCounts[a.id] || 0)
  );

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '2px solid #000000',
        boxShadow: '6px 6px 0px #000000',
        borderRadius: '4px',
        padding: '28px',
        maxWidth: '750px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000000', paddingBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <UserCheck size={24} color="#18181B" />
          <h2 style={{ margin: 0, fontSize: '1.35rem', fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
            YOUR PERSONAL PRIORITY MATRIX
          </h2>
        </div>
        <div style={{ background: '#B2FF05', border: '2px solid #000000', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
          {Object.keys(userChoices).length} CHOICES RECORDED
        </div>
      </div>

      <p style={{ margin: 0, color: '#52525B', fontSize: '0.9rem', lineHeight: 1.5 }}>
        Based on your 5 forced pairwise trade-offs, here is your derived personal ranking of municipal projects. Your inputs have been submitted anonymously to the district AST aggregator.
      </p>

      {/* Ranked Project List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {rankedProjects.map((proj, idx) => {
          const selections = choiceCounts[proj.id] || 0;
          return (
            <div
              key={proj.id}
              style={{
                background: '#F9F8F6',
                border: '2px solid #000000',
                padding: '12px 16px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ background: '#18181B', color: '#FFFFFF', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', fontFamily: 'JetBrains Mono, monospace' }}>
                  #{idx + 1}
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
                    {proj.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#71717A', fontFamily: 'JetBrains Mono, monospace' }}>
                    CATEGORY: {proj.category} | COST: ${(proj.costUsd / 1_000_000).toFixed(1)}M
                  </div>
                </div>
              </div>
              <div style={{ background: '#B2FF05', border: '1px solid #000000', padding: '4px 8px', fontSize: '0.75rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace' }}>
                {selections} SELECTIONS
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions Footer */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
        <button
          onClick={onRestartSurvey}
          style={{
            flex: 1,
            background: '#FFFFFF',
            color: '#18181B',
            border: '2px solid #000000',
            padding: '12px',
            fontWeight: 700,
            fontSize: '0.875rem',
            fontFamily: 'Space Grotesk, sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <RotateCcw size={16} />
          RETAKE SURVEY
        </button>

        <button
          onClick={onViewAST}
          style={{
            flex: 1,
            background: '#18181B',
            color: '#B2FF05',
            border: '2px solid #000000',
            padding: '12px',
            fontWeight: 700,
            fontSize: '0.875rem',
            fontFamily: 'Space Grotesk, sans-serif',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          INSPECT DISTRICT AST <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
