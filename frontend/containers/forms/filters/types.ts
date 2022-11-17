import { Enum } from 'types/enums';

export type FiltersProps = {
  /** Function that closes the filters  */
  closeFilters: () => void;
  /** Search query filters */
  filters: Partial<FilterParams>;
  /** Enums of the filters */
  filtersData: Enum[];
};

export type FilterParams = {
  'filter[category]': string;
  'filter[instrument_type]': string;
  'filter[ticket_size]': string;
  // 'filter[only_verified]': string; VERIFICATION FILTERS: HIDDEN
  'filter[sdg]': string;
  'filter[impact]': string;
};

// These filters are represented by checkboxes. React Hook Form sends their values as follows:
// - `T` if there's only one checkbox with a specific `name` and it is checkcked
// - `false` if there's only one checkbox with a specific `name` and it is not checked
// - `T[]` if there are multiple checkboxes with the same `name` (checked or not)
// The filter suggestions list may render only one checkbox
type FilterFormValue<T> = T | T[] | false;

export type FilterForm = {
  category: FilterFormValue<string>;
  instrument_type: FilterFormValue<string>;
  ticket_size: FilterFormValue<string>;
  // only_verified: boolean; VERIFICATION FILTERS: HIDDEN
  sdg: FilterFormValue<string>;
  impact: FilterFormValue<string>;
  priority_landscape: FilterFormValue<string>;
};
