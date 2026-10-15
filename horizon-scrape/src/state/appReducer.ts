import { AppAction, AppState } from '../types/stateModel';
import { DEMO_OBSERVATIONS } from '../data/demoObservations';

export const initialAppState: AppState = {
  observations: DEMO_OBSERVATIONS,
  activeObservationId: DEMO_OBSERVATIONS[0].id,
  currentHour: 8,
  sliderPosition: 50, // 50% split for comparison
  viewMode: 'MAP_VIEW',
  isUploadModalOpen: false,
  filterStatus: 'all',
  showOfficialSensors: true,
  isPlayingTime: false,
  isLoading: false,
  hasError: false,
  errorMessage: null,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SELECT_OBSERVATION': {
      const selected = state.observations.find((o) => o.id === action.payload);
      return {
        ...state,
        activeObservationId: action.payload,
        currentHour: selected ? selected.hour : state.currentHour,
      };
    }
    case 'SET_CURRENT_HOUR': {
      // Find observation closest to this hour if any
      const closest = state.observations.reduce((prev, curr) => {
        return Math.abs(curr.hour - action.payload) < Math.abs(prev.hour - action.payload) ? curr : prev;
      }, state.observations[0]);

      return {
        ...state,
        currentHour: action.payload,
        activeObservationId: closest.id,
      };
    }
    case 'SET_SLIDER_POSITION':
      return {
        ...state,
        sliderPosition: Math.max(0, Math.min(100, action.payload)),
      };
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload,
      };
    case 'TOGGLE_UPLOAD_MODAL':
      return {
        ...state,
        isUploadModalOpen: !state.isUploadModalOpen,
      };
    case 'SET_FILTER_STATUS':
      return {
        ...state,
        filterStatus: action.payload,
      };
    case 'TOGGLE_OFFICIAL_SENSORS':
      return {
        ...state,
        showOfficialSensors: !state.showOfficialSensors,
      };
    case 'TOGGLE_PLAYBACK':
      return {
        ...state,
        isPlayingTime: !state.isPlayingTime,
      };
    case 'ADD_OBSERVATION':
      return {
        ...state,
        observations: [action.payload, ...state.observations],
        activeObservationId: action.payload.id,
        currentHour: action.payload.hour,
        isUploadModalOpen: false,
      };
    case 'RESET_STATE':
      return initialAppState;
    case 'SET_ERROR':
      return {
        ...state,
        hasError: Boolean(action.payload),
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
