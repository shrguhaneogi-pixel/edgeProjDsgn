import React, { useRef, useEffect } from 'react';
import { CycloneCheckpoint, CoastalAsset } from '../types';

interface StormCanvas2DProps {
  checkpoints: CycloneCheckpoint[];
  currentCheckpoint: CycloneCheckpoint;
  assets: CoastalAsset[];
  selectedAssetId: string;
  onSelectCheckpointHour: (hour: number) => void;
  onSelectAsset: (assetId: string) => void;
  reducedMotion?: boolean;
}

export const StormCanvas2D: React.FC<StormCanvas2DProps> = ({
  checkpoints,
  currentCheckpoint,
  assets,
  selectedAssetId,
  onSelectCheckpointHour,
  onSelectAsset,
  reducedMotion = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Map coordinate conversion helpers (Viewport bounds: Lat 12.0 to 18.0, Lng -82.0 to -72.0)
  const mapBounds = {
    minLat: 12.0,
    maxLat: 18.0,
    minLng: -82.0,
    maxLng: -72.0,
  };

  const getCanvasCoords = (lat: number, lng: number, width: number, height: number) => {
    const x = ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * width;
    const y = height - ((lat - mapBounds.minLat) / (mapBounds.maxLat - mapBounds.minLat)) * height;
    return { x, y };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let rotationAngle = 0;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 500);

      // 1. Surface background
      ctx.fillStyle = '#06080F';
      ctx.fillRect(0, 0, width, height);

      // 2. Radar Grid lines
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Radar sweep circle grid
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      [100, 200, 300, 400].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.strokeStyle = '#0F172A';
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 3. Coastline schematic
      ctx.beginPath();
      const coastPoints = [
        { lat: 12.5, lng: -82.0 },
        { lat: 13.8, lng: -78.5 },
        { lat: 14.5, lng: -76.0 },
        { lat: 16.0, lng: -74.5 },
        { lat: 18.0, lng: -73.0 },
      ];
      coastPoints.forEach((pt, i) => {
        const { x, y } = getCanvasCoords(pt.lat, pt.lng, width, height);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 4. Cyclone Track Line
      if (checkpoints.length > 1) {
        ctx.beginPath();
        checkpoints.forEach((cp, i) => {
          const { x, y } = getCanvasCoords(cp.lat, cp.lng, width, height);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 5. Track Checkpoint Nodes
      checkpoints.forEach((cp) => {
        const { x, y } = getCanvasCoords(cp.lat, cp.lng, width, height);
        const isSelected = cp.hour === currentCheckpoint.hour;

        ctx.beginPath();
        ctx.arc(x, y, isSelected ? 8 : 4, 0, Math.PI * 2);
        ctx.fillStyle = isSelected ? '#00E5FF' : '#94A3B8';
        ctx.fill();

        if (isSelected) {
          ctx.beginPath();
          ctx.arc(x, y, 14, 0, Math.PI * 2);
          ctx.strokeStyle = '#00E5FF';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      // 6. Current Storm Eye & Swirl
      const stormPos = getCanvasCoords(currentCheckpoint.lat, currentCheckpoint.lng, width, height);

      // Isobar pressure rings
      [25, 50, 75].forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(stormPos.x, stormPos.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 0 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(0, 229, 255, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Rotating Swirl Arms
      if (!reducedMotion) {
        rotationAngle += (currentCheckpoint.windSpeedKts / 100) * 0.05;
      }
      ctx.save();
      ctx.translate(stormPos.x, stormPos.y);
      ctx.rotate(rotationAngle);
      for (let arm = 0; arm < 3; arm++) {
        ctx.beginPath();
        ctx.arc(0, 0, 30, (arm * Math.PI * 2) / 3, (arm * Math.PI * 2) / 3 + 1.2);
        ctx.strokeStyle = '#00E5FF';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      ctx.restore();

      // Eye Center
      ctx.beginPath();
      ctx.arc(stormPos.x, stormPos.y, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#EF4444';
      ctx.fill();

      // 7. Coastal Assets
      assets.forEach((asset) => {
        const { x, y } = getCanvasCoords(asset.lat, asset.lng, width, height);
        const isAssetSelected = asset.id === selectedAssetId;

        // Asset Hazard Radius
        const radiusPx = (asset.hazardRadiusKm / 600) * width;
        ctx.beginPath();
        ctx.arc(x, y, radiusPx, 0, Math.PI * 2);
        ctx.strokeStyle = isAssetSelected ? 'rgba(16, 185, 129, 0.6)' : 'rgba(148, 163, 184, 0.2)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Asset Pin
        ctx.beginPath();
        ctx.arc(x, y, isAssetSelected ? 9 : 6, 0, Math.PI * 2);
        ctx.fillStyle = isAssetSelected ? '#10B981' : '#64748B';
        ctx.fill();
        ctx.strokeStyle = '#F8FAFC';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Label
        ctx.fillStyle = isAssetSelected ? '#10B981' : '#94A3B8';
        ctx.font = '11px "JetBrains Mono", monospace';
        ctx.fillText(asset.name, x + 12, y + 4);
      });

      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [checkpoints, currentCheckpoint, assets, selectedAssetId, reducedMotion]);

  // Handle canvas click to select checkpoint or asset
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const width = canvas.width;
    const height = canvas.height;

    // Check distance to checkpoints
    checkpoints.forEach((cp) => {
      const { x, y } = getCanvasCoords(cp.lat, cp.lng, width, height);
      const dist = Math.hypot(clickX - x, clickY - y);
      if (dist < 15) {
        onSelectCheckpointHour(cp.hour);
      }
    });

    // Check distance to assets
    assets.forEach((asset) => {
      const { x, y } = getCanvasCoords(asset.lat, asset.lng, width, height);
      const dist = Math.hypot(clickX - x, clickY - y);
      if (dist < 15) {
        onSelectAsset(asset.id);
      }
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '480px', borderRadius: '4px', overflow: 'hidden', border: '1px solid #1E293B' }}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        style={{ width: '100%', height: '100%', display: 'block', cursor: 'pointer' }}
        aria-label="Cyclone Track Canvas Visualization"
      />
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(11, 15, 25, 0.85)',
          backdropFilter: 'blur(4px)',
          border: '1px solid #1E293B',
          padding: '8px 12px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontFamily: 'JetBrains Mono, monospace',
          color: '#00E5FF',
        }}
      >
        TRACK RADAR // 2D CANVAS STAGE
      </div>
    </div>
  );
};
