import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';

import { Filter, Search as SearchIcon, X as CloseIcon } from 'react-feather';
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
    doSearch('', filters);
  };

  const handleClickInput = () => {
    setOpenFilters(true);
    setShowSuggestions(false);
  };

  const showActiveFilters = useMemo(() => !!values(filters).length, [filters]);

  return (
    <div className={className}>
      <div
        className={cx(
          'relative z-10 w-full sm:overflow-visible text-black bg-white border h-14 sm:h-16 drop-shadow-xl rounded-3xl',
          {
            'rounded-b-none mb-0': showSuggestion || openFilters || showActiveFilters,
          }
        )}
      >
        <div
          className={cx('flex h-full items-center justify-between px-4 sm:px-6 py-2 sm:gap-4', {
            'py-4': openFilters || showSuggestion,
          })}
        >
          <form
            role="search"
            className="flex items-center justify-end w-full h-full gap-2 sm:justify-between sm:gap-3"
            onSubmit={handleSubmitSearch}
          >
            <div className="flex items-center flex-grow gap-2">
              <Button
                theme="naked"
                size="smallest"
                className="hidden px-3 py-3 sm:block"
                onClick={clearInput}
              >
                <Icon
                  aria-label={formatMessage({ defaultMessage: 'open filters', id: 'Lkxlab' })}
                  icon={SearchIcon}
                  className="w-6 h-6 mr-2 sm:w-8 sm:h-8 text-green-dark"
                />
              </Button>
              <label htmlFor="header-search" className="sr-only">
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </label>
              <input
                id="header-search"
                type="search"
                value={searchInputValue}
                className="w-full h-full text-lg outline-none autofill:bg-transparent placeholder:text-sm sm:placeholder:text-base"
                onChange={handleChangeSearchInput}
                placeholder={formatMessage({
                  defaultMessage: 'Search for projects, investors, open calls...',
                  id: 'BZG0d+',
                })}
                onClick={handleClickInput}
              />
            </div>
            {showSuggestion && (
              <div>
                <Button theme="naked" size="smallest" icon={CloseIcon} onClick={clearInput} />
              </div>
            )}
            {pathname === Paths.Home && (
              <div className="hidden md:block">
                <Button className="text-green-dark" theme="naked" to={Paths.Discover}>
                  {formatMessage({ defaultMessage: 'See full catalogue', id: 'oG/A0q' })}
                </Button>
              </div>
            )}
            {!openFilters && !showSuggestion && (
              <div className="flex items-center flex-grow-0 gap-4 overflow-hidden transition-all duration-300 ease-in-out sm:gap-6 sm:justify-self-end">
                {/* Filters accordion header https://www.w3.org/WAI/ARIA/apg/example-index/accordion/accordion.html */}
                <h3>
                  <Button
                    id="filters-button"
                    theme="primary-green"
                    onClick={() => setOpenFilters(!openFilters)}
                    aria-expanded={openFilters}
                    aria-controls="filters"
                    className="px-2 sm:px-6"
                  >
                    <span className="md:hidden">
                      <Icon icon={Filter} className="w-4 h-4 text-white" />
                    </span>
                    <span className="hidden md:block">
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
