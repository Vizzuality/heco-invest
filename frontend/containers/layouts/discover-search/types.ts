export type DiscoverSearchProps = {
  /** Classes to apply to the container */
  className?: string;
  /** Default value for the input. Defaults to `''` */
  defaultValue?: string;
  /** Callback for when a search is performed */
  onSearch?: (searchText: string) => void;
};
