import { useEffect, useState, useCallback } from 'react';

// import { FILE_UPLOADER_MAX_SIZE } from 'constants/file-uploader-size-limits';

import { useDropzone } from 'react-dropzone';
import { FieldValues, Path } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import classNames from 'classnames';

import Image from 'next/image';

// import { bytesToMegabytes } from 'utils/units';

import { chunk } from 'lodash-es';

import Alerts, { AlertProps } from 'components/alert';
import { ProjectImageGallery } from 'types/project';

import { directUpload } from 'services/direct-upload/directUpload';

import { UploaderProps } from './types';

export const bytesToMegabytes = (bytes: number): number => {
  return bytes / 1000000;
};

export const FILE_UPLOADER_MAX_SIZE = 1500000;

export const Uploader = <FormValues extends FieldValues>({
  fileTypes,
  maxFiles = 1,
  maxSize = FILE_UPLOADER_MAX_SIZE,
  showAlerts = true,
  disabled = false,
  register,
  onUpload,
}: UploaderProps<FormValues>) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [filesLength, setFilesLength] = useState<number>(0);
  const [alert, setAlert] = useState<AlertProps>(null);
  const { formatMessage } = useIntl();

  const uploadFiles = useCallback(
    async (files: File[]) => {
      if (!files.length) return;
      setFilesLength(files.length);
      setIsUploading(true);

      const uploadedFiles: ProjectImageGallery[] = await Promise.all(
        files.map(async (file, index) => {
          try {
            const { signed_id, filename, direct_upload } = await directUpload(file);
            console.log(direct_upload?.url);
            return {
              id: signed_id,
              file: signed_id,
              cover: false,
              src: direct_upload?.url || URL.createObjectURL(file),
              title: filename,
            };
          } catch (error) {
            console.log(error);
            setAlert({
              type: 'warning',
              children: errorAlertTitle(error),
              // messages: errors,
            });
          }
        })
      );
      onUpload(uploadedFiles);
      setIsUploading(false);
      setFilesLength(0);
    },
    [onUpload]
  );

  const errorAlertTitle = (errors) => {
    return `There was ${errors.length} error${
      errors.length > 1 ? 's' : ''
    } with your file. Please correct ${errors.length > 1 ? 'them' : 'it'} and try again.`;
  };

  const onDropAccepted = async (files: File[]) => {
    setAlert(null);
    uploadFiles(files);
  };

  const onDropRejected = async (dropErrors) => {
    setIsUploading(false);
    if (showAlerts) {
      const errors = dropErrors[0].errors.map((error) => {
        switch (error.code) {
          case 'file-too-large':
            return `File is larger than ${bytesToMegabytes(maxSize)}MB`;
          default:
            return error.message;
        }
      });

      setAlert({
        type: 'warning',
        children: errorAlertTitle(errors),
        // messages: errors,
      });
    }
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
    if (isUploading) setAlert(null);
  }, [isUploading]);

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
          <div>
            <p className="text-gray-800 font-normal text-sm">
              <FormattedMessage
                defaultMessage="<a>Browse</a> or drag and drop"
                id="hpOE0K"
                values={{
                  a: (chunks) => <span className="text-green-dark font-medium">{chunks}</span>,
                }}
              />
            </p>
            <p>
              <FormattedMessage defaultMessage="PNG, JPG up to 2MB" id="KIhyKh" />
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
      {alert && <Alerts className="mt-4" {...alert} />}
    </div>
  );
};

export default Uploader;
