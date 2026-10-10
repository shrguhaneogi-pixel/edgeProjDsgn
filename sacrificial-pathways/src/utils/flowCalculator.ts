import { GateStatus, SectorAsset, SectorRiskCalculation } from '../types';
import { HydraulicTelemetryState } from '../types/stateModel';

/**
 * Calculates Manning's Kinematic Flow Velocity (m/s).
 * V = (1 / n) * R_h^(2/3) * S_0^(1/2)
 * @param slope S_0 Energy slope gradient (m/m)
 * @param roughness n Manning's roughness coefficient (0.035 for urban channels)
 * @param hydraulicRadius R_h Hydraulic radius (m)
 */
export function calculateManningVelocity(
  slope: number = 0.004,
  roughness: number = 0.035,
  hydraulicRadius: number = 2.5
): number {
  if (roughness <= 0) return 0;
  const rh23 = Math.pow(Math.max(0.1, hydraulicRadius), 2 / 3);
  const s012 = Math.sqrt(Math.max(0.0001, slope));
  const velocity = (1 / roughness) * rh23 * s012;
  return Number(velocity.toFixed(2));
}

/**
 * Calculates Sacrificial Weir Channel Diversion Flow (m3/s).
 * Q_sacrificial = C_d * b * max(0, h_river - h_gate)^(3/2)
 * @param gateStatus OPEN or CLOSED
 * @param discharge Total surge peak discharge Q (m3/s)
 * @param gateWidth Gate width b (m) [Default: 15.0m]
 * @param dischargeCoefficient Weir coefficient C_d [Default: 1.84]
 */
export function calculateSacrificialWeirFlow(
  gateStatus: GateStatus,
  discharge: number,
  gateWidth: number = 15.0,
  dischargeCoefficient: number = 1.84
): number {
  if (gateStatus === 'CLOSED') return 0;
  
  // Estimate head over gate crest proportional to total discharge
  const headOverCrest = Math.max(0, (discharge - 800) / 350);
  if (headOverCrest <= 0) return 0;

  const qDiverted = dischargeCoefficient * gateWidth * Math.pow(headOverCrest, 1.5);
  // Cap at 45% of total peak discharge for physical channel boundary
  const maxDiverted = discharge * 0.45;
  return Number(Math.min(maxDiverted, qDiverted).toFixed(1));
}

/**
 * Evaluates sector risk and exposed asset valuation based on sector elevation & water level.
 */
export function calculateSectorRisk(
  asset: SectorAsset,
  totalWaterLevelMeters: number
): SectorRiskCalculation {
  const inundationDepthMeters = Math.max(0, totalWaterLevelMeters - asset.elevationMeters);
  
  // Risk score: 0% at zero depth, 100% at or above threshold depth + 1.0m
  const maxDepth = asset.inundationRiskThresholdMeters + 1.0;
  const riskRatio = Math.min(1.0, inundationDepthMeters / maxDepth);
  const riskScorePercent = Math.round(riskRatio * 100);

  let riskStatus: 'SAFE' | 'WARNING' | 'CRITICAL' = 'SAFE';
  if (riskScorePercent > 65) {
    riskStatus = 'CRITICAL';
  } else if (riskScorePercent > 15) {
    riskStatus = 'WARNING';
  }

  const exposedAssetValueUsd = Math.round(asset.assetValueUsd * (riskScorePercent / 100));

  return {
    sectorId: asset.id,
    sectorName: asset.name,
    category: asset.category,
    assetValueUsd: asset.assetValueUsd,
    elevationMeters: asset.elevationMeters,
    waterLevelMeters: Number(totalWaterLevelMeters.toFixed(2)),
    inundationDepthMeters: Number(inundationDepthMeters.toFixed(2)),
    riskScorePercent,
    riskStatus,
    exposedAssetValueUsd
  };
}

/**
 * Re-computes full hydraulic state & sectoral exposure.
 */
export function recalculateHydraulicTelemetry(
  dischargeM3PerSec: number,
  gateStatus: GateStatus,
  waterLevelOffsetMeters: number,
  sectorAssets: SectorAsset[]
): { telemetry: HydraulicTelemetryState; sectorRisks: SectorRiskCalculation[] } {
  const divertedFlowM3PerSec = calculateSacrificialWeirFlow(gateStatus, dischargeM3PerSec);
  const downstreamFlowM3PerSec = Math.max(0, dischargeM3PerSec - divertedFlowM3PerSec);

  // Baseline water depth in main channel without gate diversion
  const baselineDepth = 2.0 + (dischargeM3PerSec - 1000) / 400 + waterLevelOffsetMeters;
  
  // Inundation reduction delta due to sacrificial bypass channel
  const depthReductionMeters = gateStatus === 'OPEN'
    ? Number((divertedFlowM3PerSec / 380).toFixed(2))
    : 0;

  const downstreamDepthMeters = Number(Math.max(0.5, baselineDepth - depthReductionMeters).toFixed(2));
  const manningVelocityMPerSec = calculateManningVelocity(0.004, 0.035, downstreamDepthMeters / 2);

  // Base river level in datum meters (river bed at 6.0m)
  const riverLevelDatumMeters = 6.0 + downstreamDepthMeters;

  const sectorRisks = sectorAssets.map(asset => {
    // Agricultural sector is inside the sacrificial bypass channel; its water level increases when gate is OPEN
    if (asset.id === 'agricultural-zone') {
      const sacrificialWaterLevel = 7.5 + (divertedFlowM3PerSec / 250);
      return calculateSectorRisk(asset, sacrificialWaterLevel);
    }
    return calculateSectorRisk(asset, riverLevelDatumMeters);
  });

  return {
    telemetry: {
      dischargeM3PerSec,
      divertedFlowM3PerSec,
      downstreamFlowM3PerSec,
      downstreamDepthMeters,
      manningVelocityMPerSec,
      depthReductionMeters
    },
    sectorRisks
  };
}
