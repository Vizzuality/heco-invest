import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { useDebouncedCallback } from 'use-debounce';

import { usePagination } from 'hooks/usePagination';

import { useSortChange } from 'helpers/dashboard';
import { useQueryParams } from 'helpers/pages';

import NoSearchResults from 'containers/dashboard/no-search-results';

import Search from 'components/search';
import Table from 'components/table';

import { useAccountUsersList } from 'services/account';

import Actions from './cells/actions';
import Invitation from './cells/invitation';
import User from './cells/user';

export const UsersTable = () => {
  const queryOptions = { keepPreviousData: true };
  const queryParams = useQueryParams();

  const [search, setSearch] = useState<string>(queryParams.search);

  const onSearch = useDebouncedCallback((v) => {
    setSearch(v);
  }, 250);

  const {
    data: { data: users, meta } = { data: [], meta: undefined },
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useAccountUsersList({ ...queryParams, search }, queryOptions);

  const isSearching = !!queryParams.search;
  const hasUsers = !!users.length;

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
        width: 35,
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
        <div className="font-sans text-base text-gray-800 break-all">
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
      {hasUsers && <Table {...tableProps} />}
      {!hasUsers && (
        <div className="flex flex-col items-center mt-10 lg:mt-20">
          {isSearching && <NoSearchResults />}
        </div>
      )}
    </div>
  );
};

export default UsersTable;
