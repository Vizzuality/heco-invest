import { FC, useCallback, useState } from 'react';

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
import ProjectLegend from 'components/map/project-legend';
import mockupData from 'mockups/projects-map.json';
import { CategoryType } from 'types/category';

import { useProjectsMap } from 'services/projects/projectService';

import LAYERS from './layers';
import MapPin from './pin';
import { DiscoverMapProps } from './types';

export const DiscoverMap: FC<DiscoverMapProps> = () => {
  const cartoProvider = new CartoProvider();
  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

  // const { projectsMap } = useProjectsMap({});
  // console.log(projectsMap, mockupData.data);
  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Map bounds={bounds} viewport={viewport} onMapViewportChange={handleViewportChange}>
        {(map) => (
          <LayerManager
            map={map}
            plugin={PluginMapboxGl}
            providers={{
              [cartoProvider.name]: cartoProvider.handleData,
            }}
          >
            {LAYERS.map((l) => (
              <Layer key={l.id} {...l} />
            ))}
          </LayerManager>
        )}
      </Map>

      <Controls className="absolute bottom-10 xl:bottom-6 right-11">
        <ProjectLegend />
      </Controls>
    </div>
  );
};

export default DiscoverMap;
