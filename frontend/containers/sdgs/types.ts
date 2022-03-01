import { SDGS_SIZES } from './constants';

export type SDGsProps = {
  /** Classnames to apply to the wrapper */
  className?: string;
  /** SDGs size `small` | `large`. Defaults to `small` */
  size?: keyof typeof SDGS_SIZES;
  /** Ids of SDG's to display. Defaults to all available ids */
  ids?: string[];
  /** Whether the user can select SDGs. Defaults to `false` */
  selectable?: boolean;
  /** Ids to show as selected initially. Defaults to all available ids */
  selectedIds?: string[];
  /** Callback for when the changes the SDG selection */
  onChange?: (ids: string[]) => void;
};
