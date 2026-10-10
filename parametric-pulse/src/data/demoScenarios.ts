import { CycloneScenario, CoastalAsset, ParametricRule } from '../types';

export const demoAssets: CoastalAsset[] = [
  {
    id: 'asset-harbor-1',
    name: 'Port Aurora Deepwater Harbor',
    type: 'HARBOR',
    lat: 14.5,
    lng: -76.0,
    insuredValueUsd: 1500000,
    hazardRadiusKm: 45,
  },
  {
    id: 'asset-grid-2',
    name: 'Coastal Substation Power Grid',
    type: 'POWER_GRID',
    lat: 14.8,
    lng: -75.8,
    insuredValueUsd: 1000000,
    hazardRadiusKm: 35,
  },
  {
    id: 'asset-hospital-3',
    name: 'Regional Emergency Medical Center',
    type: 'HOSPITAL',
    lat: 15.2,
    lng: -75.2,
    insuredValueUsd: 750000,
    hazardRadiusKm: 30,
  },
];

export const demoRule: ParametricRule = {
  id: 'rule-cyclone-cat4',
  assetId: 'asset-harbor-1',
  metric: 'WIND_SPEED_AND_PROXIMITY',
  minWindSpeedKts: 130, // Cat 4 wind speed threshold
  maxDistanceKm: 45, // Proximity threshold
  observationWindowHours: 3,
  payoutAmountUsd: 1500000,
};

export const demoScenarios: CycloneScenario[] = [
  {
    id: 'scenario-b-cat4',
    name: 'Scenario B: Cyclone Maya (Category 4 Landfall)',
    description: 'Qualifying Category 4 storm making direct landfall near Port Aurora harbor at T+24h.',
    qualifiesForPayout: true,
    assets: demoAssets,
    rule: demoRule,
    checkpoints: [
      { id: 'cp-0', hour: 0, timestamp: 'T+0h', lat: 12.5, lng: -81.5, windSpeedKts: 75, pressureHpa: 985, category: 'Cat 1', forecastType: 'OBSERVED' },
      { id: 'cp-6', hour: 6, timestamp: 'T+6h', lat: 13.0, lng: -80.2, windSpeedKts: 92, pressureHpa: 970, category: 'Cat 2', forecastType: 'OBSERVED' },
      { id: 'cp-12', hour: 12, timestamp: 'T+12h', lat: 13.5, lng: -78.8, windSpeedKts: 110, pressureHpa: 955, category: 'Cat 3', forecastType: 'OBSERVED' },
      { id: 'cp-18', hour: 18, timestamp: 'T+18h', lat: 14.0, lng: -77.2, windSpeedKts: 125, pressureHpa: 940, category: 'Cat 3', forecastType: 'PROJECTED' },
      { id: 'cp-24', hour: 24, timestamp: 'T+24h', lat: 14.5, lng: -76.0, windSpeedKts: 135, pressureHpa: 928, category: 'Cat 4', forecastType: 'PROJECTED' }, // Trigger point!
      { id: 'cp-30', hour: 30, timestamp: 'T+30h', lat: 15.1, lng: -75.0, windSpeedKts: 120, pressureHpa: 945, category: 'Cat 3', forecastType: 'PROJECTED' },
      { id: 'cp-36', hour: 36, timestamp: 'T+36h', lat: 15.8, lng: -74.2, windSpeedKts: 95, pressureHpa: 965, category: 'Cat 2', forecastType: 'PROJECTED' },
      { id: 'cp-42', hour: 42, timestamp: 'T+42h', lat: 16.5, lng: -73.5, windSpeedKts: 70, pressureHpa: 985, category: 'Cat 1', forecastType: 'PROJECTED' },
      { id: 'cp-48', hour: 48, timestamp: 'T+48h', lat: 17.2, lng: -72.8, windSpeedKts: 50, pressureHpa: 998, category: 'TS', forecastType: 'PROJECTED' },
    ],
  },
  {
    id: 'scenario-a-cat2',
    name: 'Scenario A: Tropical Storm Nuri (Category 2 Bypass)',
    description: 'Non-qualifying storm bypassing coastal assets at a distance of 85km with peak winds of 90 kts.',
    qualifiesForPayout: false,
    assets: demoAssets,
    rule: demoRule,
    checkpoints: [
      { id: 'cp-a0', hour: 0, timestamp: 'T+0h', lat: 12.0, lng: -81.0, windSpeedKts: 45, pressureHpa: 995, category: 'TS', forecastType: 'OBSERVED' },
      { id: 'cp-a6', hour: 6, timestamp: 'T+6h', lat: 12.8, lng: -80.0, windSpeedKts: 60, pressureHpa: 990, category: 'TS', forecastType: 'OBSERVED' },
      { id: 'cp-a12', hour: 12, timestamp: 'T+12h', lat: 13.5, lng: -79.0, windSpeedKts: 75, pressureHpa: 982, category: 'Cat 1', forecastType: 'OBSERVED' },
      { id: 'cp-a18', hour: 18, timestamp: 'T+18h', lat: 14.2, lng: -78.2, windSpeedKts: 88, pressureHpa: 975, category: 'Cat 2', forecastType: 'PROJECTED' },
      { id: 'cp-a24', hour: 24, timestamp: 'T+24h', lat: 15.0, lng: -77.5, windSpeedKts: 90, pressureHpa: 972, category: 'Cat 2', forecastType: 'PROJECTED' },
      { id: 'cp-a30', hour: 30, timestamp: 'T+30h', lat: 15.8, lng: -76.8, windSpeedKts: 80, pressureHpa: 980, category: 'Cat 1', forecastType: 'PROJECTED' },
      { id: 'cp-a36', hour: 36, timestamp: 'T+36h', lat: 16.5, lng: -76.0, windSpeedKts: 65, pressureHpa: 988, category: 'Cat 1', forecastType: 'PROJECTED' },
      { id: 'cp-a42', hour: 42, timestamp: 'T+42h', lat: 17.2, lng: -75.2, windSpeedKts: 50, pressureHpa: 996, category: 'TS', forecastType: 'PROJECTED' },
      { id: 'cp-a48', hour: 48, timestamp: 'T+48h', lat: 17.8, lng: -74.5, windSpeedKts: 35, pressureHpa: 1002, category: 'TS', forecastType: 'PROJECTED' },
    ],
  },
];
