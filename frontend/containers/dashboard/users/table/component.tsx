import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { useDebouncedCallback } from 'use-debounce';

import { usePagination } from 'hooks/usePagination';

import { useSortChange } from 'helpers/dashboard';
import { useQueryParams } from 'helpers/pages';

import NoSearchResults from 'containers/dashboard/no-search-results';
import SearchAndInfo from 'containers/dashboard/search-and-info';

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

  console.log({ users });

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
        <div className="w-full">
          <SearchAndInfo className="mt-4 mb-6">
            <FormattedMessage
              defaultMessage="Total <span>{numUsers}</span> {numUsers, plural, one {user} other {users}}"
              id="YQsqLq"
              values={{
                span: (chunks: string) => <span className="px-1 font-semibold">{chunks}</span>,
                numUsers: users.length,
              }}
            />
          </SearchAndInfo>
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
