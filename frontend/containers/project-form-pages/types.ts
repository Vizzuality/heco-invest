import {
  UseFormRegister,
  RegisterOptions,
  FieldPath,
  FieldErrors,
  Control,
  UseControllerProps,
  UseFormGetValues,
} from 'react-hook-form';

export type ProjectFormPagesProps<FormValues> = {
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  errors: FieldErrors<FormValues>;
  control?: Control<FormValues, FieldPath<FormValues>>;
  /** Options for React Hook Form's `control` function */
  controlOptions?: UseControllerProps<FormValues, FieldPath<FormValues>>['rules'] & {
    /** Whether the input is disabled */
    disabled?: boolean;
  };
  getValues?: UseFormGetValues<FormValues>;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof RegisterOptions<FormValues, FieldPath<FormValues>>
>;
