import { TileLayer } from '@deck.gl/geo-layers';
import GL from '@luma.gl/constants';
import DeckLayers from '@vizzuality/layer-manager-layers-deckgl';
import mockupData from 'mockups/projects-map.json';

export default [
  {
    id: 'test',
    type: 'geojson',
    params: {
      color: '#CCC',
    },
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: mockupData.data.map((d) => ({
          type: 'Feature',
          properties: d,
          geometry: {
            type: 'Point',
            coordinates: [[[d.longitude, d.latitude]]],
          },
        })),
      },
    },
    render: {
      layers: [
        {
          type: 'fill',
          paint: {
            'fill-color': '#CCC',
            'fill-opacity': 1,
          },
        },
        {
          type: 'line',
          paint: {
            'line-color': '#CCC',
            'line-opacity': 0.1,
          },
        },
      ],
    },
  },
];
