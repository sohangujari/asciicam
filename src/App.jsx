import React, { useState, useRef } from 'react';
import { Controls } from './components/Controls';
import { AsciiDisplay } from './components/AsciiDisplay';
import { AsciiCanvas } from './components/AsciiCanvas';
import { ErrorState } from './components/ErrorState';
import { useCamera } from './hooks/useCamera';

export default function App() {
  const [density, setDensity] = useState(100);
  const [colorMode, setColorMode] = useState('Terminal');
  const [isMirrored, setIsMirrored] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const { error, videoRef, startCamera } = useCamera();
  const preRef = useRef(null);
  const asciiCanvasRef = useRef(null);

  const handleDownloadTxt = () => {
    asciiCanvasRef.current?.downloadText();
  };

  const handleDownloadPng = () => {
    asciiCanvasRef.current?.downloadPng();
  };

  if (error) {
    return <ErrorState error={error} onRetry={startCamera} />;
  }

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden font-inter text-white">
      <video ref={videoRef} className="absolute opacity-0 pointer-events-none w-px h-px" playsInline muted autoPlay />
      
      <AsciiDisplay 
        ref={preRef} 
        mode={colorMode} 
        isMirrored={isMirrored} 
        columns={density}
      />
      
      <AsciiCanvas
        ref={asciiCanvasRef}
        videoRef={videoRef}
        preRef={preRef}
        columns={density}
        colorMode={colorMode}
        isPaused={isPaused}
      />
      
      <Controls
        density={density}
        setDensity={setDensity}
        colorMode={colorMode}
        setColorMode={setColorMode}
        isMirrored={isMirrored}
        setIsMirrored={setIsMirrored}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        onDownloadTxt={handleDownloadTxt}
        onDownloadPng={handleDownloadPng}
      />
    </div>
  );
}
