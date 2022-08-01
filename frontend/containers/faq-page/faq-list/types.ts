import { PropsWithChildren } from 'react';

export enum ItemValidationTypes {
  YesNo = 'yes-no',
  SelectOne = 'select-one',
  SelectMultiple = 'select-multiple',
  Max600Chars = 'max-600-caracters',
  Max36Months = 'max-36-months',
}

export type FaqListProps = PropsWithChildren<{
  /** ClassNames to apply to the container */
  className?: string;
  /** List nesting level. Defaults to `one` */
  level?: 'one' | 'two' | 'three';
}>;

export type ListItemProps = PropsWithChildren<{
  /** ClassNames to apply to the container */
  className?: string;
  /** Title of the list item */
  title: string;
  /** Description of the list item */
  description?: string;
  /** Whether the description should be displayed inline with the title. Defaults to `false` */
  inlineDescription?: boolean;
  /** Validation type. Defaults to `none` */
  validationType?: ItemValidationTypes;
  /** Whether it is mandatory field. Defaults to `false` */
  mandatory?: boolean;
}>;
