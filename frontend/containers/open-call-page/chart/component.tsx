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
        cutout: '86%',
        // The events empty is to disable the hover effect
        events: [],
      }}
      data={{
        datasets: [
          {
            data: [openCallRange.consumed, openCallRange.remaining],
            backgroundColor: [theme.colors.beige, theme.colors.green.light],
            borderColor: [theme.colors.beige, theme.colors.green.light],
          },
        ],
      }}
    />
  );
};

export default OpenCallChart;
