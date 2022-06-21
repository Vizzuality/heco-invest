import { useState } from 'react';

import { useIntl } from 'react-intl';

import { usePagination } from 'hooks/usePagination';

import { useSortChange } from 'helpers/dashboard';

import Table from 'components/table';

import Actions from './cells/actions';
import Invitation from './cells/invitation';
import User from './cells/user';

export const UsersTable = () => {
  const meta = {
    currentPage: 1,
    numItems: 4,
    totalItems: 8,
    totalPages: 8,
  };
  // const { props: paginationProps } = usePagination(meta);

  // const sortChangeHandler = useSortChange({});

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
    data: [
      {
        first_name: 'Dorothy',
        last_name: 'Campbell',
        picture: null,
        email: 'dorothy.campbell@nesst.com',
        id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
        role: 'Owner',
        confirmed: true,
      },
      {
        first_name: 'Savannah',
        last_name: 'Nguyen',
        picture: null,
        email: 'savannah.nguyen@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Robert',
        last_name: 'Fox',
        picture: null,
        email: 'robert.fox@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: true,
      },
      {
        first_name: 'Cameron',
        last_name: 'Williamson',
        picture: null,
        email: 'cameron.williamson@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Dorothy',
        last_name: 'Campbell',
        picture: null,
        email: 'dorothy.campbell@nesst.com',
        id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
        role: 'Owner',
        confirmed: true,
      },
      {
        first_name: 'Savannah',
        last_name: 'Nguyen',
        picture: null,
        email: 'savannah.nguyen@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Robert',
        last_name: 'Fox',
        picture: null,
        email: 'robert.fox@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: true,
      },
      {
        first_name: 'Dorothy',
        last_name: 'Campbell',
        picture: null,
        email: 'dorothy.campbell@nesst.com',
        id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
        role: 'Owner',
        confirmed: true,
      },
      {
        first_name: 'Savannah',
        last_name: 'Nguyen',
        picture: null,
        email: 'savannah.nguyen@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Robert',
        last_name: 'Fox',
        picture: null,
        email: 'robert.fox@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: true,
      },
    ],
    // loading: isLoadingUsers || isFetchingUsers,
    // pagination: paginationProps,
    // onSortChange: sortChangeHandler,
  };

  return <Table {...tableProps} />;
};

export default UsersTable;
