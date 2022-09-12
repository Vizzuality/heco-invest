import { FC, useMemo } from 'react';

import { Marker } from 'react-map-gl';

import Supercluster from 'supercluster';

import type { ClusterLayerProps } from './types';

export const ClusterLayer: FC<ClusterLayerProps> = ({
  data,
  map,
  MarkerComponent,
  ClusterComponent,
  onSelectProjectPin,
}: ClusterLayerProps) => {
  const bbox = map.getBounds().toArray().flat();
  const zoom = map.getZoom();

  const SUPERCLUSTER = useMemo(() => new Supercluster().load(data?.features), [data?.features]);

  const clusters = useMemo(() => {
    if (!SUPERCLUSTER) return [];

    return SUPERCLUSTER.getClusters(bbox, zoom);
  }, [SUPERCLUSTER, bbox, zoom]);

  return (
    <>
      {clusters.map((f) => {
        const { id, geometry, properties } = f;
        const { coordinates } = geometry;
        const { cluster } = properties;
        const [longitude, latitude] = coordinates;

        if (cluster) {
          return (
            <Marker
              key={id}
              latitude={latitude}
              longitude={longitude}
              offsetLeft={-20}
              offsetTop={-20}
            >
              <ClusterComponent {...properties} superclusterInstance={SUPERCLUSTER} />
            </Marker>
          );
        }

        return (
          <Marker
            key={id}
            latitude={latitude}
            longitude={longitude}
            offsetLeft={-10}
            offsetTop={-23}
            onClick={() => onSelectProjectPin(`${id}`)}
          >
            <MarkerComponent {...properties} />
          </Marker>
        );
      })}
    </>
  );
};

export default ClusterLayer;
