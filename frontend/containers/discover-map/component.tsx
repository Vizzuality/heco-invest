import { FC, useState } from 'react';

import { Marker } from 'react-map-gl';
import MapPin from './pin';
import Image from 'next/image';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager } from '@vizzuality/layer-manager-react';

import mockupData from 'mockups/projects-map.json';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ProjectLegend from 'components/map/project-legend';

import { useProjectsMap } from 'services/projects/projectService';

import { DiscoverMapProps } from './types';
import { CategoryTagDot } from 'containers/category-tag';
import { CategoryType } from 'types/category';
import Icon from 'components/icon';

import MarkerIcon from 'svgs/map/marker.svg';

export const DiscoverMap: FC<DiscoverMapProps> = () => {
  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

  const { projectsMap } = useProjectsMap({});
  console.log(projectsMap, mockupData.data);

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
            {mockupData.data.map((projectMap) => (
              <MapPin key={projectMap.id} projectMap={projectMap} />
            ))}
            <LayerManager map={map} plugin={PluginMapboxGl}></LayerManager>
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
