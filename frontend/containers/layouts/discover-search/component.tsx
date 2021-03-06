import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';

import { Search as SearchIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { useDiscoverPath, useQueryParams } from 'helpers/pages';

import Filters from 'containers/forms/filters';
import { FilterForm, FilterParams } from 'containers/forms/filters/types';
import SearchAutoSuggestion from 'containers/search-auto-suggestion';

import Button from 'components/button';
import Icon from 'components/icon';
import { Enum } from 'types/enums';

import { DiscoverSearchProps } from './types';

export const DiscoverSearch: FC<DiscoverSearchProps> = ({
  className,
  searchButtonText = <FormattedMessage defaultMessage="Search" id="xmcVZ0" />,
}) => {
  const { formatMessage } = useIntl();
  const { push } = useRouter();
  const { search, sorting, page, ...filters } = useQueryParams();
  const pathname = useDiscoverPath();

  const [openFilters, setOpenFilters] = useState(false);
  const [filtersInputValue, setFiltersInputValue] = useState<Partial<FilterForm>>({});
  const filtersQuantity = useMemo(() => Object.keys(filters)?.length, [filters]);

  const [showSuggestion, setShowSuggestions] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState<string>('');

  useEffect(() => {
    setSearchInputValue(search);
  }, [search]);

  useEffect(() => {
    const filterInputs: Partial<FilterForm> = {};

    Object.entries(filters).forEach(([key, value]) => {
      // Change the filter param name to the form input name
      const filterName = key.replace('filter[', '').replace(']', '');
      const filterValue = filterName === 'only_verified' ? JSON.parse(value) : value;

      filterInputs[filterName] = filterValue;
    });
    setFiltersInputValue(filterInputs);
    setShowSuggestions(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (searchInput: string, filtersInput: Partial<FilterParams>) => {
    push(
      { query: { sorting, page: 1, search: searchInput, ...filtersInput }, pathname },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleSubmitSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    const filterParams = getFilterParams(filtersInputValue);
    handleSearch(searchInputValue, filterParams);
    setShowSuggestions(false);
  };

  const handleChangeSearchInput = (e: SyntheticEvent<HTMLInputElement>) => {
    setSearchInputValue(e.currentTarget.value);
    setShowSuggestions(searchInputValue?.length > 1);
  };

  const getFilterParams = (filters: Partial<FilterForm>) => {
    let filterParams: Partial<FilterParams> = {};
    Object.entries(filters).forEach(([key, value]) => {
      // Just send the used filters
      if (value) {
        filterParams[`filter[${key}]`] = `${value}`;
      }
    });
    return filterParams;
  };

  const handleSubmitFilters = (filters: FilterForm) => {
    setFiltersInputValue(filters);
    const filterParams = getFilterParams(filters);
    handleSearch(searchInputValue, filterParams);
    setOpenFilters(false);
    setShowSuggestions(false);
  };

  const handleFilterSuggestion = (filter: Enum) => {
    const filterKey = `filter[${filter.type}]`;
    handleSearch('', { ...filters, [filterKey]: filter.id });
    setFiltersInputValue({ ...filtersInputValue, [filter.type]: filter.id });
    setShowSuggestions(false);
    setSearchInputValue('');
  };

  const handleSearchSuggestion = () => {
    handleSearch(searchInputValue, filters);
    setShowSuggestions(false);
  };

  return (
    <div className={className}>
      <div
        className={cx('z-10 relative w-full sm:h-16 text-black bg-white border drop-shadow-xl', {
          'rounded-full': !openFilters && !showSuggestion,
          'rounded-t-4xl': openFilters || showSuggestion,
        })}
      >
        <div
          className={cx('flex items-center justify-between px-6 py-3 sm:gap-4', {
            'py-4': openFilters || showSuggestion,
          })}
        >
          <form
            role="search"
            className="flex flex-col items-center justify-end w-full h-full gap-1 sm:justify-between sm:gap-3 sm:flex-row"
            onSubmit={handleSubmitSearch}
          >
            <div className="flex items-center gap-2 flex-grow">
              <Icon
                aria-hidden={true}
                icon={SearchIcon}
                className="w-6 h-6 mr-2 sm:w-8 sm:h-8 text-green-dark"
              />
              <label htmlFor="header-search" className="sr-only">
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </label>
              <input
                id="header-search"
                type="search"
                value={searchInputValue}
                className="w-full h-full text-lg outline-none autofill:bg-transparent"
                onChange={handleChangeSearchInput}
                placeholder={formatMessage({
                  defaultMessage: 'Search for projects, investors, open calls...',
                  id: 'BZG0d+',
                })}
              />
            </div>
            <div
              className={cx(
                'flex items-center gap-4 sm:gap-6 sm:justify-self-end transition-all ease-in-out duration-300 flex-grow-0',
                {
                  'w-0 h-0 overflow-hidden opacity-0': openFilters,
                  'w-auto opacity-100': !openFilters,
                }
              )}
            >
              {/* Filters accordion header https://www.w3.org/WAI/ARIA/apg/example-index/accordion/accordion.html */}
              <h3>
                <Button
                  className="inline px-4 py-2 font-normal text-center bg-white text-green-dark hover:text-green-light focus-visible:outline-green-dark"
                  id="filters-button"
                  theme="naked"
                  onClick={() => setOpenFilters(!openFilters)}
                  aria-expanded={openFilters}
                  aria-controls="filters"
                >
                  <FormattedMessage defaultMessage="Filters" id="zSOvI0" />
                  <span
                    className={cx(
                      'flex items-center justify-center h-6 px-0 py-0 rounded-full border border-bg-green-light bg-green-light bg-opacity-30 text-green-dark font-bold text-xs transition-all ease-in',
                      {
                        'opacity-100 w-6 ml-2': !!filtersQuantity,
                        'opacity-0 w-0 ml-0': !filtersQuantity,
                      }
                    )}
                  >
                    {filtersQuantity}
                  </span>
                </Button>
              </h3>
              <Button type="submit" className="h-full font-normal" theme="primary-orange">
                {searchInputValue ? (
                  <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
                ) : (
                  searchButtonText
                )}
              </Button>
            </div>
          </form>
        </div>
        {/* Filters accordion pannel */}
        <div
          id="filters"
          role="region"
          aria-labelledby="filters-button"
          className={cx('w-full bg-white rounded-b-4xl drop-shadow-xl transition-all ease-in', {
            'h-fit border-t-gray-200 border-t-2 overflow-hidden': openFilters,
            'h-0 border-none overflow-hidden': !openFilters,
          })}
        >
          {openFilters && (
            <Filters
              closeFilters={() => setOpenFilters(false)}
              filtersInputValue={filtersInputValue}
              setFiltersInputValue={(filters: Partial<FilterForm>) => setFiltersInputValue(filters)}
              onSubmitFilters={handleSubmitFilters}
            />
          )}
        </div>
        {!openFilters && showSuggestion && (
          <SearchAutoSuggestion
            closeSuggestions={() => setShowSuggestions}
            searchText={searchInputValue}
            onFilterSuggestion={handleFilterSuggestion}
            onSearchSuggestion={handleSearchSuggestion}
            showSuggestion={showSuggestion}
          />
        )}
      </div>
    </div>
  );
};

export default DiscoverSearch;
