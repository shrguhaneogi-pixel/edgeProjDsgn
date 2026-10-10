import { DEMO_SCENARIOS, INITIAL_SECTOR_ASSETS } from '../data/demoTerrainScenarios';
import { AppAction, AppState } from '../types/stateModel';
import { recalculateHydraulicTelemetry } from '../utils/flowCalculator';

export function createInitialState(scenarioId: string = 'scenario-bypass-active'): AppState {
  const scenario = DEMO_SCENARIOS.find(s => s.id === scenarioId) || DEMO_SCENARIOS[1];
  const dischargeM3PerSec = scenario.peakDischargeM3PerSec;
  const gateStatus = scenario.sacrificialGateDefault;
  const waterLevelOffsetMeters = 0;

  const { telemetry, sectorRisks } = recalculateHydraulicTelemetry(
    dischargeM3PerSec,
    gateStatus,
    waterLevelOffsetMeters,
    INITIAL_SECTOR_ASSETS
  );

  return {
    activeScenarioId: scenario.id,
    gateStatus,
    dischargeM3PerSec,
    waterLevelOffsetMeters,
    selectedSectorId: 'downtown-core',
    isAccessibilityView: false,
    isAnimating: true,
    telemetry,
    sectorRisks,
    scenarios: DEMO_SCENARIOS
  };
}

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SELECT_SCENARIO': {
      const scenario = state.scenarios.find(s => s.id === action.payload);
      if (!scenario) return state;
      const dischargeM3PerSec = scenario.peakDischargeM3PerSec;
      const gateStatus = scenario.sacrificialGateDefault;
      const { telemetry, sectorRisks } = recalculateHydraulicTelemetry(
        dischargeM3PerSec,
        gateStatus,
        state.waterLevelOffsetMeters,
        INITIAL_SECTOR_ASSETS
      );
      return {
        ...state,
        activeScenarioId: scenario.id,
        dischargeM3PerSec,
        gateStatus,
        telemetry,
        sectorRisks
      };
    }

    case 'TOGGLE_SACRIFICIAL_GATE': {
      const nextGateStatus = state.gateStatus === 'OPEN' ? 'CLOSED' : 'OPEN';
      const { telemetry, sectorRisks } = recalculateHydraulicTelemetry(
        state.dischargeM3PerSec,
        nextGateStatus,
        state.waterLevelOffsetMeters,
        INITIAL_SECTOR_ASSETS
      );
      return {
        ...state,
        gateStatus: nextGateStatus,
        telemetry,
        sectorRisks
      };
    }

    case 'SET_GATE_STATUS': {
      if (state.gateStatus === action.payload) return state;
      const { telemetry, sectorRisks } = recalculateHydraulicTelemetry(
        state.dischargeM3PerSec,
        action.payload,
        state.waterLevelOffsetMeters,
        INITIAL_SECTOR_ASSETS
      );
      return {
        ...state,
        gateStatus: action.payload,
        telemetry,
        sectorRisks
      };
    }

    case 'SET_DISCHARGE_RATE': {
      const dischargeM3PerSec = Math.max(500, Math.min(3500, action.payload));
      const { telemetry, sectorRisks } = recalculateHydraulicTelemetry(
        dischargeM3PerSec,
        state.gateStatus,
        state.waterLevelOffsetMeters,
        INITIAL_SECTOR_ASSETS
      );
      return {
        ...state,
        dischargeM3PerSec,
        telemetry,
        sectorRisks
      };
    }

    case 'SET_WATER_LEVEL_OFFSET': {
      const waterLevelOffsetMeters = Math.max(-2.0, Math.min(3.0, action.payload));
      const { telemetry, sectorRisks } = recalculateHydraulicTelemetry(
        state.dischargeM3PerSec,
        state.gateStatus,
        waterLevelOffsetMeters,
        INITIAL_SECTOR_ASSETS
      );
      return {
        ...state,
        waterLevelOffsetMeters,
        telemetry,
        sectorRisks
      };
    }

    case 'SELECT_SECTOR':
      return {
        ...state,
        selectedSectorId: action.payload
      };

    case 'TOGGLE_ACCESSIBILITY_VIEW':
      return {
        ...state,
        isAccessibilityView: !state.isAccessibilityView
      };

    case 'TOGGLE_ANIMATION':
      return {
        ...state,
        isAnimating: !state.isAnimating
      };

    case 'RESET_SIMULATION':
      return createInitialState(state.activeScenarioId);

    default:
      return state;
  }
}
