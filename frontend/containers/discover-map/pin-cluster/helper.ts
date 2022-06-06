import { entries, groupBy } from 'lodash-es';
import Supercluster from 'supercluster';

import tw from 'tailwind.config';
import { ProjectsMap } from 'types/project';

/** Function to extract all the map points data inside a cluster */
export const getClusterData = (
  superclusterInstance: Supercluster<ProjectsMap, Supercluster.AnyProps>,
  cluster_id: number
) => {
  // Get all points (features) inside a cluster
  const data = superclusterInstance.getLeaves(cluster_id, Infinity);
  // Points grouped by category
  const groupedData = groupBy(data, 'properties.category');

  // Key and value of the colors of each category on tailwind.config
  const categoryColors = entries(tw.theme.colors.category);
  // Array of colors of each category
  const colors: string[] = [];
  // Array of the number of points in each actegory
  const dataValues: number[] = [];

  entries(groupedData).forEach(([category, points]) => {
    // Get the color if the name of the color is a part of the category name
    colors.push(categoryColors.find(([key]) => category.includes(key))[1]);
    // The count of points of a category is the length of the grouped points
    dataValues.push(points.length);
  });

  return { colors, dataValues };
};
