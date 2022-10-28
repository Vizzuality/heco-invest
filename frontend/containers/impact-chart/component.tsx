import React, { FC, useEffect, useMemo, useRef, useState } from 'react';

import { PolarArea } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import classNames from 'classnames';

import {
  Chart as ChartJS,
  RadialLinearScale,
  LineElement,
  Filler,
  ChartData,
  ChartOptions,
  ArcElement,
} from 'chart.js';

import { createBgGradient, createBorderGradient } from 'helpers/impact-chart';

import FieldInfo from 'components/forms/field-info';
import Tooltip from 'components/tooltip';
import { Impacts as ImpactsEnum } from 'enums';

import { useEnums } from 'services/enums/enumService';

import { ImpactChartProps } from './types';

ChartJS.register(RadialLinearScale, LineElement, Filler, ArcElement);

export const ImpactChart: FC<ImpactChartProps> = ({
  className,
  category,
  impact,
  compactMode = false,
}) => {
  const { formatMessage } = useIntl();
  const chartDivRef = useRef();
  const chartRef = useRef<ChartJS<'polarArea', number[], unknown>>(null);
  const [chartData, setChartData] = useState<ChartData<'polarArea'>>({ datasets: [], labels: [] });

  const {
    data: { impact: allImpacts, category: allCategories },
  } = useEnums();
  // The object may contain Impacts ids, but we need to make sure we have all the values (biodiversity, climate, community, water) in order to display the chart. We also need the impacts data coming from the enums in order to display labels and descriptions
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

  const data = useMemo(() => {
    return impactIds.reduce(
      (acc, impactId) => [...acc, impactData[impactId]?.value?.toFixed(1) ?? 0],
      []
    );
  }, [impactData, impactIds]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    setChartData({
      labels: [
        formatMessage({ defaultMessage: 'Biodiversity', id: 'mbTJWV' }),
        formatMessage({ defaultMessage: 'Climate', id: 'MuOp0t' }),
        formatMessage({ defaultMessage: 'Community', id: '4CrCbD' }),
        formatMessage({ defaultMessage: 'Water', id: 't7YvMF' }),
      ],
      datasets: [
        {
          data,
          offset: compactMode ? 2 : 10,
          borderWidth: compactMode ? 1 : 4,
          borderColor: () => createBorderGradient(chart, categoryColor),
          backgroundColor: () => createBgGradient(chart, categoryColor),
        },
      ],
    });
    // The 'data' const isn't in the dependency array to avoid maximum update depth exceeded error
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryColor, compactMode, formatMessage]);

  const chartOptions: ChartOptions<'polarArea'> = {
    hover: { mode: null },
    scales: {
      r: {
        pointLabels: {
          display: false,
        },
        grid: {
          circular: true,
          color: 'rgba(227, 222, 214, 1)',
          borderDash: [2, 2],
          drawTicks: true,
        },
        beginAtZero: true,
        ticks: {
          count: compactMode ? 3 : undefined,
          color: 'rgba(153, 153, 153, 1)',
          font: { family: 'Work Sans', size: 12, weight: '400' },
          backdropColor: 'transparent',
          display: !compactMode,
          precision: 5,
          stepSize: 2.5,
        },
        max: 10,
        min: -1,
      },
    },
  };

  if (compactMode) {
    return (
      <div
        className={classNames({
          'w-full overflow-visible': !isPlaceholder,
        })}
      >
        {isPlaceholder ? (
          <div className="w-full border border-dashed rounded-full aspect-square border-beige bg-radial-beige" />
        ) : (
          <div>
            <Tooltip
              placement="top"
              arrow
              arrowClassName="border border-transparent border-b-beige border-r-beige"
              content={
                <div className="font-semibold text-center text-gray-400 text-2xs px-2 py-1.5 bg-white border rounded border-beige">
                  {impactData[ImpactsEnum.Biodiversity].name}
                </div>
              }
              reference={chartDivRef}
            >
              <Tooltip
                placement="left"
                arrow
                arrowClassName="border border-transparent border-b-beige border-r-beige"
                content={
                  <div className="font-semibold text-center text-gray-400 text-2xs px-2 py-1.5 bg-white border rounded border-beige">
                    {impactData[ImpactsEnum.Water].name}
                  </div>
                }
                reference={chartDivRef}
              >
                <Tooltip
                  placement="right"
                  arrow
                  arrowClassName="border border-transparent border-b-beige border-r-beige"
                  content={
                    <div className="font-semibold text-center text-gray-400 text-2xs px-2 py-1.5 bg-white border rounded border-beige">
                      {impactData[ImpactsEnum.Climate].name}
                    </div>
                  }
                  reference={chartDivRef}
                >
                  <Tooltip
                    placement="bottom"
                    arrow
                    arrowClassName="border border-transparent border-b-beige border-r-beige"
                    content={
                      <div className="font-semibold text-center text-gray-400 text-2xs px-2 py-1.5 bg-white border rounded border-beige">
                        {impactData[ImpactsEnum.Community].name}
                      </div>
                    }
                    reference={chartDivRef}
                  >
                    <div ref={chartDivRef}>
                      <PolarArea ref={chartRef} data={chartData} options={chartOptions} />
                    </div>
                  </Tooltip>
                </Tooltip>
              </Tooltip>
            </Tooltip>
          </div>
        )}
      </div>
    );
  }

  const Label = ({ impactType }: { impactType: ImpactsEnum }) => {
    if (!impactData || !allImpacts?.length) {
      return null;
    }
    return (
      <div>
        <div className="flex items-center w-full">
          <span className="hidden mr-2 text-sm font-semibold text-gray-800 sm:flex">
            {impactData[impactType].name}
          </span>
          <FieldInfo content={impactData[impactType].description} />
        </div>
        <span className="text-lg leading-tight text-gray-600">
          {impactData[impactType].value.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="z-0 flex flex-col items-center w-full h-full">
        <div className="z-50 flex justify-between w-full translate-y-6">
          <Label impactType={ImpactsEnum.Water} />
          <Label impactType={ImpactsEnum.Biodiversity} />
        </div>
        <div className="w-full px-12">
          <div className="flex aspect-square max-w-[445px]">
            <PolarArea ref={chartRef} className="z-10" data={chartData} options={chartOptions} />
          </div>
        </div>
        <div className="z-50 flex justify-between w-full -translate-y-5">
          <Label impactType={ImpactsEnum.Community} />
          <Label impactType={ImpactsEnum.Climate} />
        </div>
      </div>
    </div>
  );
};

export default ImpactChart;
