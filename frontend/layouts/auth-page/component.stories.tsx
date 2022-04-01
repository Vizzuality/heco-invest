import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import AuthPageLayout from './component';

import { AuthPageLayoutProps } from '.';

export default {
  component: AuthPageLayout,
  title: 'layouts/AuthPage',
} as Meta;

const Template: Story<AuthPageLayoutProps> = (args: AuthPageLayoutProps) => (
  <AuthPageLayout {...args}>
    <span className="text-gray-50">Hello world!</span>
  </AuthPageLayout>
);

export const Default: Story<AuthPageLayoutProps> = Template.bind({});
Default.args = {};
