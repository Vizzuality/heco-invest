import { useEffect, useState } from 'react';

import { Trash2 } from 'react-feather';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { useFocusRing } from '@react-aria/focus';

import Button from 'components/button';
import Icon from 'components/icon';

import type { ProjectGalleryImageProps } from './types';

export const ProjectGalleryImage = <FormValues extends FieldValues>({
  name,
  image,
  control,
  invalid: invalidProp = false,
  defaultSelected = false,
  onDeleteImage,
  onSelectCover,
  ...rest
}: ProjectGalleryImageProps<FormValues>) => {
  const [invalid, setInvalid] = useState<boolean>(invalidProp);
  const { isFocusVisible, focusProps } = useFocusRing();
  const { file, title, src } = image;
  const { formatMessage } = useIntl();

  useEffect(() => {
    setInvalid(invalidProp);
  }, [invalidProp]);

  return (
    <div className="relative rounded group">
      <Controller
        name={'project_images_attributes' as Path<FormValues>}
        control={control}
        render={(field) => (
          <Button
            {...field}
            name="project_images_attributes"
            theme="primary-white"
            className="absolute right-0 z-10 justify-center w-6 h-6 px-0 py-0 mx-2 my-2 overflow-hidden text-red-600 transition-opacity ease-in opacity-0 group-hover:opacity-100 group-hover:text-red-600 focus-visible:opacity-100"
            title={formatMessage({ defaultMessage: 'Delete image', id: 'pWwsxm' })}
            onClick={onDeleteImage}
            aria-label={formatMessage({ defaultMessage: 'Delete image', id: 'pWwsxm' })}
          >
            <Icon icon={Trash2} className="w-4" />
          </Button>
        )}
      />
      <Controller
        name={name}
        control={control}
        render={(field) => (
          <input
            {...field}
            name={name}
            id={file}
            type="radio"
            className="sr-only peer"
            value={file}
            onInvalid={() => setInvalid(true)}
            checked={defaultSelected}
            {...focusProps}
            {...rest}
            onChange={onSelectCover}
            aria-labelledby="select-cover-input"
          />
        )}
      />
      <label
        id="select-cover-input"
        htmlFor={file}
        className="overflow-hidden rounded cursor-pointer"
      >
        <span className="sr-only">{image.title}</span>
        <Image
          aria-hidden={true}
          className="z-0 rounded"
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
