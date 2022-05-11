export type DiscoverSearchProps = {
  /** Default value for the input. Defaults to `''` */
  defaultValue?: string;
  /** Callback for when a search is performed */
  onSearch?: (searchText: string) => void;
};
