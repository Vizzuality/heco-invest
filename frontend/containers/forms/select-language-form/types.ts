import { UseFormRegister, FieldErrors, Path } from 'react-hook-form';

export type SelectLanguageFormProps<FormValues> = {
  /** Form field name */
  fieldName: Path<FormValues>;
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** React Hook Form's state 'errors' function */
  errors: FieldErrors<FormValues>;
};
