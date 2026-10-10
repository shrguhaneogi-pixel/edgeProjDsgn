import { ASTNode } from '../types';
import { Sliders } from 'lucide-react';

interface ASTNodeInspectorProps {
  selectedNode: ASTNode | null;
  categoryWeights: Record<string, number>;
  onWeightChange: (category: string, weight: number) => void;
  onResetWeights: () => void;
}

export const ASTNodeInspector: React.FC<ASTNodeInspectorProps> = ({
  selectedNode,
  categoryWeights,
  onWeightChange,
  onResetWeights,
}) => {
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
          <Sliders size={20} color="#18181B" />
          <h3 style={{ margin: 0, fontSize: '1rem', fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
            AST NODE INSPECTOR
          </h3>
        </div>
        <button
          onClick={onResetWeights}
          style={{
            background: '#18181B',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '2px',
            padding: '4px 8px',
            fontSize: '0.75rem',
            fontFamily: 'JetBrains Mono, monospace',
            cursor: 'pointer',
          }}
        >
          RESET WEIGHTS
        </button>
      </div>

      {/* Selected Node Card */}
      {selectedNode ? (
        <div style={{ background: '#F9F8F6', border: '1px solid #000000', padding: '12px', borderRadius: '4px' }}>
          <div style={{ fontSize: '0.7rem', color: '#71717A', fontFamily: 'JetBrains Mono, monospace' }}>NODE ID: {selectedNode.id}</div>
          <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif', color: '#18181B', margin: '4px 0' }}>
            {selectedNode.label}
          </div>
          <p style={{ margin: 0, fontSize: '0.8rem', color: '#52525B', lineHeight: 1.4 }}>
            {selectedNode.description}
          </p>
          <div style={{ marginTop: '8px', display: 'flex', gap: '12px', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
            <span>TYPE: <strong>{selectedNode.type}</strong></span>
            <span>SCORE: <strong>{selectedNode.score}</strong></span>
          </div>
        </div>
      ) : (
        <div style={{ color: '#71717A', fontSize: '0.85rem', fontStyle: 'italic' }}>
          Click any node on the AST canvas to inspect its evaluation rules.
        </div>
      )}

      {/* Category Weight Controls Sandbox */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
        <h4 style={{ margin: 0, fontSize: '0.875rem', fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
          POLICY WEIGHT MODELING SANDBOX
        </h4>

        {Object.entries(categoryWeights).map(([cat, weight]) => (
          <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace' }}>
              <span>{cat} WEIGHT</span>
              <strong>{weight.toFixed(2)}</strong>
            </div>
            <input
              type="range"
              min={0.05}
              max={0.60}
              step={0.05}
              value={weight}
              onChange={(e) => onWeightChange(cat, parseFloat(e.target.value))}
              style={{ accentColor: '#000000', cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
