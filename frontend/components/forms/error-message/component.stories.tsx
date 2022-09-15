import { Story, Meta } from '@storybook/react/types-6-0';

import ErrorMessage, { ErrorMessageProps } from '.';

export default {
  component: ErrorMessage,
  title: 'Components/Forms/ErrorMessage',
  argTypes: {},
} as Meta;

const Template: Story<ErrorMessageProps> = ({ ...rest }: ErrorMessageProps) => (
  <ErrorMessage {...rest} />
);

export const Default: Story<ErrorMessageProps> = Template.bind({});
Default.args = {
  errorText: 'Error message',
  id: 'error',
};
