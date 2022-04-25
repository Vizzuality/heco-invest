import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import FormPageLayout from './component';

import { FormPageLayoutProps } from '.';

export default {
  component: FormPageLayout,
  title: 'layouts/FormPage',
} as Meta;

const Template: Story<FormPageLayoutProps> = (args: FormPageLayoutProps) => (
  <FormPageLayout {...args}>
    <span className="text-gray-50">Hello world!</span>
  </FormPageLayout>
);

export const Default: Story<FormPageLayoutProps> = Template.bind({});
Default.args = {};
