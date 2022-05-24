import { Project as ProjectType } from 'types/project';

export type ProjectDetailsProps = {
  /** Classes to apply to the container */
  className?: string;
  /** Project to display the details of */
  project: ProjectType;
  /** Callback for when the user closes the project details */
  onClose?: () => void;
};
