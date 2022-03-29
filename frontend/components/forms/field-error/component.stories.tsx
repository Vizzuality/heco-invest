import { Story, Meta } from '@storybook/react/types-6-0';

import FieldError, { FieldErrorProps } from '.';

export default {
  component: FieldError,
  title: 'Components/Forms/FieldError',
  argTypes: {},
} as Meta;

const Template: Story<FieldErrorProps> = ({ children, ...rest }: FieldErrorProps) => (
  <FieldError {...rest}>This is a field error</FieldError>
);

export const Default: Story<FieldErrorProps> = Template.bind({});
Default.args = {};
