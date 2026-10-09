// Parametric Pulse Data Contracts & State Types

export interface CycloneCheckpoint {
  id: string;
  hour: number; // T+0h to T+48h
  timestamp: string;
  lat: number;
  lng: number;
  windSpeedKts: number; // knots
  pressureHpa: number; // hPa
  category: 'TS' | 'Cat 1' | 'Cat 2' | 'Cat 3' | 'Cat 4' | 'Cat 5';
  forecastType: 'OBSERVED' | 'PROJECTED';
}

export interface CoastalAsset {
  id: string;
  name: string;
  type: 'HARBOR' | 'POWER_GRID' | 'HOSPITAL' | 'COASTAL_DIKE';
  lat: number;
  lng: number;
  insuredValueUsd: number;
  hazardRadiusKm: number;
}

export interface ParametricRule {
  id: string;
  assetId: string;
  metric: 'WIND_SPEED_AND_PROXIMITY';
  minWindSpeedKts: number;
  maxDistanceKm: number;
  observationWindowHours: number;
  payoutAmountUsd: number;
}

export type PayoutStepStatus = 'IDLE' | 'EVALUATING' | 'TRIGGERED' | 'LIQUIDITY_LOCKED' | 'PAYOUT_DISPATCHED' | 'CONFIRMED';

export interface PayoutEvent {
  step: PayoutStepStatus;
  label: string;
  timestamp: string;
  details: string;
  txHash?: string;
}

export interface CycloneScenario {
  id: string;
  name: string;
  description: string;
  qualifiesForPayout: boolean;
  checkpoints: CycloneCheckpoint[];
  assets: CoastalAsset[];
  rule: ParametricRule;
}
