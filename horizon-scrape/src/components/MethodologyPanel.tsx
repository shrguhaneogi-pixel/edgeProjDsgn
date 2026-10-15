import React from 'react';

export const MethodologyPanel: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: '#1E293B',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #334155',
        color: '#F8FAFC',
      }}
    >
      <div style={{ borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', color: '#FFD600', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>Observatory Methodology & Epistemological Boundaries</span>
        </h2>
        <p style={{ margin: '6px 0 0', fontSize: '13px', color: '#94A3B8' }}>
          Documented atmospheric optical principles, validation criteria, and limitation statements.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* Core Limitation Box */}
        <div
          style={{
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid #EF4444',
            borderRadius: '6px',
            padding: '14px',
          }}
        >
          <h3 style={{ margin: '0 0 8px', fontSize: '14px', color: '#F87171' }}>
            ⚠️ What This Photo Does NOT Prove
          </h3>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#CBD5E1', lineHeight: '1.6' }}>
            <li><strong>Not Calibrated PM2.5:</strong> Visual attenuation measures photon scattering along a line-of-sight path, NOT microgram mass per cubic meter.</li>
            <li><strong>Hygroscopic Growth:</strong> Ambient humidity &gt;70% causes aerosols to swell optically, dramatically reducing visibility without a corresponding increase in dry particle mass.</li>
            <li><strong>Camera Artifacts:</strong> Automatic camera tone-mapping, HDR bracketing, and edge sharpening alter dark-channel prior estimates.</li>
          </ul>
        </div>

        {/* What It Does Reveal Box */}
        <div
          style={{
            background: 'rgba(56, 189, 248, 0.1)',
            border: '1px solid #38BDF8',
            borderRadius: '6px',
            padding: '14px',
          }}
        >
          <h3 style={{ margin: '0 0 8px', fontSize: '14px', color: '#38BDF8' }}>
            🔍 What This Observation Reveals
          </h3>
          <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '12px', color: '#CBD5E1', lineHeight: '1.6' }}>
            <li><strong>Local Boundary Layers:</strong> Identifies sharp thermal inversion boundaries that prevent vertical dispersion of surface emissions.</li>
            <li><strong>Temporal Trajectory:</strong> Allows neighborhood residents to monitor relative improvement or degradation across hours or days.</li>
            <li><strong>Spatial Inequality:</strong> Surfaces localized plume dynamics between official municipal monitoring stations.</li>
          </ul>
        </div>
      </div>

      {/* Koschmieder Law Formulation Card */}
      <div
        style={{
          background: '#0F172A',
          padding: '14px',
          borderRadius: '6px',
          border: '1px solid #334155',
          fontSize: '12px',
          color: '#CBD5E1',
          lineHeight: '1.6',
        }}
      >
        <h4 style={{ margin: '0 0 6px', fontSize: '13px', color: '#FFD600' }}>
          Mathematical Basis: Koschmieder Law & Dark Channel Prior (DCP)
        </h4>
        <p style={{ margin: '0 0 6px' }}>
          Meteorological optical range is governed by Koschmieder's Law: <code>V = 3.912 / β_ext</code>, where <code>β_ext</code> represents the atmospheric extinction coefficient.
          The Dark Channel Prior extracts the minimum pixel intensity across RGB color channels in non-sky patches, estimating medium transmission <code>t(x) = 1 - ω min(I^c(y) / A^c)</code>.
        </p>
        <p style={{ margin: 0, color: '#94A3B8' }}>
          Calibrated PM2.5 readings are solely displayed when a citizen capture is collocated within 500 meters of an EPA Federal Equivalent Method (FEM) ground monitor.
        </p>
      </div>
    </div>
  );
};
