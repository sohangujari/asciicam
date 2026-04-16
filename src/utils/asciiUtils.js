export const ASCII_CHARS = '@#S%?*+;:,. ';

export const getLuminance = (r, g, b) => {
  return (r * 0.299 + g * 0.587 + b * 0.114);
};

export const getAsciiChar = (luminance) => {
  const index = Math.floor((luminance / 255) * (ASCII_CHARS.length - 1));
  return ASCII_CHARS[index];
};

export const downloadText = (text, filename) => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadCanvasAsPng = (canvas, filename) => {
  const url = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
