import { Story, Meta } from '@storybook/react/types-6-0';

import CategoryTag, { CategoryTagProps } from '.';

export default {
  component: CategoryTag,
  title: 'Containers/CategoryTag',
  argTypes: {},
} as Meta;

const Template: Story<CategoryTagProps> = ({ children, ...rest }: CategoryTagProps) => (
  <CategoryTag {...rest}>{children}</CategoryTag>
);

export const Default: Story<CategoryTagProps> = Template.bind({});
Default.args = {
  category: 'tourism',
  children: 'Tourism & Recreation',
};
