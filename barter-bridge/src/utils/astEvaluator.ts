// AST & Preference Ranking Math Evaluator for The Barter Bridge

import { DistrictProject, DistrictRanking } from '../types';

/**
 * Recalculates district rankings based on category weight overrides.
 */
export function evaluateDistrictRankings(
  projects: DistrictProject[],
  categoryWeights: Record<string, number>
): DistrictRanking[] {
  // Compute raw scores for each project
  const scored = projects.map((p) => {
    const rawVoteShare = p.votes / 200; // normalize
    const weight = categoryWeights[p.category] ?? 0.20;
    const score = Math.round((rawVoteShare * 0.5 + weight * 0.5) * 100) / 100;

    return {
      projectId: p.id,
      projectTitle: p.title,
      category: p.category,
      rawScore: score,
    };
  });

  // Sort descending by rawScore
  const sortedBaseline = [...scored].sort((a, b) => b.rawScore - a.rawScore);

  return sortedBaseline.map((item, idx) => ({
    projectId: item.projectId,
    projectTitle: item.projectTitle,
    category: item.category,
    baselineScore: item.rawScore,
    simulatedScore: item.rawScore,
    rankBaseline: idx + 1,
    rankSimulated: idx + 1,
    rankDiff: 0,
  }));
}

/**
 * Recalculates simulation ranking diffs when category weights are modified.
 */
export function calculateSimulationDiff(
  baselineRankings: DistrictRanking[],
  simulatedCategoryWeights: Record<string, number>
): DistrictRanking[] {
  const simulated = baselineRankings.map((r) => {
    const weight = simulatedCategoryWeights[r.category] ?? 0.20;
    const simScore = Math.round((r.baselineScore * 0.6 + weight * 0.4) * 100) / 100;
    return { ...r, simulatedScore: simScore };
  });

  // Sort descending by simulatedScore
  const sortedSimulated = [...simulated].sort((a, b) => b.simulatedScore - a.simulatedScore);

  // Map new simulated rank positions
  const simRankMap = new Map<string, number>();
  sortedSimulated.forEach((item, idx) => {
    simRankMap.set(item.projectId, idx + 1);
  });

  return baselineRankings.map((r) => {
    const newRank = simRankMap.get(r.projectId) || r.rankBaseline;
    const diff = r.rankBaseline - newRank; // positive means rank improved (+1), negative means dropped (-1)
    const simItem = sortedSimulated.find((s) => s.projectId === r.projectId);

    return {
      ...r,
      simulatedScore: simItem?.simulatedScore ?? r.baselineScore,
      rankSimulated: newRank,
      rankDiff: diff,
    };
  });
}
