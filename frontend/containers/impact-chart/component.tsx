import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { PolarArea } from 'react-chartjs-2';
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
  ArcElement,
} from 'chart.js';

import FieldInfo from 'components/forms/field-info';
import Tooltip from 'components/tooltip';
import { Impacts as ImpactsEnum } from 'enums';

import { useEnums } from 'services/enums/enumService';

import { ImpactChartProps } from './types';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, ChartTooltip, ArcElement);

// const createBgGradient = (ctx: CanvasRenderingContext2D, categoryColor: string) => {
//   console.log(ctx, categoryColor);
//   if (ctx && categoryColor) {
//     var x = 100,
//       y = 75,
//       // Radii of the white glow.
//       innerRadius = 5,
//       outerRadius = 70,
//       // Radius of the entire circle.
//       radius = 60;

//     var gradient = ctx.createRadialGradient(212.5, 212.5, 0, 212.5, 212.5, 300.52);
//     gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
//     gradient.addColorStop(0.05, 'rgba(255, 255, 255, 1)');
//     gradient.addColorStop(0.05, 'rgba(0, 188, 212, 0.14)');
//     gradient.addColorStop(1, 'rgba(0, 182, 205, 1)');

//     // ctx.arc(x, y, radius, 0, 2 * Math.PI);

//     ctx.fillStyle = gradient;
//     ctx.fill();
//   }
// };

const hex2rgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const ImpactChart: FC<ImpactChartProps> = ({
  className,
  category,
  impact,
  compactMode = false,
}) => {
  const { formatMessage } = useIntl();
  const chartDivRef = useRef();
  const chartRef = useRef<ChartJS<'polarArea', number[], unknown>>(null);
  const [chartDataSet, setChartDataSet] = useState<ChartData<'polarArea', number[]>['datasets']>(
    []
  );

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

  // useEffect(() => {
  //   const chart = chartRef.current;

  //   console.log(chart?.ctx, categoryColor);

  //   if (chart && categoryColor) {
  //     setChartDataSet([
  //       {
  //         data,
  //         borderColor: 'white',
  //         borderJoinStyle: 'round',
  //         borderWidth: 2,
  //         pointBackgroundColor: 'rgba(255, 159, 64, 0)',
  //         pointBorderColor: 'rgba(255, 159, 64, 0)',
  //         backgroundColor: createBgGradient(chart?.ctx, categoryColor),
  //       },
  //     ]);
  //   }
  // }, []);

  const chartData: ChartData<'polarArea'> = useMemo(() => {
    const chart = chartRef.current;
    return {
      labels: [
        formatMessage({ defaultMessage: 'Biodiversity', id: 'mbTJWV' }),
        formatMessage({ defaultMessage: 'Climate', id: 'MuOp0t' }),
        formatMessage({ defaultMessage: 'Community', id: '4CrCbD' }),
        formatMessage({ defaultMessage: 'Water', id: 't7YvMF' }),
      ],
      datasets: [
        {
          data,
          borderColor: 'white',
          borderJoinStyle: 'round',
          offset: 10,
          borderWidth: 0,
          pointBackgroundColor: 'rgba(255, 159, 64, 0)',
          pointBorderColor: 'rgba(255, 159, 64, 0)',
          backgroundColor: () => {
            const ctx = chart?.ctx;
            if (ctx && categoryColor) {
              var x = ctx.canvas.offsetWidth / 2,
                y = ctx.canvas.offsetHeight / 2,
                // Radii of the white glow.
                innerRadius = 0,
                // Radius of the entire circle.
                radius = ctx.canvas.offsetHeight * 0.7;

              var gradient = ctx.createRadialGradient(x, y, innerRadius, x, y, radius);
              gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
              gradient.addColorStop(0.05, 'rgba(255, 255, 255, 1)');
              gradient.addColorStop(0.05, hex2rgba(categoryColor, 0.4));
              gradient.addColorStop(1, categoryColor);

              ctx.fillStyle = gradient;
              ctx.fill();
            }
          },
        },
      ],
    };
  }, [formatMessage, data, categoryColor]);

  const chartOptions: ChartOptions<'polarArea'> = {
    scales: {
      r: {
        angleLines: {
          color: 'white',
          display: !isPlaceholder,
          lineWidth: 4,
        },
        pointLabels: {
          display: false,
        },
        grid: {
          circular: true,
          color: 'rgba(227, 222, 214, 1)',
          borderDash: [2, 2],
        },
        beginAtZero: true,
        ticks: {
          count: compactMode ? 3 : 5,
          color: 'rgba(153, 153, 153, 1)',
          font: { family: 'Work Sans', size: 12, weight: '400' },
          backdropColor: 'transparent',
          display: !compactMode,
        },
        max: 10,
        min: 0,
        // suggestedMin: 2,
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

  return (
    <div className={className}>
      <div className="flex justify-between w-full">
        <div className="z-0 flex flex-col w-full h-full gap-2">
          {allImpacts && (
            <span className="flex items-center justify-center w-full">
              <span className="mr-2 text-sm font-semibold text-gray-800  sm:flex">
                {impactData[ImpactsEnum.Biodiversity].name}
              </span>
              <FieldInfo content={impactData[ImpactsEnum.Biodiversity].description} />
            </span>
          )}
          <span className="flex w-full">
            {allImpacts && (
              <span className="flex items-center justify-end mr-2">
                <span className="mr-2 text-sm font-semibold text-gray-800  sm:flex">
                  {impactData[ImpactsEnum.Water].name}
                </span>
                <FieldInfo content={impactData[ImpactsEnum.Water].description} />
              </span>
            )}
            <span className="relative flex items-center w-full overflow-x-hidden aspect-square">
              <PolarArea ref={chartRef} className="z-10" data={chartData} options={chartOptions} />
            </span>
            {allImpacts && (
              <span className="flex items-center justify-start ml-2">
                <span className="mr-2 text-sm font-semibold text-gray-800  sm:flex">
                  {impactData[ImpactsEnum.Climate].name}
                </span>
                <FieldInfo content={impactData[ImpactsEnum.Climate].description} />
              </span>
            )}
          </span>
          {allImpacts && (
            <span className="flex items-center justify-center w-full">
              <span className="mr-2 text-sm font-semibold text-gray-800  sm:flex">
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
