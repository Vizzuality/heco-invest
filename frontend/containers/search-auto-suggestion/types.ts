import { Enum } from 'types/enums';

export type SeachAutoSuggestionProps = {
  searchText?: string;
  closeSuggestions: () => void;
  onFilterSuggestion: (filter: Enum) => void;
  onSearchSuggestion: () => void;
};
