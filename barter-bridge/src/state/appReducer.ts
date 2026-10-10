import { AppState, AppAction } from '../types/stateModel';
import { demoProjects, demoASTNodes, demoRankings } from '../data/demoDistrictData';
import { calculateSimulationDiff } from '../utils/astEvaluator';

export const initialCategoryWeights: Record<string, number> = {
  SAFETY: 0.30,
  SUSTAINABILITY: 0.25,
  HEALTH: 0.20,
  INFRASTRUCTURE: 0.15,
  EDUCATION: 0.10,
};

export const initialAppState: AppState = {
  viewMode: 'RESIDENT_SURVEY',
  currentSurveyStep: 1,
  userChoices: {},
  selectedNodeId: 'node-root',
  categoryWeights: { ...initialCategoryWeights },
  projects: demoProjects,
  astNodes: demoASTNodes,
  rankings: demoRankings,
  isTestModalOpen: false,
  isLoading: false,
  hasError: false,
  errorMessage: null,
  reducedMotion: false,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload,
      };

    case 'RECORD_CHOICE': {
      const newUserChoices = {
        ...state.userChoices,
        [action.payload.stepId]: action.payload.selectedProjectId,
      };
      return {
        ...state,
        userChoices: newUserChoices,
      };
    }

    case 'SET_SURVEY_STEP':
      return {
        ...state,
        currentSurveyStep: Math.max(1, Math.min(5, action.payload)),
      };

    case 'RESET_SURVEY':
      return {
        ...state,
        currentSurveyStep: 1,
        userChoices: {},
        viewMode: 'RESIDENT_SURVEY',
      };

    case 'SELECT_AST_NODE':
      return {
        ...state,
        selectedNodeId: action.payload,
      };

    case 'UPDATE_CATEGORY_WEIGHT': {
      const newWeights = {
        ...state.categoryWeights,
        [action.payload.category]: action.payload.weight,
      };
      const updatedRankings = calculateSimulationDiff(demoRankings, newWeights);

      return {
        ...state,
        categoryWeights: newWeights,
        rankings: updatedRankings,
      };
    }

    case 'RESET_SIMULATION_WEIGHTS':
      return {
        ...state,
        categoryWeights: { ...initialCategoryWeights },
        rankings: demoRankings,
      };

    case 'TOGGLE_TEST_MODAL':
      return {
        ...state,
        isTestModalOpen: !state.isTestModalOpen,
      };

    case 'TOGGLE_REDUCED_MOTION':
      return {
        ...state,
        reducedMotion: !state.reducedMotion,
      };

    default:
      return state;
  }
}
