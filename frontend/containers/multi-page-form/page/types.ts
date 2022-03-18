import { PropsWithChildren } from 'react';

export type MultiPageFormPageProps = PropsWithChildren<{
  /** Classnames to apply to container */
  className?: string;
  /** Type of page. Defaults to `form-page` */
  pageType?: 'form-page' | 'form-complete-page';
}>;
