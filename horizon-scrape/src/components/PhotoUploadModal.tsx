import React, { useState } from 'react';
import { HorizonObservation } from '../types';
import { validateHorizonPhoto } from '../utils/dehazeSimulator';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (observation: HorizonObservation) => void;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [neighborhood, setNeighborhood] = useState('Central Basin Outlook');
  const [brightness, setBrightness] = useState(130);
  const [sharpness, setSharpness] = useState(75);
  const [horizonRatio, setHorizonRatio] = useState(0.5);

  if (!isOpen) return null;

  const qualityCheck = validateHorizonPhoto(brightness, sharpness, horizonRatio);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qualityCheck.overallValid) return;

    const newObs: HorizonObservation = {
      id: `obs-${Date.now()}`,
      title: `${neighborhood} Observation`,
      neighborhood,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      hour: new Date().getUTCHours(),
      coordinates: {
        lat: 37.77 + (Math.random() - 0.5) * 0.05,
        lng: -122.42 + (Math.random() - 0.5) * 0.05,
        x: Math.round(20 + Math.random() * 60),
        y: Math.round(20 + Math.random() * 60),
      },
      opticalAttenuation: qualityCheck.opticalAttenuation,
      visibilityEstimateKm: qualityCheck.visibilityKm,
      calibratedPM25: null, // User uploads are uncalibrated visual proxies
      sensorSource: 'Live Citizen Photo Submission',
      qualityScore: Math.round((sharpness + (1 - Math.abs(0.5 - horizonRatio)) * 50) / 1.5),
      humidityPercent: Math.round(40 + Math.random() * 35),
      sunAngleDegrees: Math.round(15 + Math.random() * 50),
      cameraInfo: 'Web Camera / Mobile Stream (sRGB)',
      status: 'live',
      originalDescription: `Citizen horizon photo submitted from ${neighborhood}.`,
      methodologyNotes: 'Visual proxy derived from Dark Channel Prior baseline pipeline. Uncalibrated against EPA reference sampler.',
    };

    onSubmit(newObs);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        padding: '16px',
        boxSizing: 'border-box',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-modal-title"
    >
      <div
        style={{
          background: '#0F172A',
          border: '1px solid #334155',
          borderRadius: '8px',
          maxWidth: '560px',
          width: '100%',
          padding: '24px',
          color: '#F8FAFC',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 id="upload-modal-title" style={{ margin: 0, fontSize: '18px', color: '#FFD600' }}>
            Submit Horizon Observation
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              fontSize: '18px',
              cursor: 'pointer',
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Guidance notice */}
        <div
          style={{
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '6px',
            padding: '12px',
            fontSize: '12px',
            color: '#CBD5E1',
            marginBottom: '16px',
            lineHeight: '1.5',
          }}
        >
          <strong>Composition Guidance:</strong> Ensure your frame includes roughly equal parts sky and distant landscape. Do NOT include recognizable faces or private residential interiors.
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label htmlFor="neighborhood-input" style={{ fontSize: '12px', color: '#94A3B8', display: 'block', marginBottom: '4px' }}>
              Observation Neighborhood:
            </label>
            <input
              id="neighborhood-input"
              type="text"
              value={neighborhood}
              onChange={(e) => setNeighborhood(e.target.value)}
              style={{
                width: '100%',
                background: '#1E293B',
                border: '1px solid #475569',
                borderRadius: '4px',
                padding: '8px 10px',
                color: '#F8FAFC',
                fontSize: '13px',
                boxSizing: 'border-box',
              }}
              required
            />
          </div>

          {/* Quality Simulator Controls */}
          <div style={{ background: '#1E293B', padding: '12px', borderRadius: '6px', border: '1px solid #334155' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#38BDF8', display: 'block', marginBottom: '10px' }}>
              Optical Quality Checks (Simulated Sensor / Camera Input):
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
                  <span>Exposure / Brightness:</span>
                  <span style={{ color: qualityCheck.exposureValid ? '#4ADE80' : '#EF4444' }}>
                    {brightness} (Target: 45–220)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="255"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  style={{ width: '100%', accentColor: qualityCheck.exposureValid ? '#4ADE80' : '#EF4444' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
                  <span>Horizon Boundary Sharpness:</span>
                  <span style={{ color: qualityCheck.sharpnessValid ? '#4ADE80' : '#EF4444' }}>
                    {sharpness}% (Target: ≥40%)
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={sharpness}
                  onChange={(e) => setSharpness(Number(e.target.value))}
                  style={{ width: '100%', accentColor: qualityCheck.sharpnessValid ? '#4ADE80' : '#EF4444' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
                  <span>Horizon Vertical Position:</span>
                  <span style={{ color: qualityCheck.horizonDetected ? '#4ADE80' : '#EF4444' }}>
                    {(horizonRatio * 100).toFixed(0)}% (Target: 25%–75%)
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={horizonRatio * 100}
                  onChange={(e) => setHorizonRatio(Number(e.target.value) / 100)}
                  style={{ width: '100%', accentColor: qualityCheck.horizonDetected ? '#4ADE80' : '#EF4444' }}
                />
              </div>
            </div>

            {/* Quality Summary Message */}
            <div
              style={{
                marginTop: '10px',
                padding: '8px 10px',
                borderRadius: '4px',
                fontSize: '11px',
                backgroundColor: qualityCheck.overallValid ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.15)',
                border: qualityCheck.overallValid ? '1px solid #4ADE80' : '1px solid #EF4444',
                color: qualityCheck.overallValid ? '#4ADE80' : '#FCA5A5',
              }}
            >
              {qualityCheck.message}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid #475569',
                color: '#CBD5E1',
                padding: '8px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!qualityCheck.overallValid}
              style={{
                background: qualityCheck.overallValid ? '#FFD600' : '#475569',
                color: qualityCheck.overallValid ? '#0F172A' : '#94A3B8',
                border: 'none',
                fontWeight: 700,
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: qualityCheck.overallValid ? 'pointer' : 'not-allowed',
              }}
            >
              Confirm & Submit Observation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
