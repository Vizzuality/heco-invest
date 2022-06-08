import React, { useCallback, useMemo, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { useDebouncedCallback } from 'use-debounce';

import Search from 'components/search';
import Table from 'components/table';

import { useUsersInvitedList } from 'services/users/userService';

import Actions from './cells/actions';
import Invitation from './cells/invitation';
import User from './cells/user';

const COLUMNS = [
  {
    Header: 'User',
    className: 'capitalize text-sm break-all',
    defaultCanSort: true,
    sortDescFirst: true,
    Cell: User,
  },
  {
    Header: 'Email',
    accessor: 'email',
    className: 'text-sm break-all',
    defaultCanSort: true,
    sortDescFirst: true,
    width: 160,
  },
  {
    Header: 'Role',
    accessor: 'role',
    className: 'text-sm',
    defaultCanSort: true,
    sortDescFirst: true,
    width: 100,
  },
  {
    Header: 'Invitation',
    accessor: 'confirmed',
    className: 'text-sm',
    defaultCanSort: true,
    sortDescFirst: true,
    width: 80,
    Cell: Invitation,
  },
  {
    Header: 'Actions',
    className: 'capitalize text-sm',
    defaultCanSort: true,
    sortDescFirst: true,
    width: 60,
    hideHeader: true,
    Cell: Actions,
  },
];

export const DashboardTable = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ id: 'name', direction: 'desc' });
  const [page, setPage] = useState(1);

  const { data, isFetching } = useUsersInvitedList({
    search,
    page,
    perPage: 4,
  });
  const { data: users, meta } = data || {};

  const onSearch = useDebouncedCallback((v) => {
    setSearch(v);
  }, 250);

  const initialState = useMemo(
    () => ({
      pageIndex: page - 1,
      sortBy: [
        {
          id: sort.id,
          desc: sort.direction === 'desc',
        },
      ],
    }),
    [page, sort]
  );

  const onPageChange = useCallback((p) => {
    setPage(p);
  }, []);

  const onSortChange = useCallback((id, direction) => {
    setSort({
      id,
      direction,
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="w-2/3">
          <Search
            id="user-search"
            defaultValue={search}
            size="sm"
            theme="light"
            placeholder="Search"
            aria-label="Search"
            onChange={onSearch}
          />
        </div>
        <div className="font-sans text-sm break-all">
          {users && (
            <FormattedMessage
              defaultMessage="Total of {total} users"
              values={{
                total: <b>{users?.length || 0}</b>,
              }}
              id="rwcive"
            />
          )}
        </div>
      </div>
      {users && meta && (
        <Table
          columns={COLUMNS}
          meta={meta}
          data={users}
          loading={isFetching}
          initialState={initialState}
          onPageChange={onPageChange}
          onSortChange={onSortChange}
        />
      )}
    </div>
  );
};

export default DashboardTable;
