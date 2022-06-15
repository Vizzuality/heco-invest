import { Story } from '@storybook/react/types-6-0';

import Table from './component';
import { TableProps } from './types';

const mock = {
  columns: [
    {
      Header: 'User',
      accessor: 'displayName',
      className: 'capitalize text-sm',
      defaultCanSort: true,
      sortDescFirst: true,
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
      width: 100,
    },
  ],
  data: [
    {
      displayName: 'Dorothy Campbell',
      email: 'dorothy.campbell@nesst.com',
      id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
      role: 'Owner',
      confirmed: 'Accepted',
    },
    {
      displayName: 'Savannah Nguyen',
      email: 'savannah.nguyen@nesst.com',
      id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
      role: 'User',
      confirmed: 'Waiting',
    },
    {
      displayName: 'Robert Fox',
      email: 'robert.fox@nesst.com',
      id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
      role: 'User',
      confirmed: 'Accepted',
    },
    {
      displayName: 'Cameron Williamson',
      email: 'cameron.williamson@nesst.com',
      id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
      role: 'User',
      confirmed: 'Accepted',
    },
    {
      displayName: 'Dorothy Campbell',
      email: 'dorothy.campbell@nesst.com',
      id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
      role: 'Owner',
      confirmed: 'Accepted',
    },
    {
      displayName: 'Savannah Nguyen',
      email: 'savannah.nguyen@nesst.com',
      id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
      role: 'User',
      confirmed: 'Waiting',
    },
    {
      displayName: 'Robert Fox',
      email: 'robert.fox@nesst.com',
      id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
      role: 'User',
      confirmed: 'Accepted',
    },
    {
      displayName: 'Cameron Williamson',
      email: 'cameron.williamson@nesst.com',
      id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
      role: 'User',
      confirmed: 'Accepted',
    },
  ],
};

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {},
};

const Template: Story<TableProps> = ({ ...args }: TableProps) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
  columns: mock.columns,
  data: mock.data,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  columns: mock.columns,
  data: mock.data,
};

export const Pagination = Template.bind({});
Pagination.args = {
  loading: false,
  columns: mock.columns,
  data: mock.data,
  pagination: {
    numItems: 10,
    totalItems: 80,
    currentPage: 3,
    totalPages: 8,
  },
};
