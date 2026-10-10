import { BoundingBox, CropPhotoSample, SymptomMatch } from '../types';
import { DiagnosticAssessmentState } from '../types/stateModel';

/**
 * Calculates Crop Damage Severity Ratio D_ratio (%) based on lesion bounding box coverage.
 */
export function calculateCropDamageSeverity(
  boxes: BoundingBox[],
  canvasWidth: number = 600,
  canvasHeight: number = 400
): number {
  if (boxes.length === 0) return 0;
  const totalCanvasArea = canvasWidth * canvasHeight;
  const totalLesionArea = boxes.reduce((sum, box) => sum + box.width * box.height, 0);
  const severityRatio = Math.min(1.0, totalLesionArea / (totalCanvasArea * 0.45));
  return Math.round(severityRatio * 100);
}

/**
 * Calculates Explainable Diagnostic Confidence Score C_score (%).
 */
export function calculateDiagnosticConfidence(symptoms: SymptomMatch[]): number {
  if (symptoms.length === 0) return 0;
  const totalScore = symptoms.reduce((sum, s) => sum + (s.matched ? s.matchScorePercent : 0), 0);
  const avgConfidence = totalScore / symptoms.length;
  return Math.round(avgConfidence);
}

/**
 * Calculates Parametric Crop Subsidy Payout P_subsidy ($USD).
 * P_subsidy = BaseRate * Hectares * ((D_ratio - D_threshold) / (1 - D_threshold))
 * @param damageSeverityPercent D_ratio (0 to 100)
 * @param plotHectares Field area (hectares)
 * @param baseRatePerHectare Base subsidy rate ($850/ha)
 * @param damageThresholdPercent Eligibility threshold (15%)
 */
export function calculateParametricSubsidyPayout(
  damageSeverityPercent: number,
  plotHectares: number,
  baseRatePerHectare: number = 850,
  damageThresholdPercent: number = 15
): { eligibleSubsidyUsd: number; isThresholdMet: boolean } {
  if (damageSeverityPercent < damageThresholdPercent) {
    return { eligibleSubsidyUsd: 0, isThresholdMet: false };
  }

  const dRatio = damageSeverityPercent / 100;
  const dThreshold = damageThresholdPercent / 100;
  const payoutRatio = (dRatio - dThreshold) / (1.0 - dThreshold);
  const maxPotentialPayout = plotHectares * baseRatePerHectare;
  const eligibleSubsidyUsd = Math.round(maxPotentialPayout * Math.max(0, payoutRatio));

  return {
    eligibleSubsidyUsd,
    isThresholdMet: true
  };
}

/**
 * Evaluates complete crop sample assessment state.
 */
export function evaluateCropSample(sample: CropPhotoSample): DiagnosticAssessmentState {
  const damageSeverityPercent = sample.damageSeverityPercent;
  const confidenceScorePercent = calculateDiagnosticConfidence(sample.symptoms);
  const { eligibleSubsidyUsd, isThresholdMet } = calculateParametricSubsidyPayout(
    damageSeverityPercent,
    sample.plotHectares,
    sample.baseSubsidyRatePerHectareUsd
  );

  return {
    sampleId: sample.id,
    diseaseDiagnosis: sample.diseaseDiagnosis,
    confidenceScorePercent,
    damageSeverityPercent,
    eligibleSubsidyUsd,
    isThresholdMet,
    evaluatedAt: new Date().toISOString().split('T')[0]
  };
}
