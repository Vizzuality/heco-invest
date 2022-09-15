import React, { useState } from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import Filters, { FiltersProps } from '.';

export default {
  component: Filters,
  title: 'Containers/Forms/Filters',
} as Meta;

const Template: Story<FiltersProps> = () => {
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState({});
  return (
    <>
      <Button onClick={() => setOpenFilters(true)}>Open filters</Button>
      {openFilters && (
        <Filters
          filtersInputValue={filters}
          closeFilters={() => setOpenFilters(false)}
          onSubmitFilters={(filters) => {
            setOpenFilters(false);
          }}
          setFiltersInputValue={(filters) => setFilters(filters)}
        />
      )}
    </>
  );
};

export const Default: Story<FiltersProps> = Template.bind({});
Default.args = {};
