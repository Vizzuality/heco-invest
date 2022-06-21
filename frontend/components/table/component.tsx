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
  pagination: paginationProps,
  onSortChange = noop,
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
    // state
    state,
  } = useTable(
    {
      columns,
      defaultColumn: DEFAULT_COLUMN,
      data,
      // pagination
      manualPagination: true,
      // sorting
      manualSortBy: true,
      disableMultiSort: true,
      disableSortBy: !sortingEnabled,

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
      <div className="relative overflow-x-scroll md:overflow-hidden rounded-2xl">
        <table {...getTableProps()} className="relative w-full bg-white rounded-t-2xl">
          <thead>
            {headerGroups.map((headerGroup) => {
              const { key: headerGroupKey, ...restHeaderGroupProps } =
                headerGroup.getHeaderGroupProps();

              return (
                <tr key={headerGroupKey} {...restHeaderGroupProps} className="sticky top-0 px-10">
                  {headerGroup.headers.map((column) => {
                    const { id, sortDescFirst, toggleSortBy } = column;
                    const { key: headerKey, ...restHeaderProps } = column.getHeaderProps();

                    // canSort is always true when manualSortBy is true
                    // See: https://github.com/TanStack/table/issues/2599
                    const canSort =
                      (sortingEnabled &&
                        columns.find(({ accessor }) => accessor === id)?.canSort) ??
                      true;

                    return (
                      <th
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
                            {canSort && (
                              <div className="flex flex-col">
                                <Icon icon={SORT_SVG} className="w-2 h-2 text-black" />
                                <Icon icon={SORT_SVG} className="w-2 h-2 text-black rotate-180" />
                              </div>
                            )}
                          </>
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

              const { key: rowKey, ...restRowProps } = row.getRowProps();

              return (
                <tr key={rowKey} {...restRowProps} className="px-10 border-t border-gray-100">
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...restCellProps } = cell.getCellProps();

                    return (
                      <td
                        key={cellKey}
                        {...restCellProps}
                        className={cx({
                          'py-5 pr-5': true,
                          [cell?.column?.className]: !!cell?.column?.className,
                        })}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
          {paginationProps && (
            <tfoot className="relative w-full bg-white border-t border-gray-100 rounded-b-2xl">
              <Pagination theme="compact" className="w-full my-1" {...paginationProps} />
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
