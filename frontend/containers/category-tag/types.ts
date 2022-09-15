import { CategoryTagDotProps } from './category-tag-dot';

export type CategoryTagProps = React.PropsWithChildren<
  CategoryTagDotProps & {
    /** Classes to apply to the Tag */
    className?: string;
    /** Size of the tag. Defaults to `small` */
    size?: 'small' | 'smallest';
  }
>;
