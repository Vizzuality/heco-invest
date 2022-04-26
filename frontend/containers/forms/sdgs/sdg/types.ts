import React from 'react';

import { Path, RegisterOptions, FieldPath, UseFormRegisterReturn } from 'react-hook-form';

export type SDGProps<FormValues> = {
  /** ID of the element */
  id: string;
  /** Name of the tag input */
  name: Path<FormValues>;
  /** Image to show to the user */
  image: string;
  /** Title of the SDG */
  title: string;
  /** React Hook Form's `register` callback */
  register: (name, RegisterOptions) => UseFormRegisterReturn;
  /** Options for React Hook Form's `register` callback */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** Classes to apply to the container */
  className?: string;
  /** Whether the input is invalid. Defaults to `false`. */
  invalid?: boolean;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  keyof RegisterOptions<FormValues, FieldPath<FormValues>>
>;
