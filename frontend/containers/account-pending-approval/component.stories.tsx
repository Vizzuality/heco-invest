import { Story, Meta } from '@storybook/react/types-6-0';

import AccountPendingApproval from '.';

export default {
  component: AccountPendingApproval,
  title: 'Containers/AccountPendingApproval',
  argTypes: {},
} as Meta;

const Template: Story = () => <AccountPendingApproval />;

export const Default: Story = Template.bind({});
Default.args = {};
