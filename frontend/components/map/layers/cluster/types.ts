import React from 'react';

import { ProjectsMapGeojson } from 'types/project';

export type ClusterLayerProps = {
  data: ProjectsMapGeojson;
  map: any; // TODO: change type
  MarkerComponent: React.FC<any>;
  ClusterComponent: React.FC<any>;
  onSelectProjectPin: (projectId: string) => void;
};
