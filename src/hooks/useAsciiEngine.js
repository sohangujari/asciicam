import { useCallback } from 'react';
import { getLuminance, getAsciiChar } from '../utils/asciiUtils';

export const useAsciiEngine = () => {
  const processFrame = useCallback((video, canvas, ctx, preElement, columns, colorMode) => {
    if (!video || !canvas || !ctx || !preElement) return;

    const width = video.videoWidth;
    const height = video.videoHeight;
    if (!width || !height) return;

    const aspectRatio = width / height;
    const rows = Math.floor((columns * 0.65) / aspectRatio);

    if (canvas.width !== columns || canvas.height !== rows) {
      canvas.width = columns;
      canvas.height = rows;
    }

    ctx.drawImage(video, 0, 0, columns, rows);
    const imageData = ctx.getImageData(0, 0, columns, rows);
    const data = imageData.data;

    let asciiOutput = '';
    let htmlOutput = '';

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        const offset = (y * columns + x) * 4;
        const r = data[offset];
        const g = data[offset + 1];
        const b = data[offset + 2];
        
        const luminance = getLuminance(r, g, b);
        const char = getAsciiChar(luminance);

        if (colorMode === 'Color') {
          htmlOutput += `<span style="color: rgb(${r},${g},${b})">${char === ' ' ? '&nbsp;' : char}</span>`;
        } else {
          asciiOutput += char;
        }
      }
      if (colorMode === 'Color') {
        htmlOutput += '<br/>';
      } else {
        asciiOutput += '\n';
      }
    }

    if (colorMode === 'Color') {
      preElement.innerHTML = htmlOutput;
    } else {
      preElement.textContent = asciiOutput;
    }
  }, []);

  return { processFrame };
};
