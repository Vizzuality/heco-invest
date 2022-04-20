import React, { useEffect, useState } from 'react';

import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import { useFocusRing } from '@react-aria/focus';

import { TagProps } from './types';

export const Tag = <FormValues extends FieldValues>({
  className,
  id,
  name,
  value,
  register,
  registerOptions,
  watch,
  children,
  invalid: invalidProp = false,
  ...rest
}: TagProps<FormValues>) => {
  const [invalid, setInvalid] = useState<boolean>(invalidProp);
  const [selected, setSelected] = useState<boolean>(false);
  const { isFocusVisible, focusProps } = useFocusRing();
  const watchFields = watch && watch(name);

  // This is mainly needed for when the Tag is part of a group of tags wrapped in a TagGroup component.
  // TagGroup will be checking if the field has errors (by name), and passing `invalid` as either
  // `true` or `false`. This is because the tag itself may be valid/not having errors, while the group
  // as a whole may not be valid.
  useEffect(() => {
    setInvalid(invalidProp);
  }, [invalidProp]);

  // We're displaying a green ring when the Tag is focused, but only when keyboard focused (for accessibility).
  // We cannot use the `focus:` tailwind selector because it'll cause the ring to appear when the user clicks
  // on it. In order to solve that, we're using `useFocusRing` from `react-aria`. That means we're keeping
  // track of the tag's selected state manually. The `useEffect` block below keeps this functionality compatible
  // with when the tag is part of a group, wrapped by the `TagGroup` component.
  useEffect(() => {
    if (!watchFields) return;
    setSelected(watchFields.includes(value));
  }, [value, watchFields]);

  return (
    <div className={className}>
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        value={value}
        onInvalid={() => setInvalid(true)}
        {...register(name, {
          onChange: (e) => setSelected(!!e.target.checked),
          ...registerOptions,
        })}
        {...focusProps}
        {...rest}
      />
      <label
        htmlFor={id}
        className={cx({
          'inline-flex items-center px-4 py-2 border rounded-lg transition bg-white hover:shadow peer-disabled:shadow-none cursor-pointer peer-disabled:cursor-default peer-disabled:opacity-60':
            true,
          'ring-2 ring-green-dark ring-offset-2': isFocusVisible,
          'border-green-dark': selected && !invalid,
          'peer-invalid:border-red-700': invalid,
        })}
      >
        {children}
      </label>
    </div>
  );
};

export default Tag;
