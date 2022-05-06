export type DiscoverSearchProps = {
  /** Default value for the input. Defaults to `false` */
  defaultValue?: string;
  /** Callback for when a search is performed */
  onSearch?: (searchText: string) => void;
};
