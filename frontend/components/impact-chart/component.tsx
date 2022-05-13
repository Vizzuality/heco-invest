import React, { FC } from 'react';

import { Radar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  ChartData,
  ChartOptions,
} from 'chart.js';

import { ImpactChartProps } from './types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export const ImpactChart: FC<ImpactChartProps> = ({ color, impact, labels }) => {
  const data: ChartData<'radar'> = {
    labels,
    datasets: [
      {
        data: impact,
        backgroundColor: color + 'cc',
        borderColor: color,
        borderJoinStyle: 'round',
        borderWidth: 1,
        tension: 0.25,
        pointBackgroundColor: 'rgba(255, 159, 64, 0)',
        pointBorderColor: 'rgba(255, 159, 64, 0)',
      },
    ],
  };

  const options: ChartOptions<'radar'> = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(227, 222, 214, 0.5)',
        },
        pointLabels: { font: { family: 'Work Sans', weight: '600', size: 14 } },
        grid: {
          circular: true,
          color: 'rgba(227, 222, 214, 1)',
        },
        beginAtZero: true,
        ticks: {
          count: 3,
          color: 'rgba(88, 88, 88, 1)',
          font: { family: 'Work Sans', size: 12 },
        },
        max: 100,
        min: 0,
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: 'white',
        bodyColor: 'rgba(88, 88, 88, 1)',
        titleColor: 'rgba(88, 88, 88, 1)',
        titleFont: { weight: '400', size: 10 },
        mode: 'nearest',
        borderColor: 'rgba(88, 88, 88, 1)',
      },
    },
  };

  return <Radar width="100%" height="100%" data={data} options={options} />;
};

export default ImpactChart;
