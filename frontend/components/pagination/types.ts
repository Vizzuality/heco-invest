export type PaginationProps = {
  /** Classnames to be applied */
  className?: string;
  /**
   * Whether data is currently being loaded. Will cause pagination to freeze its current state.
   * Defaults to `false`.
   * */
  isLoading?: boolean;
  /** Whether to reverse the display of buttons/entries */
  reverseDisplay?: boolean;
  /** Number of items being displayed */
  numItems: number;
  /** Current page number */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Total number of items/records */
  totalItems: number;
  /** Number of Number buttons to display. defaults to 8 */
  numNumberButtons?: number;
  /** Theme to be used for the pagination. Defaults to default` */
  theme?: 'default' | 'compact';
  /** Callback for when the user chooses a page */
  onPageClick?: (page: number) => void;
};
