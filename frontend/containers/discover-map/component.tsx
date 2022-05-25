import { FC, useState } from 'react';

import PluginMapboxGl from '@vizzuality/layer-manager-plugin-mapboxgl';
import { LayerManager } from '@vizzuality/layer-manager-react';

import Map from 'components/map';
import Controls from 'components/map/controls';
import ProjectLegend from 'components/map/project-legend';

import { DiscoverMapProps } from './types';

export const DiscoverMap: FC<DiscoverMapProps> = () => {
  const [viewport, setViewport] = useState({});
  const [bounds, setBounds] = useState({
    bbox: [-81.99, -4.35, -65.69, 12.54],
    options: { padding: 0 },
  });

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
