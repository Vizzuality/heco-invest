import { PropsWithChildren } from 'react';

import { UseFormSetValue, SetValueConfig } from 'react-hook-form';

export type TagGroupProps = PropsWithChildren<{
  /** Classes to apply to the container */
  className?: string;
  /** Name of the tag group (will be assigned to each individual `<Tag />`) */
  name: string;
  /** Number of tags required to show the “Select All” button. Defaults to `4`. */
  thresholdToShowSelectAll?: number;
  /** React Hook Form's `setValue` function */
  setValue?: UseFormSetValue<any>;
  /** Options for `setValue` function. Defaults to `{ shouldDirty: true, shouldValidate: true }`. */
  setValueOptions?: SetValueConfig;
}>;
