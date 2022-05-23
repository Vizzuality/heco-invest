import {
  UseFormSetValue,
  UseFormClearErrors,
  FieldErrors,
  SetValueConfig,
  UseFormRegisterReturn,
  FieldPath,
  RegisterOptions,
} from 'react-hook-form';

import type { ProjectGalleryImageType } from './project-gallery-image';

export type ProjectGalleryProps<FormValues> = {
  /** Classes to apply to the container */
  className?: string;
  /** Images to display */
  images: ProjectGalleryImageType[];
  /** Default selected image (by id) */
  defaultSelected?: string;
  /** Name for the images checkboxes */
  name: string;
  /** React Hook Form's `setValue` function */
  setValue: UseFormSetValue<any>;
  /** Options for `setValue` function. Defaults to `{ shouldDirty: true }`. */
  setValueOptions?: SetValueConfig;
  /** ReactHook Form's `clearErrors` callback */
  clearErrors: UseFormClearErrors<any>;
  /** React Hook Form's `register` callback */
  register: (name, RegisterOptions) => UseFormRegisterReturn;
  /** Options for React Hook Form's `register` callback */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** Form validation errors */
  errors: FieldErrors<FormValues>;
  /** Callback to handle delete image */
  onDeleteImage: (imageId: string) => void;
};
