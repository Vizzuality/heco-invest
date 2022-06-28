import { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { useDebouncedCallback } from 'use-debounce';

import { useQueryParams } from 'helpers/pages';

import NoSearchResults from 'containers/dashboard/no-search-results';
import SearchAndInfo from 'containers/dashboard/search-and-info';

import Table from 'components/table';

import { useAccountUsersList } from 'services/account';

import Actions from './cells/actions';
import Invitation from './cells/invitation';
import User from './cells/user';

export const UsersTable = () => {
  const queryOptions = { keepPreviousData: true, refetchOnMount: true };
  const queryParams = useQueryParams();

  const [search, setSearch] = useState<string>(queryParams.search);

  const onSearch = useDebouncedCallback((v) => {
    setSearch(v);
  }, 250);

  const {
    data: { data: users } = { data: [] },
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useAccountUsersList({ ...queryParams, search }, queryOptions);

  const isSearching = !!queryParams.search;
  const hasUsers = !!users.length;

  const tableProps = {
    columns: [
      {
        Header: 'User',
        accessor: 'user',
        className: 'capitalize text-sm break-all',
        Cell: User,
      },
      {
        Header: 'Email',
        accessor: 'email',
        className: 'text-sm',
      },
      {
        Header: 'Role',
        accessor: 'role',
        className: 'text-sm',
        width: 100,
      },
      {
        Header: 'Invitation',
        accessor: 'confirmed',
        className: 'text-sm',
        width: 80,
        Cell: Invitation,
      },
      {
        Header: 'Actions',
        className: 'capitalize text-sm',
        canSort: false,
        width: 60,
        hideHeader: true,
        Cell: Actions,
      },
    ],
    data: users,
    loading: isLoadingUsers || isFetchingUsers,
    sortingEnabled: true,
    manualSorting: false,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SearchAndInfo className="w-full mt-4 mb-6">
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
