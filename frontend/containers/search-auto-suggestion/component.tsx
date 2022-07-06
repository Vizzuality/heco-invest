import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { omit } from 'lodash-es';

import { useDiscoverPath, useFilterNames, useQueryParams } from 'helpers/pages';

import Button from 'components/button';
import { Enum } from 'types/enums';

import { useEnums } from 'services/enums/enumService';

import { SeachAutoSuggestionProps } from './types';

export const SearchAutoSugegstion: FC<SeachAutoSuggestionProps> = ({
  searchText,
  onChangeOpenSuggestion,
}) => {
  const [autoSuggestions, setAutoSuggestions] = useState<Enum[]>();
  const { data, isLoading } = useEnums();
  const { page, search, sorting, ...initialFilters } = useQueryParams();
  const { push } = useRouter();
  const pathname = useDiscoverPath();

  const filterNames = useFilterNames();

  const filters: Enum[] = useMemo(() => {
    if (!isLoading) {
      const { category, ticket_size, instrument_type, impact, sdg } = data;
      return [category, ticket_size, instrument_type, impact, sdg].flat();
    }
  }, [isLoading]);

  const closeSuggestions = useCallback(() => {
    onChangeOpenSuggestion(false);
    setAutoSuggestions(undefined);
  }, [onChangeOpenSuggestion]);

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
        onChangeOpenSuggestion(true);
        setAutoSuggestions(filtersToSuggest);
        return;
      }
      closeSuggestions();
    }
    closeSuggestions();
  }, [closeSuggestions, filters, onChangeOpenSuggestion, searchText]);

  const handleFilter = (filter: Enum) => {
    const filterKey = `filter[${filter.type}]`;
    const newFilters = omit(initialFilters, filterKey);
    push(
      {
        pathname,
        query: {
          page: 1,
          sorting,
          ...newFilters,
          [filterKey]: filter.id,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
    closeSuggestions();
  };

  const handleSearch = () => {
    push(
      {
        pathname,
        query: {
          page: 1,
          search: searchText,
          sorting,
          ...initialFilters,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
    closeSuggestions();
  };

  return (
    <div
      id="filters"
      role="region"
      aria-labelledby="filters-button"
      className={cx(
        'h-0 w-full bg-white -mt-1 rounded-b-4xl drop-shadow-xl transition-all ease-in',
        {
          'h-fit border-t-gray-200 border-t-2 overflow-hidden': !!autoSuggestions,
        }
      )}
    >
      {!!autoSuggestions?.length && (
        <div className="py-5 px-9">
          <div>
            <Button key="custom" theme="naked" className="px-0 py-2" onClick={handleSearch}>
              &quot;{searchText}&quot;
              <span className="ml-2 text-gray-600">
                <FormattedMessage defaultMessage="Custom search" id="AoHRBG" />
              </span>
            </Button>
          </div>
          <div>
            <p className="py-2 text-sm text-gray-800">
              <FormattedMessage defaultMessage="Filters" id="zSOvI0" />
            </p>
          </div>
          <div className="flex flex-col">
            {autoSuggestions.map((item) => (
              <Button
                key={item.id}
                theme="naked"
                className="px-0"
                onClick={() => handleFilter(item)}
              >
                {item.name} {item.type}
                <span className="ml-2 text-gray-600">{filterNames[item.type]}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutoSugegstion;
