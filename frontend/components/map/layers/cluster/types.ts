import { PointFeature } from 'supercluster';

import { ProjectsMap } from 'services/types';

export type ClusterLayerProps = {
  data: {
    type: string;
    features: PointFeature<ProjectsMap>[];
  };
  map: any; // TODO: change tpe
  MarkerComponent: JSX.Element;
  ClusterComponent: JSX.Element;
};
