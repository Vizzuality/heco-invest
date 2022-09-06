import { FC } from 'react';

import { FormattedMessage, useIntl } from 'react-intl';

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

export const UsersTable: FC<UsersTableProps> = ({ isOwner, accountName }) => {
  const intl = useIntl();

  const queryOptions = { keepPreviousData: true, refetchOnMount: true };
  const queryParams = useQueryParams();

  const {
    users,
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
  } = useAccountUsersList({ ...queryParams }, queryOptions);

  const isSearching = !!queryParams.search;
  const hasUsers = !!users?.length;

  const tableProps = {
    columns: [
      {
        Header: intl.formatMessage({ defaultMessage: 'User', id: 'EwRIOm' }),
        accessor: 'user',
        className: 'capitalize text-sm break-all',
        width: 120,
        Cell: User,
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Email', id: 'sy+pv5' }),
        accessor: 'email',
        className: 'text-sm leading-8',
        width: 200,
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Role', id: '1ZgrhW' }),
        accessor: 'owner',
        className: 'text-sm leading-8',
        width: 50,
        Cell: Role,
      },
      {
        Header: intl.formatMessage({ defaultMessage: 'Invitation', id: 'GM/hd6' }),
        accessor: 'invitation',
        className: 'text-sm leading-8',
        width: 50,
        Cell: Invitation,
      },
    ],
    data: users || [],
    loading: isLoadingUsers || isFetchingUsers,
    sortingEnabled: true,
    isOwner,
    accountName,
  };

  const tablePropsWithPermissions = isOwner
    ? {
        ...tableProps,
        columns: [
          ...tableProps.columns,
          {
            Header: intl.formatMessage({ defaultMessage: 'Actions', id: 'wL7VAE' }),
            accessor: 'actions',
            canSort: false,
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
              numUsers: users?.length || 0,
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
