import { CategoryTagDotProps } from './category-tag-dot';

export type CategoryTagProps = React.PropsWithChildren<
  CategoryTagDotProps & {
    /** Classes to apply to the Tag */
    className: string;
  }
>;
