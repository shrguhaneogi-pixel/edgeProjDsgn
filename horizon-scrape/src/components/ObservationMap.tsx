import React from 'react';
import { HorizonObservation } from '../types';

interface ObservationMapProps {
  observations: HorizonObservation[];
  activeObservationId: string;
  onSelectObservation: (id: string) => void;
  currentHour: number;
  onHourChange: (hour: number) => void;
  showOfficialSensors: boolean;
  onToggleOfficialSensors: () => void;
  isPlaying: boolean;
  onTogglePlayback: () => void;
}

export const ObservationMap: React.FC<ObservationMapProps> = ({
  observations,
  activeObservationId,
  onSelectObservation,
  currentHour,
  onHourChange,
  showOfficialSensors,
  onToggleOfficialSensors,
  isPlaying,
  onTogglePlayback,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: '#1E293B',
        borderRadius: '8px',
        padding: '16px',
        border: '1px solid #334155',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '16px', color: '#F8FAFC' }}>
            City Observation Map & Scrubber
          </h2>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>
            Atmospheric observation points across urban basin • {observations.length} Registered Stations
          </span>
        </div>

        {/* Layer Toggles */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={onToggleOfficialSensors}
            style={{
              background: showOfficialSensors ? 'rgba(74, 222, 128, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: showOfficialSensors ? '1px solid #4ADE80' : '1px solid #475569',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '11px',
              color: showOfficialSensors ? '#4ADE80' : '#94A3B8',
              cursor: 'pointer',
            }}
          >
            {showOfficialSensors ? '✓ Official Sensors Layer' : '+ Official Sensors Layer'}
          </button>
        </div>
      </div>

      {/* Map Graphic Canvas Container */}
      <div
        style={{
          position: 'relative',
          height: '280px',
          backgroundColor: '#0A0F1D',
          borderRadius: '6px',
          border: '1px solid #334155',
          overflow: 'hidden',
        }}
        role="region"
        aria-label="City observation map showing localized haze proxies"
      >
        {/* Stylized GIS Grid & Topographic Base */}
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* Coastal Bay contours */}
          <path d="M 0,90 Q 120,130 200,90 T 400,160 T 600,120 L 600,280 L 0,280 Z" fill="#0F172A" opacity="0.6" />
          <path d="M 0,140 Q 140,190 280,140 T 500,220 L 600,280 L 0,280 Z" fill="#1E293B" opacity="0.5" />
          {/* Coastline Shore */}
          <path d="M 0,90 Q 120,130 200,90 T 400,160 T 600,120" fill="none" stroke="#38BDF8" strokeWidth="1.5" strokeOpacity="0.4" />
        </svg>

        {/* Observation Markers */}
        {observations.map((obs) => {
          const isSelected = obs.id === activeObservationId;
          const isOfficial = obs.calibratedPM25 !== null;

          if (isOfficial && !showOfficialSensors) return null;

          // Color coded by optical attenuation
          const markerColor = obs.opticalAttenuation > 0.6 ? '#FFD600' : obs.opticalAttenuation > 0.35 ? '#FB923C' : '#38BDF8';

          return (
            <button
              key={obs.id}
              type="button"
              onClick={() => onSelectObservation(obs.id)}
              aria-label={`${obs.title} — Attenuation ${(obs.opticalAttenuation * 100).toFixed(0)}%`}
              style={{
                position: 'absolute',
                left: `${obs.coordinates.x}%`,
                top: `${obs.coordinates.y}%`,
                transform: 'translate(-50%, -50%)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                zIndex: isSelected ? 20 : 10,
              }}
            >
              {/* Outer Pulse ring if active */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: `2px solid ${markerColor}`,
                    animation: 'pulse 1.8s infinite',
                  }}
                />
              )}

              {/* Marker Pin */}
              <div
                style={{
                  width: isSelected ? '18px' : '14px',
                  height: isSelected ? '18px' : '14px',
                  borderRadius: isOfficial ? '2px' : '50%',
                  transform: isOfficial ? 'rotate(45deg)' : 'none',
                  backgroundColor: markerColor,
                  boxShadow: `0 0 10px ${markerColor}`,
                  border: '2px solid #0F172A',
                  transition: 'all 0.15s ease',
                }}
              />

              {/* Title label badge */}
              <span
                style={{
                  marginTop: '4px',
                  fontSize: '9px',
                  fontWeight: isSelected ? 700 : 500,
                  color: isSelected ? '#FFFFFF' : '#94A3B8',
                  background: 'rgba(15, 23, 42, 0.9)',
                  padding: '2px 5px',
                  borderRadius: '3px',
                  border: isSelected ? `1px solid ${markerColor}` : '1px solid rgba(255,255,255,0.1)',
                  whiteSpace: 'nowrap',
                }}
              >
                {obs.neighborhood} ({(obs.opticalAttenuation * 100).toFixed(0)}%)
              </span>
            </button>
          );
        })}

        {/* In-Canvas Status Legend */}
        <div
          style={{
            position: 'absolute',
            bottom: '8px',
            left: '8px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '10px',
            color: '#94A3B8',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FFD600' }} />
            High Haze (&gt;60%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#FB923C' }} />
            Moderate (35-60%)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38BDF8' }} />
            Clean (&lt;35%)
          </span>
          {showOfficialSensors && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '8px', height: '8px', transform: 'rotate(45deg)', backgroundColor: '#4ADE80' }} />
              EPA Collocated
            </span>
          )}
        </div>
      </div>

      {/* Time Scrubber Controls */}
      <div
        style={{
          background: '#0F172A',
          padding: '10px 14px',
          borderRadius: '6px',
          border: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={onTogglePlayback}
              style={{
                background: isPlaying ? '#FFD600' : 'rgba(255, 255, 255, 0.1)',
                color: isPlaying ? '#0F172A' : '#F8FAFC',
                border: 'none',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '11px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {isPlaying ? '⏸ PAUSE' : '▶ PLAY TIMELINE'}
            </button>
            <span style={{ fontSize: '12px', color: '#94A3B8' }}>24-Hour Observation Scrub</span>
          </div>

          <span style={{ fontSize: '14px', fontWeight: 700, color: '#FFD600', fontFamily: 'monospace' }}>
            {String(currentHour).padStart(2, '0')}:00 UTC
          </span>
        </div>

        <input
          type="range"
          min="0"
          max="23"
          value={currentHour}
          onChange={(e) => onHourChange(Number(e.target.value))}
          style={{ width: '100%', accentColor: '#FFD600', cursor: 'pointer' }}
          aria-label="24 hour time scrubber"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#64748B' }}>
          <span>00:00 (Midnight)</span>
          <span>06:00 (Dawn)</span>
          <span>12:00 (Noon Peak)</span>
          <span>18:00 (Sunset)</span>
          <span>23:00 (Night)</span>
        </div>
      </div>
    </div>
  );
};
