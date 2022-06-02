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
        spacing: 2,
      },
    ],
  };

  const options = {
    cutout: 14,
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="bg-white rounded-full flex justify-center items-center w-12 h-12">
      <Doughnut data={data} options={options} />
      <span className="font-semibold text-sm absolute">{point_count}</span>
    </div>
  );
};

export default MapPinCluster;
