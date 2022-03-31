import React, { useEffect, useState } from 'react';

import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { useFocusRing } from '@react-aria/focus';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import { TagProps } from './types';

export const Tag = <FormValues extends FieldValues>(props: TagProps<FormValues>) => {
  const {
    className,
    id,
    'aria-label': ariaLabel,
    name,
    register,
    watch,
    value,
    registerOptions,
    children,
    ...rest
  } = props;

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const { isFocusVisible, focusProps } = useFocusRing();

  const watchFields = watch && watch(name);

  useEffect(() => {
    if (!watchFields) return;
    setIsInvalid(false);
    setIsSelected(watchFields?.includes(value));
  }, [value, watchFields]);

  return (
    <label htmlFor={id}>
      <VisuallyHidden>
        <input
          id={id}
          aria-hidden={true}
          type="checkbox"
          value={value}
          disabled={registerOptions?.disabled}
          onInvalid={() => setIsInvalid(true)}
          {...register(name, {
            onChange: (e) => {
              const isChecked = !!e.target.checked;
              setIsSelected(isChecked);
            },
            ...registerOptions,
          })}
          {...focusProps}
          {...rest}
        />
      </VisuallyHidden>
      <div
        role="checkbox"
        aria-label={ariaLabel}
        aria-checked={isSelected}
        className={cx({
          'inline-flex items-center border rounded-lg transition-all bg-white': true,
          'hover:shadow cursor-pointer': !registerOptions?.disabled,
          'cursor-default opacity-60': registerOptions?.disabled,
          'border-green-dark': isSelected && !isInvalid,
          'ring-2 ring-green-dark ring-offset-2': isFocusVisible,
          [className]: !!className,
          'px-4 py-2': !className,
          'border-red-700': isInvalid,
          'outline:focus-none': true,
        })}
      >
        {children}
      </div>
    </label>
  );
};

export default Tag;
