import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import StaticPageLayout from './component';

import { StaticPageLayoutProps } from '.';

export default {
  component: StaticPageLayout,
  title: 'layouts/StaticPage',
} as Meta;

const Template: Story<StaticPageLayoutProps> = (args: StaticPageLayoutProps) => (
  <StaticPageLayout {...args}>
    <span className="text-gray-50">Hello world!</span>
  </StaticPageLayout>
);

export const Default: Story<StaticPageLayoutProps> = Template.bind({});
Default.args = {};
