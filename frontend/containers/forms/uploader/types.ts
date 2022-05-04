import { Accept } from 'react-dropzone';
import { Path, RegisterOptions, FieldPath, UseFormRegisterReturn } from 'react-hook-form';

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
  /** Whether the uploader should be disabled (both for drop and click).  Defaults to `false`. */
  disabled?: boolean;
  /** name of the input */
  name: Path<FormValues>;
  /** id of the input */
  id: string;
  /** React Hook Form's `register` function */
  register: (name: Path<FormValues>, options?: RegisterOptions) => UseFormRegisterReturn;
  /** Options for React Hook Form's `register` function */
  registerOptions?: Omit<RegisterOptions<FormValues, FieldPath<FormValues>>, 'onChange'>;
  /** Handle the uploaded files */
  onUpload: (uploadedImages: ProjectImageGallery[]) => void;
};
