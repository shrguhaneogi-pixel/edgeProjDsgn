import { DistrictProject, PairwiseComparison, ASTNode, DistrictRanking } from '../types';

export const demoProjects: DistrictProject[] = [
  {
    id: 'proj-safety-1',
    title: 'River Basin Flood Barrier & Drainage',
    category: 'SAFETY',
    costUsd: 2100000,
    impactSummary: 'Protects 12,000 homes from seasonal river flooding and storm surges.',
    detailedDescription: 'Constructs reinforced levees, automated floodgates, and high-capacity drainage pump stations along the North River embankment.',
    votes: 185,
  },
  {
    id: 'proj-sust-2',
    title: 'Community Solar Power Microgrid',
    category: 'SUSTAINABILITY',
    costUsd: 1800000,
    impactSummary: 'Provides clean emergency backup power to critical district facilities.',
    detailedDescription: 'Installs rooftop solar panels and battery energy storage across municipal buildings, reducing carbon emissions by 40%.',
    votes: 162,
  },
  {
    id: 'proj-infra-3',
    title: 'Main Street Transit & Road Resurfacing',
    category: 'INFRASTRUCTURE',
    costUsd: 1200000,
    impactSummary: 'Repairs critical transit corridors and builds dedicated bike lanes.',
    detailedDescription: 'Full asphalt resurfacing, bus rapid transit lane markings, and pedestrian safety island installations along Commercial Avenue.',
    votes: 140,
  },
  {
    id: 'proj-health-4',
    title: 'Regional Emergency Medical Clinic',
    category: 'HEALTH',
    costUsd: 1500000,
    impactSummary: 'Expands local triage capacity and 24/7 urgent care access.',
    detailedDescription: 'Constructs a modern 15-bed urgent care annex equipped with diagnostic imaging and emergency response ambulance bays.',
    votes: 175,
  },
  {
    id: 'proj-edu-5',
    title: 'Public Library Digital & Tech Hub',
    category: 'EDUCATION',
    costUsd: 800000,
    impactSummary: 'Free gigabit internet, STEM lab, and workforce training center.',
    detailedDescription: 'Upgrades the Central Library with 50 high-speed workstations, 3D printing equipment, and digital literacy classrooms.',
    votes: 110,
  },
];

export const demoComparisons: PairwiseComparison[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    projectA: demoProjects[0], // River Basin Flood Barrier
    projectB: demoProjects[1], // Solar Power Microgrid
    tradeoffRationale: 'Choose between immediate flood risk reduction versus long-term clean energy resilience.',
  },
  {
    id: 'step-2',
    stepNumber: 2,
    projectA: demoProjects[2], // Road Resurfacing
    projectB: demoProjects[3], // Emergency Medical Clinic
    tradeoffRationale: 'Choose between smooth transport infrastructure versus expanded emergency health capacity.',
  },
  {
    id: 'step-3',
    stepNumber: 3,
    projectA: demoProjects[4], // Library Tech Hub
    projectB: demoProjects[0], // River Basin Flood Barrier
    tradeoffRationale: 'Choose between youth education & tech access versus flood safety levee construction.',
  },
  {
    id: 'step-4',
    stepNumber: 4,
    projectA: demoProjects[1], // Solar Power Microgrid
    projectB: demoProjects[3], // Emergency Medical Clinic
    tradeoffRationale: 'Choose between environmental energy sustainability versus community health infrastructure.',
  },
  {
    id: 'step-5',
    stepNumber: 5,
    projectA: demoProjects[2], // Road Resurfacing
    projectB: demoProjects[4], // Library Tech Hub
    tradeoffRationale: 'Choose between transit road repairs versus digital workforce literacy.',
  },
];

export const demoASTNodes: Record<string, ASTNode> = {
  'node-root': {
    id: 'node-root',
    label: 'District Recommended Priority AST',
    type: 'ROOT',
    operator: 'WEIGHTED_SUM',
    weight: 1.0,
    score: 0.82,
    description: 'Root evaluation node combining weighted category scores and civic preference inputs.',
    childrenIds: ['node-op-weighted-sum'],
  },
  'node-op-weighted-sum': {
    id: 'node-op-weighted-sum',
    label: 'WEIGHTED_SUM(Categories)',
    type: 'OPERATOR',
    operator: 'WEIGHTED_SUM',
    weight: 1.0,
    score: 0.82,
    description: 'Aggregates scores across Safety, Sustainability, Infrastructure, Health, and Education categories.',
    childrenIds: ['node-cat-safety', 'node-cat-sust', 'node-cat-health', 'node-cat-infra', 'node-cat-edu'],
  },
  'node-cat-safety': {
    id: 'node-cat-safety',
    label: 'Safety Category Node',
    type: 'CATEGORY',
    weight: 0.30,
    score: 0.91,
    description: 'Evaluates life safety, disaster prevention, and flood protection impact.',
    childrenIds: ['proj-safety-1'],
  },
  'node-cat-sust': {
    id: 'node-cat-sust',
    label: 'Sustainability Category Node',
    type: 'CATEGORY',
    weight: 0.25,
    score: 0.84,
    description: 'Evaluates clean energy, emissions reduction, and environmental resilience.',
    childrenIds: ['proj-sust-2'],
  },
  'node-cat-health': {
    id: 'node-cat-health',
    label: 'Health Category Node',
    type: 'CATEGORY',
    weight: 0.20,
    score: 0.86,
    description: 'Evaluates emergency medical triage and community health outcomes.',
    childrenIds: ['proj-health-4'],
  },
  'node-cat-infra': {
    id: 'node-cat-infra',
    label: 'Infrastructure Category Node',
    type: 'CATEGORY',
    weight: 0.15,
    score: 0.72,
    description: 'Evaluates transport mobility, road quality, and transit safety.',
    childrenIds: ['proj-infra-3'],
  },
  'node-cat-edu': {
    id: 'node-cat-edu',
    label: 'Education Category Node',
    type: 'CATEGORY',
    weight: 0.10,
    score: 0.65,
    description: 'Evaluates digital literacy, workforce training, and youth tech access.',
    childrenIds: ['proj-edu-5'],
  },
};

export const demoRankings: DistrictRanking[] = [
  {
    projectId: 'proj-safety-1',
    projectTitle: 'River Basin Flood Barrier & Drainage',
    category: 'SAFETY',
    baselineScore: 0.91,
    simulatedScore: 0.91,
    rankBaseline: 1,
    rankSimulated: 1,
    rankDiff: 0,
  },
  {
    projectId: 'proj-health-4',
    projectTitle: 'Regional Emergency Medical Clinic',
    category: 'HEALTH',
    baselineScore: 0.86,
    simulatedScore: 0.86,
    rankBaseline: 2,
    rankSimulated: 2,
    rankDiff: 0,
  },
  {
    projectId: 'proj-sust-2',
    projectTitle: 'Community Solar Power Microgrid',
    category: 'SUSTAINABILITY',
    baselineScore: 0.84,
    simulatedScore: 0.84,
    rankBaseline: 3,
    rankSimulated: 3,
    rankDiff: 0,
  },
  {
    projectId: 'proj-infra-3',
    projectTitle: 'Main Street Transit & Road Resurfacing',
    category: 'INFRASTRUCTURE',
    baselineScore: 0.72,
    simulatedScore: 0.72,
    rankBaseline: 4,
    rankSimulated: 4,
    rankDiff: 0,
  },
  {
    projectId: 'proj-edu-5',
    projectTitle: 'Public Library Digital & Tech Hub',
    category: 'EDUCATION',
    baselineScore: 0.65,
    simulatedScore: 0.65,
    rankBaseline: 5,
    rankSimulated: 5,
    rankDiff: 0,
  },
];
