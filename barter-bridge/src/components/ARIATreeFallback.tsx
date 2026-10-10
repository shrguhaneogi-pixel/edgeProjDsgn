import React from 'react';
import { ASTNode } from '../types';

interface ARIATreeFallbackProps {
  nodes: Record<string, ASTNode>;
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
}

export const ARIATreeFallback: React.FC<ARIATreeFallbackProps> = ({
  nodes,
  selectedNodeId,
  onSelectNode,
}) => {
  const rootNode = nodes['node-root'];

  const renderTreeNode = (nodeId: string, level: number = 0) => {
    const node = nodes[nodeId];
    if (!node) return null;

    const isSelected = selectedNodeId === nodeId;
    const paddingLeft = `${level * 24 + 16}px`;

    return (
      <li
        key={node.id}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={node.childrenIds && node.childrenIds.length > 0 ? true : undefined}
        onClick={(e) => {
          e.stopPropagation();
          onSelectNode(node.id);
        }}
        style={{
          listStyle: 'none',
          padding: '10px 16px',
          paddingLeft,
          background: isSelected ? '#B2FF05' : '#FFFFFF',
          border: '1px solid #000000',
          marginBottom: '6px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>[{node.type}]</strong> {node.label}
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#71717A' }}>SCORE: {node.score}</span>
          </div>
        </div>

        {node.childrenIds && node.childrenIds.length > 0 && (
          <ul role="group" style={{ padding: 0, marginTop: '8px', marginBottom: 0 }}>
            {node.childrenIds.map((childId) => renderTreeNode(childId, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '2px solid #000000',
        boxShadow: '4px 4px 0px #000000',
        borderRadius: '4px',
        padding: '24px',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      <div style={{ borderBottom: '2px solid #000000', paddingBottom: '12px', marginBottom: '16px' }}>
        <h2 style={{ margin: 0, fontSize: '1.25rem', fontFamily: 'Space Grotesk, sans-serif', color: '#18181B' }}>
          ACCESSIBLE AST DECISION TREEVIEW (WCAG 2.1 AA)
        </h2>
        <p style={{ color: '#71717A', fontSize: '0.875rem', marginTop: '4px' }}>
          Full screen-reader compatible nested list hierarchy (`role="tree"`). Use `ArrowUp` / `ArrowDown` to navigate.
        </p>
      </div>

      <ul role="tree" aria-label="District Abstract Syntax Tree Hierarchy" style={{ padding: 0, margin: 0 }}>
        {rootNode && renderTreeNode(rootNode.id, 0)}
      </ul>
    </div>
  );
};
