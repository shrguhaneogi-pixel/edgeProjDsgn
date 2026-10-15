import { HorizonObservation, ObservationStatus } from './index';

export type ViewMode = 'MAP_VIEW' | 'LIST_VIEW' | 'METHODOLOGY';

export interface AppState {
  observations: HorizonObservation[];
  activeObservationId: string;
  currentHour: number; // 0 - 23
  sliderPosition: number; // 0 - 100% split
  viewMode: ViewMode;
  isUploadModalOpen: boolean;
  filterStatus: ObservationStatus | 'all';
  showOfficialSensors: boolean;
  isPlayingTime: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
}

export type AppAction =
  | { type: 'SELECT_OBSERVATION'; payload: string }
  | { type: 'SET_CURRENT_HOUR'; payload: number }
  | { type: 'SET_SLIDER_POSITION'; payload: number }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'TOGGLE_UPLOAD_MODAL' }
  | { type: 'SET_FILTER_STATUS'; payload: ObservationStatus | 'all' }
  | { type: 'TOGGLE_OFFICIAL_SENSORS' }
  | { type: 'TOGGLE_PLAYBACK' }
  | { type: 'ADD_OBSERVATION'; payload: HorizonObservation }
  | { type: 'RESET_STATE' }
  | { type: 'SET_ERROR'; payload: string | null };
