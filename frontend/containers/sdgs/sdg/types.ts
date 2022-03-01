import { AriaToggleButtonProps } from '@react-types/button';

import { SDGS_SIZES } from '../constants';

export type SDGType = {
  /** Identifier */
  id: string;
  /** Title */
  title: string;
  /** Path to image */
  image: string;
};

export type SDGProps = {
  /** SDGs size `small` | `large`. Defaults to `small` */
  size?: keyof typeof SDGS_SIZES;
  /** Whether the user can select SDGs. Defaults to `false` */
  selectable?: boolean;
} & Pick<SDGType, 'id'> &
  AriaToggleButtonProps;
