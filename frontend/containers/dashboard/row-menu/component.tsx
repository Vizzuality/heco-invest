import { FC, useState } from 'react';

import { MoreVertical as MoreVerticalIcon, ChevronDown, ChevronUp } from 'react-feather';

import Button from 'components/button';
import Menu from 'components/menu';

import { RowMenuProps } from './types';

export const RowMenu: FC<RowMenuProps> = ({
  onAction,
  children,
  iconType = 'actions',
}: RowMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuIconOpenClose = () => {
    if (isOpen) {
      return <ChevronUp />;
    } else {
      return <ChevronDown />;
    }
  };

  return (
    <Menu
      Trigger={
        <Button size="smallest" theme="naked" className="focus-visible:outline-green-dark">
          {iconType === 'actions' ? (
            <MoreVerticalIcon className="w-6 h-6" />
          ) : (
            iconType === 'open-close' && menuIconOpenClose()
          )}
        </Button>
      }
      align="end"
      onAction={onAction}
      hiddenSections={{ 'user-section': 'sm' }}
      direction={'bottom'}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      {children}
    </Menu>
  );
};

export default RowMenu;
