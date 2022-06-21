import { usePagination } from 'hooks/usePagination';

import { useSortChange } from 'helpers/dashboard';
import { useQueryParams } from 'helpers/pages';

import Table from 'components/table';

import { useAccountUsersList } from 'services/account';

import Actions from './cells/actions';
import Invitation from './cells/invitation';
import User from './cells/user';

export const UsersTable = () => {
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
      user: 'user',
      email: 'email',
      role: 'role',
      invitation: 'invitation',
    },
  });

  const tableProps = {
    columns: [
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

  return <Table {...tableProps} />;
};

export default UsersTable;
