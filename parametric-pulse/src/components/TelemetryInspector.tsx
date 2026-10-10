import React from 'react';
import { CycloneCheckpoint, CoastalAsset } from '../types';
import { calculateHaversineDistance } from '../utils/geo';
import { Wind, Gauge, Navigation } from 'lucide-react';

interface TelemetryInspectorProps {
  checkpoint: CycloneCheckpoint;
  assets: CoastalAsset[];
  selectedAssetId: string;
  onSelectAsset: (id: string) => void;
}

export const TelemetryInspector: React.FC<TelemetryInspectorProps> = ({
  checkpoint,
  assets,
  selectedAssetId,
  onSelectAsset,
}) => {
  const selectedAsset = assets.find((a) => a.id === selectedAssetId) || assets[0];
  const distanceKm = calculateHaversineDistance(
    checkpoint.lat,
    checkpoint.lng,
    selectedAsset.lat,
    selectedAsset.lng
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: '#0B0F19',
        border: '1px solid #1E293B',
        borderRadius: '4px',
        padding: '20px',
      }}
    >
      {/* Header & Category Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#F8FAFC' }}>
            TELEMETRY INSPECTOR
          </h2>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontFamily: 'JetBrains Mono, monospace' }}>
            CHECKPOINT {checkpoint.timestamp}
          </span>
        </div>
        <div
          style={{
            background: checkpoint.category === 'Cat 4' || checkpoint.category === 'Cat 5' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 229, 255, 0.15)',
            color: checkpoint.category === 'Cat 4' || checkpoint.category === 'Cat 5' ? '#EF4444' : '#00E5FF',
            border: `1px solid ${checkpoint.category === 'Cat 4' || checkpoint.category === 'Cat 5' ? '#EF4444' : '#00E5FF'}`,
            padding: '4px 10px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 700,
          }}
        >
          {checkpoint.category.toUpperCase()}
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {/* Wind Speed */}
        <div style={{ background: '#06080F', border: '1px solid #1E293B', padding: '12px', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.75rem', marginBottom: '4px' }}>
            <Wind size={14} color="#00E5FF" />
            <span>MAX SUSTAINED WIND</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: '#00E5FF' }}>
            {checkpoint.windSpeedKts} <span style={{ fontSize: '0.875rem', color: '#94A3B8' }}>kts</span>
          </div>
        </div>

        {/* Pressure */}
        <div style={{ background: '#06080F', border: '1px solid #1E293B', padding: '12px', borderRadius: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8', fontSize: '0.75rem', marginBottom: '4px' }}>
            <Gauge size={14} color="#F59E0B" />
            <span>CENTRAL PRESSURE</span>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: '#F8FAFC' }}>
            {checkpoint.pressureHpa} <span style={{ fontSize: '0.875rem', color: '#94A3B8' }}>hPa</span>
          </div>
        </div>
      </div>

      {/* Asset Selection Dropdown */}
      <div style={{ background: '#06080F', border: '1px solid #1E293B', padding: '12px', borderRadius: '4px' }}>
        <label htmlFor="asset-select" style={{ display: 'block', fontSize: '0.75rem', color: '#94A3B8', marginBottom: '6px' }}>
          TARGET MUNICIPAL ASSET
        </label>
        <select
          id="asset-select"
          value={selectedAssetId}
          onChange={(e) => onSelectAsset(e.target.value)}
          style={{
            width: '100%',
            background: '#0B0F19',
            color: '#F8FAFC',
            border: '1px solid #334155',
            borderRadius: '4px',
            padding: '8px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
          }}
        >
          {assets.map((asset) => (
            <option key={asset.id} value={asset.id}>
              {asset.name} (${(asset.insuredValueUsd / 1_000_000).toFixed(1)}M Policy)
            </option>
          ))}
        </select>
      </div>

      {/* Proximity Telemetry */}
      <div style={{ background: '#06080F', border: '1px solid #1E293B', padding: '12px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Navigation size={18} color="#10B981" />
          <div>
            <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>PROXIMITY TO ASSET</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace', color: distanceKm <= selectedAsset.hazardRadiusKm ? '#EF4444' : '#10B981' }}>
              {distanceKm} km
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.75rem', color: '#94A3B8' }}>HAZARD RADIUS</div>
          <div style={{ fontSize: '0.875rem', fontFamily: 'JetBrains Mono, monospace', color: '#F8FAFC' }}>
            {selectedAsset.hazardRadiusKm} km
          </div>
        </div>
      </div>
    </div>
  );
};
