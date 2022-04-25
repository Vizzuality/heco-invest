import React from 'react';

import { Check as CheckIcon } from 'react-feather';
import { components } from 'react-select';

import cx from 'classnames';

import Icon from 'components/icon';

import { MenuOptionProps } from './types';

export const MenuOption: React.FC<MenuOptionProps> = (props: MenuOptionProps) => {
  const { isSelected, children } = props;

  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between">
        {children}
        {isSelected && (
          <Icon
            aria-hidden={true}
            icon={CheckIcon}
            className="inline-block w-5 h-5 ml-2 text-green-dark shrink-0"
          />
        )}
      </div>
    </components.Option>
  );
};

export default MenuOption;
