import { FC, useState } from 'react';

import { Marker, Source } from 'react-map-gl';
import type { LayerProps } from 'react-map-gl';

import Image from 'next/image';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

import { CategoryTagDot } from 'containers/category-tag';

import Icon from 'components/icon';
import Map from 'components/map';
import Controls from 'components/map/controls';
import LAYERS from 'components/map/layers';
import ProjectLegend from 'components/map/project-legend';
import mockupData from 'mockups/projects-map.json';
import { CategoryType } from 'types/category';

import { useProjectsMap } from 'services/projects/projectService';

import MarkerIcon from 'svgs/map/marker.svg';

import MapPin from './pin';
import { DiscoverMapProps } from './types';

export const clusterLayer: LayerProps = {
  id: 'clusters',
  type: 'circle',
  source: 'earthquakes',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 100, '#f1f075', 750, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer: LayerProps = {
  id: 'cluster-count',
  type: 'symbol',
  source: 'earthquakes',
  paint: {},
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12,
  },
};

export const unclusteredPointLayer: LayerProps = {
  id: 'unclustered-point',
  type: 'circle',
  source: 'earthquakes',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#11b4da',
    'circle-radius': 4,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff',
  },
};

const layers = [clusterLayer, clusterCountLayer, unclusteredPointLayer];

const layer = {
  id: 'test',
  type: 'geojson',
  params: {
    color: '#CCC',
  },
  source: {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: mockupData.data.map((r) => ({
        type: 'Feature',
        properties: r,
        geometry: {
          type: 'Polygon',
          coordinates: [r.longitude, r.latitude],
        },
      })),
    },
    cluster: true,
    clusterMaxZoom: 4,
    clusterRadius: 50,
  },
  render: {
    metadata: {
      position: 'top',
    },
    layers,
  },
};

export const DiscoverMap: FC<DiscoverMapProps> = () => {
  const cartoProvider = new CartoProvider();
  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

  // const { projectsMap } = useProjectsMap({});
  // console.log(projectsMap, mockupData.data);

  return (
    <div className="relative w-full h-full">
      <Map
        className="lg:overflow-hidden rounded-xl"
        bounds={bounds}
        viewport={viewport}
        onMapViewportChange={(v) => setViewport(v)}
      >
        {(map) => (
          <>
            {/* <Source
              id="earthquakes"
              type="geojson"
              data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
              cluster={true}
              clusterMaxZoom={14}
              clusterRadius={50}
            >
              <Layer {...clusterLayer} />
              <Layer {...clusterCountLayer} />
              <Layer {...unclusteredPointLayer} />
            </Source> */}
            <LayerManager
              map={map}
              plugin={PluginMapboxGl}
              // providers={{
              //   [cartoProvider.name]: cartoProvider.handleData,
              // }}
            >
              {[layer].map((l) => (
                <Layer key={l.id} {...l} />
              ))}
            </LayerManager>
          </>
        )}
      </Map>
      <Controls className="absolute bottom-10 xl:bottom-6 right-11">
        <ProjectLegend />
      </Controls>
    </div>
  );
};

export default DiscoverMap;
