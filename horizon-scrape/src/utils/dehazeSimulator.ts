import { QualityCheckResult } from '../types';

/**
 * Simulates Koschmieder's Law for meteorological visibility distance:
 * V_ext = 3.912 / beta_ext
 * Where beta_ext is the optical attenuation extinction coefficient.
 */
export function calculateVisibilityDistanceKm(attenuation: number): number {
  const clamped = Math.max(0.05, Math.min(1.0, attenuation));
  // Extinction coefficient scaling: 0.1 (clean air) to 2.0 (dense smog)
  const betaExt = 0.1 + clamped * 1.8;
  const distance = 3.912 / betaExt;
  return Number(distance.toFixed(1));
}

/**
 * Validates photo submission quality against exposure, blur, and horizon detection.
 */
export function validateHorizonPhoto(
  brightness: number, // 0 - 255
  sharpness: number,  // 0 - 100
  horizonYRatio: number // 0.0 - 1.0 (expected ~0.3 - 0.7)
): QualityCheckResult {
  const exposureValid = brightness >= 45 && brightness <= 220;
  const sharpnessValid = sharpness >= 40;
  const horizonDetected = horizonYRatio >= 0.25 && horizonYRatio <= 0.75;

  const warnings: string[] = [];
  if (!exposureValid) {
    warnings.push(brightness < 45 ? 'Under-exposed (too dark for horizon segmentation)' : 'Over-exposed (sky washed out, clipping haze transmission)');
  }
  if (!sharpnessValid) {
    warnings.push('Motion blur detected. Sharp horizon boundary required for contrast calculation.');
  }
  if (!horizonDetected) {
    warnings.push('Horizon line not detected within center 50% of viewport. Ensure composition includes both land and sky.');
  }

  const overallValid = exposureValid && sharpnessValid && horizonDetected;
  const simulatedAttenuation = Number((0.2 + (1.0 - sharpness / 100) * 0.5 + (1.0 - Math.abs(0.5 - horizonYRatio) * 2) * 0.2).toFixed(2));

  return {
    exposureValid,
    sharpnessValid,
    horizonDetected,
    overallValid,
    message: overallValid ? 'Image quality verified: clear horizon line and balanced exposure.' : warnings.join(' | '),
    opticalAttenuation: Math.min(0.95, Math.max(0.1, simulatedAttenuation)),
    visibilityKm: calculateVisibilityDistanceKm(simulatedAttenuation)
  };
}
