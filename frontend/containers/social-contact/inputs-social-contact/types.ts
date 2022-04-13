import { UseFormRegister, RegisterOptions, FieldPath, FormState } from 'react-hook-form';

export interface InputSocialContactProps<FormValues> {
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** Form validation errors */
  errors?: FormState<FormValues>['errors'];
}
