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
    <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[95%] md:w-auto max-w-4xl backdrop-blur-3xl bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6 justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] z-50">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <span className="text-sm font-medium w-16 text-white/80 tracking-wide text-right">Density</span>
        <input 
          type="range" 
          min="40" 
          max="200" 
          step="1"
          value={density} 
          onChange={(e) => setDensity(Number(e.target.value))}
          className="flex-1 md:w-40 appearance-none h-1.5 bg-white/20 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full cursor-pointer transition-all hover:[&::-webkit-slider-thumb]:scale-125"
        />
        <span className="text-xs font-mono text-white/50 w-8 tabular-nums">{density}</span>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar scroll-smooth relative">
        {['Terminal', 'Classic', 'Color'].map(mode => (
          <button
            key={mode}
            onClick={() => setColorMode(mode)}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              colorMode === mode 
                ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                : 'bg-transparent text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1 w-full md:w-auto justify-center md:justify-end">
        <button 
          onClick={() => setIsMirrored(!isMirrored)}
          className={`p-3 rounded-xl transition-all duration-300 ${
            isMirrored 
              ? 'bg-white/20 text-white shadow-inner' 
              : 'bg-transparent text-white/70 hover:bg-white/10 hover:text-white'
          }`}
          title="Mirror Camera"
        >
          <FlipHorizontal size={18} />
        </button>
        
        <button 
          onClick={() => setIsPaused(!isPaused)}
          className="p-3 rounded-xl bg-transparent text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
          title={isPaused ? "Resume" : "Pause"}
        >
          {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
        </button>

        <div className="w-[1px] h-8 bg-white/10 mx-2 hidden md:block"></div>

        <button 
          onClick={onDownloadPng}
          className="p-3 rounded-xl bg-white/5 text-white hover:bg-white/20 border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center gap-2 group"
          title="Download PNG"
        >
          <Camera size={18} className="group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium hidden lg:inline">Image</span>
        </button>
        
        <button 
          onClick={onDownloadTxt}
          className="p-3 rounded-xl bg-white/5 text-white hover:bg-white/20 border border-white/5 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] flex items-center gap-2 group"
          title="Download TXT"
        >
          <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
          <span className="text-sm font-medium hidden lg:inline">Text</span>
        </button>
      </div>
    </div>
  );
};
