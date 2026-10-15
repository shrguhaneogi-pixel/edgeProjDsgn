import React, { useRef, useState, useCallback, useEffect } from 'react';
import { HorizonObservation } from '../types';

interface ComparisonSliderProps {
  observation: HorizonObservation;
  sliderPosition: number;
  onSliderChange: (pos: number) => void;
}

export const ComparisonSlider: React.FC<ComparisonSliderProps> = ({
  observation,
  sliderPosition,
  onSliderChange,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
      onSliderChange(Math.round(pct));
    },
    [onSliderChange]
  );

  const handleMouseDown = () => setIsDragging(true);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handlePointerMove(e.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        handlePointerMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isDragging, handlePointerMove]);

  // Optical attenuation factor
  const hazeDensity = observation.opticalAttenuation;
  const skyColor = `rgba(180, 195, 210, ${0.4 + hazeDensity * 0.5})`;
  const hazeLayerColor = `rgba(235, 230, 210, ${hazeDensity * 0.75})`;

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '16px', color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Dual Stage Horizon Comparison</span>
            <span
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#FFD600',
                backgroundColor: 'rgba(255, 214, 0, 0.12)',
                padding: '2px 8px',
                borderRadius: '4px',
                border: '1px solid rgba(255, 214, 0, 0.3)',
              }}
            >
              ACCENT: #FFD600
            </span>
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#94A3B8' }}>
            Drag slider or use range control to compare Original Citizen Capture against Processed Dark-Channel Dehazing.
          </p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '11px', color: '#64748B', display: 'block' }}>SPLIT</span>
          <span style={{ fontSize: '14px', fontWeight: 700, color: '#38BDF8', fontFamily: 'monospace' }}>
            {sliderPosition}% / {100 - sliderPosition}%
          </span>
        </div>
      </div>

      {/* Visual Canvas Stage Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{
          position: 'relative',
          height: '320px',
          width: '100%',
          overflow: 'hidden',
          borderRadius: '6px',
          userSelect: 'none',
          cursor: 'ew-resize',
          backgroundColor: '#0F172A',
          border: '1px solid #475569',
        }}
        role="region"
        aria-label="Image comparison stage: Original photo versus processed optical haze model"
      >
        {/* Layer 1: Processed / Dehazed View (Full Width Underneath) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            background: 'linear-gradient(180deg, #1E3A8A 0%, #0284C7 60%, #0369A1 100%)',
          }}
        >
          {/* Dehazed Crisp Landscape Geometry */}
          <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }} viewBox="0 0 800 320" preserveAspectRatio="none">
            {/* Distant clear mountain ridges */}
            <path d="M0,210 L120,150 L260,200 L420,130 L580,180 L720,140 L800,190 L800,320 L0,320 Z" fill="#0C4A6E" />
            <path d="M0,240 L160,190 L340,240 L480,180 L620,230 L800,200 L800,320 L0,320 Z" fill="#075985" />
            {/* Near horizon city & towers */}
            <rect x="180" y="210" width="24" height="70" fill="#0369A1" />
            <rect x="220" y="190" width="30" height="90" fill="#0284C7" />
            <rect x="360" y="200" width="40" height="80" fill="#0369A1" />
            <rect x="420" y="170" width="18" height="110" fill="#0284C7" />
            <rect x="530" y="220" width="32" height="60" fill="#0369A1" />
            {/* High-visibility horizon line indicator */}
            <line x1="0" y1="200" x2="800" y2="200" stroke="#FFD600" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>

          {/* Processed Badge */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(15, 23, 42, 0.85)',
              border: '1px solid #38BDF8',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '11px',
              color: '#38BDF8',
              fontWeight: 600,
              backdropFilter: 'blur(4px)',
            }}
          >
            Processed: Dark-Channel Dehazed (Estimated Path)
          </div>
        </div>

        {/* Layer 2: Original Captured Photo (Clipped by sliderPosition) */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${sliderPosition}%`,
            height: '100%',
            overflow: 'hidden',
            borderRight: '2px solid #FFD600',
            background: 'linear-gradient(180deg, #64748B 0%, #94A3B8 60%, #CBD5E1 100%)',
          }}
        >
          {/* Original Hazy View Geometry with Atmospheric Scatter Overlay */}
          <div style={{ width: containerRef.current?.clientWidth || 800, height: '100%', position: 'relative' }}>
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }} viewBox="0 0 800 320" preserveAspectRatio="none">
              {/* Obscured/washed out ridges */}
              <path d="M0,210 L120,150 L260,200 L420,130 L580,180 L720,140 L800,190 L800,320 L0,320 Z" fill="#64748B" opacity="0.65" />
              <path d="M0,240 L160,190 L340,240 L480,180 L620,230 L800,200 L800,320 L0,320 Z" fill="#475569" opacity="0.75" />
              <rect x="180" y="210" width="24" height="70" fill="#475569" opacity="0.8" />
              <rect x="220" y="190" width="30" height="90" fill="#334155" opacity="0.85" />
              <rect x="360" y="200" width="40" height="80" fill="#475569" opacity="0.8" />
              <rect x="420" y="170" width="18" height="110" fill="#334155" opacity="0.85" />
              <rect x="530" y="220" width="32" height="60" fill="#475569" opacity="0.8" />
            </svg>
            {/* Atmospheric Haze/Smog scattering layer */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: hazeLayerColor,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
              }}
            />
            {/* Ambient Sky tint */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: skyColor,
                pointerEvents: 'none',
              }}
            />

            {/* Original Badge */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid #FFD600',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '11px',
                color: '#FFD600',
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
                whiteSpace: 'nowrap',
              }}
            >
              Original Citizen Capture ({observation.neighborhood})
            </div>
          </div>
        </div>

        {/* Divider Drag Handle */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${sliderPosition}%`,
            width: '4px',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#0F172A',
              border: '2px solid #FFD600',
              boxShadow: '0 0 10px rgba(255, 214, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFD600',
              fontSize: '11px',
              fontWeight: 800,
            }}
          >
            ⇄
          </div>
        </div>
      </div>

      {/* Accessible Slider Range Control */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label
          htmlFor="comparison-range-slider"
          style={{ fontSize: '12px', color: '#94A3B8', minWidth: '90px' }}
        >
          Split Position:
        </label>
        <input
          id="comparison-range-slider"
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => onSliderChange(Number(e.target.value))}
          style={{
            flex: 1,
            accentColor: '#FFD600',
            cursor: 'pointer',
          }}
          aria-label="Comparison split position percent"
        />
        <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#F8FAFC', minWidth: '40px' }}>
          {sliderPosition}%
        </span>
      </div>

      {/* Optical Indicator Bar & Methodology Note */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px',
          marginTop: '6px',
        }}
      >
        <div style={{ background: '#0F172A', padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Derived Optical Attenuation</span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#FFD600', fontFamily: 'monospace' }}>
            {(observation.opticalAttenuation * 100).toFixed(0)}%
          </span>
          <span style={{ fontSize: '10px', color: '#64748B', display: 'block', marginTop: '2px' }}>
            Dark-channel extinction index (0.00 – 1.00)
          </span>
        </div>

        <div style={{ background: '#0F172A', padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Estimated Visual Horizon Range</span>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#38BDF8', fontFamily: 'monospace' }}>
            {observation.visibilityEstimateKm} km
          </span>
          <span style={{ fontSize: '10px', color: '#64748B', display: 'block', marginTop: '2px' }}>
            Koschmieder meteorological extinction
          </span>
        </div>

        <div style={{ background: '#0F172A', padding: '10px 14px', borderRadius: '6px', border: '1px solid #334155' }}>
          <span style={{ fontSize: '11px', color: '#94A3B8', display: 'block' }}>Official Ground PM2.5 Sensor</span>
          <span
            style={{
              fontSize: '18px',
              fontWeight: 700,
              color: observation.calibratedPM25 !== null ? '#4ADE80' : '#94A3B8',
              fontFamily: 'monospace',
            }}
          >
            {observation.calibratedPM25 !== null ? `${observation.calibratedPM25} µg/m³` : 'UNAVAILABLE'}
          </span>
          <span style={{ fontSize: '10px', color: '#64748B', display: 'block', marginTop: '2px' }}>
            {observation.calibratedPM25 !== null ? observation.sensorSource : 'Visual proxy only (no collocated EPA sensor)'}
          </span>
        </div>
      </div>
    </div>
  );
};
