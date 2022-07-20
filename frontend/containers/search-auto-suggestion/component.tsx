import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useFilterNames } from 'helpers/pages';

import Button from 'components/button';
import { Enum } from 'types/enums';

import { useEnums } from 'services/enums/enumService';

import { SeachAutoSuggestionProps } from './types';

export const SearchAutoSugegstion: FC<SeachAutoSuggestionProps> = ({
  searchText,
  closeSuggestions,
  onFilterSuggestion,
  onSearchSuggestion,
  showSuggestion,
}) => {
  const [autoSuggestions, setAutoSuggestions] = useState<Enum[]>();
  const { data, isLoading } = useEnums();

  const filterNames = useFilterNames();

  const filters: Enum[] = useMemo(() => {
    if (!isLoading) {
      const { category, ticket_size, instrument_type, impact, sdg } = data;
      return [category, ticket_size, instrument_type, impact, sdg].flat();
    }
  }, [isLoading]);

  const handleCloseSuggestions = useCallback(() => {
    closeSuggestions();
    setAutoSuggestions(undefined);
  }, [closeSuggestions]);

  useEffect(() => {
    if (searchText.length > 1) {
      const filtersToSuggest = filters
        ?.filter(({ name }) => name.toLowerCase().includes(searchText.toLowerCase()))
        .sort((a) => {
          // Return the ones that match the beginning of the search text first
          return a.name.toLowerCase().startsWith(searchText.toLowerCase()) ||
            a.id[0] === searchText.toLowerCase()[0]
            ? -1
            : 1;
        });
      if (filtersToSuggest?.length) {
        setAutoSuggestions(filtersToSuggest);
        return;
      }
    }
    handleCloseSuggestions();
  }, [closeSuggestions, filters, searchText]);

  return (
    <div
      id="filters"
      role="region"
      aria-labelledby="filters-button"
      className={cx('w-full bg-white -mt-1 rounded-b-4xl drop-shadow-xl transition-all ease-in', {
        'h-fit border-t-gray-200 border-t-2': showSuggestion,
        'h-0 overflow-hidden': !showSuggestion,
      })}
    >
      {showSuggestion && (
        <div className="py-5 px-9">
          <div>
            <Button key="custom" theme="naked" className="px-0 py-2" onClick={onSearchSuggestion}>
              &quot;{searchText}&quot;
              <span className="ml-2 text-gray-600">
                <FormattedMessage defaultMessage="Custom search" id="AoHRBG" />
              </span>
            </Button>
          </div>
          <div
            className={cx('overflow-hidden', {
              'h-0': !autoSuggestions?.length,
              'h-auto': autoSuggestions?.length,
            })}
          >
            <div>
              <p className="py-2 text-sm text-gray-800">
                <FormattedMessage defaultMessage="Filters" id="zSOvI0" />
              </p>
            </div>
            <div className="flex flex-col">
              {autoSuggestions?.map((item) => (
                <Button
                  key={item.id}
                  theme="naked"
                  className="px-0"
                  onClick={() => onFilterSuggestion(item)}
                >
                  {item.name}
                  <span className="ml-2 text-gray-600">{filterNames[item.type]}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutoSugegstion;
