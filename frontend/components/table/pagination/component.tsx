import React, { FC, useCallback } from 'react';

import ReactPaginate from 'react-paginate';

import Icon from 'components/icon';

import ARROW_SVG from 'svgs/ui/arrow-right-2.svg';

import { TablePaginationProps } from './types';

export const TablePagination: FC<TablePaginationProps> = ({
  pageIndex,
  pageCount,
  canPreviousPage,
  canNextPage,
  gotoPage,
  nextPage,
  previousPage,
}: TablePaginationProps) => {
  const handlePageClick = useCallback(
    ({ selected }) => {
      gotoPage(selected);
    },
    [gotoPage]
  );

  if (pageCount === 0) return null;

  return (
    <div className="sticky bottom-0 py-5 bg-white border rounded-b-3xl border-t-1">
      <div className="absolute top-0 left-0 z-0 w-full h-full transform rotate-180 pointer-events-none" />

      <div className="flex items-center justify-center">
        <ReactPaginate
          containerClassName="flex items-center justify-between space-x-2"
          previousClassName="hidden"
          nextClassName="hidden"
          pageClassName="text-sm px-1.5 py-0.5 rounded-md"
          activeClassName="bg-gray-100"
          breakLabel="..."
          pageCount={pageCount}
          forcePage={pageIndex}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          onPageChange={handlePageClick}
        />

        <button type="button" className="ml-5" disabled={!canNextPage} onClick={nextPage}>
          <Icon icon={ARROW_SVG} className="w-3 h-3 text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
