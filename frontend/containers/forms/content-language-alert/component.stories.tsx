import { Story, Meta } from '@storybook/react/types-6-0';

import ContentLanguageAlert, { ContentLanguageAlertProps } from '.';

export default {
  component: ContentLanguageAlert,
  title: 'Containers/Forms/ContentLanguageAlert',
  argTypes: {},
} as Meta;

const Template: Story<ContentLanguageAlertProps> = ({ ...props }: ContentLanguageAlertProps) => (
  <ContentLanguageAlert {...props}>This an alert message</ContentLanguageAlert>
);

export const Default: Story<ContentLanguageAlertProps> = Template.bind({});
Default.args = {};
