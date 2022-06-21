import type { PaginationProps } from './components/pagination';

export interface TableProps {
  data: Record<string, any>[];
  columns: Record<string, any>[];
  initialState?: Record<string, any>;
  loading?: boolean;
  pagination?: PaginationProps;
  sortingEnabled?: boolean;
  onSortChange?: ({ sortBy, sortOrder }: { sortBy?: string; sortOrder?: 'asc' | 'desc' }) => void;
}
