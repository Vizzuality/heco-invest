import { useMemo, useEffect, useState, useCallback } from 'react';

// import { FILE_UPLOADER_MAX_SIZE } from 'constants/file-uploader-size-limits';

import { useDropzone } from 'react-dropzone';
import { FormattedMessage, useIntl } from 'react-intl';

import classNames from 'classnames';

import Image from 'next/image';

// import { bytesToMegabytes } from 'utils/units';

import Alerts, { AlertProps } from 'components/alert';

import apiService from 'services/api';

import { UploaderProps } from './types';

/**
 * @param bytes Bytes to convert to Megabytes.
 * @returns Megabytes
 */
export const bytesToMegabytes = (bytes: number): number => {
  return bytes / 1000000;
};

export const FILE_UPLOADER_MAX_SIZE = 1500000;

export const Uploader: React.FC<UploaderProps> = ({
  header,
  footer,
  key = 'file',
  url,
  fileTypes,
  maxFiles = 1,
  maxSize = FILE_UPLOADER_MAX_SIZE,
  autoUpload = false,
  showAlerts = true,
  disabled = false,
  onSelected,
  onRejected,
  onUploading,
  onUpload,
  onError,
}: UploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>(null);
  const { formatMessage } = useIntl();

  // TODO: consider replace by a hook
  const uploadFiles = useCallback(
    (files: File[]) => {
      if (!(files.length > 0)) return;
      if (!url) return;

      setIsUploading(true);
      onUploading && onUploading(isUploading);

      const formData = new FormData();
      files.forEach((file) => formData.append(key, file));

      apiService
        .request({
          method: 'POST',
          url: url,
          data: formData,
        })
        .then((response) => {
          onUpload && onUpload(response);
          if (showAlerts) {
            setAlert({
              type: 'success',
              children: 'Your file was successfully uploaded.',
            });
          }
        })
        .catch(({ request }) => {
          onError && onError(request);
          if (showAlerts) {
            try {
              const errors = JSON.parse(request.response).errors.map(({ title }) => title);

              setAlert({
                type: 'warning',
                children: errorAlertTitle(errors),
                // messages: errors,
              });
            } catch {
              setAlert({
                type: 'warning',
                children: 'There was an error uploading your file. Please try again.',
              });
            }
          }
        })
        .finally(() => {
          setIsUploading(false);
        });
    },
    [isUploading, key, onError, onUpload, onUploading, showAlerts, url]
  );

  const fileTypesString = useMemo(() => {
    return (fileTypes || []).map((fileType) => fileType.toUpperCase()).join(', ');
  }, [fileTypes]);

  const errorAlertTitle = (errors) => {
    return `There was ${errors.length} error${
      errors.length > 1 ? 's' : ''
    } with your file. Please correct ${errors.length > 1 ? 'them' : 'it'} and try again.`;
  };

  const onDropAccepted = async (files: File[]) => {
    setAlert(null);
    setFiles(files);
    onSelected && onSelected(files, { upload: uploadFiles });
    if (autoUpload) {
      uploadFiles(files);
    }
  };

  const onDropRejected = async (dropErrors) => {
    setIsUploading(false);
    onRejected && onRejected(dropErrors);

    if (showAlerts) {
      // TODO: handle all the files errors.
      //       Currently we're only dealing with the first file's errors.
      //       It suits our existing use case but it may not, in the future.
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
    // accept: !!fileTypes && fileTypes.map((f) => ({ [f]: '.' + f })),
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

  useEffect(() => {
    if (!(files.length > 0)) return;
    if (!autoUpload) return;
    uploadFiles(files);
  }, [autoUpload, files, uploadFiles]);

  return (
    <div>
      {header && <div className="text-sm mb-3">{header}</div>}
      <div
        className={classNames(
          'rounded-md border-2 border-dashed py-10 px-4 text-center text-sm focus:outline-green-700',
          {
            'cursor-pointer': !disabled,
            'opacity-50': disabled,
          }
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Image src="/images/image-placeholder.svg" width="38" height="39" alt="Upload file" />
        {!isUploading ? (
          <div>
            <p>
              <FormattedMessage
                defaultMessage="Browse or drag and drop"
                id="8dGhWP"
                values={{ a: <span className="text-green-dark">a</span> }}
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
              values={{ l: 3 }}
            />
          </p>
        )}
      </div>
      {footer && <div className="text-sm mt-3">{footer}</div>}

      <Alerts className="-mb-4" {...alert} />
    </div>
  );
};

export default Uploader;
