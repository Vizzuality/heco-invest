import React, { useState } from 'react';

import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { TagProps } from './types';

export const Tag = <FormValues extends FieldValues>({
  className,
  id,
  name,
  value,
  register,
  registerOptions,
  children,
  ...rest
}: TagProps<FormValues>) => {
  const [invalid, setInvalid] = useState(false);

  return (
    <div className={className}>
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        {...rest}
        {...register(name, {
          ...registerOptions,
        })}
        value={value}
        onInvalid={() => setInvalid(true)}
      />
      <label
        htmlFor={id}
        className={cx({
          'inline-flex items-center px-4 py-2 border rounded-lg transition bg-white peer-focus:ring-2 ring-green-dark ring-offset-2 peer-checked:border-green-dark hover:shadow peer-disabled:shadow-none cursor-pointer peer-disabled:cursor-default peer-disabled:opacity-60':
            true,
          'peer-invalid:border-red-700': invalid,
        })}
      >
        {children}
      </label>
    </div>
  );
};

export default Tag;
