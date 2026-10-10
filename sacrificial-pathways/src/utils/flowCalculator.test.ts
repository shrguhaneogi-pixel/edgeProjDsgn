import { INITIAL_SECTOR_ASSETS } from '../data/demoTerrainScenarios';
import {
  calculateManningVelocity,
  calculateSacrificialWeirFlow,
  calculateSectorRisk,
  recalculateHydraulicTelemetry
} from './flowCalculator';

export interface TestResult {
  name: string;
  passed: boolean;
  message: string;
}

export function runFlowCalculatorUnitTests(): TestResult[] {
  const results: TestResult[] = [];

  // Test 1: Manning Velocity Calculation
  try {
    const v = calculateManningVelocity(0.004, 0.035, 2.5);
    const passed = v > 0 && v < 10;
    results.push({
      name: "Manning's Kinematic Velocity Calculation",
      passed,
      message: passed
        ? `Velocity correctly evaluated to ${v} m/s`
        : `Velocity output invalid: ${v}`
    });
  } catch (err: unknown) {
    results.push({
      name: "Manning's Kinematic Velocity Calculation",
      passed: false,
      message: err instanceof Error ? err.message : String(err)
    });
  }

  // Test 2: Sacrificial Weir Flow Gate Closed
  try {
    const qClosed = calculateSacrificialWeirFlow('CLOSED', 1600);
    const passed = qClosed === 0;
    results.push({
      name: 'Sacrificial Weir Flow (Gate CLOSED)',
      passed,
      message: passed
        ? 'Diverted flow is exactly 0 m³/s when gate is CLOSED'
        : `Expected 0 m³/s, got ${qClosed} m³/s`
    });
  } catch (err: unknown) {
    results.push({
      name: 'Sacrificial Weir Flow (Gate CLOSED)',
      passed: false,
      message: err instanceof Error ? err.message : String(err)
    });
  }

  // Test 3: Sacrificial Weir Flow Gate Open
  try {
    const qOpen = calculateSacrificialWeirFlow('OPEN', 1600);
    const passed = qOpen > 300 && qOpen <= 1600 * 0.45;
    results.push({
      name: 'Sacrificial Weir Flow (Gate OPEN)',
      passed,
      message: passed
        ? `Diverted flow evaluated to ${qOpen} m³/s (capped <= 45%)`
        : `Invalid diverted flow: ${qOpen} m³/s`
    });
  } catch (err: unknown) {
    results.push({
      name: 'Sacrificial Weir Flow (Gate OPEN)',
      passed: false,
      message: err instanceof Error ? err.message : String(err)
    });
  }

  // Test 4: Sector Inundation & Risk Score Valuation
  try {
    const downtown = INITIAL_SECTOR_ASSETS[0]; // Downtown elevation 8.5m
    const safeRisk = calculateSectorRisk(downtown, 8.0); // Water level 8.0m (below elevation)
    const critRisk = calculateSectorRisk(downtown, 10.5); // Water level 10.5m (2.0m depth)

    const passed =
      safeRisk.riskStatus === 'SAFE' &&
      safeRisk.inundationDepthMeters === 0 &&
      critRisk.riskStatus === 'CRITICAL' &&
      critRisk.exposedAssetValueUsd > 0;

    results.push({
      name: 'Sector Risk & Asset Valuation Assessment',
      passed,
      message: passed
        ? `Safe state depth 0m, Critical state depth ${critRisk.inundationDepthMeters}m ($${(critRisk.exposedAssetValueUsd / 1e6).toFixed(1)}M exposed)`
        : 'Sector risk evaluation mismatch'
    });
  } catch (err: unknown) {
    results.push({
      name: 'Sector Risk & Asset Valuation Assessment',
      passed: false,
      message: err instanceof Error ? err.message : String(err)
    });
  }

  // Test 5: Downstream Depth Reduction Delta
  try {
    const stateClosed = recalculateHydraulicTelemetry(1600, 'CLOSED', 0, INITIAL_SECTOR_ASSETS);
    const stateOpen = recalculateHydraulicTelemetry(1600, 'OPEN', 0, INITIAL_SECTOR_ASSETS);

    const depthReduction = stateClosed.telemetry.downstreamDepthMeters - stateOpen.telemetry.downstreamDepthMeters;
    const passed = depthReduction > 0.5 && stateOpen.telemetry.depthReductionMeters > 0;

    results.push({
      name: 'Downstream Inundation Depth Reduction Delta',
      passed,
      message: passed
        ? `Opening gate reduces downstream inundation depth by ${depthReduction.toFixed(2)} meters`
        : `Invalid depth reduction: ${depthReduction}`
    });
  } catch (err: unknown) {
    results.push({
      name: 'Downstream Inundation Depth Reduction Delta',
      passed: false,
      message: err instanceof Error ? err.message : String(err)
    });
  }

  return results;
}
