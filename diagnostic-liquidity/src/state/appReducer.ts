import { DEMO_CROP_SAMPLES } from '../data/demoCropData';
import { ClaimStatus } from '../types';
import { AppAction, AppState } from '../types/stateModel';
import { evaluateCropSample } from '../utils/diagnosticEvaluator';

export function createInitialState(sampleId: string = 'sample-maize-blight'): AppState {
  const sample = DEMO_CROP_SAMPLES.find(s => s.id === sampleId) || DEMO_CROP_SAMPLES[0];
  const assessment = evaluateCropSample(sample);

  return {
    activeSampleId: sample.id,
    claimStatus: 'DIAGNOSTIC_EVALUATED',
    confidenceThresholdFilter: 75,
    showBoundingBoxes: true,
    showHeatmap: false,
    selectedBoxId: 'box-1',
    isAccessibilityView: false,
    isScanAnimating: true,
    assessment,
    samples: DEMO_CROP_SAMPLES
  };
}

const NEXT_CLAIM_STATUS: Record<ClaimStatus, ClaimStatus> = {
  DRAFT: 'INTAKE_SUBMITTED',
  INTAKE_SUBMITTED: 'DIAGNOSTIC_EVALUATED',
  DIAGNOSTIC_EVALUATED: 'ADJUDICATION_PENDING',
  ADJUDICATION_PENDING: 'SUBSIDY_DISPATCHED',
  SUBSIDY_DISPATCHED: 'SETTLED',
  SETTLED: 'SETTLED'
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SELECT_SAMPLE': {
      const sample = state.samples.find(s => s.id === action.payload);
      if (!sample) return state;
      const assessment = evaluateCropSample(sample);
      return {
        ...state,
        activeSampleId: sample.id,
        assessment,
        selectedBoxId: sample.boundingBoxes.length > 0 ? sample.boundingBoxes[0].id : null,
        claimStatus: 'DIAGNOSTIC_EVALUATED'
      };
    }

    case 'ADVANCE_CLAIM_STATUS': {
      const nextStatus = NEXT_CLAIM_STATUS[state.claimStatus];
      return {
        ...state,
        claimStatus: nextStatus
      };
    }

    case 'SET_CLAIM_STATUS':
      return {
        ...state,
        claimStatus: action.payload
      };

    case 'SET_CONFIDENCE_FILTER':
      return {
        ...state,
        confidenceThresholdFilter: Math.max(0, Math.min(100, action.payload))
      };

    case 'TOGGLE_BOUNDING_BOXES':
      return {
        ...state,
        showBoundingBoxes: !state.showBoundingBoxes
      };

    case 'TOGGLE_HEATMAP':
      return {
        ...state,
        showHeatmap: !state.showHeatmap
      };

    case 'SELECT_BOUNDING_BOX':
      return {
        ...state,
        selectedBoxId: action.payload
      };

    case 'TOGGLE_ACCESSIBILITY_VIEW':
      return {
        ...state,
        isAccessibilityView: !state.isAccessibilityView
      };

    case 'TOGGLE_SCAN_ANIMATION':
      return {
        ...state,
        isScanAnimating: !state.isScanAnimating
      };

    case 'RESET_CLAIM_STATE':
      return createInitialState(state.activeSampleId);

    default:
      return state;
  }
}
