export type SortingOptionKey =
  | 'name'
  | 'created_at'
  | 'municipality_total_impact'
  | 'municipality_biodiversity_impact'
  | 'municipality_climate_impact'
  | 'municipality_water_impact'
  | 'municipality_community_impact';

export type SortingOptionType = {
  /** Option key */
  key: SortingOptionKey;
  /** Option label */
  label: string;
};

export type SortingOrderType = 'asc' | 'desc';

export type SortingButtonsProps = {
  /** Classnames to apply to the container */
  className?: string;
  /** Theme to apply to the buttons. Defaults to `text` */
  theme?: 'text' | 'pill';
  /** Current sorting by key */
  sortBy: string;
  /** Current sorting order key */
  sortOrder: SortingOrderType;
  /** Options to display */
  options: SortingOptionType[];
  /** Callback called when the user clicks the sorting buttons */
  onChange?: ({ sortBy, sortOrder }: { sortBy?: string; sortOrder?: SortingOrderType }) => void;
};
