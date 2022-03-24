import { Path, Control, RegisterOptions, FieldPath, UseControllerProps } from 'react-hook-form';

import type { AriaSelectProps } from '@react-types/select';

export type SelectProps<FormValues, T extends object> = {
  /** Name of the input */
  name: Path<FormValues>;
  /** Placeholder of the input */
  placeholder?: string;
  /** Vertical alignment of the dropdown relative to the trigger. Default to `'bottom'`. */
  direction?: 'bottom' | 'top';
  /** String to attach to the input */
  className?: string;
  /** React Hook Form's `control` function */
  control: Control<FormValues, FieldPath<FormValues>>;
  /** Options for React Hook Form's `control` function */
  controlOptions: UseControllerProps<FormValues, FieldPath<FormValues>>['rules'] & {
    /** Whether the input is disabled */
    disabled?: boolean;
  };
} & Omit<
  AriaSelectProps<T>,
  keyof RegisterOptions<FormValues, FieldPath<FormValues>> | 'name' | 'isDisabled' | 'isRequired'
>;
