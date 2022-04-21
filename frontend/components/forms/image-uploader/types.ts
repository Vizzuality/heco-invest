import { FieldPath, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

export type ImageUploaderProps<FormValues> = {
  /** name of the input */
  name: Path<FormValues>;
  /** id of the input */
  id: string;
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** show preview image when uploaded */
  preview?: boolean;
  /** text showed on the button. Default id 'Upload Image' with translation  */
  text?: string;
  /** callback called when input changes (the image is uploaded) */
  handleChangeImage: () => void;
};
