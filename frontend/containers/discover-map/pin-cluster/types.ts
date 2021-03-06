import Supercluster from 'supercluster';

import { ProjectsMap } from 'types/project';

export interface MapPinClusterProps {
  cluster?: boolean;
  cluster_id?: number;
  point_count?: number;
  point_count_abbreviated?: number;
  superclusterInstance?: Supercluster<ProjectsMap>;
}
