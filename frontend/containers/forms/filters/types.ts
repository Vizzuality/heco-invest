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

export type FilterForm = {
  category: string[];
  instrument_type: string[];
  ticket_size: string[];
  // only_verified: boolean; VERIFICATION FILTERS: HIDDEN
  sdg: string[];
  impact: string[];
};
