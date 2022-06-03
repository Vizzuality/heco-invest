import { ProjectsMapGeojson } from 'types/project';

export type ClusterLayerProps = {
  data: ProjectsMapGeojson;
  map: any; // TODO: change type
  MarkerComponent: JSX.Element;
  ClusterComponent: JSX.Element;
};
