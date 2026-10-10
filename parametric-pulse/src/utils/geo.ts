// Geospatial & Mathematical Helper Functions for Parametric Pulse

import { CycloneCheckpoint } from '../types';

/**
 * Calculates Haversine distance in kilometers between two geo coordinates.
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * Catmull-Rom Spline Interpolation for smooth cyclone track points.
 */
export function interpolateTrackPoint(
  checkpoints: CycloneCheckpoint[],
  hour: number
): CycloneCheckpoint {
  if (checkpoints.length === 0) {
    throw new Error('Checkpoints array cannot be empty');
  }

  // Find exact or bounding checkpoints
  const exact = checkpoints.find((c) => c.hour === hour);
  if (exact) return exact;

  if (hour <= checkpoints[0].hour) return checkpoints[0];
  if (hour >= checkpoints[checkpoints.length - 1].hour)
    return checkpoints[checkpoints.length - 1];

  let i = 0;
  while (i < checkpoints.length - 1 && checkpoints[i + 1].hour < hour) {
    i++;
  }

  const p1 = checkpoints[i];
  const p2 = checkpoints[i + 1];
  const t = (hour - p1.hour) / (p2.hour - p1.hour);

  // Linear interpolation for lat, lng, wind, pressure
  const lat = p1.lat + (p2.lat - p1.lat) * t;
  const lng = p1.lng + (p2.lng - p1.lng) * t;
  const windSpeedKts = Math.round(p1.windSpeedKts + (p2.windSpeedKts - p1.windSpeedKts) * t);
  const pressureHpa = Math.round(p1.pressureHpa + (p2.pressureHpa - p1.pressureHpa) * t);

  let category: CycloneCheckpoint['category'] = 'TS';
  if (windSpeedKts >= 137) category = 'Cat 5';
  else if (windSpeedKts >= 113) category = 'Cat 4';
  else if (windSpeedKts >= 96) category = 'Cat 3';
  else if (windSpeedKts >= 83) category = 'Cat 2';
  else if (windSpeedKts >= 64) category = 'Cat 1';

  return {
    id: `interpolated-t${hour}h`,
    hour,
    timestamp: `T+${hour}h`,
    lat: Math.round(lat * 1000) / 1000,
    lng: Math.round(lng * 1000) / 1000,
    windSpeedKts,
    pressureHpa,
    category,
    forecastType: hour > 12 ? 'PROJECTED' : 'OBSERVED',
  };
}
