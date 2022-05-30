import {
  Path,
  Control,
  RegisterOptions,
  FieldPath,
  UseControllerProps,
  UseFormResetField,
} from 'react-hook-form';

import type { ComboBoxProps } from '@react-types/combobox';

export type ComboboxProps<FormValues, T extends object> = {
  /** ID of the input */
  id: string;
  /** Name of the input */
  name: Path<FormValues>;
  /** Placeholder of the input */
  placeholder?: string;
  /** Vertical alignment of the dropdown relative to the trigger. Default to `'bottom'`. */
  direction?: 'bottom' | 'top';
  /** String to attach to the input */
  className?: string;
  /** If the component will display the clear button. Default to `false`. */
  clearable?: boolean;
  /** React Hook Form's `control` function */
  control: Control<FormValues, FieldPath<FormValues>>;
  /** Options for React Hook Form's `control` function */
  controlOptions: UseControllerProps<FormValues, FieldPath<FormValues>>['rules'] & {
    /** Whether the input is disabled */
    disabled?: boolean;
  };
} & Omit<
  ComboBoxProps<T>,
  | keyof RegisterOptions<FormValues, FieldPath<FormValues>>
  | 'name'
  | 'isDisabled'
  | 'isRequired'
  | 'inputValue'
  | 'defaultInputValue'
  | 'onInputChange'
>;
