import { Chart } from 'chart.js';

const hex2rgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const CENTER_CIRCLE = 0.8;

export const createBgGradient = (chart: Chart<'polarArea'>, categoryColor: string) => {
  const ctx = chart?.ctx;
  const area = chart?.chartArea;
  if (ctx && area && categoryColor) {
    console.log(area);
    const x = area.right / 2;
    const y = area.bottom / 2;
    const innerRadius = 0;
    const radius = area.right * CENTER_CIRCLE;

    const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.05, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.05, hex2rgba(categoryColor, 0.4));
    gradient.addColorStop(1, categoryColor);

    ctx.fillStyle = gradient;
    ctx.fill();

    return gradient;
  }
};

export const createBorderGradient = (chart: Chart<'polarArea'>, categoryColor: string) => {
  const ctx = chart?.ctx;
  const area = chart?.chartArea;
  if (ctx && area && categoryColor) {
    const x = area.right / 2;
    const y = area.bottom / 2;
    const innerRadius = 0;
    const radius = area.right * CENTER_CIRCLE;
    const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.05, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.05, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(0.95, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fill();

    return gradient;
  }
};
