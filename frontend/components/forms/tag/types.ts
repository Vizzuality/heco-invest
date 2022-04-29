import React from 'react';

import {
  Path,
  RegisterOptions,
  FieldPath,
  FieldValues,
  UseFormRegisterReturn,
  UseFormWatch,
} from 'react-hook-form';

export type TagProps<FormValues> = {
  /** ID of the element */
  id: string;
  /** Name of the tag input */
  name: Path<FormValues>;
  /**
   * Value of the input. Set this if there are multiple tags with the same name (multiple choices).
   */
  value?: string;
  /** React Hook Form's `register` callback */
  register: (name, RegisterOptions) => UseFormRegisterReturn;
  /** Options for React Hook Form's `register` callback */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** Classes to apply to the container */
  className?: string;
  /** Whether the input is invalid. Defaults to `false`. */
  invalid?: boolean;
  /** label className change to flex for labels with rows */
  flexLabel?: boolean;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof RegisterOptions<FormValues, FieldPath<FormValues>>
>;
