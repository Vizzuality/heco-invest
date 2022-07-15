import { ReactNode } from 'react';

export type TagsGridRowType = {
  /** Id for the tags list row */
  id: string;
  /** Label for the tags list row */
  title: string | ReactNode;
  /** Type of tags to display. Defaults to `default` */
  type?: 'default' | 'category';
  /** Array of strings for `default` tags, or array of { id, title } for `category` tags */
  tags: string[] | { id: string; name: string }[];
};

export type TagsGridProps = {
  /** Classnames to apply to the element's wrapper */
  className?: string;
  /** Array of rows for the grid */
  rows: TagsGridRowType[];
};
