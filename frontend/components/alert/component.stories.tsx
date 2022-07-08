import { Story, Meta } from '@storybook/react/types-6-0';

import Alert, { AlertProps } from '.';

export default {
  component: Alert,
  title: 'Components/Alert',
  argTypes: {},
} as Meta;

const Template: Story<AlertProps> = ({ children, ...rest }: AlertProps) => (
  <Alert {...rest}>This an alert message</Alert>
);

export const Default: Story<AlertProps> = Template.bind({});
Default.args = {};

export const Warning: Story<AlertProps> = Template.bind({});
Warning.args = {
  type: 'warning',
};

export const Success: Story<AlertProps> = Template.bind({});
Success.args = {
  type: 'success',
};

export const withLayoutContainer: Story<AlertProps> = Template.bind({});
withLayoutContainer.args = {
  withLayoutContainer: true,
};
