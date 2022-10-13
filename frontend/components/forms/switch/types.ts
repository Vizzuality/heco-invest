import React from 'react';

import { Path, UseFormRegister, RegisterOptions, FieldPath } from 'react-hook-form';

export type SwitchProps<FormValues> = {
  /** ID of the element. Required if `aria-label` is not provided. */
  id?: string;
  /** Label of the element. Required `id` is not provided. */
  'aria-label'?: string;
  /** Name of the switch */
  name: Path<FormValues>;
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** Size of the switch. Defaults to 'small' */
  switchSize?: 'small' | 'smallest';
  /** Whether the switch is disabled. Defaults to false */
  disabled?: boolean;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof RegisterOptions<FormValues, FieldPath<FormValues>>
>;
