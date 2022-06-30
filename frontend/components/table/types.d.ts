import type { PaginationProps } from 'components/pagination';

export interface TableProps {
  /** Table data */
  data: Record<string, any>[];
  /** Table column set up */
  columns: Record<string, any>[];
  /** Table initial state */
  initialState?: Record<string, any>;
  /** Whether the table should display a loading spinner. */
  loading?: boolean;
  /** PaginationProps Object. */
  pagination?: PaginationProps;
  /** Whether sorting support is enabled. Defaults to `false` */
  sortingEnabled?: boolean;
  /** Disable automatic table sorting. Defaults to `false` */
  manualSorting?: boolean;
  /** Callback for when sorting changes */
  onSortChange?: ({ sortBy, sortOrder }: { sortBy?: string; sortOrder?: 'asc' | 'desc' }) => void;
}
