import React, { ChangeEvent, useState } from 'react';

import { Controller, FieldValues } from 'react-hook-form';
import { useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { FILE_UPLOADER_MAX_SIZE, bytesToMegabytes } from 'helpers/pages';

import { directUpload } from 'services/direct-upload/directUpload';

import { ImageUploaderProps } from './types';

export const ImageUploader = <FormValues extends FieldValues>({
  preview,
  previewClassName,
  control,
  name,
  id,
  setError,
  setValue,
  maxSize = FILE_UPLOADER_MAX_SIZE,
  clearErrors,
  defaultImage,
  theme = 'primary-green',
}: ImageUploaderProps<FormValues>) => {
  const { formatMessage } = useIntl();
  const [imagePreview, setImagePreview] = useState<string>();

  const setInputError = (
    message: string = formatMessage({
      defaultMessage: 'Something went wrong with the picture upload',
      id: 'F++AYx',
    })
  ) => {
    setImagePreview(null);
    setValue(name, undefined);
    setError(name, {
      message,
    });
  };

  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      clearErrors(name);
      const file = e.currentTarget.files[0];
      if (maxSize && file.size >= maxSize) {
        setInputError(
          formatMessage(
            {
              defaultMessage: 'The image is larger than {maxSize}MB',
              id: 'IBlTCs',
            },
            {
              maxSize: bytesToMegabytes(maxSize).toFixed(0),
            }
          )
        );
        return;
      }

      const src = URL.createObjectURL(file);
      await directUpload(file)
        .then(({ signed_id }) => {
          setImagePreview(src);
          setValue(name, signed_id as any);
        })
        .catch(() => {
          setInputError();
        });
    } else {
      setInputError();
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
            src={imagePreview || defaultImage || '/images/avatar.svg'}
            alt={formatMessage({ defaultMessage: 'Preview', id: 'TJo5E6' })}
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      {/* File input to upload the file */}
      <input
        id={id}
        className={cx(
          'p-1 font-sans outline-none appearance-none file:transition-all file:mr-4 file:px-6 file:font-medium file:text-sm file file:py-2 file:rounded-full disabled:opacity-60 file:cursor-pointer file:disabled:pointer-events-none file:focus-visible:outline file:focus-visible:outline-2 file:focus-visible:outline-offset-2 file:focus-visible:outline-green-dark',
          {
            'file:text-white file:hover:text-green-light file:bg-green-dark file:border-0 file:hover:disabled:text-white':
              theme === 'primary-green',
            'file:text-green-dark  file:bg-white file:border file:border-green-dark file:hover:bg-green-light file:hover:bg-opacity-20 file:hover:disabled:text-gray-600':
              theme === 'secondary-green',
          }
        )}
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleUploadImage}
      />
      {/* Input registered on the form */}
      <Controller
        control={control}
        name={name}
        render={({ field }) => <input name={name} className="hidden" {...field} />}
      />
    </div>
  );
};

export default ImageUploader;
