import { FieldPath, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

export type ImageUploaderProps<FormValues> = {
  /** name of the input */
  name: Path<FormValues>;
  /** id of the input */
  id: string;
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: Omit<RegisterOptions<FormValues, FieldPath<FormValues>>, 'onChange'>;
  /** show preview image when uploaded */
  preview?: boolean;
  /** className of the preview component */
  previewClassName?: string;
  /** text showed on the button. Default id 'Upload Image' with translation  */
  buttonText?: string;
};
