import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Pagination, { PaginationProps } from '.';

export default {
  component: Pagination,
  title: 'Components/Pagination',
  argTypes: {},
} as Meta;

const Template: Story<PaginationProps> = ({ ...props }: PaginationProps) => {
  const handlePageClick = (page) => action('Page clicked')(page);

  return <Pagination {...props} onPageClick={handlePageClick} />;
};

export const Default: Story<PaginationProps> = Template.bind({});

Default.args = {
  numItems: 10,
  currentPage: 2,
  totalPages: 10,
  totalItems: 98,
  numNumberButtons: undefined,
};

export const FirstPage: Story<PaginationProps> = Template.bind({});

FirstPage.args = {
  numItems: 10,
  currentPage: 1,
  totalPages: 10,
  totalItems: 98,
  numNumberButtons: undefined,
};

export const LastPage: Story<PaginationProps> = Template.bind({});

LastPage.args = {
  numItems: 10,
  currentPage: 10,
  totalPages: 10,
  totalItems: 98,
  numNumberButtons: undefined,
};

export const CustomNumButtons: Story<PaginationProps> = Template.bind({});

CustomNumButtons.args = {
  numItems: 10,
  currentPage: 5,
  totalPages: 10,
  totalItems: 98,
  numNumberButtons: 4,
};
