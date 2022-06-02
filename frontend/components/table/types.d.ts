export interface TableProps {
  data: Record<string, any>[];
  meta: Record<string, any>;
  columns: Record<string, any>[];
  initialState?: Record<string, any>;
  loading?: boolean;
  onSortChange?: (column: string, direction: string) => void;
  onPageChange?: (page: number) => void;
}
