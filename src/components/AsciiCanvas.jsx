import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { useAsciiEngine } from '../hooks/useAsciiEngine';
import { downloadText, downloadCanvasAsPng } from '../utils/asciiUtils';

export const AsciiCanvas = forwardRef(({ videoRef, preRef, columns, colorMode, isPaused }, ref) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const { processFrame } = useAsciiEngine();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    
    const renderLoop = (timestamp) => {
      if (!isPaused && videoRef.current?.readyState >= 2) {
        if (timestamp - lastFrameTimeRef.current >= 1000 / 24) {
          processFrame(videoRef.current, canvas, ctx, preRef.current, columns, colorMode);
          lastFrameTimeRef.current = timestamp;
        }
      }
      rafRef.current = requestAnimationFrame(renderLoop);
    };

    rafRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [columns, colorMode, isPaused, videoRef, preRef, processFrame]);

  useImperativeHandle(ref, () => ({
    downloadText: (filename = 'asciicam.txt') => {
      if (preRef.current) {
        let text = preRef.current.innerText || preRef.current.textContent;
        downloadText(text, filename);
      }
    },
    downloadPng: (filename = 'asciicam.png') => {
      const pre = preRef.current;
      if (!pre) return;
      
      const renderCanvas = document.createElement('canvas');
      const ctx = renderCanvas.getContext('2d');
      const fontSize = 12;
      ctx.font = `${fontSize}px monospace`;
      
      if (colorMode === 'Color') {
        const lines = Array.from(pre.childNodes).reduce((acc, node) => {
          if (node.nodeName === 'BR') {
            acc.push([]);
          } else if (node.nodeName === 'SPAN') {
            if (acc.length === 0) acc.push([]);
            acc[acc.length - 1].push({
              char: node.textContent === '\u00A0' ? ' ' : node.textContent,
              color: node.style.color
            });
          }
          return acc;
        }, []);
        
        const cols = lines[0]?.length || 0;
        const rows = lines.length;
        const charWidth = ctx.measureText('M').width;
        const lineHeight = fontSize;
        
        renderCanvas.width = cols * charWidth;
        renderCanvas.height = rows * lineHeight;
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);
        ctx.textBaseline = 'top';
        ctx.font = `${fontSize}px monospace`;
        
        lines.forEach((line, y) => {
          line.forEach((span, x) => {
            ctx.fillStyle = span.color;
            ctx.fillText(span.char, x * charWidth, y * lineHeight);
          });
        });
      } else {
        const text = pre.innerText || pre.textContent;
        const lines = text.split('\n');
        const cols = lines.reduce((max, l) => Math.max(max, l.length), 0);
        const rows = lines.length;
        const charWidth = ctx.measureText('M').width;
        const lineHeight = fontSize;
        
        renderCanvas.width = cols * charWidth;
        renderCanvas.height = rows * lineHeight;
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, 0, renderCanvas.width, renderCanvas.height);
        ctx.textBaseline = 'top';
        ctx.font = `${fontSize}px monospace`;
        
        ctx.fillStyle = colorMode === 'Terminal' ? '#00ff41' : '#ffffff';
        lines.forEach((line, y) => {
          ctx.fillText(line, 0, y * lineHeight);
        });
      }
      
      downloadCanvasAsPng(renderCanvas, filename);
    }
  }));

  return (
    <canvas ref={canvasRef} className="hidden" />
  );
});
