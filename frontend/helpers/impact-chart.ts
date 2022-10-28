import { Chart } from 'chart.js';

const hex2rgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const createGradient = (
  chart: Chart<'polarArea'>,
  categoryColor: string,
  gradientValues: { stop: number; color: string }[]
) => {
  const ctx = chart?.ctx;
  const area = chart?.chartArea;
  if (ctx && area && categoryColor) {
    // The adjustment values correct the y and x center position
    const adjustmentValueX = area.right < 100 ? 0.78 : area.right < 400 ? 0.25 : 0;
    const adjustmentValueY = area.bottom < 100 ? 0.9 : area.right < 400 ? 0.75 : 0.5;
    const x = area.right / 2 - adjustmentValueX;
    const y = area.bottom / 2 - adjustmentValueY;
    const innerRadius = 0;
    const whiteCircleRadiusPercent = 0.8;
    const radius = area.right * whiteCircleRadiusPercent;

    const gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, radius);

    gradientValues.forEach(({ color, stop }) => {
      gradient.addColorStop(stop, color);
    });

    ctx.fillStyle = gradient;
    ctx.fill();

    return gradient;
  }
};

export const createBgGradient = (chart: Chart<'polarArea'>, categoryColor: string) => {
  const gradient = [
    { stop: 0, color: 'rgba(255, 255, 255, 1)' },
    { stop: 0.05, color: 'rgba(255, 255, 255, 1)' },
    { stop: 0.05, color: hex2rgba(categoryColor, 0.4) },
    { stop: 1, color: categoryColor },
  ];

  return createGradient(chart, categoryColor, gradient);
};

export const createBorderGradient = (chart: Chart<'polarArea'>, categoryColor: string) => {
  const gradient = [
    { stop: 0, color: 'rgba(255, 255, 255, 1)' },
    { stop: 0.05, color: 'rgba(255, 255, 255, 1)' },
    { stop: 0.05, color: 'rgba(255, 255, 255, 0)' },
    { stop: 1, color: 'rgba(255, 255, 255, 0)' },
  ];

  return createGradient(chart, categoryColor, gradient);
};
