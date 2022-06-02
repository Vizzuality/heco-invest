export interface TablePaginationProps {
  pageIndex: number;
  pageCount: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}
