import { CategoryType } from 'types/category';

export type CategoryTagDotProps = {
  /** Identifier of the investment type so that the corresponding colored dot is displayed */
  category: CategoryType;
  /** Size of the dot. Defaults to `small` */
  size?: 'small' | 'smallest' | 'large';
};
