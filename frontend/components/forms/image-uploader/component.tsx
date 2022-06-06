import React, { ChangeEvent, useState } from 'react';

import { FieldValues } from 'react-hook-form';
import { useIntl } from 'react-intl';

import cx from 'classnames';

import Image from 'next/image';

import { FILE_UPLOADER_MAX_SIZE, bytesToMegabytes } from 'helpers/pages';

import { directUpload } from 'services/direct-upload/directUpload';

import { ImageUploaderProps } from './types';

export const ImageUploader = <FormValues extends FieldValues>({
  preview,
  previewClassName,
  register,
  name,
  id,
  buttonText,
  registerOptions,
  setError,
  setValue,
  maxSize = FILE_UPLOADER_MAX_SIZE,
  clearErrors,
  defaultImage,
  ...rest
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
            objectFit="cover"
          />
        </div>
      )}
      {/* File input to upload the file */}
      <input
        id={id}
        className="p-1 font-sans outline-none file:transition-all file:mr-4 file:px-6 file:font-medium file:text-sm file file:py-2 file:rounded-full file:border-0 file:bg-green-dark file:text-white file:hover:text-green-light file:hover:disabled:text-white disabled:opacity-60 file:cursor-pointer file:disabled:pointer-events-none file:focus-visible:outline file:focus-visible:outline-2 file:focus-visible:outline-offset-2 file:focus-visible:outline-green-dark"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleUploadImage}
      />
      {/* Input registered on the form */}
      <input className="hidden" {...rest} {...register(name, { ...registerOptions })} />
    </div>
  );
};

export default ImageUploader;
