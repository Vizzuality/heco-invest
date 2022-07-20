import { SubmitHandler } from 'react-hook-form';

export type FiltersProps = {
  /** Function that closes the filters  */
  closeFilters: () => void;
  /** Filters input values */
  filtersInputValue: Partial<FilterForm>;
  /** Function to set the filters values */
  setFiltersInputValue: (filtersInputValue: Partial<FilterForm>) => void;
  /** Function that adds the filters to the query params  */
  onSubmitFilters: (filters: Partial<FilterForm>) => void;
};

export type FilterParams = {
  'filter[category]': string;
  'filter[instrument_type]': string;
  'filter[ticket_size]': string;
  'filter[only_verified]': string;
  'filter[sdg]': string;
  'filter[impact]': string;
};

export type FilterForm = {
  category: string;
  instrument_type: string;
  ticket_size: string;
  only_verified: boolean;
  sdg: string;
  impact: string;
};
