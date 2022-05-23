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

export const ImpactChart: FC<ImpactChartProps> = ({ category, impact = [] }) => {
  const {
    data: { impact: impacts, category: categories },
  } = useEnums();

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
      tooltip: {
        backgroundColor: 'white',
        bodyColor: 'rgba(88, 88, 88, 1)',
        titleColor: 'rgba(88, 88, 88, 1)',
        titleFont: { weight: '400', size: 10 },
        mode: 'nearest',
        borderColor: 'rgba(88, 88, 88, 1)',
        displayColors: false,
      },
    },
  };

  // [470px]

  return (
    <div className="flex justify-between w-[250px] h-[250px] sm:w-[470px] sm:h-[470px]">
      {/* This is a background and labels for the chart. Since the library doen't allow using elements as labels, this is an alternative way to add labels with incons and tooltips */}
      {impacts?.length && (
        <div className="z-1 m-2 absolute w-[232px] h-[232px] sm:w-[453px] sm:h-[453px] flex flex-col justify-between items-center  bg-background-middle rounded-full">
          {!isPlaceholder && (
            <div className="absolute w-1/2 rounded-full top-[25%] bg-white h-1/2" />
          )}
          <div className="translate-y-[-140%]">
            <span className="mr-2">{impacts[0].name}</span>
            <FieldInfo infoText={impacts[0].description} />
          </div>
          <div className="flex justify-between w-full">
            <div className="translate-x-[-140%]">
              <span className="mr-2">{impacts[1].name}</span>
              <FieldInfo infoText={impacts[1].description} />
            </div>
            <div className="translate-x-[140%]">
              <span className="mr-2">{impacts[2].name}</span>
              <FieldInfo infoText={impacts[2].description} />
            </div>
          </div>
          <div className="translate-y-[140%]">
            <span className="mr-2">{impacts[3].name}</span>
            <FieldInfo infoText={impacts[3].description} />
          </div>
        </div>
      )}
      <div className="z-0 w-full h-full">
        <Radar width="100%" height="100%" data={data} options={options} />
      </div>
    </div>
  );
};

export default ImpactChart;
