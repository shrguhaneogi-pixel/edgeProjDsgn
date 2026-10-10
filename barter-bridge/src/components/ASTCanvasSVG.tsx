import React from 'react';
import { ASTNode } from '../types';

interface ASTCanvasSVGProps {
  nodes: Record<string, ASTNode>;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
}

export const ASTCanvasSVG: React.FC<ASTCanvasSVGProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
}) => {
  // Tree Node Positions Layout (SVG canvas 800x480)
  const nodeLayouts: Record<string, { x: number; y: number; width: number; height: number }> = {
    'node-root': { x: 400, y: 50, width: 260, height: 44 },
    'node-op-weighted-sum': { x: 400, y: 150, width: 220, height: 40 },
    'node-cat-safety': { x: 120, y: 270, width: 140, height: 46 },
    'node-cat-sust': { x: 260, y: 270, width: 140, height: 46 },
    'node-cat-health': { x: 400, y: 270, width: 140, height: 46 },
    'node-cat-infra': { x: 540, y: 270, width: 140, height: 46 },
    'node-cat-edu': { x: 680, y: 270, width: 140, height: 46 },
    'proj-safety-1': { x: 120, y: 390, width: 130, height: 42 },
    'proj-sust-2': { x: 260, y: 390, width: 130, height: 42 },
    'proj-health-4': { x: 400, y: 390, width: 130, height: 42 },
    'proj-infra-3': { x: 540, y: 390, width: 130, height: 42 },
    'proj-edu-5': { x: 680, y: 390, width: 130, height: 42 },
  };

  // Edges connecting parent and child nodes
  const edges = [
    { from: 'node-root', to: 'node-op-weighted-sum' },
    { from: 'node-op-weighted-sum', to: 'node-cat-safety' },
    { from: 'node-op-weighted-sum', to: 'node-cat-sust' },
    { from: 'node-op-weighted-sum', to: 'node-cat-health' },
    { from: 'node-op-weighted-sum', to: 'node-cat-infra' },
    { from: 'node-op-weighted-sum', to: 'node-cat-edu' },
    { from: 'node-cat-safety', to: 'proj-safety-1' },
    { from: 'node-cat-sust', to: 'proj-sust-2' },
    { from: 'node-cat-health', to: 'proj-health-4' },
    { from: 'node-cat-infra', to: 'proj-infra-3' },
    { from: 'node-cat-edu', to: 'proj-edu-5' },
  ];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '480px',
        background: '#18181B',
        border: '2px solid #000000',
        borderRadius: '4px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: '#000000',
          color: '#B2FF05',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.75rem',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: '2px',
          zIndex: 10,
        }}
      >
        INTERACTIVE AST CANVAS (SVG)
      </div>

      <svg width="100%" height="100%" viewBox="0 0 800 480" style={{ display: 'block' }}>
        {/* Vector Connecting Edges */}
        {edges.map((edge, idx) => {
          const fromPos = nodeLayouts[edge.from];
          const toPos = nodeLayouts[edge.to];
          if (!fromPos || !toPos) return null;

          return (
            <line
              key={idx}
              x1={fromPos.x}
              y1={fromPos.y + fromPos.height / 2}
              x2={toPos.x}
              y2={toPos.y - toPos.height / 2}
              stroke={selectedNodeId === edge.from || selectedNodeId === edge.to ? '#B2FF05' : '#3F3F46'}
              strokeWidth={selectedNodeId === edge.from || selectedNodeId === edge.to ? 3 : 1.5}
            />
          );
        })}

        {/* Tree Nodes */}
        {Object.entries(nodeLayouts).map(([nodeId, pos]) => {
          const isSelected = selectedNodeId === nodeId;
          const nodeData = nodes[nodeId];
          const label = nodeData ? nodeData.label : nodeId;

          return (
            <g
              key={nodeId}
              onClick={() => onSelectNode(nodeId)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x={pos.x - pos.width / 2}
                y={pos.y - pos.height / 2}
                width={pos.width}
                height={pos.height}
                rx={4}
                fill={isSelected ? '#B2FF05' : '#27272A'}
                stroke={isSelected ? '#FFFFFF' : '#52525B'}
                strokeWidth={isSelected ? 3 : 1.5}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fill={isSelected ? '#000000' : '#F4F4F5'}
                fontSize="11"
                fontFamily="JetBrains Mono, monospace"
                fontWeight={isSelected ? 'bold' : 'normal'}
              >
                {label.length > 20 ? label.slice(0, 18) + '...' : label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
