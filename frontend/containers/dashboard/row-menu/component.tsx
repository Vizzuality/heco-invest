import { FC } from 'react';

import { MoreVertical as MoreVerticalIcon } from 'react-feather';

import Button from 'components/button';
import Menu, { MenuItem } from 'components/menu';

import { RowMenuProps } from './types';

export const RowMenu: FC<RowMenuProps> = ({ onAction, children }: RowMenuProps) => {
  return (
    <Menu
      Trigger={
        <Button size="smallest" theme="naked" className="focus-visible:outline-green-dark">
          <MoreVerticalIcon className="w-6 h-6" />
        </Button>
      }
      align="end"
      onAction={onAction}
      hiddenSections={{ 'user-section': 'sm' }}
    >
      {children}
    </Menu>
  );
};

export default RowMenu;
