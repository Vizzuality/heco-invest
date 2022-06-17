import { FC, useCallback, useState } from 'react';

import { useRouter } from 'next/router';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ClusterLayer from 'components/map/layers/cluster';
import ProjectLegend from 'components/map/project-legend';
import { ProjectMapParams } from 'types/project';

import { useProjectsMap } from 'services/projects/projectService';

import LocationSearcher from './location-searcher';
import MapPin from './pin';
import MapPinCluster from './pin-cluster';
import { DiscoverMapProps } from './types';

export const DiscoverMap: FC<DiscoverMapProps> = () => {
  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

  const { query } = useRouter();

  const { projectsMap } = useProjectsMap(query as ProjectMapParams);

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  return (
    <>
      <div className="relative w-full h-full">
        <LocationSearcher />
        <Map bounds={bounds} viewport={viewport} onMapViewportChange={handleViewportChange}>
          {(map) => (
            <>
              <LayerManager map={map} plugin={PluginMapboxGl}></LayerManager>

              <ClusterLayer
                data={projectsMap}
                map={map}
                MarkerComponent={<MapPin />}
                ClusterComponent={<MapPinCluster />}
              />
            </>
          )}
        </Map>

        <Controls className="absolute bottom-10 xl:bottom-6 right-11">
          <ProjectLegend />
        </Controls>
      </div>
    </>
  );
};

export default DiscoverMap;
