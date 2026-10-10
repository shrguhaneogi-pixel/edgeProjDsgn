// Data Contracts for The Barter Bridge

export type ProjectCategory = 'SAFETY' | 'SUSTAINABILITY' | 'INFRASTRUCTURE' | 'HEALTH' | 'EDUCATION';

export interface DistrictProject {
  id: string;
  title: string;
  category: ProjectCategory;
  costUsd: number;
  impactSummary: string;
  detailedDescription: string;
  votes: number;
}

export interface PairwiseComparison {
  id: string;
  stepNumber: number;
  projectA: DistrictProject;
  projectB: DistrictProject;
  tradeoffRationale: string;
}

export type ASTNodeType = 'ROOT' | 'OPERATOR' | 'CATEGORY' | 'PROJECT_LEAF';
export type ASTOperator = 'WEIGHTED_SUM' | 'AND' | 'THRESHOLD_FILTER';

export interface ASTNode {
  id: string;
  label: string;
  type: ASTNodeType;
  operator?: ASTOperator;
  weight: number; // 0.0 to 1.0
  score: number; // calculated score
  inputs?: string[]; // IDs of input nodes/projects
  description: string;
  childrenIds?: string[];
}

export interface DistrictRanking {
  projectId: string;
  projectTitle: string;
  category: ProjectCategory;
  baselineScore: number;
  simulatedScore: number;
  rankBaseline: number;
  rankSimulated: number;
  rankDiff: number; // e.g. +1, -2
}
