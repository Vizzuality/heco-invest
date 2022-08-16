import { FC } from 'react';

import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement } from 'chart.js';

import { OpenCallChartProps } from '.';
ChartJS.register(ArcElement);

export const OpenCallChart: FC<OpenCallChartProps> = ({ openCallRange }) => {
  return (
    <Doughnut
      options={{
        cutout: '83%',
      }}
      data={{
        datasets: [
          {
            data: [openCallRange.remaining, openCallRange.consumed],
            backgroundColor: ['#CFD762', '#E3DED6'],
          },
        ],
        labels: ['Funded', 'Remaining'],
      }}
    />
  );
};

export default OpenCallChart;
