import { PropsWithChildren } from 'react';

import { Path, Control, FieldPath, UseControllerProps } from 'react-hook-form';

export type MultiComboboxProps<FormValues> = PropsWithChildren<{
  /** ID attribute of the input */
  id: string;
  /** Name of the input */
  name: Path<FormValues>;
  /** Aria label to attach to the input */
  'aria-label'?: string;
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
  /** List of disabled options */
  disabledKeys?: string[];
  /** Whether the dropdown needs to overflow its container. Default to `false`. */
  overflow?: boolean;
  /** Whether the user can clear the input. Default to `false`. */
  clearable?: boolean;
}>;
