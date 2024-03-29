import React, { HTMLAttributes } from 'react';

import { MenuTriggerProps } from '@react-types/menu';
import { Alignment, FocusStrategy, CollectionChildren } from '@react-types/shared';

import { ItemProps } from '../item';
import { SectionProps } from '../section';

export interface PopupProps {
  /** Reference to the popup's trigger element */
  triggerRef: React.MutableRefObject<HTMLElement>;
  /** Reference to the popup's overlay element */
  overlayRef: React.MutableRefObject<HTMLDivElement>;
  /** Props for the popup's container */
  domProps: HTMLAttributes<HTMLElement>;
  /** Focus strategy applied to the popup's items */
  autoFocus?: boolean | FocusStrategy;
  /** Menu's items */
  children: CollectionChildren<{}>;
  /** List of the keys of the items that are disabled */
  disabledKeys: React.Key[];
  /** List of the keys of the items that are expanded */
  expandedKeys: React.Key[];
  /** Callback executed when the popup is closed */
  onClose: ItemProps['onClose'];
  /** Callback executed when the user clicks on a menu's item */
  onAction: ItemProps['onAction'];
  /** Menu Popup Header */
  header?: JSX.Element;
  /** For each section, breakpoint starting from which it is hidden */
  hiddenSections?: {
    [key: React.Key]: SectionProps['hidden'];
  };
}
