import React, { useEffect, useState } from 'react';

import { X as CloseIcon } from 'react-feather';
import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { useFocusRing } from '@react-aria/focus';

import Icon from 'components/icon';

import { TagProps } from './types';

export const Tag = <FormValues extends FieldValues>({
  className,
  isfilterTag = false,
  type = 'checkbox',
  id,
  name,
  value,
  register,
  registerOptions,
  children,
  flexLabel,
  invalid: invalidProp = false,
  showDeleteIcon = false,
  ...rest
}: TagProps<FormValues>) => {
  const [invalid, setInvalid] = useState<boolean>(invalidProp);
  const { isFocusVisible, focusProps } = useFocusRing();

  // This is mainly needed for when the Tag is part of a group of tags wrapped in a TagGroup component.
  // TagGroup will be checking if the field has errors (by name), and passing `invalid` as either
  // `true` or `false`. This is because the tag itself may be valid/not having errors, while the group
  // as a whole may not be valid.
  useEffect(() => {
    setInvalid(invalidProp);
  }, [invalidProp]);

  return (
    <div className={className}>
      <input
        id={id}
        type={type}
        className="sr-only peer"
        value={value}
        onInvalid={() => setInvalid(true)}
        {...register(name, registerOptions)}
        {...focusProps}
        {...rest}
      />
      <label
        htmlFor={id}
        className={cx({
          'inline-flex items-center px-4 py-2 border transition bg-white hover:shadow peer-disabled:shadow-none cursor-pointer peer-disabled:cursor-default peer-disabled:opacity-60 peer-checked:border-green-dark text-center sm:text-left':
            true,
          'ring-2 ring-green-dark ring-offset-2': isFocusVisible,
          'peer-invalid:border-red-700': invalid,
          'flex flex-col items-start': flexLabel,
          'px-2 py-1 border-green-dark text-green-dark peer-checked:bg-green-light peer-checked:bg-opacity-30 rounded-full text-sm leading-4 focus-visible:outline-green-dark':
            isfilterTag,
          'rounded-lg': !isfilterTag,
        })}
      >
        {children}
        {showDeleteIcon && (
          <Icon className="w-3 h-3 ml-2 text-gray-900 sm:w-4 sm:h-4" icon={CloseIcon} />
        )}
      </label>
    </div>
  );
};

export default Tag;
