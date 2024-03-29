import {
  UseFormSetValue,
  UseFormClearErrors,
  FieldErrors,
  SetValueConfig,
  FieldPath,
  Control,
  Path,
} from 'react-hook-form';

import { ProjectImageGallery } from 'types/project';

export type ProjectGalleryProps<FormValues> = {
  /** Classes to apply to the container */
  className?: string;
  /** Name for the images checkboxes */
  name: Path<FormValues>;
  /** React Hook Form's `setValue` function */
  setValue: UseFormSetValue<any>;
  /** Options for `setValue` function. Defaults to `{ shouldDirty: true }`. */
  setValueOptions?: SetValueConfig;
  /** ReactHook Form's `clearErrors` callback */
  clearErrors: UseFormClearErrors<any>;
  /** React Hook Form's `control` function */
  control: Control<FormValues, FieldPath<FormValues>>;
  /** Form validation errors */
  errors: FieldErrors<FormValues>;
  /** Callback to handle delete image */
  onDeleteImage: (imageFile: ProjectImageGallery['file']) => void;
  /** Callback to handle selecting a cover image */
  onSelectCover: (imageFile: ProjectImageGallery['file']) => void;
  /**  Number of images to display. If not enough images are supplied, placeholders will be generated. Defaults to '6' */
  numImages?: number;
};
