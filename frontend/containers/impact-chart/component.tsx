import React, { FC, useMemo } from 'react';

import { useHover } from 'react-aria';
import { Radar } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip as ChartTooltip,
  ChartData,
  ChartOptions,
} from 'chart.js';

import FieldInfo from 'components/forms/field-info';
import Tooltip from 'components/tooltip';
import { Impacts as ImpactsEnum } from 'enums';

import { useEnums } from 'services/enums/enumService';

import { ImpactChartProps } from './types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ChartTooltip);

export const ImpactChart: FC<ImpactChartProps> = ({
  className,
  category,
  impact,
  compactMode = false,
}) => {
  const { formatMessage } = useIntl();

  const {
    data: { impact: allImpacts, category: allCategories },
  } = useEnums();
  // The object may contain Impacts ids, but we need to make sure we have all the values
  // (biodiversity, climate, community, water) in order to display the chart. We also need
  // the impacts data coming from the enums in order to display labels and descriptions
  const isPlaceholder =
    !impact ||
    !allImpacts ||
    !(Object.values(impact) || []).filter((value) => value !== null && !isNaN(value)).length;

  const categoryColor = useMemo(
    () => allCategories?.find(({ id }) => id === category)?.color,
    [allCategories, category]
  );

  const impactIds = useMemo(
    () => [ImpactsEnum.Biodiversity, ImpactsEnum.Climate, ImpactsEnum.Community, ImpactsEnum.Water],
    []
  );

  const { hoverProps, isHovered } = useHover({});

  const impactData = useMemo(() => {
    if (!allImpacts) return [];

    return impactIds.reduce((acc, impactId) => {
      const data = allImpacts.find(({ id }) => id === impactId);
      if (!data) return;

      return {
        ...acc,
        [impactId]: {
          id: impactId,
          value: impact && impact[impactId],
          name: data.name,
          description: data.description,
        },
      };
    }, []);
  }, [impactIds, allImpacts, impact]);

  const chartData: ChartData<'radar'> = useMemo(
    () => ({
      labels: [
        formatMessage({ defaultMessage: 'Biodiversity', id: 'mbTJWV' }),
        formatMessage({ defaultMessage: 'Water', id: 't7YvMF' }),
        formatMessage({ defaultMessage: 'Climate', id: 'MuOp0t' }),
        formatMessage({ defaultMessage: 'Community', id: '4CrCbD' }),
      ],
      datasets: [
        {
          data: impactIds.reduce((acc, impactId) => [...acc, impactData[impactId]?.value || 0], []),
          backgroundColor: categoryColor,
          borderColor: categoryColor,
          borderJoinStyle: 'round',
          borderWidth: 1,
          tension: 0.25,
          pointBackgroundColor: 'rgba(255, 159, 64, 0)',
          pointBorderColor: 'rgba(255, 159, 64, 0)',
        },
      ],
    }),
    [formatMessage, impactIds, categoryColor, impactData]
  );

  const chartOptions: ChartOptions<'radar'> = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(227, 222, 214, 0.5)',
          display: !isPlaceholder,
        },
        pointLabels: {
          display: false,
        },
        grid: {
          circular: true,
          color:
            isPlaceholder || compactMode ? 'rgba(227, 222, 214, 0.5)' : 'rgba(227, 222, 214, 1)',
          borderDash: isPlaceholder ? [2, 2] : [],
        },
        beginAtZero: true,
        ticks: {
          count: 3,
          color: isPlaceholder ? 'rgba(88, 88, 88, 0.5)' : 'rgba(88, 88, 88, 1)',
          font: { family: 'Work Sans', size: 12 },
          backdropColor: 'transparent',
          display: !compactMode,
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
        enabled: !compactMode,
      },
    },
  };

  if (compactMode) {
    return (
      <div
        className={classNames({
          'w-full overflow-visible': !isPlaceholder,
        })}
        {...hoverProps}
      >
        {isPlaceholder ? (
          <div className="w-full border border-dashed rounded-full aspect-square border-background-dark bg-radial-beige" />
        ) : (
          <div>
            <Tooltip
              placement="top"
              visible={isHovered}
              content={
                <div className="w-0 h-0 overflow-visible text-xs text-center text-gray-600 bg-red-700">
                  <div className="px-1 -translate-y-3 -translate-x-[50%] bg-white border rounded-md w-min border-beige">
                    {impactData[ImpactsEnum.Biodiversity].name}
                  </div>
                  <div className="px-1 -translate-x-[calc(100%+42px)] translate-y-5 bg-white border rounded-md w-min border-beige">
                    {impactData[ImpactsEnum.Water].name}
                  </div>
                  <div className="px-1 bg-white border rounded-md translate-x-[42px] w-min border-beige">
                    {impactData[ImpactsEnum.Climate].name}
                  </div>
                  <div className="px-1 translate-x-[-50%] translate-y-8 bg-white border rounded-md w-min border-beige">
                    {impactData[ImpactsEnum.Community].name}
                  </div>
                </div>
              }
            >
              <div>
                <Radar data={chartData} options={chartOptions} />
              </div>
            </Tooltip>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between w-full">
        <div className="z-0 flex flex-col w-full h-full gap-2">
          {allImpacts && (
            <span className="flex items-center justify-center w-full">
              <span className="hidden mr-2 text-sm font-semibold text-gray-800 sm:flex">
                {impactData[ImpactsEnum.Biodiversity].name}
              </span>
              <FieldInfo content={impactData[ImpactsEnum.Biodiversity].description} />
            </span>
          )}
          <span className="flex w-full">
            {allImpacts && (
              <span className="flex items-center justify-end mr-2">
                <span className="hidden mr-2 text-sm font-semibold text-gray-800 sm:flex">
                  {impactData[ImpactsEnum.Water].name}
                </span>
                <FieldInfo content={impactData[ImpactsEnum.Water].description} />
              </span>
            )}
            <span className="relative flex items-center w-full overflow-x-hidden aspect-square">
              <span className="absolute rounded-full opacity-50 top-2 right-2 bottom-2 left-2 bg-background-middle" />
              <span className="absolute scale-50 rounded-full top-2 right-2 bottom-2 left-2 bg-background-middle opacity-60" />
              <Radar className="z-10" data={chartData} options={chartOptions} />
            </span>
            {allImpacts && (
              <span className="flex items-center justify-start ml-2">
                <span className="hidden mr-2 text-sm font-semibold text-gray-800 sm:flex">
                  {impactData[ImpactsEnum.Climate].name}
                </span>
                <FieldInfo content={impactData[ImpactsEnum.Climate].description} />
              </span>
            )}
          </span>
          {allImpacts && (
            <span className="flex items-center justify-center w-full">
              <span className="hidden mr-2 text-sm font-semibold text-gray-800 sm:flex">
                {impactData[ImpactsEnum.Community].name}
              </span>
              <FieldInfo content={impactData[ImpactsEnum.Community].description} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpactChart;
