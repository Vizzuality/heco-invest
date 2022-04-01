import { Story, Meta } from '@storybook/react/types-6-0';

import AccountTypeSelector, { AccountTypeSelectorProps } from '.';

export default {
  component: AccountTypeSelector,
  title: 'Containers/AccountTypeSelector',
  argTypes: {},
} as Meta;

const Template: Story<AccountTypeSelectorProps> = ({ ...props }: AccountTypeSelectorProps) => (
  <AccountTypeSelector {...props} />
);

export const Default: Story<AccountTypeSelectorProps> = Template.bind({});
Default.args = {};
