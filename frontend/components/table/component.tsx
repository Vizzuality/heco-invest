import React, { FC, useEffect } from 'react';

import { useFlexLayout, usePagination, useSortBy, useTable } from 'react-table';

import cx from 'classnames';

import { noop } from 'lodash-es';

import Icon from 'components/icon';
import Loading from 'components/loading';
import Pagination from 'components/pagination';

import SORT_SVG from 'svgs/ui/sort.svg';

import type { TableProps } from './types';

export const Table: FC<TableProps> = ({
  data,
  columns,
  initialState,
  loading,
  sortingEnabled = false,
  manualSorting = false,
  pagination: paginationProps,
  onSortChange = noop,
  isOwner,
  accountName,
}: TableProps) => {
  const {
    getTableProps,
    // headers
    headerGroups,
    // rows
    rows,
    prepareRow,
    // state
    state,
  } = useTable(
    {
      columns,
      data,
      // pagination
      manualPagination: true,
      // sorting
      disableSortBy: !sortingEnabled,
      manualSortBy: manualSorting,
      disableMultiSort: true,
      isOwner,
      accountName,
      initialState: {
        ...initialState,
      },
    },
    useFlexLayout,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    const { sortBy } = state;

    const [sortSelected] = sortBy;

    if (sortSelected) {
      onSortChange({ sortBy: sortSelected.id, sortOrder: sortSelected.desc ? 'desc' : 'asc' });
    }
  }, [state, onSortChange]);

  const { sortBy } = state;
  const [sortSelected] = sortBy;

  return (
    <div>
      <div className="relative overflow-x-auto rounded-2xl">
        <table {...getTableProps()} className="relative w-full bg-white rounded-2xl">
          <thead>
            {headerGroups.map((headerGroup) => {
              const {
                key: headerGroupKey,
                style,
                ...restHeaderGroupProps
              } = headerGroup.getHeaderGroupProps();

              return (
                <tr key={headerGroupKey} {...restHeaderGroupProps}>
                  {headerGroup.headers.map((column, index) => {
                    const { id, sortDescFirst, toggleSortBy, hideHeader } = column;
                    const { key: headerKey, style, ...restHeaderProps } = column.getHeaderProps();

                    // canSort is always true when manualSortBy is true
                    // See: https://github.com/TanStack/table/issues/2599
                    const canSort = sortingEnabled && columns[index]?.canSort !== false;

                    return (
                      <th
                        key={headerKey}
                        {...restHeaderProps}
                        className={cx({
                          'text-sm font-semibold py-4 px-6': true,
                          'cursor-pointer': canSort,
                          'w-0': column.id === 'actions',
                        })}
                        onClick={() => {
                          if (!canSort) return;

                          if (id === sortSelected?.id) {
                            toggleSortBy(!sortSelected.desc, false);
                          }

                          if (id !== sortSelected?.id) {
                            toggleSortBy(sortDescFirst, false);
                          }
                        }}
                      >
                        {!hideHeader && (
                          <span
                            className={cx({
                              'flex items-center gap-2': true,
                            })}
                          >
                            {column.render('Header')}
                            {canSort && (
                              <div className="flex flex-col">
                                <Icon icon={SORT_SVG} className="w-2 h-2 text-black" />
                                <Icon icon={SORT_SVG} className="w-2 h-2 text-black rotate-180" />
                              </div>
                            )}
                          </span>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody className="relative tbody" style={{ minHeight: 50 }}>
            {rows.map((row) => {
              prepareRow(row);

              const { key: rowKey, style, ...restRowProps } = row.getRowProps();

              return (
                <tr key={rowKey} {...restRowProps} className="border-t border-gray-100">
                  {row.cells.map((cell) => {
                    const { key: cellKey, style, ...restCellProps } = cell.getCellProps();

                    return (
                      <td key={cellKey} {...restCellProps} className="px-6 py-5">
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          {paginationProps && (
            <tfoot>
              <tr>
                <td
                  colSpan={columns.length}
                  className="bg-white border-t border-gray-100 rounded-b-2xl"
                >
                  <Pagination theme="compact" className="w-full my-1" {...paginationProps} />
                </td>
              </tr>
            </tfoot>
          )}
        </table>
        {loading && (
          <div className="absolute flex items-center justify-center bg-background-dark top-px bottom-px left-px bg-opacity-20 right-px rounded-2xl backdrop-blur-sm">
            <Loading visible={true} iconClassName="w-10 h-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Table;
