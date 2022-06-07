import React from 'react';

import Table from 'components/table';
import DOROTHY_CAMPBELL_PNG from 'public/images/mock/dorothy-campbell.png';

import Invitation from './cells/invitation';
import User from './cells/user';

export const DashboardTable = () => {
  return (
    <Table
      loading={false}
      columns={[
        {
          Header: 'User',
          accessor: (row) => row,
          className: 'capitalize text-sm',
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
          accessor: 'isAccepted',
          className: 'text-sm',
          defaultCanSort: true,
          sortDescFirst: true,
          width: 100,
          Cell: Invitation,
        },
      ]}
      meta={{
        page: 1,
        size: 4,
        totalItems: 8,
        totalPages: 8,
      }}
      initialState={[
        {
          pageIndex: 0,
          sortBy: [{ id: 'displayName', desc: false }],
        },
      ]}
      data={[
        {
          displayName: 'Dorothy Campbell',
          image: DOROTHY_CAMPBELL_PNG,
          email: 'dorothy.campbell@nesst.com',
          id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
          role: 'Owner',
          isAccepted: 'Accepted',
        },
        {
          displayName: 'Savannah Nguyen',
          image: DOROTHY_CAMPBELL_PNG,
          email: 'savannah.nguyen@nesst.com',
          id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
          role: 'User',
          isAccepted: 'Waiting',
        },
        {
          displayName: 'Robert Fox',
          image: DOROTHY_CAMPBELL_PNG,
          email: 'robert.fox@nesst.com',
          id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
          role: 'User',
          isAccepted: 'Accepted',
        },
        {
          displayName: 'Cameron Williamson',
          image: DOROTHY_CAMPBELL_PNG,
          email: 'cameron.williamson@nesst.com',
          id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
          role: 'User',
          isAccepted: 'Accepted',
        },
        {
          displayName: 'Dorothy Campbell',
          image: DOROTHY_CAMPBELL_PNG,
          email: 'dorothy.campbell@nesst.com',
          id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
          role: 'Owner',
          isAccepted: 'Accepted',
        },
      ]}
    />
  );
};

export default DashboardTable;
