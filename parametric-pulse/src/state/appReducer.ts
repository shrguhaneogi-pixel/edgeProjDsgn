import { AppState, AppAction } from '../types/stateModel';

export const initialAppState: AppState = {
  activeScenarioId: 'scenario-b-cat4',
  scenarios: [],
  currentHourIndex: 24, // Landfall checkpoint
  isPlaying: false,
  playbackSpeed: 1,
  selectedAssetId: 'asset-harbor-1',
  payoutStep: 'IDLE',
  payoutEvents: [],
  viewMode: 'OPERATIONS_DASHBOARD',
  isLoading: false,
  hasError: false,
  errorMessage: null,
  reducedMotion: false
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SCENARIO':
      return {
        ...state,
        activeScenarioId: action.payload,
        payoutStep: 'IDLE',
        payoutEvents: []
      };

    case 'SET_HOUR_INDEX':
      return {
        ...state,
        currentHourIndex: Math.max(0, Math.min(48, action.payload))
      };

    case 'TOGGLE_PLAYBACK':
      return {
        ...state,
        isPlaying: !state.isPlaying
      };

    case 'SET_PLAYBACK_SPEED':
      return {
        ...state,
        playbackSpeed: action.payload
      };

    case 'SET_SELECTED_ASSET':
      return {
        ...state,
        selectedAssetId: action.payload
      };

    case 'SET_PAYOUT_STEP':
      return {
        ...state,
        payoutStep: action.payload
      };

    case 'RESET_PAYOUT':
      return {
        ...state,
        payoutStep: 'IDLE',
        payoutEvents: []
      };

    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        hasError: action.payload !== null,
        errorMessage: action.payload
      };

    case 'TOGGLE_REDUCED_MOTION':
      return {
        ...state,
        reducedMotion: !state.reducedMotion
      };

    default:
      return state;
  }
}
