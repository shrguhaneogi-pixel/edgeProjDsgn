export interface SectorAsset {
  id: string;
  name: string;
  category: 'COMMERCIAL' | 'RESIDENTIAL' | 'INDUSTRIAL' | 'AGRICULTURAL';
  assetValueUsd: number; // e.g. 150_000_000
  elevationMeters: number; // e.g. 12.5
  populationDensity: number;
  inundationRiskThresholdMeters: number; // e.g. 1.2
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
  status: 'OPEN' | 'CLOSED';
  capacityM3PerSec: number;
  triggerElevationMeters: number;
  currentDivertedFlowM3PerSec: number;
}

export interface TerrainScenario {
  id: string;
  name: string;
  description: string;
  peakDischargeM3PerSec: number;
  sacrificialGateDefault: 'OPEN' | 'CLOSED';
  expectedDownstreamDepthMeters: number;
  impactSummary: string;
}
