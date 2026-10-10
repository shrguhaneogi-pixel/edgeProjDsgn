import {
  calculateCropDamageSeverity,
  calculateDiagnosticConfidence,
  calculateParametricSubsidyPayout,
  evaluateCropSample,
} from './diagnosticEvaluator';
import { DEMO_CROP_SAMPLES } from '../data/demoCropData';
import { createInitialState, appReducer } from '../state/appReducer';

export interface TestResult {
  id: string;
  name: string;
  passed: boolean;
  actual: string;
  expected: string;
  details: string;
}

export function runDiagnosticTestSuite(): TestResult[] {
  const results: TestResult[] = [];

  // Test 1: Damage Severity calculation with lesion boxes
  try {
    const maizeSample = DEMO_CROP_SAMPLES[0];
    const severity = calculateCropDamageSeverity(maizeSample.boundingBoxes, 640, 400);
    const passed = severity > 0 && severity <= 100;
    results.push({
      id: 'test-1',
      name: 'Lesion Area Damage Ratio (D_ratio) Calculation',
      passed,
      actual: `${severity}%`,
      expected: 'Greater than 0% and <= 100%',
      details: 'Evaluated total bounding box lesion surface area against leaf viewport grid.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    results.push({
      id: 'test-1',
      name: 'Lesion Area Damage Ratio (D_ratio) Calculation',
      passed: false,
      actual: errorMsg,
      expected: 'Valid damage ratio percentage',
      details: 'Error executing test assertion.',
    });
  }

  // Test 2: Explainable Diagnostic Confidence Score (C_score)
  try {
    const maizeSample = DEMO_CROP_SAMPLES[0];
    const cScore = calculateDiagnosticConfidence(maizeSample.symptoms);
    const passed = cScore === 92;
    results.push({
      id: 'test-2',
      name: 'Explainable AI Confidence Score (C_score)',
      passed,
      actual: `${cScore}%`,
      expected: '92%',
      details: 'Averaged symptom match percentage scores (95%, 90%, 91%).',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    results.push({
      id: 'test-2',
      name: 'Explainable AI Confidence Score (C_score)',
      passed: false,
      actual: errorMsg,
      expected: '92%',
      details: 'Error executing test assertion.',
    });
  }

  // Test 3: Parametric Subsidy Payout formula (Qualifying Claim)
  try {
    const payoutObj = calculateParametricSubsidyPayout(38, 10.0, 850, 15);
    const passed = payoutObj.isThresholdMet && payoutObj.eligibleSubsidyUsd === 2300;
    results.push({
      id: 'test-3',
      name: 'Parametric Subsidy Formula (Qualifying Claim: D_ratio 38%)',
      passed,
      actual: `$${payoutObj.eligibleSubsidyUsd} USD (Eligible: ${payoutObj.isThresholdMet})`,
      expected: '$2300 USD (Eligible: true)',
      details: 'Applied formula P_subsidy = 850 * 10 * ((0.38 - 0.15) / (1 - 0.15)).',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    results.push({
      id: 'test-3',
      name: 'Parametric Subsidy Formula (Qualifying Claim)',
      passed: false,
      actual: errorMsg,
      expected: '$2300 USD',
      details: 'Error executing test assertion.',
    });
  }

  // Test 4: Parametric Subsidy Payout (Healthy Below-Threshold Claim)
  try {
    const payoutObj = calculateParametricSubsidyPayout(4, 8.0, 850, 15);
    const passed = !payoutObj.isThresholdMet && payoutObj.eligibleSubsidyUsd === 0;
    results.push({
      id: 'test-4',
      name: 'Parametric Subsidy Threshold Enforcement (Healthy Crop D_ratio 4%)',
      passed,
      actual: `$${payoutObj.eligibleSubsidyUsd} USD (Eligible: ${payoutObj.isThresholdMet})`,
      expected: '$0 USD (Eligible: false)',
      details: 'Enforced zero payout for damage below 15% parametric eligibility threshold.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    results.push({
      id: 'test-4',
      name: 'Parametric Subsidy Threshold Enforcement',
      passed: false,
      actual: errorMsg,
      expected: '$0 USD',
      details: 'Error executing test assertion.',
    });
  }

  // Test 5: Full Crop Sample Assessment Construction
  try {
    const maizeSample = DEMO_CROP_SAMPLES[0];
    const assessment = evaluateCropSample(maizeSample);
    const passed = assessment.sampleId === maizeSample.id && assessment.isThresholdMet && assessment.eligibleSubsidyUsd === 2300;
    results.push({
      id: 'test-5',
      name: 'Complete Crop Sample Assessment Data Engine',
      passed,
      actual: `ID: ${assessment.sampleId}, Payout: $${assessment.eligibleSubsidyUsd} USD`,
      expected: `ID: ${maizeSample.id}, Payout: $2300 USD`,
      details: 'Constructed full DiagnosticAssessmentState data structure from raw sample.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    results.push({
      id: 'test-5',
      name: 'Complete Crop Sample Assessment Data Engine',
      passed: false,
      actual: errorMsg,
      expected: 'Valid assessment state object',
      details: 'Error executing test assertion.',
    });
  }

  // Test 6: State Reducer Claim Advancement
  try {
    const initialState = createInitialState('sample-maize-blight');
    const step1 = appReducer(initialState, { type: 'ADVANCE_CLAIM_STATUS' });
    const step2 = appReducer(step1, { type: 'ADVANCE_CLAIM_STATUS' });
    const passed = step1.claimStatus === 'ADJUDICATION_PENDING' && step2.claimStatus === 'SUBSIDY_DISPATCHED';

    results.push({
      id: 'test-6',
      name: 'App Reducer Claim Lifecycle State Machine Transitions',
      passed,
      actual: `Step 1: ${step1.claimStatus}, Step 2: ${step2.claimStatus}`,
      expected: 'Step 1: ADJUDICATION_PENDING, Step 2: SUBSIDY_DISPATCHED',
      details: 'Verified state transitions through parametric claim settlement rail.',
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    results.push({
      id: 'test-6',
      name: 'App Reducer Claim Lifecycle State Machine',
      passed: false,
      actual: errorMsg,
      expected: 'Valid state transitions',
      details: 'Error executing test assertion.',
    });
  }

  return results;
}
