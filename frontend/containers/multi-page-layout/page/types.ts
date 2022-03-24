import { PropsWithChildren } from 'react';

export type MultiPageLayoutPageProps = PropsWithChildren<{
  /** Classnames to apply to container */
  className?: string;
  /** Type of page. Defaults to `page` */
  pageType?: 'page' | 'complete-page';
  /** Whether the page has errors. Defaults to `false` */
  hasErrors?: boolean;
}>;
