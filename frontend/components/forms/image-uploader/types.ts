import {
  FieldPath,
  Path,
  RegisterOptions,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from 'react-hook-form';

export type ImageUploaderProps<FormValues> = {
  /** name of the input */
  name: Path<FormValues>;
  /** id of the input */
  id: string;
  /** React Hook Form's `register` function */
  register: UseFormRegister<any>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: Omit<RegisterOptions<any, FieldPath<any>>, 'onChange'>;
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
  /** React Hook Form's 'clearError' function */
  clearErrors: UseFormClearErrors<any>;
  /** Max image size in bytes */
  maxSize?: number;
};
