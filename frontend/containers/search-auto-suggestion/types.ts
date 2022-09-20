import { FilterParams } from 'containers/forms/filters/types';

import { Enum } from 'types/enums';

export type SeachAutoSuggestionProps = {
  /** Text inputed on the search box */
  searchText?: string;
  /** Search query filters */
  filters: Partial<FilterParams>;
  /** Enums of filters */
  filtersData: Enum[];
};
