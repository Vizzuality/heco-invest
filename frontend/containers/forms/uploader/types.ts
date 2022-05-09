import { Accept } from 'react-dropzone';
import {
  Path,
  RegisterOptions,
  FieldPath,
  UseFormRegisterReturn,
  UseFormSetError,
  UseFormClearErrors,
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
  /** React Hook Form's `register` function */
  register: (name: Path<FormValues>, options?: RegisterOptions) => UseFormRegisterReturn;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
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
