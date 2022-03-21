import React, { InputHTMLAttributes } from 'react';

import { Path, UseFormRegister, RegisterOptions, FieldPath } from 'react-hook-form';

export type CheckboxProps<FormValues> = {
  /** ID of the element. Required if `aria-label` is not provided. */
  id?: string;
  /** Label of the element. Required `id` is not provided. */
  'aria-label'?: string;
  /** Name of the input */
  name: Path<FormValues>;
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** class to change checkbox element style */
  className?: string;

  disabled?: boolean;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof RegisterOptions<FormValues, FieldPath<FormValues>>
>;
