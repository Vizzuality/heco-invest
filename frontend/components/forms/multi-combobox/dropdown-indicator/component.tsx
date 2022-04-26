import React from 'react';

import { ChevronDown as ChevronDownIcon } from 'react-feather';

import cx from 'classnames';

import Icon from 'components/icon';

import { DropdownIndicatorProps } from './types';

export const DropdownIndicator: React.FC<DropdownIndicatorProps> = ({
  innerProps: { ref, ...restInnerProps },
  selectProps: { menuIsOpen },
}: DropdownIndicatorProps) => (
  <div ref={ref} {...restInnerProps}>
    <Icon
      aria-hidden={true}
      icon={ChevronDownIcon}
      className={cx({
        'inline-block w-5 h-5 ml-2 text-gray-600 shrink-0 transition': true,
        'rotate-180': menuIsOpen,
      })}
    />
  </div>
);

export default DropdownIndicator;
