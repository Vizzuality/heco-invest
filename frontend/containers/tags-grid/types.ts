import type { CategoryType } from 'types/category';

export type TagsGridRowType = {
  /** Label for the tags list */
  title: string;
  /** Type of tags to display. Defaults to `default` */
  type?: 'default' | 'category';
  /** Array of strings for `default` tags, or array of { id, title } for `category` tags */
  tags: string[] | { id: CategoryType; title: string }[];
};

export type TagsGridProps = {
  /** Classnames to apply to the element's wrapper */
  className?: string;
  /** Array of rows for the grid */
  rows: TagsGridRowType[];
};
