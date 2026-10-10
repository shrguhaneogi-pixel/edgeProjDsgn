// Parametric Pulse Interaction State Model & Reducer Schemas

import { CycloneScenario, PayoutStepStatus } from './index';

export type ViewMode = 'OPERATIONS_DASHBOARD' | 'ACCESSIBLE_TABLE' | 'TRIGGER_SPECS';

export interface AppState {
  activeScenarioId: string;
  scenarios: CycloneScenario[];
  currentHourIndex: number; // 0 to 48
  isPlaying: boolean;
  playbackSpeed: number; // 1x, 2x, 4x
  selectedAssetId: string;
  payoutStep: PayoutStepStatus;
  payoutEvents: Array<{
    step: PayoutStepStatus;
    title: string;
    description: string;
    timestamp: string;
    txHash?: string;
  }>;
  viewMode: ViewMode;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  reducedMotion: boolean;
}

export type AppAction =
  | { type: 'SET_SCENARIO'; payload: string }
  | { type: 'SET_HOUR_INDEX'; payload: number }
  | { type: 'TOGGLE_PLAYBACK' }
  | { type: 'SET_PLAYBACK_SPEED'; payload: number }
  | { type: 'SET_SELECTED_ASSET'; payload: string }
  | { type: 'SET_PAYOUT_STEP'; payload: PayoutStepStatus }
  | { type: 'RESET_PAYOUT' }
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'TOGGLE_REDUCED_MOTION' };
