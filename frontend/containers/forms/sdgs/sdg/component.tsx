import React, { useEffect, useState } from 'react';

import { Check as CheckIcon } from 'react-feather';
import { FieldValues } from 'react-hook-form';

import cx from 'classnames';

import Image from 'next/image';

import { useFocusRing } from '@react-aria/focus';

import { SDGProps } from './types';

export const SDG = <FormValues extends FieldValues>({
  className,
  id,
  name,
  image,
  title,
  register,
  registerOptions,
  children,
  invalid: invalidProp = false,
  ...rest
}: SDGProps<FormValues>) => {
  const [invalid, setInvalid] = useState<boolean>(invalidProp);
  const { isFocusVisible, focusProps } = useFocusRing();

  // This is mainly needed for when the Tag is part of a group of tags wrapped in a TagGroup component.
  // TagGroup will be checking if the field has errors (by name), and passing `invalid` as either
  // `true` or `false`. This is because the tag itself may be valid/not having errors, while the group
  // as a whole may not be valid.
  useEffect(() => {
    setInvalid(invalidProp);
  }, [invalidProp]);

  return (
    <div className="relative">
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        value={id}
        onInvalid={() => setInvalid(true)}
        {...register(name, registerOptions)}
        {...focusProps}
        {...rest}
      />
      <span className="absolute bg-gray-800 rounded-lg pointer-events-none top-px bottom-px left-px right-px" />
      <label
        htmlFor={id}
        className={cx({
          'items-center rounded-lg transition bg-white hover:shadow cursor-pointer opacity-60 border border-transparent':
            true,
          'block text-[0]': true, // Fixes issues with next/image adding padding below images
          'peer-checked:opacity-100': true,
          'peer-disabled:shadow-none peer-disabled:cursor-default peer-disabled:opacity-60': true,
          'ring-2 ring-green-dark ring-offset-2': isFocusVisible,
          'peer-invalid:border-red-700': invalid,
        })}
      >
        <span className="sr-only">{title}</span>
        <Image
          aria-hidden={true}
          className="rounded-lg"
          src={image}
          alt={title}
          title={title}
          width={88}
          height={88}
          layout="fixed"
          quality={100}
        />
      </label>
      <span
        aria-hidden={true}
        className={cx({
          'absolute top-0 right-0 flex items-center justify-center opacity-0 pointer-events-none z-10':
            true,
          'translate-x-1/2 -translate-y-1/2': true,
          'bg-white rounded-full drop-shadow transition-all': true,
          'w-6 h-6': true,
          'peer-checked:opacity-100': true,
        })}
      >
        <CheckIcon className="w-4 h-4 text-green-dark" />
      </span>
    </div>
  );
};

export default SDG;
