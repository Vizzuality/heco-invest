import { useEffect, useState } from 'react';

import { FieldValues } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { useFocusRing } from '@react-aria/focus';

import type { ProjectGalleryImageProps } from './types';

export const ProjectGalleryImage = <FormValues extends FieldValues>({
  name,
  image,
  register,
  registerOptions,
  invalid: invalidProp = false,
  defaultSelected = false,
  ...rest
}: ProjectGalleryImageProps<FormValues>) => {
  const [invalid, setInvalid] = useState<boolean>(invalidProp);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { id, title, src } = image;

  useEffect(() => {
    setInvalid(invalidProp);
  }, [invalidProp]);

  return (
    <div className="relative rounded">
      <input
        id={id}
        type="radio"
        className="sr-only peer"
        value={id}
        onInvalid={() => setInvalid(true)}
        defaultChecked={defaultSelected}
        {...register(name, registerOptions)}
        {...focusProps}
        {...rest}
      />
      <label htmlFor={id} className="overflow-hidden rounded cursor-pointer">
        <span className="sr-only">{image.title}</span>
        <Image
          aria-hidden={true}
          className="rounded"
          src={src}
          title={title}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </label>
      <span
        aria-hidden={true}
        className={cx({
          'absolute left-0 top-0 w-full h-full bg-transparent pointer-events-none hover:shadow border-2 rounded transition':
            true,
          'peer-disabled:shadow-none peer-disabled:cursor-default peer-disabled:opacity-60 peer-checked:border-green-dark':
            true,
          'ring-2 ring-green-dark ring-offset-2': isFocusVisible,
          'peer-invalid:border-red-700': invalid,
        })}
      />
      <span
        aria-hidden={true}
        className={cx({
          'py-1 px-2 rounded-bl rounded-tr bg-green-dark text-white text-xs': true,
          'absolute left-0 bottom-0 transition opacity-0 peer-checked:opacity-100': true,
        })}
      >
        <FormattedMessage defaultMessage="Cover" id="hl9bd4" />
      </span>
    </div>
  );
};

export default ProjectGalleryImage;
