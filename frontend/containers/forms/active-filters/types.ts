import { Enum } from 'types/enums';

import { FilterParams } from '../filters/types';

export type ActiveFilterProps = {
  /** Search query filters */
  filters: Partial<FilterParams>;
  /** Enums of the filters */
  filtersData: Enum[];
};
