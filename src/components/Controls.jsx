import React from 'react';
import { Camera, Pause, Play, Download, FlipHorizontal } from 'lucide-react';

export const Controls = ({ 
  density, 
  setDensity, 
  colorMode, 
  setColorMode, 
  isMirrored, 
  setIsMirrored, 
  isPaused, 
  setIsPaused, 
  onDownloadTxt, 
  onDownloadPng 
}) => {
  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] md:w-auto max-w-4xl backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col md:flex-row items-center gap-6 justify-between shadow-2xl z-50">
      
      {/* Density Slider */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <span className="text-xs font-semibold w-16 text-white/70 tracking-widest uppercase text-right">Density</span>
        <input 
          type="range" 
          min="60" 
          max="250" 
          step="1"
          value={density} 
          onChange={(e) => setDensity(Number(e.target.value))}
          className="flex-1 md:w-32 appearance-none h-1 bg-white/20 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer transition-all hover:[&::-webkit-slider-thumb]:scale-150"
        />
        <span className="text-xs font-mono text-white/50 w-8 tabular-nums">{density}</span>
      </div>

      {/* Mode Switches */}
      <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar bg-black/20 p-1 rounded-2xl">
        {['Terminal', 'Classic', 'Color'].map(mode => (
          <button
            key={mode}
            onClick={() => setColorMode(mode)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
              colorMode === mode 
                ? 'bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]' 
                : 'bg-transparent text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-end">
        <button 
          onClick={() => setIsMirrored(!isMirrored)}
          className={`p-3 rounded-full transition-all duration-300 ${
            isMirrored 
              ? 'bg-white text-black shadow-lg' 
              : 'bg-white/5 text-white/70 hover:bg-white/20 hover:text-white'
          }`}
          title="Mirror Camera"
        >
          <FlipHorizontal size={18} />
        </button>
        
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="p-3 rounded-full bg-white/5 text-white/70 hover:bg-white/20 hover:text-white transition-all duration-300"
          title={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
        </button>

        <div className="w-[1px] h-6 bg-white/20 mx-2 hidden md:block"></div>

        <button 
          onClick={onDownloadPng}
          className="p-3 rounded-full bg-white/10 text-white hover:bg-white/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-2"
          title="Download Image"
        >
          <Camera size={18} />
        </button>
        
        <button 
          onClick={onDownloadTxt}
          className="p-3 rounded-full bg-white/10 text-white hover:bg-white/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center gap-2"
          title="Download Text Document"
        >
          <Download size={18} />
        </button>
      </div>
    </div>
  );
};
