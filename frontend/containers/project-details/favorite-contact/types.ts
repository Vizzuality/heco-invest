import { Project as ProjectType } from 'types/project';

export type FavoriteContactProps = {
  /** Classes to apply to the container */
  className?: string;
  /** Project object */
  project: ProjectType;
  /** Callback called when the favorite button is clicked */
  onFavoriteClick?: () => void;
};
