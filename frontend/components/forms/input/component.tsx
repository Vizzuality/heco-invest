import React, { useState } from 'react';

import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { InputProps } from './types';

export const Input = <FormValues extends FieldValues>({
  id,
  'aria-label': ariaLabel,
  type,
  name,
  register,
  registerOptions,
  className,
  ...rest
}: InputProps<FormValues>) => {
  // We want the input to have some specific styles when it is invalid (most likely required and
  // empty). Unfortunately the `:invalid` pseudo-class is always matched, even if the form has not
  // been submitted yet. In order to only display the error styles when relevant, we listen to the
  // `invalid` event which is triggered when the input is validated and invalid. If not manually
  // triggered, the validation only happens when the form is submitted, hence we can dynamically
  // add the `:invalid` styles at that point.
  // Note that we don't care about setting this variable back to `false` because what only matters
  // is to not display the `:invalid` styles too soon.
  const [invalid, setInvalid] = useState(false);

  return (
    <input
      id={id}
      aria-label={ariaLabel}
      type={type}
      className={cx({
        'block w-full px-4 py-2 text-base text-gray-900 placeholder-gray-400 placeholder-opacity-100 border border-solid border-beige hover:shadow-sm focus:shadow-sm focus:border-green-dark outline-none bg-white rounded-lg disabled:opacity-60 transition':
          true,
        [className]: !!className,
        'invalid:border-red-700 focus:invalid:border-red-700': invalid,
      })}
      {...register(name, registerOptions)}
      onInvalid={() => setInvalid(true)}
      {...rest}
    />
  );
};

export default Input;
