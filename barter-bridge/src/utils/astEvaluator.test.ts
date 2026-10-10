// Unit Test Suite for Barter Bridge AST Evaluator Math

import { evaluateDistrictRankings, calculateSimulationDiff } from './astEvaluator';
import { demoProjects, demoRankings } from '../data/demoDistrictData';
import { initialCategoryWeights } from '../state/appReducer';

export function runTests(): { passed: number; failed: number; logs: string[] } {
  const logs: string[] = [];
  let passed = 0;
  let failed = 0;

  const assert = (condition: boolean, testName: string) => {
    if (condition) {
      passed++;
      logs.push(`✓ PASS: ${testName}`);
    } else {
      failed++;
      logs.push(`✗ FAIL: ${testName}`);
    }
  };

  // Test 1: Evaluate baseline rankings returns 5 projects
  const rankings = evaluateDistrictRankings(demoProjects, initialCategoryWeights);
  assert(rankings.length === 5, 'Baseline ranking computes scores for all 5 municipal projects');

  // Test 2: Top ranked baseline project is Flood Barrier (SAFETY)
  assert(rankings[0].category === 'SAFETY', 'Top ranked project is SAFETY category (Flood Barrier)');

  // Test 3: Simulation weight boost for SUSTAINABILITY improves its rank
  const boostedWeights = {
    ...initialCategoryWeights,
    SUSTAINABILITY: 0.60, // Boost sustainability from 0.25 to 0.60
    SAFETY: 0.05,
  };
  const simDiff = calculateSimulationDiff(demoRankings, boostedWeights);
  const sustProject = simDiff.find((r) => r.category === 'SUSTAINABILITY');
  assert(sustProject !== undefined && sustProject.rankDiff > 0, 'Boosting Sustainability weight improves its simulation rank diff (+)');

  // Test 4: Unmodified weights produce zero rank diff
  const unchangedDiff = calculateSimulationDiff(demoRankings, initialCategoryWeights);
  const totalDiffSum = unchangedDiff.reduce((acc, r) => acc + Math.abs(r.rankDiff), 0);
  assert(totalDiffSum === 0, 'Unchanged category weights produce 0 rank diffs');

  return { passed, failed, logs };
}
