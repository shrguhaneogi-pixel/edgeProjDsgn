import React, { useEffect, useRef } from 'react';
import { AppAction, AppState } from '../types/stateModel';

interface Props {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

export const TerrainCanvas2D: React.FC<Props> = ({ state, dispatch }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const { gateStatus, selectedSectorId, isAnimating, telemetry, sectorRisks } = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particleOffset = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      // 1. Background Surface
      ctx.fillStyle = '#0D1117';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Topographic Grid & Contours
      ctx.strokeStyle = '#21262D';
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

      // Draw Topographic Elevation Contour Rings
      ctx.strokeStyle = '#30363D';
      ctx.lineWidth = 1.5;

      // Outer elevation ring (15m elevation contour)
      ctx.beginPath();
      ctx.ellipse(width * 0.7, height * 0.25, width * 0.35, height * 0.25, -Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();

      // Mid elevation ring (10m contour)
      ctx.beginPath();
      ctx.ellipse(width * 0.65, height * 0.3, width * 0.25, height * 0.18, -Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();

      // Lower elevation contour (8m)
      ctx.beginPath();
      ctx.ellipse(width * 0.35, height * 0.65, width * 0.28, height * 0.22, Math.PI / 6, 0, Math.PI * 2);
      ctx.stroke();

      // 3. Draw Sectors & Inundation Boundaries
      const sectorPolygons: Record<string, { x: number; y: number; w: number; h: number; name: string }> = {
        'downtown-core': { x: width * 0.32, y: height * 0.45, w: width * 0.25, h: height * 0.22, name: 'Downtown Core' },
        'industrial-park': { x: width * 0.6, y: height * 0.6, w: width * 0.22, h: height * 0.25, name: 'Industrial Park' },
        'residential-hills': { x: width * 0.52, y: height * 0.12, w: width * 0.28, h: height * 0.22, name: 'North Heights' },
        'agricultural-zone': { x: width * 0.08, y: height * 0.35, w: width * 0.22, h: height * 0.38, name: 'Sacrificial Basin' }
      };

      Object.entries(sectorPolygons).forEach(([id, poly]) => {
        const risk = sectorRisks.find(r => r.sectorId === id);
        const isSelected = selectedSectorId === id;

        // Sector fill based on risk status
        ctx.fillStyle = risk?.riskStatus === 'CRITICAL'
          ? 'rgba(255, 42, 109, 0.18)'
          : risk?.riskStatus === 'WARNING'
          ? 'rgba(255, 171, 0, 0.14)'
          : 'rgba(0, 230, 118, 0.08)';

        ctx.fillRect(poly.x, poly.y, poly.w, poly.h);

        // Border stroke
        ctx.strokeStyle = isSelected
          ? '#FF3D00'
          : risk?.riskStatus === 'CRITICAL'
          ? '#FF2A6D'
          : risk?.riskStatus === 'WARNING'
          ? '#FFAB00'
          : '#00E676';
        ctx.lineWidth = isSelected ? 2.5 : 1.5;
        ctx.strokeRect(poly.x, poly.y, poly.w, poly.h);

        // Label
        ctx.fillStyle = isSelected ? '#FFFFFF' : '#8B949E';
        ctx.font = isSelected ? 'bold 12px sans-serif' : '11px sans-serif';
        ctx.fillText(poly.name, poly.x + 8, poly.y + 20);

        if (risk) {
          ctx.fillStyle = risk.riskStatus === 'CRITICAL' ? '#FF2A6D' : risk.riskStatus === 'WARNING' ? '#FFAB00' : '#00E676';
          ctx.font = '10px monospace';
          ctx.fillText(`Depth: ${risk.inundationDepthMeters.toFixed(1)}m (${risk.riskScorePercent}%)`, poly.x + 8, poly.y + 36);
        }
      });

      // 4. Draw Main River Channel
      ctx.beginPath();
      ctx.moveTo(width * 0.1, height * 0.05);
      ctx.bezierCurveTo(width * 0.25, height * 0.25, width * 0.45, height * 0.35, width * 0.55, height * 0.5);
      ctx.bezierCurveTo(width * 0.65, height * 0.65, width * 0.75, height * 0.8, width * 0.95, height * 0.95);
      ctx.strokeStyle = '#00A3FF';
      ctx.lineWidth = Math.min(28, 12 + telemetry.downstreamFlowM3PerSec / 100);
      ctx.stroke();

      // 5. Draw Sacrificial Bypass Channel (#FF3D00)
      ctx.beginPath();
      ctx.moveTo(width * 0.42, height * 0.34);
      ctx.bezierCurveTo(width * 0.35, height * 0.35, width * 0.25, height * 0.4, width * 0.18, height * 0.55);
      ctx.strokeStyle = gateStatus === 'OPEN' ? '#FF3D00' : '#4A5568';
      ctx.lineWidth = gateStatus === 'OPEN' ? Math.min(22, 8 + telemetry.divertedFlowM3PerSec / 80) : 4;
      ctx.setLineDash(gateStatus === 'OPEN' ? [] : [6, 4]);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // 6. Draw Sacrificial Diversion Gate Marker
      const gateX = width * 0.42;
      const gateY = height * 0.34;

      ctx.fillStyle = gateStatus === 'OPEN' ? '#FF3D00' : '#FF2A6D';
      ctx.beginPath();
      ctx.arc(gateX, gateY, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 9px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(gateStatus === 'OPEN' ? 'GATE OPEN' : 'CLOSED', gateX, gateY + 3);
      ctx.textAlign = 'left';

      // 7. Animated Flow Vector Particles (if isAnimating)
      if (isAnimating) {
        particleOffset = (particleOffset + 0.01) % 1;

        // Main River Particles
        for (let i = 0; i < 5; i++) {
          const t = (particleOffset + i * 0.2) % 1;
          const px = width * (0.1 + t * 0.85);
          const py = height * (0.05 + t * 0.9);
          ctx.fillStyle = '#E0F7FA';
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Sacrificial Bypass Channel Particles (only if OPEN)
        if (gateStatus === 'OPEN') {
          for (let i = 0; i < 4; i++) {
            const t = (particleOffset + i * 0.25) % 1;
            const px = gateX - t * (gateX - width * 0.18);
            const py = gateY + t * (height * 0.55 - gateY);
            ctx.fillStyle = '#FFE0B2';
            ctx.beginPath();
            ctx.arc(px, py, 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (isAnimating) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [gateStatus, selectedSectorId, isAnimating, telemetry, sectorRisks]);

  // Handle Canvas Click to Select Sectors
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = canvas.width;
    const h = canvas.height;

    const sectorPolygons: Record<string, { x: number; y: number; w: number; h: number }> = {
      'downtown-core': { x: w * 0.32, y: h * 0.45, w: w * 0.25, h: h * 0.22 },
      'industrial-park': { x: w * 0.6, y: h * 0.6, w: w * 0.22, h: h * 0.25 },
      'residential-hills': { x: w * 0.52, y: h * 0.12, w: w * 0.28, h: h * 0.22 },
      'agricultural-zone': { x: w * 0.08, y: h * 0.35, w: w * 0.22, h: h * 0.38 }
    };

    for (const [id, poly] of Object.entries(sectorPolygons)) {
      if (x >= poly.x && x <= poly.x + poly.w && y >= poly.y && y <= poly.y + poly.h) {
        dispatch({ type: 'SELECT_SECTOR', payload: id });
        return;
      }
    }
  };

  return (
    <div style={{ position: 'relative', background: '#161B22', borderRadius: '8px', border: '1px solid #30363D', overflow: 'hidden' }}>
      <div style={{ padding: '0.75rem 1rem', background: '#0D1117', borderBottom: '1px solid #30363D', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#F0F6FC' }}>
          Basin Topographic Flow Map (Val-des-Monts Catchment)
        </span>
        <span style={{ fontSize: '0.75rem', color: gateStatus === 'OPEN' ? '#FF3D00' : '#8B949E', fontFamily: 'monospace' }}>
          Sacrificial Gate: {gateStatus} ({telemetry.divertedFlowM3PerSec} m³/s Diverted)
        </span>
      </div>
      <canvas
        ref={canvasRef}
        width={760}
        height={460}
        onClick={handleCanvasClick}
        role="img"
        aria-label="Interactive 2D Topographic Flood Route Canvas"
        style={{ width: '100%', height: 'auto', display: 'block', cursor: 'pointer' }}
      />
      <div style={{ padding: '0.5rem 1rem', background: '#0D1117', borderTop: '1px solid #30363D', display: 'flex', gap: '1.5rem', fontSize: '0.75rem', color: '#8B949E' }}>
        <span><strong style={{ color: '#00A3FF' }}>■</strong> Main River Channel</span>
        <span><strong style={{ color: '#FF3D00' }}>■</strong> Sacrificial Bypass (`#FF3D00`)</span>
        <span><strong style={{ color: '#FF2A6D' }}>■</strong> Critical Inundation Risk</span>
        <span><strong style={{ color: '#00E676' }}>■</strong> Safe Elevation Zone</span>
        <span style={{ marginLeft: 'auto', color: '#58A6FF' }}>Click sector canvas region to inspect</span>
      </div>
    </div>
  );
};
