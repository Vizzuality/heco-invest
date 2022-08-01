import { FC, useState } from 'react';

import { MoreVertical as MoreVerticalIcon, ChevronDown, ChevronUp } from 'react-feather';

import Button from 'components/button';
import Menu from 'components/menu';

import { RowMenuProps } from './types';

export const RowMenu: FC<RowMenuProps> = ({
  onAction,
  children,
  direction,
  iconType = 'actions',
}: RowMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuIconOpenClose = () => {
    const iconValue = (direction === 'top' ? 1 : 0) - (isOpen ? 1 : 0);
    if (iconValue === 0) {
      return <ChevronDown />;
    } else {
      return <ChevronUp />;
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
      direction={direction}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
    >
      {children}
    </Menu>
  );
};

export default RowMenu;
