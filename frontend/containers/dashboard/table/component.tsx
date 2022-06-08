import React, { useState } from 'react';

import { FormattedMessage } from 'react-intl';

import { useDebouncedCallback } from 'use-debounce';

import Search from 'components/search';
import Table from 'components/table';
import DOROTHY_CAMPBELL_PNG from 'public/images/mock/dorothy-campbell.png';

import Actions from './cells/actions';
import Invitation from './cells/invitation';
import User from './cells/user';

const MOCK_DATA = [
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
];

export const DashboardTable = () => {
  const [search, setSearch] = useState('');

  const onSearch = useDebouncedCallback((v) => {
    setSearch(v);
  }, 250);

  return (
    <div className="">
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
          <FormattedMessage
            defaultMessage="Total of {total} users"
            values={{
              total: <b>{MOCK_DATA.length}</b>,
            }}
            id="rwcive"
          />
        </div>
      </div>

      <Table
        loading={false}
        columns={[
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
            accessor: 'isAccepted',
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
        data={MOCK_DATA}
      />
    </div>
  );
};

export default DashboardTable;
