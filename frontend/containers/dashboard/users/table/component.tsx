import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import { useQueryParams } from 'helpers/pages';

import NoSearchResults from 'containers/dashboard/no-search-results';
import SearchAndInfo from 'containers/dashboard/search-and-info';

import Table from 'components/table';

import { useAccountUsersList } from 'services/account';

import Actions from './cells/actions';
import Invitation from './cells/invitation';
import Role from './cells/role';
import User from './cells/user';

import { UsersTableProps } from '.';

export const UsersTable: FC<UsersTableProps> = ({ isOwner }) => {
  const queryOptions = { keepPreviousData: true, refetchOnMount: true };
  const queryParams = useQueryParams();

  const {
    data: { data: users } = { data: [] },
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useAccountUsersList({ ...queryParams }, queryOptions);

  const isSearching = !!queryParams.search;
  const hasUsers = !!users.length;

  const tableProps = {
    columns: [
      {
        Header: 'User',
        accessor: 'user',
        className: 'capitalize text-sm break-all',
        width: 120,
        Cell: User,
      },
      {
        Header: 'Email',
        accessor: 'email',
        className: 'text-sm leading-8',
        width: 200,
      },
      {
        Header: 'Role',
        accessor: 'owner',
        className: 'text-sm leading-8',
        width: 50,
        Cell: Role,
      },
      {
        Header: 'Invitation',
        accessor: 'invitation',
        className: 'text-sm leading-8',
        width: 50,
        Cell: Invitation,
      },
    ],
    data: users,
    loading: isLoadingUsers || isFetchingUsers,
    sortingEnabled: true,
    manualSorting: false,
  };

  const tablePropsWithPermissions = isOwner
    ? {
        ...tableProps,
        columns: [
          ...tableProps.columns,
          {
            Header: 'Actions',
            className: 'capitalize text-sm',
            canSort: false,
            width: 50,
            hideHeader: true,
            Cell: Actions,
          },
        ],
      }
    : tableProps;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SearchAndInfo className="w-full">
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
      {hasUsers && <Table {...tablePropsWithPermissions} />}
      {!hasUsers && (
        <div className="flex flex-col items-center mt-10 lg:mt-20">
          {isSearching && <NoSearchResults />}
        </div>
      )}
    </div>
  );
};

export default UsersTable;
