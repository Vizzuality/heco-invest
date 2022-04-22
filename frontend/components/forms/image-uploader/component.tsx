import React, { ChangeEvent, useState } from 'react';

import { FieldValues } from 'react-hook-form';
import { useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { ImageUploaderProps } from './types';

export const ImageUploader = <FormValues extends FieldValues>({
  preview,
  previewClassName,
  register,
  name,
  id,
  buttonText,
  onChangeImage,
  registerOptions,
  ...rest
}: ImageUploaderProps<FormValues>) => {
  const { formatMessage } = useIntl();
  const [imagePreview, setImagePreview] = useState<string>();

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      const file = e.currentTarget.files[0];
      const src = URL.createObjectURL(file);
      setImagePreview(src);
      onChangeImage?.();
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="flex items-center justify-start">
      {preview && (
        <div
          className={cx('relative overflow-hidden', {
            'mr-5 w-16 h-16 rounded-full': !previewClassName,
            [previewClassName]: !!previewClassName,
          })}
        >
          <Image
            src={imagePreview || '/images/avatar.svg'}
            alt={formatMessage({ defaultMessage: 'Preview', id: 'TJo5E6' })}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
      <input
        id={id}
        className="transition-all rounded-full file:mr-4 file:px-6 file:py-2 file:rounded-full file:bg-green-dark file:text-white file:hover:text-green-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-dark"
        type="file"
        accept="image/png, image/jpeg"
        {...rest}
        {...register(name, { ...registerOptions, onChange: handleUploadImage })}
      />
    </div>
  );
};

export default ImageUploader;
