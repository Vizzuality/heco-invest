import React from 'react';

import { Check as CheckIcon } from 'react-feather';

import cx from 'classnames';

import { useFocus } from '@react-aria/interactions';
import { useMenuItem } from '@react-aria/menu';
import { mergeProps } from '@react-aria/utils';

import Icon from 'components/icon';

import { ItemProps } from './types';

export const Item: React.FC<ItemProps> = ({ item, state, onAction, onClose }: ItemProps) => {
  const ref: React.MutableRefObject<HTMLLIElement | null> = React.useRef(null);

  const [isFocused, setFocused] = React.useState(false);

  const isDisabled = state.disabledKeys.has(item.key);
  const isActive = state.expandedKeys.has(item.key);

  const { menuItemProps } = useMenuItem(
    {
      key: item.key,
      isDisabled,
      onAction,
      onClose,
    },
    state,
    ref
  );
  const { focusProps } = useFocus({ onFocusChange: setFocused });

  return (
    <li
      {...mergeProps(menuItemProps, focusProps)}
      ref={ref}
      className={cx({
        'flex justify-between items-center px-4 py-2 sm:py-2 outline-none text-sm font-sans transition':
          true,
        'bg-green-light/20': isFocused,
        'text-green-dark': isActive,
        'text-black': !isActive,
        'cursor-pointer': !isDisabled,
        'opacity-40 cursor-default': isDisabled,
      })}
    >
      <div>{item.rendered}</div>
      {isActive && (
        <Icon
          aria-hidden={true}
          icon={CheckIcon}
          className="inline-block w-5 h-5 ml-2 text-green-dark shrink-0"
        />
      )}
    </li>
  );
};

export default Item;
