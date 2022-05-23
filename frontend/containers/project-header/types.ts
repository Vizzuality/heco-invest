import { Project as ProjectType } from 'types/project';

export type ProjectHeaderProps = {
  /** Classnames to apply to the container */
  className?: string;
  /** Project data */
  project: ProjectType;
};
