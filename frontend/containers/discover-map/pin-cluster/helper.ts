import { values } from 'lodash-es';
import Supercluster from 'supercluster';

import { PROJECT_CATEGORY_COLORS } from 'helpers/project';

import { ProjectsMap } from 'services/types';

export const getClusterData = (
  superclusterInstance: Supercluster<ProjectsMap, Supercluster.AnyProps>,
  cluster_id: number
) => {
  const clustered = superclusterInstance.getChildren(cluster_id);

  const clusterData: { [key: string]: { color: string; count: number } } = {};

  const createData = (data) => {
    data.forEach((feat) => {
      if (feat.properties.cluster) {
        const clusterChild = superclusterInstance.getChildren(feat.properties.cluster_id);
        createData(clusterChild);
      } else {
        const { category } = feat.properties;
        if (!category) return;
        if (!clusterData[category]) {
          clusterData[category] = { color: PROJECT_CATEGORY_COLORS[category], count: 1 };
        } else {
          clusterData[category].count++;
        }
      }
    });
  };

  createData(clustered);

  const colors = values(clusterData).map(({ color }) => color);
  const dataValues = values(clusterData).reduce((prev, curr, index) => {
    return index > 0 ? [...prev, prev[index - 1] + curr.count] : [curr.count];
  }, []);
  return { colors, dataValues };
};
