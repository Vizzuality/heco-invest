export type MultiPageLayoutFooterPagingProps = {
  /** Classnames to apply to the container */
  className?: string;
  /** Number of total pages */
  numPages: number;
  /** Current page */
  currentPage: number;
  /** Array of indexes of the pages that have errors. Defaults to `[]` */
  pagesWithErrors?: number[];
  /** Whether the form is being submitted */
  isSubmitting?: boolean;
  /** Whether to disable the paging buttons. Defaults to `false` */
  disabled?: boolean;
  /** onClick handler for when a page button is clicked */
  onPageClick?: (pageIndex: number) => void;
};
