import { useEffect, useState, useCallback } from 'react';

import { FileRejection, useDropzone } from 'react-dropzone';
import { FieldValues, Path } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import classNames from 'classnames';

import Image from 'next/image';

import { ProjectImageGallery } from 'types/project';

import { directUpload } from 'services/direct-upload/directUpload';

import { UploaderProps } from './types';

export const bytesToMegabytes = (bytes: number): number => {
  return bytes / (1024 * 1024);
};

export const FILE_UPLOADER_MAX_SIZE = 1.5 * 1024 *1024;

export const Uploader = <FormValues extends FieldValues>({
  fileTypes,
  maxFiles = 1,
  maxSize = FILE_UPLOADER_MAX_SIZE,
  disabled = false,
  register,
  onUpload,
  setError,
  clearErrors,
}: UploaderProps<FormValues>) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [filesLength, setFilesLength] = useState<number>(0);

  const setMaxSizeError = useCallback(
    (file: File) => {
      setError('project_images_attributes', {
        message: (
          <FormattedMessage
            defaultMessage="File {fileName} is larger than {fileSize}MB"
            id="v9GdgG"
            values={{
              fileName: file.name,
              fileSize: bytesToMegabytes(maxSize),
            }}
          />
        ) as any,
      });
    },
    [maxSize, setError]
  );

  const uploadFiles = useCallback(
    async (files: File[]) => {
      if (!files.length) return;
      setFilesLength(files.length);
      setIsUploading(true);

      const uploadedFiles: ProjectImageGallery[] = [];

      await Promise.all(
        files.map(async (file) => {
          if (file.size > maxSize) {
            setMaxSizeError(file);
          } else {
            try {
              const { signed_id, filename, direct_upload } = await directUpload(file);
              uploadedFiles.push({
                id: signed_id,
                file: signed_id,
                cover: false,
                src: direct_upload?.url || URL.createObjectURL(file),
                title: filename,
              });
            } catch (error) {
              setError('project_images_attributes' as Path<FormValues>, {
                message: error?.message || (
                  <FormattedMessage
                    defaultMessage="Something went wrong with the file upload"
                    id="qpDURb"
                  />
                ),
              });
              setIsUploading(false);
            }
          }
        })
      );

      onUpload(uploadedFiles);
      setIsUploading(false);
      setFilesLength(0);
    },
    [maxSize, onUpload, setError, setMaxSizeError]
  );

  const onDropAccepted = async (files: File[]) => {
    clearErrors('project_images_attributes');
    uploadFiles(files);
  };

  const onDropRejected = async (fileRejections: FileRejection[]) => {
    setIsUploading(false);
    fileRejections.forEach((rejection) => {
      rejection.errors.forEach((error) => {
        switch (error.code) {
          case 'file-too-large':
            setMaxSizeError(rejection.file);
            break;
          default:
            setError('project_images_attributes' as Path<FormValues>, { message: error.message });
        }
      });
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: fileTypes,
    disabled: disabled || !!isUploading,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    onDropAccepted,
    onDropRejected,
  });

  useEffect(() => {
    if (isUploading) clearErrors('project_images_attributes');
  }, [clearErrors, isUploading]);

  return (
    <div className="h-full">
      <div
        className={classNames(
          'h-full rounded-md border-2 border-dashed  border-beige py-10 px-4 text-center text-sm focus:outline-green-700',
          {
            'cursor-pointer': !disabled,
            'opacity-50': disabled,
          }
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <input
          className="hidden"
          name="project_images_attributes"
          onProgress={console.log}
          {...register('project_images_attributes' as Path<FormValues>)}
        />
        <Image src="/images/upload-gallery.svg" width="38" height="39" alt="Upload file" />
        {!isUploading ? (
          <div className="mt-6">
            <p className="text-sm font-normal text-gray-800">
              <FormattedMessage
                defaultMessage="<a>Browse</a> or drag and drop"
                id="hpOE0K"
                values={{
                  a: (chunks: string) => (
                    <span className="font-medium text-green-dark">{chunks}</span>
                  ),
                }}
              />
            </p>
            <p className="text-gray-600">
              <FormattedMessage defaultMessage="PNG, JPG up to 5MB" id="BHrBCl" />
            </p>
          </div>
        ) : (
          <p>
            <FormattedMessage
              defaultMessage="Uploading {l} files..."
              id="j+TAPL"
              values={{ l: filesLength }}
            />
          </p>
        )}
      </div>
    </div>
  );
};

export default Uploader;
