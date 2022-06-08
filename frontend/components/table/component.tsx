import React, { FC, useEffect } from 'react';

import { useFlexLayout, usePagination, useSortBy, useTable } from 'react-table';

import cx from 'classnames';

import Icon from 'components/icon';
import Loading from 'components/loading';

import SORT_SVG from 'svgs/ui/sort.svg';

import Pagination from './pagination';
import type { TableProps } from './types';

export const Table: FC<TableProps> = ({
  data,
  meta,
  columns,
  initialState,
  loading,
  onSortChange,
  onPageChange,
}: TableProps) => {
  const DEFAULT_COLUMN = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 200,
    }),
    []
  );

  const {
    getTableProps,
    // headers
    headerGroups,
    // rows
    rows,
    prepareRow,
    // pagination
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // state
    state,
  } = useTable(
    {
      columns,
      defaultColumn: DEFAULT_COLUMN,
      data,
      // pagination
      manualPagination: true,
      pageCount: meta?.totalPages || 0,
      // sorting
      manualSortBy: true,
      disableMultiSort: true,

      initialState: {
        ...initialState,
        pageIndex: meta?.page ? meta.page - 1 : 0,
        pageSize: meta?.size || 8,
      },
    },
    useFlexLayout,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    const { pageIndex, sortBy } = state;

    const [sortSelected] = sortBy;

    if (onPageChange) {
      onPageChange(pageIndex + 1);
    }

    if (onSortChange && sortSelected) {
      const { id, desc } = sortSelected;
      onSortChange(id, desc ? 'desc' : 'asc');
    }
  }, [state, onPageChange, onSortChange]);

  const { sortBy } = state;
  const [sortSelected] = sortBy;

  return (
    <div>
      <div className="relative overflow-x-scroll md:overflow-hidden rounded-2xl">
        <div {...getTableProps()} className="relative w-full bg-white rounded-t-3xl">
          <div>
            {headerGroups.map((headerGroup) => {
              const { key: headerGroupKey, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();

              return (
                <div
                  key={headerGroupKey}
                  {...restHeaderGroupProps}
                  className="sticky top-0 z-10 px-10"
                >
                  {headerGroup.headers.map((column) => {
                    const { id, canSort, sortDescFirst, toggleSortBy } = column;

                    const { key: headerKey, ...restHeaderProps } = column.getHeaderProps();

                    return (
                      <div
                        role="presentation"
                        key={headerKey}
                        {...restHeaderProps}
                        className={cx({
                          'flex items-center py-5 pr-5 space-x-2 text-sm font-medium capitalize font-heading':
                            true,
                          'cursor-pointer': canSort,
                        })}
                        {...(canSort && {
                          onClick: () => {
                            if (id === sortSelected?.id) {
                              toggleSortBy(!sortSelected.desc, false);
                            }

                            if (id !== sortSelected?.id) {
                              toggleSortBy(sortDescFirst, false);
                            }
                          },
                        })}
                      >
                        {column.hideHeader ? null : (
                          <>
                            <span>{column.render('Header')}</span>
                            <div className="flex flex-col">
                              <Icon icon={SORT_SVG} className="w-2 h-2 text-black" />
                              <Icon icon={SORT_SVG} className="w-2 h-2 text-black rotate-180" />
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <div className="relative tbody" style={{ minHeight: 50 }}>
            {rows.map((row) => {
              prepareRow(row);

              const { key: rowKey, ...restRowProps } = row.getRowProps();

              return (
                <div key={rowKey} {...restRowProps} className="px-10 border-t border-gray-100">
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...restCellProps } = cell.getCellProps();

                    return (
                      <div
                        key={cellKey}
                        {...restCellProps}
                        className={cx({
                          'py-5 pr-5': true,
                          [cell?.column?.className]: !!cell?.column?.className,
                        })}
                      >
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <Pagination
          pageIndex={state.pageIndex}
          canPreviousPage={canPreviousPage}
          canNextPage={canNextPage}
          pageCount={pageCount}
          gotoPage={gotoPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
        {loading && (
          <div className="absolute bottom-0 left-0 flex items-center justify-center w-full h-full">
            <Loading className="mr-2.5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
