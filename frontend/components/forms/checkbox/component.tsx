import React, { useRef, useState } from 'react';

import { useFocusRing, VisuallyHidden } from 'react-aria';
import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { useCheckbox } from '@react-aria/checkbox';
import { useToggleState } from '@react-stately/toggle';

import { CheckboxProps } from './types';

export const Checkbox = <FormValues extends FieldValues>(props: CheckboxProps<FormValues>) => {
  const { register, registerOptions, labelText, labelClassName, checkboxClassName, ...rest } =
    props;
  const { name, id, 'aria-label': ariaLabel } = rest;

  const [invalid, setInvalid] = useState(false);
  const state = useToggleState(props);
  const { isSelected, toggle } = state;
  const { isFocusVisible, focusProps } = useFocusRing(rest);

  const ref = useRef();
  const { inputProps } = useCheckbox(rest, state, ref);

  return (
    <label
      htmlFor={id}
      className={cx('flex align-middle font-sans text-sm text-gray-800 font-regular', {
        [labelClassName]: !!labelClassName,
      })}
    >
      <VisuallyHidden>
        <input
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
      </VisuallyHidden>
      <div
        className={cx(
          'mr-2 mt-0.5 inline-block w-4 h-4 rounded hover:border hover:border-green-dark hover:transition-all duration-500 ease-in-out px-0.5 py-[3px] border',
          {
            'border-beige': !isSelected && !invalid,
            'border-green-dark bg-green-dark': isSelected && !invalid,
            'border-red': !isSelected && invalid,
            'ring-green-dark ring-2 ring-offset-2 ring-offset-white': isFocusVisible,
            [checkboxClassName]: !!checkboxClassName,
          }
        )}
      >
        {isSelected && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.20704 0.793031C9.39451 0.980558 9.49983 1.23487 9.49983 1.50003C9.49983 1.76519 9.39451 2.0195 9.20704 2.20703L4.20704 7.20703C4.01951 7.3945 3.76521 7.49982 3.50004 7.49982C3.23488 7.49982 2.98057 7.3945 2.79304 7.20703L0.793041 5.20703C0.610883 5.01843 0.510088 4.76583 0.512367 4.50363C0.514645 4.24143 0.619814 3.99062 0.805222 3.80521C0.990631 3.6198 1.24144 3.51463 1.50364 3.51236C1.76584 3.51008 2.01844 3.61087 2.20704 3.79303L3.50004 5.08603L7.79304 0.793031C7.98057 0.60556 8.23488 0.500244 8.50004 0.500244C8.76521 0.500244 9.01951 0.60556 9.20704 0.793031Z"
              fill="white"
            />
          </svg>
        )}
      </div>
      {labelText}
    </label>
  );
};

export default Checkbox;
