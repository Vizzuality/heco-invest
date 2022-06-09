import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import NakedLayout from './component';

import { NakedLayoutProps } from '.';

export default {
  component: NakedLayout,
  title: 'layouts/Naked',
} as Meta;

const Template: Story<NakedLayoutProps> = (args: NakedLayoutProps) => (
  <NakedLayout {...args}>
    <span className="text-gray-50">Hello world!</span>
  </NakedLayout>
);

export const Default: Story<NakedLayoutProps> = Template.bind({});
Default.args = {};
