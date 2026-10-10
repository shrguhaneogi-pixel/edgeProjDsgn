import { SectorAsset, TerrainScenario } from '../types';

export const INITIAL_SECTOR_ASSETS: SectorAsset[] = [
  {
    id: 'downtown-core',
    name: 'Downtown Commercial Core',
    category: 'COMMERCIAL',
    assetValueUsd: 240_000_000,
    elevationMeters: 8.5,
    population: 18_500,
    inundationRiskThresholdMeters: 0.8,
    description: 'High-density commercial center, financial institutions, and central transit hub.'
  },
  {
    id: 'industrial-park',
    name: 'Waterfront Industrial Park',
    category: 'INDUSTRIAL',
    assetValueUsd: 110_000_000,
    elevationMeters: 7.8,
    population: 4_200,
    inundationRiskThresholdMeters: 1.0,
    description: 'Manufacturing facilities, logistics warehousing, and water processing station.'
  },
  {
    id: 'residential-hills',
    name: 'North Heights Residential',
    category: 'RESIDENTIAL',
    assetValueUsd: 180_000_000,
    elevationMeters: 14.2,
    population: 26_000,
    inundationRiskThresholdMeters: 2.0,
    description: 'Elevated urban residential district above main river valley overflow line.'
  },
  {
    id: 'agricultural-zone',
    name: 'Valley Sacrificial Retention Basin',
    category: 'AGRICULTURAL',
    assetValueUsd: 15_000_000,
    elevationMeters: 7.0,
    population: 350,
    inundationRiskThresholdMeters: 0.5,
    description: 'Designated low-density sacrificial flood plain & agricultural bypass channel.'
  }
];

export const DEMO_SCENARIOS: TerrainScenario[] = [
  {
    id: 'scenario-baseline',
    name: 'Scenario A: Baseline Overtopping',
    description: 'Natural river channel at 1,600 m³/s peak surge without sacrificial diversion. High inundation risk for Commercial Core.',
    peakDischargeM3PerSec: 1600,
    sacrificialGateDefault: 'CLOSED',
    expectedDownstreamDepthMeters: 3.2,
    impactSummary: 'Severe inundation ($168M asset exposure) in Downtown Core; Sacrificial Basin dry.'
  },
  {
    id: 'scenario-bypass-active',
    name: 'Scenario B: Sacrificial Channel Active',
    description: 'Sacrificial Diversion Gate OPEN at 1,600 m³/s surge. Diverts 520 m³/s into Agricultural Retention Basin.',
    peakDischargeM3PerSec: 1600,
    sacrificialGateDefault: 'OPEN',
    expectedDownstreamDepthMeters: 1.8,
    impactSummary: 'Downtown inundation depth reduced by 1.4m (-$135M risk Exposure); Sacrificial Basin flooded controlled.'
  },
  {
    id: 'scenario-extreme-surge',
    name: 'Scenario C: 100-Year Extreme Flash Surge',
    description: 'Extreme catastrophic surge event at 2,400 m³/s peak discharge testing channel overtopping limits.',
    peakDischargeM3PerSec: 2400,
    sacrificialGateDefault: 'OPEN',
    expectedDownstreamDepthMeters: 3.8,
    impactSummary: 'Full channel diversion active; emergency evacuation protocol required for low-lying sectors.'
  }
];
