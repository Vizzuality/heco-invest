import React from 'react';

import { action } from '@storybook/addon-actions';
import { Story, Meta } from '@storybook/react/types-6-0';

import Button from 'components/button';

import Menu, { MenuProps, MenuItem, MenuSection } from '.';

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

const TemplateWithHiddenSections: Story<MenuProps> = (props: MenuProps) => (
  <div className="px-4 pt-4 pb-52">
    <Menu {...props}>
      <MenuItem key="copy">Copy</MenuItem>
      <MenuItem key="cut">Cut</MenuItem>
      <MenuSection key="paste-section">
        <MenuItem key="paste">Paste</MenuItem>
      </MenuSection>
    </Menu>
  </div>
);

export const WithHiddenSections: Story<MenuProps> = TemplateWithHiddenSections.bind({});
WithHiddenSections.args = {
  Trigger: (
    <Button type="button" size="small">
      Actions (paste action will be hidden on md screen)
    </Button>
  ),
  onAction: action('onAction'),
  align: 'start',
  direction: 'bottom',
  hiddenSections: { 'paste-section': 'md' },
};

const TemplateWithHeader: Story<MenuProps> = (props: MenuProps) => (
  <div className="px-4 pt-4 pb-52">
    <Menu {...props}>
      <MenuItem key="copy">Copy</MenuItem>
      <MenuItem key="cut">Cut</MenuItem>
      <MenuSection key="paste-section">
        <MenuItem key="paste">Paste</MenuItem>
      </MenuSection>
    </Menu>
  </div>
);

export const WithHeader: Story<MenuProps> = TemplateWithHeader.bind({});
WithHeader.args = {
  Trigger: (
    <Button type="button" size="small">
      Actions
    </Button>
  ),
  onAction: action('onAction'),
  align: 'start',
  direction: 'bottom',
  header: <div>Header of the Menu</div>,
};
