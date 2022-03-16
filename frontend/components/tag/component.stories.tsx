import { Story } from '@storybook/react/types-6-0';

import Tag from './component';
import { TagProps } from './types';

export default {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {},
};

const Template: Story<TagProps> = ({ children, ...args }: TagProps) => (
  <Tag {...args}>{children}</Tag>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Biodiversity',
};
