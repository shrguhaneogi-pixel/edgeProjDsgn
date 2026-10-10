import { DistrictProject, ASTNode, DistrictRanking } from './index';

export type ViewMode = 'RESIDENT_SURVEY' | 'PERSONAL_SUMMARY' | 'ADMIN_AST' | 'ACCESSIBLE_TREE';

export interface AppState {
  viewMode: ViewMode;
  currentSurveyStep: number;
  userChoices: Record<string, string>; // stepId -> selectedProjectId
  selectedNodeId: string | null;
  categoryWeights: Record<string, number>; // category -> weight (0 to 1)
  projects: DistrictProject[];
  astNodes: Record<string, ASTNode>;
  rankings: DistrictRanking[];
  isTestModalOpen: boolean;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  reducedMotion: boolean;
}

export type AppAction =
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'RECORD_CHOICE'; payload: { stepId: string; selectedProjectId: string } }
  | { type: 'SET_SURVEY_STEP'; payload: number }
  | { type: 'RESET_SURVEY' }
  | { type: 'SELECT_AST_NODE'; payload: string | null }
  | { type: 'UPDATE_CATEGORY_WEIGHT'; payload: { category: string; weight: number } }
  | { type: 'RESET_SIMULATION_WEIGHTS' }
  | { type: 'TOGGLE_TEST_MODAL' }
  | { type: 'TOGGLE_REDUCED_MOTION' };
