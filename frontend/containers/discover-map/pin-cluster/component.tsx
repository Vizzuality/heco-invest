import { FC, useMemo } from 'react';

import { Doughnut } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, ChartData } from 'chart.js';

import { getClusterData } from './helper';
import { MapPinClusterProps } from './types';

ChartJS.register(ArcElement);

export const MapPinCluster: FC<MapPinClusterProps> = (props) => {
  const { point_count, superclusterInstance, cluster_id } = props;

  const { colors, dataValues } = useMemo(
    () => getClusterData(superclusterInstance, cluster_id),
    [cluster_id, superclusterInstance]
  );

  const data: ChartData<'doughnut'> = {
    labels: colors,
    datasets: [
      {
        borderColor: 'rgb(255, 255, 255)',
        data: dataValues,
        backgroundColor: colors,
        borderWidth: 2,
        spacing: 1,
      },
    ],
  };

  const options = {
    cutout: 13,
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
      <Doughnut data={data} options={options} />
      <span className="absolute text-sm font-semibold">{point_count}</span>
    </div>
  );
};

export default MapPinCluster;
