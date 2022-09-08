import { useEffect, useState, useCallback } from 'react';

import { FileRejection, useDropzone } from 'react-dropzone';
import { Controller, FieldValues, Path } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import classNames from 'classnames';

import Image from 'next/image';

import { FILE_UPLOADER_MAX_SIZE, bytesToMegabytes } from 'helpers/pages';

import { ProjectImageGallery } from 'types/project';

import { directUpload } from 'services/direct-upload/directUpload';

import { UploaderProps, UploadErrorCode } from './types';

export const Uploader = <FormValues extends FieldValues>({
  name,
  fileTypes,
  maxFiles = 1,
  maxSize = FILE_UPLOADER_MAX_SIZE,
  control,
  controlOptions,
  onUpload,
  setError,
  clearErrors,
}: UploaderProps<FormValues>) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [filesLength, setFilesLength] = useState<number>(0);
  const { formatMessage } = useIntl();

  const setMaxSizeError = useCallback(
    (file: File) => {
      setError(name, {
        message: formatMessage(
          { defaultMessage: 'File {fileName} is larger than {fileSize}MB', id: 'v9GdgG' },
          {
            fileName: file.name,
            fileSize: bytesToMegabytes(maxSize).toFixed(0),
          }
        ),
      });
    },
    [formatMessage, maxSize, name, setError]
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
                id: undefined, // We cannot use the `id` coming from `directUpload` here
                file: signed_id,
                cover: false,
                src: direct_upload?.url || URL.createObjectURL(file),
                title: filename,
              });
            } catch (error) {
              setError(name as Path<FormValues>, {
                message:
                  error?.message ||
                  formatMessage({
                    defaultMessage: 'Something went wrong with the file upload',
                    id: 'qpDURb',
                  }),
              });
            }
          }
        })
      );

      onUpload(uploadedFiles);
      setIsUploading(false);
      setFilesLength(0);
    },
    [onUpload, maxSize, setMaxSizeError, setError, name, formatMessage]
  );

  const onDropAccepted = async (files: File[]) => {
    clearErrors(name);
    uploadFiles(files);
  };

  const onDropRejected = async (fileRejections: FileRejection[]) => {
    setIsUploading(false);
    fileRejections.forEach((rejection) => {
      rejection.errors.forEach((error) => {
        switch (error.code) {
          case UploadErrorCode.FileTooLarge:
            setMaxSizeError(rejection.file);
            break;
          case UploadErrorCode.TooManyFiles:
            setError(name, {
              message: formatMessage(
                {
                  defaultMessage: 'You can upload a maximum of {maxFiles} files',
                  id: 'yQ7bY1',
                },
                { maxFiles }
              ),
            });
          case UploadErrorCode.FileInvalidType:
            setError(name, {
              message: formatMessage(
                {
                  defaultMessage: 'File {fileName} has an invalid format',
                  id: 'cKaiI0',
                },
                { fileName: rejection.file.name }
              ),
            });
          default:
            setError(name, { message: error.message });
        }
      });
    });
  };

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    accept: fileTypes,
    disabled: controlOptions.disabled || !!isUploading,
    maxSize,
    maxFiles,
    multiple: maxFiles > 1,
    onDropAccepted,
    onDropRejected,
  });

  useEffect(() => {
    if (isUploading) clearErrors(name);
  }, [clearErrors, isUploading, name]);

  return (
    <div className="h-full">
      <div
        className={classNames(
          'h-full rounded-md border-2 border-dashed  border-beige py-10 px-4 text-center text-sm focus:outline-green-700 focus-visible:ring-green-dark focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-0',
          {
            'cursor-pointer': !controlOptions.disabled,
            'opacity-60': controlOptions.disabled,
          }
        )}
        {...getRootProps()}
      >
        <input
          aria-label={formatMessage({ defaultMessage: 'Browse or drag and drop', id: '8dGhWP' })}
          {...getInputProps()}
          ref={inputRef}
        />
        <Controller
          name={name}
          control={control}
          render={({ field }) => <input {...field} className="hidden" name={name} />}
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
              defaultMessage="Uploading {filesCount} files..."
              id="uHyJI7"
              values={{ filesCount: filesLength }}
            />
          </p>
        )}
      </div>
    </div>
  );
};

export default Uploader;
