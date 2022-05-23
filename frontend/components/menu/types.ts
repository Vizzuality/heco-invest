import React from 'react';

import { MenuTriggerProps } from '@react-types/menu';

import { PopupProps } from './popup';
import { SectionProps } from './section';

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
  /** Header displayed at the top of the menu */
  header?: PopupProps['header'];
  /** For each section (if any), breakpoint starting from which it is hidden */
  hiddenSections?: PopupProps['hiddenSections'];
  /** Callback executed when the menu opens */
  onOpen?: () => void;
  /** Callback executed when the menu closes */
  onClose?: () => void;
};
