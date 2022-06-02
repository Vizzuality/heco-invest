export interface TableProps {
  data: Record<string, any>[];
  columns: Record<string, any>[];
  loading?: boolean;
  onSortChange?: (column: string, direction: string) => void;
}
