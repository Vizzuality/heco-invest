export type SortingOptionKey =
  | 'name'
  | 'created_at'
  | 'total_impact'
  | 'biodiversity_impact'
  | 'climate_impact'
  | 'water_impact'
  | 'community_impact';

export type SortingOptionType = {
  /** Option key */
  key: SortingOptionKey;
  /** Option label */
  label: string;
};

export type SortingOrderType = 'asc' | 'desc';

export type SortingButtonsProps = {
  className?: string;
  sortBy: string;
  sortOrder: SortingOrderType;
  options: SortingOptionType[];
  onChange?: ({ sortBy, sortOrder }: { sortBy?: string; sortOrder?: SortingOrderType }) => void;
};
