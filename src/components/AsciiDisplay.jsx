import React, { forwardRef } from 'react';

export const AsciiDisplay = forwardRef(({ mode, isMirrored, columns }, ref) => {
  const getColors = () => {
    switch (mode) {
      case 'Terminal':
        return 'text-[#00ff41] drop-shadow-[0_0_8px_rgba(0,255,65,0.4)]';
      case 'Classic':
        return 'text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]';
      case 'Color':
        return '';
      default:
        return 'text-[#00ff41]';
    }
  };

  return (
    <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden z-0 pointer-events-none select-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black opacity-30 z-[-1]"></div>
      <pre
        ref={ref}
        className={`font-mono text-center transform transition-all duration-300 ${isMirrored ? 'scale-x-[-1]' : ''} ${getColors()}`}
        style={{ 
          fontSize: `max(calc(100vw / ${columns * 0.58}), calc(100vh / ${columns * 0.35}))`,
          lineHeight: '0.86',
          letterSpacing: '0.02em',
          fontWeight: '500'
        }}
      ></pre>
    </div>
  );
});
