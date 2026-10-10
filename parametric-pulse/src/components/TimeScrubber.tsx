import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface TimeScrubberProps {
  currentHour: number;
  maxHour?: number;
  isPlaying: boolean;
  playbackSpeed: number;
  onHourChange: (hour: number) => void;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export const TimeScrubber: React.FC<TimeScrubberProps> = ({
  currentHour,
  maxHour = 48,
  isPlaying,
  playbackSpeed,
  onHourChange,
  onTogglePlay,
  onSpeedChange,
}) => {
  return (
    <div
      style={{
        background: '#0B0F19',
        border: '1px solid #1E293B',
        borderRadius: '4px',
        padding: '16px 20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {/* Top controls & labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={onTogglePlay}
            style={{
              background: '#00E5FF',
              color: '#06080F',
              border: 'none',
              borderRadius: '4px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
            aria-label={isPlaying ? 'Pause trajectory simulation' : 'Play trajectory simulation'}
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? 'PAUSE' : 'PLAY SIMULATION'}
          </button>

          <button
            onClick={() => onHourChange(Math.max(0, currentHour - 1))}
            style={{ background: '#1E293B', color: '#F8FAFC', border: 'none', borderRadius: '4px', padding: '6px 8px', cursor: 'pointer' }}
            aria-label="Step 1 hour back"
          >
            <SkipBack size={16} />
          </button>

          <button
            onClick={() => onHourChange(Math.min(maxHour, currentHour + 1))}
            style={{ background: '#1E293B', color: '#F8FAFC', border: 'none', borderRadius: '4px', padding: '6px 8px', cursor: 'pointer' }}
            aria-label="Step 1 hour forward"
          >
            <SkipForward size={16} />
          </button>

          {/* Speed selector */}
          <div style={{ display: 'flex', gap: '4px', marginLeft: '12px' }}>
            {[1, 2, 4].map((speed) => (
              <button
                key={speed}
                onClick={() => onSpeedChange(speed)}
                style={{
                  background: playbackSpeed === speed ? '#334155' : 'transparent',
                  color: playbackSpeed === speed ? '#00E5FF' : '#94A3B8',
                  border: '1px solid #1E293B',
                  borderRadius: '3px',
                  padding: '2px 8px',
                  fontSize: '0.75rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  cursor: 'pointer',
                }}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>

        {/* Current Checkpoint Telemetry Pill */}
        <div
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.875rem',
            color: '#00E5FF',
            background: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            padding: '4px 12px',
            borderRadius: '9999px',
          }}
        >
          FORECAST NODE: T+{currentHour}h
        </div>
      </div>

      {/* Slider Track */}
      <div style={{ position: 'relative', width: '100%', marginTop: '4px' }}>
        <input
          type="range"
          min={0}
          max={maxHour}
          step={1}
          value={currentHour}
          onChange={(e) => onHourChange(Number(e.target.value))}
          aria-label="Forecast Timeline Scrubber"
          aria-valuenow={currentHour}
          aria-valuemin={0}
          aria-valuemax={maxHour}
          aria-valuetext={`Forecast hour T plus ${currentHour} hours`}
          style={{
            width: '100%',
            accentColor: '#00E5FF',
            cursor: 'pointer',
            height: '6px',
            borderRadius: '3px',
            background: '#1E293B',
          }}
        />

        {/* Major Tick Marks */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#64748B', fontFamily: 'JetBrains Mono, monospace', marginTop: '6px' }}>
          <span>T+0h (Observed)</span>
          <span>T+12h</span>
          <span style={{ color: '#EF4444', fontWeight: 600 }}>T+24h (Landfall)</span>
          <span>T+36h</span>
          <span>T+48h</span>
        </div>
      </div>
    </div>
  );
};
