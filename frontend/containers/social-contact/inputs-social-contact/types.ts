import { UseFormRegister, RegisterOptions, FieldPath, FormState } from 'react-hook-form';

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
  /** Message to display when there is an errro */
  errors?: FormState<FormValues>['errors'];
}
