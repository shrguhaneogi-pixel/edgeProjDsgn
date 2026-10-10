export type SectorCategory = 'COMMERCIAL' | 'RESIDENTIAL' | 'INDUSTRIAL' | 'AGRICULTURAL';
export type SectorRiskStatus = 'SAFE' | 'WARNING' | 'CRITICAL';
export type GateStatus = 'OPEN' | 'CLOSED';

export interface SectorAsset {
  id: string;
  name: string;
  category: SectorCategory;
  assetValueUsd: number; // e.g. 240_000_000
  elevationMeters: number; // e.g. 8.5
  population: number; // e.g. 18,500
  inundationRiskThresholdMeters: number; // e.g. 0.8
  description: string;
}

export interface ElevationPoint {
  x: number;
  y: number;
  elevationMeters: number;
  sectorId?: string;
  isRiverChannel: boolean;
  isSacrificialBypass: boolean;
}

export interface SacrificialGate {
  id: string;
  name: string;
  status: GateStatus;
  capacityM3PerSec: number; // Max hydraulic diversion capacity e.g. 600
  triggerElevationMeters: number; // Gate crest elevation e.g. 10.0
  currentDivertedFlowM3PerSec: number;
  gateWidthMeters: number; // e.g. 15.0
}

export interface TerrainScenario {
  id: string;
  name: string;
  description: string;
  peakDischargeM3PerSec: number;
  sacrificialGateDefault: GateStatus;
  expectedDownstreamDepthMeters: number;
  impactSummary: string;
}

export interface SectorRiskCalculation {
  sectorId: string;
  sectorName: string;
  category: SectorCategory;
  assetValueUsd: number;
  elevationMeters: number;
  waterLevelMeters: number;
  inundationDepthMeters: number;
  riskScorePercent: number; // 0 to 100
  riskStatus: SectorRiskStatus;
  exposedAssetValueUsd: number;
}
