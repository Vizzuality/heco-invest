import { StyleSpecification } from 'maplibre-gl';

// eslint-disable-next-line import/prefer-default-export
export const DEFAULT_VIEWPORT = {
  zoom: 2,
  latitude: 0,
  longitude: 0,
};

export const MAP_STYLE: StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  },
  layers: [
    {
      id: 'basemap',
      type: 'raster',
      source: 'osm',
      minzoom: 0,
      maxzoom: 22,
    },
    // Next layer is needed by the layer-manager to know it can draw layers on top of it
    {
      id: 'custom-layers',
      type: 'background',
      paint: {
        'background-opacity': 0,
      },
    },
  ],
};
