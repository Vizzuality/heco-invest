import React from 'react';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import Menu, { MenuProps, MenuItem } from '.';

export default {
  component: Menu,
  title: 'Components/Menu',
} as Meta;

const Template: Story<MenuProps> = (props: MenuProps) => (
  <div className="px-4 pt-4 pb-52">
    <Menu {...props}>
      <MenuItem key="copy">Copy</MenuItem>
      <MenuItem key="cut">Cut</MenuItem>
      <MenuItem key="paste">Paste</MenuItem>
    </Menu>
  </div>
);

export const Default: Story<MenuProps> = Template.bind({});
Default.args = {
  Trigger: (
    <Button type="button" size="small">
      Actions
    </Button>
  ),
  expandedKeys: ['cut'],
  onAction: action('onAction'),
  align: 'start',
  direction: 'bottom',
};
