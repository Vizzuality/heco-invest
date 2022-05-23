import type { ButtonProps } from 'components/button';

export type UserMenuProps = {
  /** Classes to apply to the menu */
  className?: string;
} & Pick<ButtonProps, 'theme'>;
