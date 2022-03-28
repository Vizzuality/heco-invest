import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import NakedPageLayout from './component';

import { NakedPageLayoutProps } from '.';

export default {
  component: NakedPageLayout,
  title: 'layouts/NakedPage',
} as Meta;

const Template: Story<NakedPageLayoutProps> = (args: NakedPageLayoutProps) => (
  <NakedPageLayout {...args}>
    <span className="text-gray-50">Hello world!</span>
  </NakedPageLayout>
);

export const Default: Story<NakedPageLayoutProps> = Template.bind({});
Default.args = {};
