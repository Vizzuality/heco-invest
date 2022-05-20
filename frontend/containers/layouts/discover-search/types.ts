export type DiscoverSearchProps = {
  /** Classes to apply to the container */
  className?: string;
  /** Text to set the input to. Defaults to `''` */
  searchText?: string;
  /** Callback for when a search is submitted */
  onSearch?: (searchText: string) => void;
  /** Callback for when the search text changes */
  onSearchChange?: (searchText: string) => void;
  /** Filters as children */
  children?: JSX.Element;
};
