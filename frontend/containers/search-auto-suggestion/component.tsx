import { FC, useEffect, useMemo, useState } from 'react';

import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { omit, pickBy, values } from 'lodash-es';

import { useFilterNames, useQueryParams } from 'helpers/pages';

import Button from 'components/button';
import { EnumTypes } from 'enums';
import { Enum } from 'types/enums';

import { useEnums } from 'services/enums/enumService';

import { SeachAutoSuggestionProps } from './types';

type Filters = Partial<{
  [key in EnumTypes]: Enum;
}>;

export const SearchAutoSugegstion: FC<SeachAutoSuggestionProps> = ({
  searchText,
  onCangeOpenSuggestion,
}) => {
  const [autoSuggestions, setAutoSuggestions] = useState<Enum[]>();
  const { data, isLoading } = useEnums();
  const { page, search, sorting, ...initialFilters } = useQueryParams();
  const { push } = useRouter();
  const filterNames = useFilterNames();

  const filters: Filters = useMemo(() => {
    if (!isLoading) {
      const { category, ticket_size, instrument_type, impact, sdg } = data;
      return [category, ticket_size, instrument_type, impact, sdg].flat().reduce((prev, curr) => {
        return { ...prev, [curr.name.toLowerCase()]: curr };
      }, {});
    }
  }, [data, isLoading]);

  const closeSuggestions = () => {
    onCangeOpenSuggestion(false);
    setAutoSuggestions(undefined);
  };

  useEffect(() => {
    if (searchText.length > 1) {
      const isFilter = pickBy(filters, (v, key) => key.includes(searchText.toLowerCase()));
      const filtersToSuggest = values(isFilter);
      if (filtersToSuggest.length) {
        onCangeOpenSuggestion(true);
        setAutoSuggestions(filtersToSuggest);
        return;
      }
      closeSuggestions();
    }
    closeSuggestions();
  }, [searchText]);

  const handleFilter = (filter: Enum) => {
    const filterKey = `filter[${filter.type}]`;
    const newFilters = omit(initialFilters, filterKey);
    push(
      {
        query: {
          page: 1,
          search,
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
  };

  const handleSearch = () => {
    push(
      {
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
        <div className="px-9 py-5">
          <div>
            <Button key="custom" theme="naked" className="px-0 py-2" onClick={handleSearch}>
              &quot;{searchText}&quot;
              <span className="text-gray-600 ml-2">
                <FormattedMessage defaultMessage="Custom search" id="AoHRBG" />
              </span>
            </Button>
          </div>
          <div>
            <p className="text-sm text-gray-800">
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
                <span className="text-gray-600 ml-2">{filterNames[item.type]}</span>
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAutoSugegstion;
