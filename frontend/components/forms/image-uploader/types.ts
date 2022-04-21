import { Path, UseFormRegister } from 'react-hook-form';

export type ImageUploaderProps<FormValues> = {
  name: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  preview?: boolean;
  text?: string;
  handleChangeImage: () => void;
};
