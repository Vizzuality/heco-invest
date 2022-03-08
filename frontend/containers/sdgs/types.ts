import { SDGS_SIZES } from './constants';

export type SDGType = {
  /** Identifier */
  id: string;
  /** Title */
  title: string;
};

export type SDGsProps = {
  /** Classnames to apply to the wrapper */
  className?: string;
  /** SDGs size `small` | `large`. Defaults to `small` */
  size?: keyof typeof SDGS_SIZES;
  /** Array of SDGType items to display */
  sdgs?: SDGType[];
};
