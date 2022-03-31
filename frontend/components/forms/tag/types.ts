import React from 'react';

import {
  Path,
  RegisterOptions,
  FieldPath,
  UseFormWatch,
  UseFormRegisterReturn,
  FieldValues,
} from 'react-hook-form';

export type TagProps<FormValues> = {
  /** ID of the element. Required if `aria-label` is not provided. */
  id?: string;
  /** Label of the element. Required `id` is not provided. */
  'aria-label'?: string;
  /** Name of the tag input */
  name: Path<FormValues>;
  /** Value of the element */
  value?: any;
  /** ReactHook Form's `watch` callback */
  watch?: UseFormWatch<FieldValues>;
  /** React Hook Form's `register` callback */
  register: (name, RegisterOptions) => UseFormRegisterReturn;
  /** Options for React Hook Form's `register` callback */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** class to change tag element style */
  className?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof RegisterOptions<FormValues, FieldPath<FormValues>>
>;
