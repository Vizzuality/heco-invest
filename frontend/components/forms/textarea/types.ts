import React from 'react';

import { Path, UseFormRegister, RegisterOptions, FieldPath } from 'react-hook-form';

export enum TextareaResize {
  Vertically = 'resize-y',
  Horizontally = 'resize-x',
  Resize = 'resize',
  None = 'resize-none',
}

export type TextareaProps<FormValues> = {
  /** ID of the element. Required if `aria-label` is not provided. */
  id?: string;
  /** Label of the element. Required `id` is not provided. */
  'aria-label'?: string;
  /** Number of rows to display. Defaults to `3` */
  rows?: number;
  /** Whether (and how) to allow the textarea to be resized. Defaults to `None` */
  resize?: TextareaResize;
  /** Name of the textarea */
  name: Path<FormValues>;
  /** React Hook Form's `register` function */
  register: UseFormRegister<FormValues>;
  /** Options for React Hook Form's `register` function */
  registerOptions?: RegisterOptions<FormValues, FieldPath<FormValues>>;
  /** Whether the input has an invalid state. Defaults to `false`. */
  invalid?: boolean;
} & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  keyof RegisterOptions<FormValues, FieldPath<FormValues>>
>;
