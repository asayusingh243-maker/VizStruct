import React from 'react';
import { Play, Pause, SkipBack, SkipForward, RotateCcw, FastForward } from 'lucide-react';

export const ControlBar = ({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlayPause,
  onNext,
  onPrev,
  onReset,
  onSpeedChange,
  onSeek
}) => {
  return (
    <div className="bg-[#121215] rounded border border-[#27272A] p-3.5 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
      
      {/* Progress & Step Info */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <span className="text-xs font-mono text-zinc-300 min-w-[100px]">
          Step <span className="text-blue-400 font-bold">{currentStep}</span> / {totalSteps}
        </span>

        <div className="flex-1 md:w-48 bg-[#09090B] rounded h-2 overflow-hidden border border-[#27272A] cursor-pointer">
          <div
            className="bg-blue-600 h-full transition-all duration-150"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              const step = Math.max(1, Math.ceil(pos * totalSteps));
              onSeek(step);
            }}
          />
        </div>
      </div>

      {/* Main Playback Buttons */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={onReset}
          title="Reset"
          className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onPrev}
          disabled={currentStep <= 1}
          title="Previous Step"
          className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 disabled:opacity-40 transition-colors"
        >
          <SkipBack className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onPlayPause}
          title={isPlaying ? "Pause" : "Play"}
          className={`px-3 py-1.5 rounded font-semibold flex items-center justify-center transition-colors ${
            isPlaying
              ? 'bg-amber-400 text-zinc-950 hover:bg-amber-300'
              : 'bg-zinc-100 text-zinc-950 hover:bg-white'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5 fill-zinc-950" /> : <Play className="w-3.5 h-3.5 fill-zinc-950 ml-0.5" />}
        </button>

        <button
          onClick={onNext}
          disabled={currentStep >= totalSteps}
          title="Next Step"
          className="p-2 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 disabled:opacity-40 transition-colors"
        >
          <SkipForward className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Speed Selector */}
      <div className="flex items-center gap-2">
        <FastForward className="w-3.5 h-3.5 text-zinc-400" />
        <select
          value={speed}
          onChange={(e) => onSpeedChange(Number(e.target.value))}
          className="bg-[#09090B] border border-[#27272A] text-xs font-mono rounded px-2.5 py-1 text-zinc-200 focus:outline-none"
        >
          <option value={0.5}>0.5x Speed</option>
          <option value={1}>1.0x Speed</option>
          <option value={2}>2.0x Speed</option>
          <option value={4}>4.0x Speed</option>
        </select>
      </div>

    </div>
  );
};
