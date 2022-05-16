import { Project as ProjectType } from 'types/project';

export type ProjectCardProps = {
  /** Classnames to apply to the wrapper */
  className?: string;
  /** Projects list */
  project: ProjectType;
  /** onClick callback */
  onClick?: (projectId: string) => void;
};
