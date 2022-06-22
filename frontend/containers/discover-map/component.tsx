import { FC, useCallback, useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import MapboxGLPlugin from '@vizzuality/layer-manager-plugin-mapboxgl';
import CartoProvider from '@vizzuality/layer-manager-provider-carto';
import { LayerManager, Layer } from '@vizzuality/layer-manager-react';

import { useLayers } from 'hooks/useLayers';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ClusterLayer from 'components/map/layers/cluster';
import ProjectLegend from 'components/map/project-legend';
import { ProjectMapParams } from 'types/project';

import { useProjectsMap } from 'services/projects/projectService';

import LocationSearcher from './location-searcher';
import MapLayersSelector from './map-layers-selector';
import MapPin from './pin';
import MapPinCluster from './pin-cluster';
import { DiscoverMapProps } from './types';

const cartoProvider = new CartoProvider();

export const DiscoverMap: FC<DiscoverMapProps> = () => {
  const { bbox } = useSelector((state) => state['/projects']);

  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState(null);
  const [visibleLayers, setVisibleLayers] = useState<string[]>([]);
  const { layers } = useLayers();
  const { query } = useRouter();
  const { projectsMap } = useProjectsMap(query as ProjectMapParams);

  const handleViewportChange = useCallback((vw) => {
    setViewport(vw);
  }, []);

  useEffect(() => {
    setBounds({
      bbox: bbox,
      options: { padding: 0 },
      viewportOptions: { transitionDuration: 1000 },
    });
  }, [bbox]);

  return (
    <>
      <div className="relative w-full h-full">
        <Map bounds={bounds} viewport={viewport} onMapViewportChange={handleViewportChange}>
          {(map) => (
            <>
              <LayerManager
                map={map}
                plugin={MapboxGLPlugin}
                providers={{
                  [cartoProvider.name]: cartoProvider.handleData,
                }}
              >
                {layers.map(({ specification: layerSpec }) => {
                  if (!layerSpec || !visibleLayers.includes(layerSpec.id)) return null;
                  return <Layer key={layerSpec.id} {...layerSpec} opacity={0.7} />;
                })}
              </LayerManager>

              <ClusterLayer
                data={projectsMap}
                map={map}
                MarkerComponent={<MapPin />}
                ClusterComponent={<MapPinCluster />}
              />
            </>
          )}
        </Map>

        <div className="absolute flex gap-2 top-3.5 left-3.5 text-gray-800 text-sm">
          <MapLayersSelector onActiveLayersChange={setVisibleLayers} />
          <LocationSearcher />
        </div>

        <Controls className="absolute border bottom-10 xl:bottom-6 right-11">
          <ProjectLegend />
        </Controls>
      </div>
    </>
  );
};

export default DiscoverMap;
