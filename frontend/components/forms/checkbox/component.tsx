import React, { useState } from 'react';

import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { CheckboxProps } from './types';

export const Checkbox = <FormValues extends FieldValues>(props: CheckboxProps<FormValues>) => {
  const { register, registerOptions, invalid = false, ...rest } = props;
  const { name, id, 'aria-label': ariaLabel, className } = rest;

  return (
    <input
      type="checkbox"
      className={cx(
        'appearance-none inline-block w-4 h-4 mr-2 mt-0.5 px-0.5 py-[3px] border border-beige rounded hover:border hover:border-green-dark outline-none focus-visible:ring-green-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white  checked:border-green-dark checked:bg-green-dark checked:bg-[url("/images/checkbox-checked.svg")] bg-no-repeat bg-center disabled:opacity-60 disabled:hover:border-beige transition',
        {
          'border-red-700': invalid,
          [className]: !!className,
        }
      )}
      id={id}
      aria-label={ariaLabel}
      {...rest}
      {...register(name, {
        ...registerOptions,
      })}
    />
  );
};

export default Checkbox;
