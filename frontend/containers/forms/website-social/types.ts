import { UseFormRegister, RegisterOptions, FieldPath, FormState } from 'react-hook-form';

export type WebsiteSocialInputTypes = {
  website: string;
  twitter: string;
  facebook: string;
  linkedin: string;
  instagram: string;
};

export interface WebsiteSocialProps<FormValues> {
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** Form validation errors */
  errors?: FormState<FormValues>['errors'];
}
