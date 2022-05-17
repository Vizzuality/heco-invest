import { useState } from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import DiscoverSearch, { DiscoverSearchProps } from '.';

export default {
  component: DiscoverSearch,
  title: 'Containers/DiscoverSearch',
  argTypes: {},
} as Meta;

const Template: Story<DiscoverSearchProps> = ({ ...props }: DiscoverSearchProps) => {
  const handleSearch = (searchText) => {
    console.log(searchText);
  };

  return (
    <div className="flex items-center justify-center h-48 bg-background-dark">
      <DiscoverSearch onSearch={handleSearch} />
    </div>
  );
};

export const Default: Story<DiscoverSearchProps> = Template.bind({});

Default.args = {};
