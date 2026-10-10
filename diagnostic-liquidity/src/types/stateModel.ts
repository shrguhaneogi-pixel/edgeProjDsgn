import { ClaimStatus, CropPhotoSample } from './index';

export interface DiagnosticAssessmentState {
  sampleId: string;
  diseaseDiagnosis: string;
  confidenceScorePercent: number; // C_score e.g. 92%
  damageSeverityPercent: number; // D_ratio e.g. 38%
  eligibleSubsidyUsd: number; // P_subsidy e.g. $3,230 USD
  isThresholdMet: boolean; // D_ratio >= 15%
  evaluatedAt: string;
}

export interface AppState {
  activeSampleId: string;
  claimStatus: ClaimStatus;
  confidenceThresholdFilter: number; // 0 to 100 filter
  showBoundingBoxes: boolean;
  showHeatmap: boolean;
  selectedBoxId: string | null;
  isAccessibilityView: boolean;
  isScanAnimating: boolean;
  assessment: DiagnosticAssessmentState;
  samples: CropPhotoSample[];
}

export type AppAction =
  | { type: 'SELECT_SAMPLE'; payload: string }
  | { type: 'ADVANCE_CLAIM_STATUS' }
  | { type: 'SET_CLAIM_STATUS'; payload: ClaimStatus }
  | { type: 'SET_CONFIDENCE_FILTER'; payload: number }
  | { type: 'TOGGLE_BOUNDING_BOXES' }
  | { type: 'TOGGLE_HEATMAP' }
  | { type: 'SELECT_BOUNDING_BOX'; payload: string | null }
  | { type: 'TOGGLE_ACCESSIBILITY_VIEW' }
  | { type: 'TOGGLE_SCAN_ANIMATION' }
  | { type: 'RESET_CLAIM_STATE' };
