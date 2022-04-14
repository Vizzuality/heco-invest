import React, { useState } from 'react';

import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { TextareaProps, TextareaResize } from './types';

export const Textarea = <FormValues extends FieldValues>({
  id,
  'aria-label': ariaLabel,
  rows = 3,
  resize = TextareaResize.None,
  name,
  register,
  registerOptions,
  invalid = false,
  className,
  ...rest
}: TextareaProps<FormValues>) => (
  <textarea
    id={id}
    aria-label={ariaLabel}
    className={cx({
      'block w-full px-4 py-2 text-base text-gray-900 placeholder-gray-400 placeholder-opacity-100 border border-solid border-beige hover:shadow-sm focus:shadow-sm focus:border-green-dark outline-none bg-white rounded-lg disabled:opacity-60 transition':
        true,
      [resize]: true,
      [className]: !!className,
      'border-red-700': invalid,
    })}
    rows={rows}
    {...register(name, registerOptions)}
    {...rest}
  />
);

export default Textarea;
