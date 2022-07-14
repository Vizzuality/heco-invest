import { Story, Meta } from '@storybook/react/types-6-0';

import PendingApproval from '.';

export default {
  component: PendingApproval,
  title: 'Containers/PendingApproval',
  argTypes: {},
} as Meta;

const Template: Story = () => <PendingApproval />;

export const Default: Story = Template.bind({});
Default.args = {};
