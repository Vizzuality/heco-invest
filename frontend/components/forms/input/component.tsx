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
  invalid = false,
  className,
  ...rest
}: InputProps<FormValues>) => (
  <input
    id={id}
    aria-label={ariaLabel}
    type={type}
    className={cx({
      'block w-full px-4 py-2 text-base text-gray-900 placeholder-gray-400 placeholder-opacity-100 border border-solid border-beige hover:shadow-sm focus:shadow-sm focus:border-green-dark outline-none bg-white rounded-lg disabled:opacity-60 transition':
        true,
      [className]: !!className,
      'border-red-700': invalid,
    })}
    {...register(name, registerOptions)}
    {...rest}
  />
);

export default Input;
