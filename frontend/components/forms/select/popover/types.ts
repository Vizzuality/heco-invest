import React from 'react';

import { MenuTriggerProps } from '@react-types/menu';

export interface PopoverProps {
  /** Vertical alignment of the popup relative to the trigger */
  direction: MenuTriggerProps['direction'];
  popoverRef?: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}
