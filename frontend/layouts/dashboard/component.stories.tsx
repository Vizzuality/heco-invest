import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import DashboardLayout from './component';

import { DashboardLayoutProps } from '.';

export default {
  component: DashboardLayout,
  title: 'layouts/Dashboard',
} as Meta;

const Template: Story<DashboardLayoutProps> = (args: DashboardLayoutProps) => (
  <DashboardLayout {...args}>
    <span className="text-gray-50">Hello world!</span>
  </DashboardLayout>
);

export const Default: Story<DashboardLayoutProps> = Template.bind({});
Default.args = {};
