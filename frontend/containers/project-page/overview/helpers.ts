import { find } from 'lodash-es';

import { ValidGeometryType } from 'containers/forms/geometry/types';

import tw from 'tailwind.config.js';

export const getLayer = (feature: ValidGeometryType, category: string) => {
  const colors = tw.theme.colors.category;
  const color = find(colors, (value, key) => category?.includes(key));

  return {
    id: 'multipolygon',
    type: 'geojson',
    source: {
      type: 'geojson',
      data: feature,
    },
    render: {
      layers: [
        {
          type: 'fill',
          paint: {
            'fill-color': color,
            'fill-opacity': 0.5,
          },
        },
        {
          type: 'line',
          paint: {
            'line-color': color,
            'line-opacity': 1,
            'line-width': 1,
          },
        },
      ],
    },
  };
};
