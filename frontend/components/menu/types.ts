import React from 'react';

import { MenuTriggerProps } from '@react-types/menu';

import { PopupProps } from './popup';

export type MenuProps = MenuTriggerProps & {
  /** Classes to apply to the menu */
  className?: string;
  /** Trigger button for the menu */
  Trigger: React.ReactElement;
  /** Menu's items */
  children: PopupProps['children'];
  /** List of the keys of the items that are disabled */
  disabledKeys?: React.Key[];
  /** List of the keys of the items that are expanded */
  expandedKeys?: React.Key[];
  /** Callback executed when the user clicks on a menu's item */
  onAction: PopupProps['onAction'];
  header?: JSX.Element;
};
