import { GateStatus, SectorRiskCalculation, TerrainScenario } from './index';

export interface HydraulicTelemetryState {
  dischargeM3PerSec: number; // Total surge peak discharge Q (e.g. 1500 m3/s)
  divertedFlowM3PerSec: number; // Sacrificial channel diverted Q (e.g. 520 m3/s)
  downstreamFlowM3PerSec: number; // Remaining downstream channel Q (e.g. 980 m3/s)
  downstreamDepthMeters: number; // Downstream inundation depth (e.g. 1.8 m)
  manningVelocityMPerSec: number; // Kinematic flow velocity V (e.g. 3.4 m/s)
  depthReductionMeters: number; // Inundation depth reduction from sacrificial diversion (e.g. -1.4 m)
}

export interface AppState {
  activeScenarioId: string;
  gateStatus: GateStatus;
  dischargeM3PerSec: number;
  waterLevelOffsetMeters: number;
  selectedSectorId: string | null;
  isAccessibilityView: boolean;
  isAnimating: boolean;
  telemetry: HydraulicTelemetryState;
  sectorRisks: SectorRiskCalculation[];
  scenarios: TerrainScenario[];
}

export type AppAction =
  | { type: 'SELECT_SCENARIO'; payload: string }
  | { type: 'TOGGLE_SACRIFICIAL_GATE' }
  | { type: 'SET_GATE_STATUS'; payload: GateStatus }
  | { type: 'SET_DISCHARGE_RATE'; payload: number }
  | { type: 'SET_WATER_LEVEL_OFFSET'; payload: number }
  | { type: 'SELECT_SECTOR'; payload: string | null }
  | { type: 'TOGGLE_ACCESSIBILITY_VIEW' }
  | { type: 'TOGGLE_ANIMATION' }
  | { type: 'RESET_SIMULATION' };
