import { values } from 'lodash-es';
import Supercluster from 'supercluster';

import { ProjectsMap } from 'types/project';

export const PROJECT_CATEGORY_COLORS = {
  'sustainable-agrosystems': '#E7C343',
  'tourism-and-recreation': '#4492E5',
  'forestry-and-agroforestry': '#E57D57',
  'non-timber-forest-production': '#404B9A',
  'human-capital-and-inclusion': '#A0616A',
};

/** Function to extract all the map points data inside a cluster */
export const getClusterData = (
  superclusterInstance: Supercluster<ProjectsMap, Supercluster.AnyProps>,
  cluster_id: number
) => {
  const clustered = superclusterInstance.getChildren(cluster_id);

  // {
  //   color: string (got by the category name),
  //   count: number (the number of features with this category/color)
  // }
  const clusterData: { [key: string]: { color: string; count: number } } = {};

  // Adds properties to 'clusterData' recursively
  // The clustered element can be a feature (the project location) or another cluster. If it is a cluster I get it's childrens recursively until find the features.
  const createData = (clusteredElements) => {
    clusteredElements.forEach((clustereElement) => {
      if (clustereElement.properties.cluster) {
        const clusterChild = superclusterInstance.getChildren(
          clustereElement.properties.cluster_id
        );
        createData(clusterChild);
      } else {
        const { category } = clustereElement.properties;
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
