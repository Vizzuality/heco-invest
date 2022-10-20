import { Project as ProjectType } from 'types/project';

export type ProjectCardProps = {
  /** Classnames to apply to the wrapper */
  className?: string;
  /** Whether the current card is active. Defaults to `false` */
  active?: boolean;
  /** Projects list */
  project: ProjectType;
  /** Whether the card should have a “funding” option. Default to `false`. */
  canFund?: boolean;
  /** onClick callback */
  onClick?: (projectId: string) => void;
};
