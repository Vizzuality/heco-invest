import React, { useState } from 'react';

import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { SwitchProps } from './types';

export const Switch = <FormValues extends FieldValues>(props: SwitchProps<FormValues>) => {
  const { register, registerOptions, ...rest } = props;
  const { name, id, 'aria-label': ariaLabel, switchSize = 'small' } = rest;

  const [invalid, setInvalid] = useState(false);

  return (
    <input
      type="checkbox"
      className={cx({
        'peer relative appearance-none cursor-pointer inline-flex items-center transition-all':
          true,
        'rounded-full border border-green-dark bg-transparent': true,
        'checked:bg-green-dark checked:after:bg-white': true,
        'focus-visible:outline focus-visible:outline-green-dark focus-visible:outline-2': true,
        'after:content after:absolute after:rounded-full after:bg-green-dark after:transition-all':
          true,
        'disabled:opacity-60 disabled:border-beige disabled:after:bg-gray-400 disabled:bg-background-middle':
          true,
        'w-5 h-3 focus-visible:outline-offset-1 after:h-2 after:w-2 after:translate-x-px checked:after:translate-x-[9px]':
          switchSize === 'smallest',
        'w-8 h-4 focus-visible:outline-offset-2 after:h-2.5 after:w-2.5 after:translate-x-0.5 checked:after:translate-x-[18px]':
          switchSize === 'small',
      })}
      id={id}
      aria-label={ariaLabel}
      {...rest}
      {...register(name, {
        ...registerOptions,
      })}
      onInvalid={() => setInvalid(true)}
    />
  );
};

export default Switch;
