import { PropsWithChildren } from 'react';

import { UseFormSetValue, UseFormWatch, UseFormClearErrors, SetValueConfig } from 'react-hook-form';

export type TagGroupProps = PropsWithChildren<{
  /** classNames to apply to the container */
  className?: string;
  /** `name` of the tag group. Should match the `name` used in the respective Tags*/
  name: string;
  /** Number of children Elements required to show Select All button. Defaults to `4` */
  thresholdToShowSelectAll?: number;
  /** Configuration for setValue. Defaults to: { shouldDirty: true } */
  setValueOptions?: SetValueConfig;
  /** ReactHook Form's `watch` callback */
  watch?: UseFormWatch<any>;
  /** ReactHook Form's `trigger` callback */
  clearErrors?: UseFormClearErrors<any>;
  /** dynamically sets the values of a registered field (react-hook-form) */
  setValue?: UseFormSetValue<any>;
}>;
