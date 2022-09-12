import { useState } from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import SortingButtons, { SortingButtonsProps, SortingOrderType } from '.';

export default {
  component: SortingButtons,
  title: 'Components/SortingButtons',
  argTypes: {},
} as Meta;

const Template: Story<SortingButtonsProps> = ({ ...props }: SortingButtonsProps) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleOnChange = ({
    sortBy,
    sortOrder,
  }: {
    sortBy: string;
    sortOrder: SortingOrderType;
  }) => {
    if (sortOrder) setSortOrder(sortOrder);
    if (sortBy) setSortBy(sortBy);
  };

  return (
    <div className="flex items-center justify-center h-48 p-12 bg-background-dark">
      <SortingButtons sortBy={sortBy} sortOrder={sortOrder} onChange={handleOnChange} {...props} />
    </div>
  );
};

export const Default: Story<SortingButtonsProps> = Template.bind({});

Default.args = {
  options: [
    { key: 'name', label: 'Name' },
    { key: 'created_at', label: 'Created at' },
  ],
};

export const Pill: Story<SortingButtonsProps> = Template.bind({});

Pill.args = {
  theme: 'pill',
  options: [
    { key: 'name', label: 'Name' },
    { key: 'created_at', label: 'Created at' },
  ],
};
