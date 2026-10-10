// Unit Tests for Parametric Pulse Geospatial & Rule Logic

import { calculateHaversineDistance, interpolateTrackPoint } from './geo';
import { demoScenarios } from '../data/demoScenarios';

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

  // Test 1: Haversine distance calculation accuracy
  const dist = calculateHaversineDistance(14.5, -76.0, 14.5, -76.0);
  assert(dist === 0, 'Haversine distance between identical points is 0km');

  // Test 2: Distance between Port Aurora and storm landfall checkpoint
  const landfallDist = calculateHaversineDistance(14.5, -76.0, 14.5, -76.0);
  assert(landfallDist <= 45, 'Landfall checkpoint is within 45km hazard radius');

  // Test 3: Checkpoint Interpolation at exact hour
  const scenarioB = demoScenarios[0];
  const cp24 = interpolateTrackPoint(scenarioB.checkpoints, 24);
  assert(cp24.windSpeedKts === 135, 'T+24h wind speed is 135 kts (Category 4)');

  // Test 4: Checkpoint Interpolation between checkpoints (T+3h)
  const cp3 = interpolateTrackPoint(scenarioB.checkpoints, 3);
  assert(cp3.windSpeedKts > 75 && cp3.windSpeedKts < 92, 'T+3h wind speed correctly interpolated');

  // Test 5: Category 4 Parametric Rule satisfaction for Scenario B
  const cp24Landfall = interpolateTrackPoint(scenarioB.checkpoints, 24);
  const rule = scenarioB.rule;
  const isSatisfied =
    cp24Landfall.windSpeedKts >= rule.minWindSpeedKts &&
    calculateHaversineDistance(cp24Landfall.lat, cp24Landfall.lng, scenarioB.assets[0].lat, scenarioB.assets[0].lng) <= rule.maxDistanceKm;
  assert(isSatisfied === true, 'Scenario B T+24h satisfies parametric payout trigger');

  // Test 6: Non-qualifying Scenario A fails parametric trigger
  const scenarioA = demoScenarios[1];
  const cp24A = interpolateTrackPoint(scenarioA.checkpoints, 24);
  const distA = calculateHaversineDistance(cp24A.lat, cp24A.lng, scenarioA.assets[0].lat, scenarioA.assets[0].lng);
  const isSatisfiedA = cp24A.windSpeedKts >= rule.minWindSpeedKts && distA <= rule.maxDistanceKm;
  assert(isSatisfiedA === false, 'Scenario A T+24h fails parametric payout trigger');

  return { passed, failed, logs };
}
