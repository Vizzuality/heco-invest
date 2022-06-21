import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { useDebouncedCallback } from 'use-debounce';

import { usePagination } from 'hooks/usePagination';

import { useSortChange } from 'helpers/dashboard';
import { useQueryParams } from 'helpers/pages';

import Search from 'components/search';
import Table from 'components/table';

import { useAccountUsersList } from 'services/account';

import Actions from './cells/actions';
import Invitation from './cells/invitation';
import User from './cells/user';

export const UsersTable = () => {
  const [search, setSearch] = useState('');

  const onSearch = useDebouncedCallback((v) => {
    setSearch(v);
  }, 250);

  const queryOptions = { keepPreviousData: true };
  const queryParams = useQueryParams();

  const {
    data: { data: users, meta } = { data: [], meta: undefined },
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useAccountUsersList({ ...queryParams }, queryOptions);

  const { props: paginationProps } = usePagination(meta);

  const sortChangeHandler = useSortChange({
    substitutions: {
      user: 'first_name',
      email: 'email',
      role: 'role',
      invitation: 'invitation',
    },
  });

  const tableProps = {
    columns: [
      {
        Header: 'User',
        accessor: 'user',
        className: 'capitalize text-sm break-all',
        defaultCanSort: true,
        sortDescFirst: true,
        Cell: User,
      },
      {
        Header: 'Email',
        accessor: 'email',
        className: 'text-sm',
        defaultCanSort: true,
        sortDescFirst: true,
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
    ],
    data: users,
    loading: isLoadingUsers || isFetchingUsers,
    pagination: paginationProps,
    onSortChange: sortChangeHandler,
  };

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
      <Table {...tableProps} />
    </div>
  );
};

export default UsersTable;
