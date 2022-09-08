import React from 'react';

import { Story, Meta } from '@storybook/react/types-6-0';

import FieldInfo, { FieldInfoProps } from '.';

export default {
  component: FieldInfo,
  title: 'Components/Forms/FieldInfo',
  argTypes: {
    register: { control: { disable: true } },
  },
} as Meta;

const Template: Story<FieldInfoProps> = (args: FieldInfoProps) => {
  return <FieldInfo content={args.content} />;
};

export const Default: Story<FieldInfoProps> = Template.bind({});
Default.args = {
  content: 'Info text',
};
