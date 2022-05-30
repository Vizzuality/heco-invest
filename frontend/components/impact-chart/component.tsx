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

import FieldInfo from 'components/forms/field-info';

import { useEnums } from 'services/enums/enumService';

import { ImpactChartProps } from './types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip);

export const ImpactChart: FC<ImpactChartProps> = ({
  className,
  category,
  impact = [],
  compactMode = false,
}) => {
  const {
    data: { impact: impacts, category: categories },
  } = useEnums();

  //const impact = [];
  const color = categories?.find(({ id }) => id === category)?.color;

  const isPlaceholder = !impact?.length;

  const data: ChartData<'radar'> = {
    labels: ['', '', '', ''],
    datasets: [
      {
        data: impact,
        backgroundColor: color,
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
        display: !compactMode,
        angleLines: {
          color: 'rgba(227, 222, 214, 0.5)',
          display: !isPlaceholder,
        },
        pointLabels: { font: { family: 'Work Sans', weight: '600', size: 14 }, display: false },
        grid: {
          circular: true,
          color: isPlaceholder ? 'rgba(227, 222, 214, 0.5)' : 'rgba(227, 222, 214, 1)',
          borderDash: isPlaceholder ? [2, 2] : [],
        },
        beginAtZero: true,
        ticks: {
          count: 3,
          color: isPlaceholder ? 'rgba(88, 88, 88, 0.5)' : 'rgba(88, 88, 88, 1)',
          font: { family: 'Work Sans', size: 12 },
          backdropColor: 'transparent',
        },
        max: 10,
        min: 0,
      },
    },
    plugins: {
      ...(!compactMode && {
        tooltip: {
          backgroundColor: 'white',
          bodyColor: 'rgba(88, 88, 88, 1)',
          titleColor: 'rgba(88, 88, 88, 1)',
          titleFont: { weight: '400', size: 10 },
          mode: 'nearest',
          borderColor: 'rgba(88, 88, 88, 1)',
          displayColors: false,
        },
      }),
    },
  };

  if (compactMode) {
    return (
      <div className={className}>
        {isPlaceholder ? (
          <div className="w-full aspect-square border border-dashed rounded-full bg-background-middle border-background-dark bg-radial-beige" />
        ) : (
          <Radar data={data} options={options} />
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between w-full ">
        <div className="z-0 flex flex-col w-full h-full gap-2">
          {impacts?.length && (
            <span className="flex items-center justify-center w-full">
              <span className="hidden mr-2 text-sm font-semibold text-gray-800 sm:flex">
                {impacts[0].name}
              </span>
              <FieldInfo infoText={impacts[0].description} />
            </span>
          )}
          <span className="flex w-full">
            {impacts?.length && (
              <span className="flex items-center justify-end mr-2">
                <span className="hidden mr-2 text-sm font-semibold text-gray-800 sm:flex">
                  {impacts[2].name}
                </span>
                <FieldInfo infoText={impacts[2].description} />
              </span>
            )}
            <span className="relative flex items-center w-full overflow-x-scroll aspect-square">
              <span className="absolute top-2 right-2 bottom-2 left-2 bg-background-middle rounded-full opacity-50" />
              <span className="absolute top-2 right-2 bottom-2 left-2 bg-background-middle rounded-full opacity-60 scale-50" />
              <Radar className="z-10" data={data} options={options} />
            </span>
            {impacts?.length && (
              <span className="flex items-center justify-start ml-2">
                <span className="hidden mr-2 text-sm font-semibold text-gray-800 sm:flex">
                  {impacts[1].name}
                </span>
                <FieldInfo infoText={impacts[1].description} />
              </span>
            )}
          </span>
          {impacts?.length && (
            <span className="flex items-center justify-center w-full">
              <span className="hidden mr-2 text-sm font-semibold text-gray-800 sm:flex">
                {impacts[3].name}
              </span>
              <FieldInfo infoText={impacts[3].description} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpactChart;
