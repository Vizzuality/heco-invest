import { PropsWithChildren } from 'react';

export type MenuOptionProps = PropsWithChildren<{
  /** Whether the option is selected. */
  isSelected: boolean;
}>;
