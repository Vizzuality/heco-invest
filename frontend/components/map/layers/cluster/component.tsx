import { cloneElement, FC, useMemo } from 'react';

import { Marker } from 'react-map-gl';

import Supercluster from 'supercluster';

import type { ClusterLayerProps } from './types';

export const ClusterLayer: FC<ClusterLayerProps> = ({
  data,
  map,
  MarkerComponent,
  ClusterComponent,
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
            <Marker key={id} latitude={latitude} longitude={longitude}>
              {cloneElement(ClusterComponent, {
                ...properties,
                superclusterInstance: SUPERCLUSTER,
              })}
            </Marker>
          );
        }

        return (
          <Marker key={id} latitude={latitude} longitude={longitude}>
            {cloneElement(MarkerComponent, properties)}
          </Marker>
        );
      })}
    </>
  );
};

export default ClusterLayer;
