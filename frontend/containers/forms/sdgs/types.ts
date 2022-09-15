import {
  UseFormSetValue,
  UseFormClearErrors,
  SetValueConfig,
  FieldErrors,
  Path,
  UseFormRegisterReturn,
  RegisterOptions,
  FieldPath,
} from 'react-hook-form';

export type SDGsProps<FormValues> = {
  /** Classnames to apply to the wrapper */
  className?: string;
  /** Name of the SDGs input */
  name: Path<FormValues>;
  /** Number of tags required to show the “Select All” button. Defaults to `4`. */
  thresholdToShowSelectAll?: number;
  /** React Hook Form's `setValue` function */
  setValue: UseFormSetValue<any>;
  /** Options for `setValue` function. Defaults to `{ shouldDirty: true }`. */
  setValueOptions?: SetValueConfig;
  /** ReactHook Form's `clearErrors` callback */
  clearErrors: UseFormClearErrors<any>;
  /** Form validation errors */
  errors: FieldErrors<FormValues>;
  /** React Hook Form's `register` callback */
  register: (name, RegisterOptions) => UseFormRegisterReturn;
  /** Options for React Hook Form's `register` callback */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** Default SDGs value */
  defaultValues?: number[];
};
