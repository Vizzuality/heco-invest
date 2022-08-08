import type { MenuProps } from 'components/menu/types';

export type RowMenuProps = Pick<MenuProps, 'onAction' | 'children' | 'direction'> & {
  iconType?: 'actions' | 'open-close';
};
