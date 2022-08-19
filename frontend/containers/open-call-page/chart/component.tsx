import { FC } from 'react';

import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';

import { theme } from 'tailwind.config';

import { OpenCallChartProps } from '.';

ChartJS.register(ArcElement, Tooltip);

export const OpenCallChart: FC<OpenCallChartProps> = ({ openCallRange }) => {
  return (
    <Doughnut
      options={{
        // This controls the width of the doughnut
        cutout: '95%',
        // The events empty is to disable the hover effect
        events: [],
      }}
      data={{
        datasets: [
          {
            data: [openCallRange.remaining, openCallRange.consumed],
            backgroundColor: [theme.colors.green.light, theme.colors.beige],
            borderColor: [theme.colors.green.light, theme.colors.beige],
          },
        ],
      }}
    />
  );
};

export default OpenCallChart;
