import React, { useEffect, useState } from 'react';

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
  invalid: invalidProp = false,
  ...rest
}: TagProps<FormValues>) => {
  const [invalid, setInvalid] = useState(invalidProp);

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
        type="checkbox"
        className="sr-only peer"
        value={value}
        onInvalid={() => setInvalid(true)}
        {...register(name, registerOptions)}
        {...rest}
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
