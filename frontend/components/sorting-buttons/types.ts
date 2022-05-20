export type SortingOptionType = {
  /** Option key */
  key: string;
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
