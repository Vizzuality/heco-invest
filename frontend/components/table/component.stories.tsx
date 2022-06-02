import { Story } from '@storybook/react/types-6-0';

import Table from './component';
import { TableProps } from './types';

export default {
  title: 'Components/Table',
  component: Table,
  argTypes: {},
};

const Template: Story<TableProps> = ({ ...args }: TableProps) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  loading: false,
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
      accessor: 'isAccepted',
      className: 'text-sm',
      defaultCanSort: true,
      sortDescFirst: true,
      width: 100,
    },
  ],
  meta: {
    page: 1,
    size: 25,
    totalItems: 83,
    totalPages: 4,
  },
  initialState: [
    {
      pageIndex: 0,
      sortBy: [{ id: 'displayName', desc: false }],
    },
  ],
  data: [
    {
      displayName: 'Dorothy Campbell',
      email: 'dorothy.campbell@nesst.com',
      id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
      role: 'Owner',
      isAccepted: 'Accepted',
    },
    {
      displayName: 'Savannah Nguyen',
      email: 'savannah.nguyen@nesst.com',
      id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
      role: 'User',
      isAccepted: 'Waiting',
    },
    {
      displayName: 'Robert Fox',
      email: 'robert.fox@nesst.com',
      id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
      role: 'User',
      isAccepted: 'Accepted',
    },
    {
      displayName: 'Cameron Williamson',
      email: 'cameron.williamson@nesst.com',
      id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
      role: 'User',
      isAccepted: 'Accepted',
    },
  ],
};
