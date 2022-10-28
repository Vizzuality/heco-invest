import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';

import { Search as SearchIcon, X as CloseIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { values } from 'lodash-es';

import { useFiltersEnums, useQueryParams, useSearch } from 'helpers/pages';

import ActiveFilters from 'containers/forms/active-filters';
import Filters from 'containers/forms/filters';
import SearchAutoSuggestion from 'containers/search-auto-suggestion';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';

import FilterIcon from 'svgs/discover/filters.svg';

import { DiscoverSearchProps } from './types';

export const DiscoverSearch: FC<DiscoverSearchProps> = ({ className }) => {
  const { formatMessage } = useIntl();
  const { pathname } = useRouter();
  const { search, sorting, page, ...filters } = useQueryParams();
  const doSearch = useSearch();
  const filtersData = useFiltersEnums();

  const [openFilters, setOpenFilters] = useState(false);
  const [showSuggestion, setShowSuggestions] = useState(false);

  const [searchInputValue, setSearchInputValue] = useState<string>('');

  const activeFiltersLength = useMemo(() => values(filters).length, [filters]);
  const showActiveFilters = !!activeFiltersLength;

  useEffect(() => {
    setSearchInputValue(search);
  }, [search]);

  useEffect(() => {
    setShowSuggestions(false);
  }, []);

  const handleSubmitSearch = (e: SyntheticEvent) => {
    e.preventDefault();
    doSearch(searchInputValue, filters);
    setShowSuggestions(false);
    setOpenFilters(false);
  };

  const handleChangeSearchInput = (e: SyntheticEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value?.length >= 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    setSearchInputValue(value);
    setOpenFilters(false);
  };

  const clearInput = () => {
    setSearchInputValue('');
    setShowSuggestions(false);
    if (pathname !== Paths.Home) {
      doSearch('', filters);
    }
  };

  const handleClickFilters = () => {
    setOpenFilters(true);
  };

  const handleClickInput = () => {
    setOpenFilters(true);
    setShowSuggestions(false);
  };

  return (
    <div className={className}>
      <div
        className={cx(
          'relative z-10 sm:w-full sm:overflow-visible text-black bg-white drop-shadow-xl rounded-full',
          {
            'sm:rounded-3xl': showActiveFilters,
            'sm:rounded-t-3xl sm:rounded-b-none rounded-t-3xl rounded-b-none mb-0 h-14 sm:h-16':
              showSuggestion || openFilters,
          }
        )}
      >
        <div
          className={cx(
            'flex h-full min-h-[56px] sm:min-h-[64px] items-center justify-between pl-4 pr-2 sm:px-6 py-2 sm:gap-4'
          )}
        >
          <form
            role="search"
            className="flex items-center justify-end w-full h-full gap-2 sm:justify-between sm:gap-3"
            onSubmit={handleSubmitSearch}
          >
            <div className="flex items-center flex-grow gap-2 sm:gap-6">
              <Button
                theme="naked"
                size="smallest"
                className="hidden sm:block focus-visible:outline-green-dark"
                onClick={handleClickInput}
                aria-label={formatMessage({ defaultMessage: 'open filters', id: 'Lkxlab' })}
              >
                <Icon icon={SearchIcon} className="w-6 h-6 sm:w-7 sm:h-7 text-green-dark" />
              </Button>
              <label htmlFor="header-search" className="sr-only">
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </label>
              <input
                id="header-search"
                type="search"
                value={searchInputValue}
                className="w-full h-full overflow-hidden text-lg outline-none autofill:bg-transparent placeholder:text-sm sm:placeholder:text-base placeholder:text-ellipsis placeholder:text-gray-800"
                onChange={handleChangeSearchInput}
                placeholder={formatMessage({
                  defaultMessage: 'Search for projects, investors, open calls...',
                  id: 'BZG0d+',
                })}
                onClick={handleClickInput}
              />
            </div>
            {!!searchInputValue?.length && (
              <div>
                <Button
                  aria-label={formatMessage({ defaultMessage: 'clear search', id: '44nONQ' })}
                  theme="naked"
                  size="smallest"
                  onClick={clearInput}
                  className="focus-visible:outline-green-dark"
                >
                  <Icon icon={CloseIcon} />
                </Button>
              </div>
            )}
            {pathname === Paths.Home && !showSuggestion && (
              <div className="hidden md:block">
                <Button className="text-green-dark" theme="naked" to={Paths.Discover}>
                  <FormattedMessage defaultMessage="See full catalogue" id="oG/A0q" />
                </Button>
              </div>
            )}
            {!openFilters && !showSuggestion && (
              <div className="sm:justify-self-end">
                {/* Filters accordion header https://www.w3.org/WAI/ARIA/apg/example-index/accordion/accordion.html */}
                <h3>
                  <Button
                    id="filters-button"
                    theme="primary-green"
                    onClick={handleClickFilters}
                    aria-expanded={openFilters}
                    aria-controls="filters"
                    className="!px-3 !py-3 sm:!px-6 !py-2"
                  >
                    <span className="sm:hidden">
                      <Icon icon={FilterIcon} className="w-4 h-4 text-white" />
                    </span>
                    {!!activeFiltersLength && (
                      <span className="ml-2.5 w-[22px] h-[22px] text-sm rounded-full sm:hidden bg-green-light text-green-dark">
                        {activeFiltersLength}
                      </span>
                    )}
                    <span className="sr-only sm:not-sr-only">
                      <FormattedMessage defaultMessage="Filters" id="zSOvI0" />
                    </span>
                  </Button>
                </h3>
              </div>
            )}
          </form>
        </div>
        {showSuggestion && (
          <SearchAutoSuggestion
            filtersData={filtersData}
            filters={filters}
            searchText={searchInputValue}
            closeSuggestions={() => {
              setShowSuggestions(false);
            }}
          />
        )}
        {/* Filters accordion pannel */}
        {openFilters && (
          <Filters
            filters={filters}
            filtersData={filtersData}
            closeFilters={() => setOpenFilters(false)}
          />
        )}
        {!openFilters && showActiveFilters && (
          <ActiveFilters filtersData={filtersData} filters={filters} />
        )}
      </div>
    </div>
  );
};

export default DiscoverSearch;
