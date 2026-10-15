export type ObservationStatus = 'live' | 'stale' | 'simulated' | 'unavailable';

export interface HorizonObservation {
  id: string;
  title: string;
  neighborhood: string;
  timestamp: string;
  hour: number; // 0-23 for scrubber
  coordinates: {
    lat: number;
    lng: number;
    x: number; // 0-100% normalized canvas
    y: number; // 0-100% normalized canvas
  };
  opticalAttenuation: number; // 0.0 - 1.0 (Dark channel prior proxy)
  visibilityEstimateKm: number;
  calibratedPM25: number | null; // null if uncalibrated visual proxy only
  sensorSource: string;
  qualityScore: number;
  humidityPercent: number;
  sunAngleDegrees: number;
  cameraInfo: string;
  status: ObservationStatus;
  originalDescription: string;
  methodologyNotes: string;
}

export interface QualityCheckResult {
  exposureValid: boolean;
  sharpnessValid: boolean;
  horizonDetected: boolean;
  overallValid: boolean;
  message: string;
  opticalAttenuation: number;
  visibilityKm: number;
}
