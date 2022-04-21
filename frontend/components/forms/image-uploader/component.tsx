import React, { ChangeEvent, useState } from 'react';

import { FieldValues } from 'react-hook-form';
import { useIntl } from 'react-intl';

import Image from 'next/image';

import Button from 'components/button';
import Loading from 'components/loading';

import { directUpload } from 'services/direct-upload';

import { ImageUploaderProps } from './types';

const ImageUploader = <FormValues extends FieldValues>({
  preview,
  register,
  name,
  text,
  handleChangeImage,
  handleError,
}: ImageUploaderProps<FormValues>) => {
  const { formatMessage } = useIntl();
  const [imagePreview, setImagePreview] = useState<string>();
  // const { mutate, isLoading } = useUpload();

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files?.length) {
      e.currentTarget.dataset.directUploadUrl;
      const file = e.currentTarget.files[0];
      // const src = URL.createObjectURL(file);
      // const reader = new FileReader();
      // reader.readAsArrayBuffer(file);
      directUpload('test', file);
      // mutate(file, {
      //   onSuccess: (data) => {
      //     handleChangeImage(data.id);
      //     setImagePreview(data.direct_upload.url);
      //   },
      //   onError: (e) => {
      //     handleError(e);
      //     console.log(e);
      //   },
      // });
    }
  };

  return (
    <div className="flex items-center justify-start">
      {preview && (
        <div className="mr-5">
          <Image
            src={imagePreview || '/images/avatar.svg'}
            width={48}
            height={48}
            className="rounded-full"
            alt={formatMessage({ defaultMessage: 'profile image', id: 'OX08fr' })}
          />
        </div>
      )}
      <Button>
        <Loading className="inline mr-4" />
        {text || formatMessage({ defaultMessage: 'Upload Image', id: 'MntrZe' })}
        <input
          id="picture"
          className="absolute opacity-0"
          type="file"
          accept="image/png, image/jpeg"
          {...register(name)}
          onChange={handleUploadImage}
          aria-describedby="picture-error"
        />
      </Button>
    </div>
  );
};

export default ImageUploader;
