import { Project as ProjectType } from 'types/project';

export type HeaderProps = {
  /** Classnames to apply to the container */
  className?: string;
  /** Project data */
  project: ProjectType;
};
