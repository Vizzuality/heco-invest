import {
  Control,
  FieldPath,
  Path,
  UseFormClearErrors,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

export type ImageUploaderProps<FormValues> = {
  /** name of the input */
  name: Path<FormValues>;
  /** id of the input */
  id: string;
  /** React Hook Form's `control` */
  control: Control<any>;
  /** show preview image when uploaded */
  preview?: boolean;
  /** className of the preview component */
  previewClassName?: string;
  /** text showed on the button. Default id 'Upload Image' with translation  */
  buttonText?: string;
  /** React Hook Form's 'setValue' function */
  setValue: UseFormSetValue<any>;
  /** React Hook Form's 'setError' function */
  setError: UseFormSetError<any>;
  /** React Hook Form's 'clearErrors' function */
  clearErrors: UseFormClearErrors<any>;
  /** Max image size in bytes */
  maxSize?: number;
  /** Default image url to show */
  defaultImage?: string;
};
