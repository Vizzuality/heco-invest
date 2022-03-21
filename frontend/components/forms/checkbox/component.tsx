import React, { useRef, useState } from 'react';

import { useFocusRing } from 'react-aria';
import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { useCheckbox } from '@react-aria/checkbox';
import { useToggleState } from '@react-stately/toggle';

import { CheckboxProps } from './types';

export const Checkbox = <FormValues extends FieldValues>(props: CheckboxProps<FormValues>) => {
  const { register, registerOptions, ...rest } = props;
  const { name, id, 'aria-label': ariaLabel, className } = rest;

  const [invalid, setInvalid] = useState(false);
  const state = useToggleState(props);
  const { isSelected, toggle } = state;
  const { isFocusVisible, focusProps } = useFocusRing(rest);

  const ref = useRef();
  const { inputProps } = useCheckbox(rest, state, ref);
  console.log(isFocusVisible);
  return (
    <input
      className={cx(
        'appearance-none mr-2 mt-0.5 inline-block w-4 h-4 rounded hover:border hover:border-green-dark hover:transition-all outline-0 focus-visible:ring-green-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white  duration-500 ease-in-out px-0.5 py-[3px] border bg-[url("/images/checkbox-checked.svg")] bg-no-repeat bg-center',
        {
          'border-beige': !isSelected && !invalid,
          'border-green-dark bg-green-dark': isSelected && !invalid,
          'border-red': !isSelected && invalid,
          'ring-green-dark ring-2 ring-offset-2 ring-offset-white': isFocusVisible,
          [className]: !!className,
        }
      )}
      id={id}
      aria-label={ariaLabel}
      {...rest}
      {...inputProps}
      {...focusProps}
      {...register(name, {
        ...registerOptions,
        onChange: (e) => {
          toggle();
          if (invalid && e.currentTarget.checked) setInvalid(false);
        },
      })}
      onInvalid={() => setInvalid(true)}
    />
  );
};

export default Checkbox;
