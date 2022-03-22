import React, { useRef } from 'react';

import { useOption } from 'react-aria';
import { Check as CheckIcon } from 'react-feather';

import cx from 'classnames';

import Icon from 'components/icon';

import { OptionProps } from './types';

export const Option = ({ item, state }: OptionProps) => {
  const ref = useRef<HTMLLIElement>(null);
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={cx({
        'flex justify-between items-center px-4 py-2 sm:py-2 outline-none text-sm font-sans transition':
          true,
        'bg-green-light/20': isFocused,
        'text-green-dark': isSelected || isFocused,
        'text-black': !isSelected,
        'cursor-pointer': !isDisabled,
        'opacity-40 cursor-default': isDisabled,
      })}
    >
      <div>{item.rendered}</div>
      {isSelected && (
        <Icon
          aria-hidden={true}
          icon={CheckIcon}
          className="inline-block w-5 h-5 ml-2 text-green-dark shrink-0"
        />
      )}
    </li>
  );
};

export default Option;
