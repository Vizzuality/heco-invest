export type FiltersProps = {
  closeFilters: () => void;
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
