import { Accept } from 'react-dropzone';
import {
  Path,
  Control,
  UseFormSetError,
  UseFormClearErrors,
  FieldPath,
  UseControllerProps,
} from 'react-hook-form';

import { ProjectImageGallery } from 'types/project';

export type UploaderProps<FormValues> = {
  /** Accepted file types. */
  fileTypes?: Accept;
  /** Number of max files that the uploader will accept. Defaults to `1`*/
  maxFiles?: number;
  /** Maximum size of the uploaded files, in bytes. Defaults to the value set in the constant `FILE_UPLOADER_MAX_SIZE`, defined in `src/constants/file-uploader-size-limits.ts` */
  maxSize?: number;
  /** Whether the uploader should show error messages, warnings, successful upload messages. Defaults to `true` */
  showAlerts?: boolean;
  /** name of the input */
  name: Path<FormValues>;
  /** id of the input */
  id: string;
  /** React Hook Form's control */
  control: Control<any>;
  /** React Hook Form's control options */
  controlOptions: UseControllerProps<FormValues, FieldPath<FormValues>>['rules'] & {
    /** Whether the input is disabled */
    disabled?: boolean;
  };
  /** React Hook Form's `setError` function */
  setError: UseFormSetError<any>;
  /** ReactHook Form's `clearErrors` callback */
  clearErrors: UseFormClearErrors<any>;
  /** Handle the uploaded files */
  onUpload: (uploadedImages: ProjectImageGallery[]) => void;
};

export enum UploadErrorCode {
  FileInvalidType = 'file-invalid-type',
  FileTooLarge = 'file-too-large',
  FileTooSmall = 'file-too-small',
  TooManyFiles = 'too-many-files',
}
