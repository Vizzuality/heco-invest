import { PropsWithChildren } from 'react';

import { UseFormSetValue, UseFormClearErrors, SetValueConfig, FieldErrors } from 'react-hook-form';

export type TagGroupProps<FormValues> = PropsWithChildren<{
  /** Classes to apply to the container */
  className?: string;
  /** Name of the tag group (will be assigned to each individual `<Tag />`) */
  name: string;
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
}>;
