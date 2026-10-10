import React, { useRef, useEffect, useState, useCallback } from 'react';
import { CropPhotoSample } from '../types';

interface LesionInspectorCanvasProps {
  sample: CropPhotoSample;
  showBoundingBoxes: boolean;
  showHeatmap: boolean;
  selectedBoxId: string | null;
  onSelectBox: (boxId: string | null) => void;
  isScanning: boolean;
  confidenceFilter: number;
}

export const LesionInspectorCanvas: React.FC<LesionInspectorCanvasProps> = ({
  sample,
  showBoundingBoxes,
  showHeatmap,
  selectedBoxId,
  onSelectBox,
  isScanning,
  confidenceFilter,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredBoxId, setHoveredBoxId] = useState<string | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scanOffsetYRef = useRef<number>(0);

  // Canvas drawing routine
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // 1. Draw Base Agricultural Foliage Texture
    ctx.clearRect(0, 0, width, height);

    // Leaf background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, width, height);
    if (sample.cropType === 'SOY') {
      bgGrad.addColorStop(0, '#1B341E');
      bgGrad.addColorStop(1, '#0E2012');
    } else if (sample.cropType === 'WHEAT') {
      bgGrad.addColorStop(0, '#3A3215');
      bgGrad.addColorStop(1, '#1E1909');
    } else {
      // MAIZE
      bgGrad.addColorStop(0, '#1E331B');
      bgGrad.addColorStop(1, '#0C1C0A');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // Leaf center vein
    ctx.strokeStyle = '#2E593366';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.bezierCurveTo(width / 2 + 30, height / 3, width / 2 - 30, (height * 2) / 3, width / 2, height);
    ctx.stroke();

    // Lateral leaf veins
    ctx.strokeStyle = '#25472A44';
    ctx.lineWidth = 2;
    for (let y = 40; y < height; y += 35) {
      ctx.beginPath();
      ctx.moveTo(width / 2, y);
      ctx.lineTo(20, y - 25);
      ctx.moveTo(width / 2, y);
      ctx.lineTo(width - 20, y - 25);
      ctx.stroke();
    }

    // Cellular noise grid
    ctx.fillStyle = '#FFFFFF05';
    for (let x = 0; x < width; x += 16) {
      for (let y = 0; y < height; y += 16) {
        if ((x + y) % 32 === 0) {
          ctx.fillRect(x, y, 8, 8);
        }
      }
    }

    // 2. Draw Lesions & Necrotic Patches on Leaf
    sample.boundingBoxes.forEach((box) => {
      if (box.confidencePercent < confidenceFilter) return;

      const px = (box.x / 640) * width;
      const py = (box.y / 400) * height;
      const pw = (box.width / 640) * width;
      const ph = (box.height / 400) * height;

      // Draw organic necrotic lesion spot
      const lesionGrad = ctx.createRadialGradient(
        px + pw / 2,
        py + ph / 2,
        pw * 0.1,
        px + pw / 2,
        py + ph / 2,
        pw * 0.6
      );
      if (box.label.includes('Rust') || box.label.includes('Pustule')) {
        lesionGrad.addColorStop(0, '#5C2200');
        lesionGrad.addColorStop(0.6, '#B84500');
        lesionGrad.addColorStop(1, '#1A331B00');
      } else if (box.label.includes('Blight') || box.label.includes('Lesion') || box.label.includes('Necrotic')) {
        lesionGrad.addColorStop(0, '#261F18');
        lesionGrad.addColorStop(0.5, '#5C4A30');
        lesionGrad.addColorStop(0.9, '#8A735288');
        lesionGrad.addColorStop(1, '#1A331B00');
      } else {
        lesionGrad.addColorStop(0, '#38421D');
        lesionGrad.addColorStop(1, '#1A331B00');
      }

      ctx.fillStyle = lesionGrad;
      ctx.beginPath();
      ctx.ellipse(px + pw / 2, py + ph / 2, Math.max(5, pw / 2), Math.max(5, ph / 2), 0, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Draw Heatmap Overlay Mode (if active)
    if (showHeatmap) {
      sample.boundingBoxes.forEach((box) => {
        if (box.confidencePercent < confidenceFilter) return;
        const px = (box.x / 640) * width;
        const py = (box.y / 400) * height;
        const pw = (box.width / 640) * width;
        const ph = (box.height / 400) * height;

        const heatGrad = ctx.createRadialGradient(
          px + pw / 2,
          py + ph / 2,
          5,
          px + pw / 2,
          py + ph / 2,
          Math.max(pw, ph, 30) * 0.8
        );
        heatGrad.addColorStop(0, 'rgba(255, 0, 85, 0.7)');
        heatGrad.addColorStop(0.5, 'rgba(255, 170, 0, 0.4)');
        heatGrad.addColorStop(1, 'rgba(0, 230, 118, 0)');

        ctx.fillStyle = heatGrad;
        ctx.beginPath();
        ctx.ellipse(px + pw / 2, py + ph / 2, Math.max(15, pw * 0.75), Math.max(15, ph * 0.75), 0, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    // 4. Draw AI Bounding Boxes & Target HUD (if active)
    if (showBoundingBoxes) {
      sample.boundingBoxes.forEach((box) => {
        if (box.confidencePercent < confidenceFilter) return;

        const px = (box.x / 640) * width;
        const py = (box.y / 400) * height;
        const pw = (box.width / 640) * width;
        const ph = (box.height / 400) * height;

        const isSelected = box.id === selectedBoxId;
        const isHovered = box.id === hoveredBoxId;

        const boxColor = isSelected
          ? '#00E676'
          : isHovered
          ? '#FFAB00'
          : '#FF00FF';

        // Fill tint for selected/hovered box
        if (isSelected || isHovered) {
          ctx.fillStyle = isSelected ? 'rgba(0, 230, 118, 0.15)' : 'rgba(255, 171, 0, 0.15)';
          ctx.fillRect(px, py, pw, ph);
        }

        // Bounding box outline
        ctx.strokeStyle = boxColor;
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.setLineDash(isSelected ? [] : [4, 4]);
        ctx.strokeRect(px, py, pw, ph);
        ctx.setLineDash([]);

        // Target Reticle Corners
        const cornerLen = Math.min(10, pw / 3, ph / 3);
        ctx.strokeStyle = boxColor;
        ctx.lineWidth = 2;

        // Top-left
        ctx.beginPath();
        ctx.moveTo(px, py + cornerLen);
        ctx.lineTo(px, py);
        ctx.lineTo(px + cornerLen, py);
        ctx.stroke();

        // Top-right
        ctx.beginPath();
        ctx.moveTo(px + pw - cornerLen, py);
        ctx.lineTo(px + pw, py);
        ctx.lineTo(px + pw, py + cornerLen);
        ctx.stroke();

        // Bottom-left
        ctx.beginPath();
        ctx.moveTo(px, py + ph - cornerLen);
        ctx.lineTo(px, py + ph);
        ctx.lineTo(px + cornerLen, py + ph);
        ctx.stroke();

        // Bottom-right
        ctx.beginPath();
        ctx.moveTo(px + pw - cornerLen, py + ph);
        ctx.lineTo(px + pw, py + ph);
        ctx.lineTo(px + pw, py + ph - cornerLen);
        ctx.stroke();

        // Confidence badge & label header
        const labelText = `${box.label} (${box.confidencePercent}%)`;
        ctx.font = 'bold 11px monospace';
        const textMetrics = ctx.measureText(labelText);
        const badgeWidth = textMetrics.width + 12;
        const badgeHeight = 20;

        ctx.fillStyle = boxColor;
        ctx.fillRect(px, Math.max(0, py - badgeHeight), badgeWidth, badgeHeight);

        ctx.fillStyle = '#0F1410';
        ctx.fillText(labelText, px + 6, Math.max(14, py - 5));
      });
    }

    // 5. Draw Laser Scanning Animation (if scanning active)
    if (isScanning) {
      scanOffsetYRef.current = (scanOffsetYRef.current + 3) % height;
      const scanY = scanOffsetYRef.current;

      // Laser beam gradient trail
      const scanGrad = ctx.createLinearGradient(0, scanY - 40, 0, scanY);
      scanGrad.addColorStop(0, 'rgba(0, 230, 118, 0)');
      scanGrad.addColorStop(1, 'rgba(0, 230, 118, 0.35)');

      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 40, width, 40);

      // Main glowing laser line
      ctx.strokeStyle = '#00E676';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#00E676';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.stroke();

      // Reset shadow blur
      ctx.shadowBlur = 0;
    }

    // 6. Draw Zoom Lens Magnifier (if cursor over canvas)
    if (mousePos) {
      const zoomSize = 120;
      const zoomRadius = zoomSize / 2;
      const zoomFactor = 2.5;

      // Top-right static zoom lens preview position
      const lensX = width - zoomRadius - 16;
      const lensY = zoomRadius + 16;

      ctx.save();

      // Draw lens outer ring & border
      ctx.beginPath();
      ctx.arc(lensX, lensY, zoomRadius, 0, Math.PI * 2);
      ctx.clip();

      // Magnified canvas content
      ctx.fillStyle = '#0F1410';
      ctx.fill();

      ctx.drawImage(
        canvas,
        mousePos.x - zoomRadius / zoomFactor,
        mousePos.y - zoomRadius / zoomFactor,
        zoomSize / zoomFactor,
        zoomSize / zoomFactor,
        lensX - zoomRadius,
        lensY - zoomRadius,
        zoomSize,
        zoomSize
      );

      // Micro grid overlay in zoom lens
      ctx.strokeStyle = 'rgba(0, 230, 118, 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(lensX - zoomRadius, lensY);
      ctx.lineTo(lensX + zoomRadius, lensY);
      ctx.moveTo(lensX, lensY - zoomRadius);
      ctx.lineTo(lensX, lensY + zoomRadius);
      ctx.stroke();

      ctx.restore();

      // Zoom lens ring border
      ctx.strokeStyle = '#00E676';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(lensX, lensY, zoomRadius, 0, Math.PI * 2);
      ctx.stroke();

      // Lens title tag
      ctx.fillStyle = '#00E676';
      ctx.font = 'bold 9px monospace';
      ctx.fillText(`LENS ${zoomFactor.toFixed(1)}X`, lensX - 22, lensY + zoomRadius - 8);
    }
  }, [
    sample,
    showBoundingBoxes,
    showHeatmap,
    selectedBoxId,
    hoveredBoxId,
    isScanning,
    confidenceFilter,
    mousePos,
  ]);

  // Animation frame loop
  useEffect(() => {
    let active = true;

    const animate = () => {
      if (!active) return;
      renderCanvas();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [renderCanvas]);

  // Handle Mouse Events for Hover / Zoom / Box Selection
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePos({ x, y });

    // Check hit test for bounding boxes
    const width = canvas.width;
    const height = canvas.height;
    let foundBoxId: string | null = null;

    sample.boundingBoxes.forEach((box) => {
      if (box.confidencePercent < confidenceFilter) return;
      const px = (box.x / 640) * width;
      const py = (box.y / 400) * height;
      const pw = (box.width / 640) * width;
      const ph = (box.height / 400) * height;

      if (x >= px && x <= px + pw && y >= py && y <= py + ph) {
        foundBoxId = box.id;
      }
    });

    setHoveredBoxId(foundBoxId);
  };

  const handleMouseLeave = () => {
    setMousePos(null);
    setHoveredBoxId(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;
    let clickedBoxId: string | null = null;

    sample.boundingBoxes.forEach((box) => {
      if (box.confidencePercent < confidenceFilter) return;
      const px = (box.x / 640) * width;
      const py = (box.y / 400) * height;
      const pw = (box.width / 640) * width;
      const ph = (box.height / 400) * height;

      if (x >= px && x <= px + pw && y >= py && y <= py + ph) {
        clickedBoxId = box.id;
      }
    });

    onSelectBox(clickedBoxId);
  };

  return (
    <div style={containerStyle}>
      <div style={toolbarStyle}>
        <div style={titleGroupStyle}>
          <span style={scanIconStyle}>{isScanning ? '📡' : '🔬'}</span>
          <h3 style={canvasTitleStyle}>HTML5 Lesion Inspector Canvas</h3>
          {isScanning && <span style={scanningBadgeStyle}>LIVE SCANNING</span>}
        </div>
        <div style={hintStyle}>
          <kbd style={kbdStyle}>CLICK BOX</kbd> Select Lesion | Hover for 2.5x Lens
        </div>
      </div>

      <div style={canvasWrapperStyle}>
        <canvas
          ref={canvasRef}
          width={640}
          height={400}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          style={canvasStyle}
          aria-label={`Interactive Leaf Image Inspector for ${sample.plotName}. ${sample.boundingBoxes.length} lesion regions detected.`}
          role="img"
        />
      </div>

      <div style={footerStyle}>
        <div style={metaItemStyle}>
          <span style={metaLabelStyle}>Viewport Grid:</span>
          <span style={metaValueStyle}>640 × 400 px</span>
        </div>
        <div style={metaItemStyle}>
          <span style={metaLabelStyle}>Bounding Boxes Detected:</span>
          <span style={metaValueStyle}>{sample.boundingBoxes.length} regions</span>
        </div>
        <div style={metaItemStyle}>
          <span style={metaLabelStyle}>Selected Region:</span>
          <span style={{ ...metaValueStyle, color: selectedBoxId ? '#00E676' : '#8B949E' }}>
            {selectedBoxId ? selectedBoxId : 'None'}
          </span>
        </div>
      </div>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  background: '#0F1410',
  borderRadius: '12px',
  border: '1px solid #2D3B30',
  padding: '1.25rem',
  marginBottom: '1.5rem',
};

const toolbarStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '1rem',
  flexWrap: 'wrap',
  gap: '0.5rem',
};

const titleGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const scanIconStyle: React.CSSProperties = {
  fontSize: '1.2rem',
};

const canvasTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: '1.05rem',
  color: '#FFFFFF',
  fontWeight: 600,
};

const scanningBadgeStyle: React.CSSProperties = {
  fontSize: '0.65rem',
  fontWeight: 700,
  color: '#00E676',
  background: '#00E67622',
  border: '1px solid #00E67666',
  padding: '0.15rem 0.5rem',
  borderRadius: '4px',
};

const hintStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  color: '#8B949E',
};

const kbdStyle: React.CSSProperties = {
  background: '#1A271E',
  border: '1px solid #2D3B30',
  color: '#00E676',
  padding: '0.1rem 0.35rem',
  borderRadius: '4px',
  fontSize: '0.7rem',
  fontFamily: 'monospace',
  marginRight: '0.4rem',
};

const canvasWrapperStyle: React.CSSProperties = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  background: '#090D0A',
  borderRadius: '8px',
  border: '1px solid #1F2C21',
  overflow: 'hidden',
  position: 'relative',
};

const canvasStyle: React.CSSProperties = {
  width: '100%',
  maxWidth: '640px',
  height: 'auto',
  cursor: 'crosshair',
  display: 'block',
};

const footerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '0.75rem',
  fontSize: '0.75rem',
  flexWrap: 'wrap',
  gap: '0.5rem',
};

const metaItemStyle: React.CSSProperties = {
  display: 'flex',
  gap: '0.4rem',
};

const metaLabelStyle: React.CSSProperties = {
  color: '#8B949E',
};

const metaValueStyle: React.CSSProperties = {
  color: '#E6EDE6',
  fontFamily: 'monospace',
  fontWeight: 600,
};
