import { UseFormRegister, RegisterOptions, FieldPath } from 'react-hook-form';

export type SocialContactInputs = {
  website: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
};

export interface InputSocialContactProps<FormValues> {
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
}
