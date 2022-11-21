import { FC, SyntheticEvent, useEffect, useMemo, useState } from 'react';

import {
  ArrowLeft as ArrowLeftIcon,
  Search as SearchIcon,
  X as CloseIcon,
  XCircle as CloseCircleIcon,
} from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { useRouter } from 'next/router';

import { values } from 'lodash-es';

import { useBreakpoint } from 'hooks/use-breakpoint';

import { useFiltersEnums, useQueryParams, useSearch } from 'helpers/pages';

import ActiveFilters from 'containers/forms/active-filters';
import Filters from 'containers/forms/filters';
import SearchAutoSuggestion from 'containers/search-auto-suggestion';

import Button from 'components/button';
import Icon from 'components/icon';
import { Paths } from 'enums';
import { logEvent } from 'lib/analytics/ga';

import FilterIcon from 'svgs/discover/filters.svg';

import { DiscoverSearchProps } from './types';

export const DiscoverSearch: FC<DiscoverSearchProps> = ({ className }) => {
  const { formatMessage } = useIntl();
  const { pathname } = useRouter();
  const { search, sorting, page, ...filters } = useQueryParams();
  const doSearch = useSearch();
  const filtersData = useFiltersEnums();
  const isMobile = !useBreakpoint()('sm');

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

    logEvent(pathname !== Paths.Home ? 'discover_type_search' : 'homepage_type_search', {
      search_term: searchInputValue,
    });

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
    if (!isMobile) {
      setOpenFilters(true);
      setShowSuggestions(false);
    }
  };

  const handleClickClose = () => {
    setOpenFilters(false);
    setShowSuggestions(false);
    setSearchInputValue('');
  };

  return (
    <div
      className={cx({
        'z-50 sm:z-auto': showSuggestion || openFilters,
        [className]: !!className,
      })}
    >
      <div
        className={cx(
          'sm:relative sm:z-10 sm:w-full sm:overflow-visible text-black drop-shadow-xl',
          {
            'mb-0 fixed left-0 top-0 w-screen h-full sm:h-auto flex flex-col sm:block':
              showSuggestion || openFilters,
          }
        )}
      >
        <div
          className={cx({
            'flex-shrink-0 flex h-14 sm:h-16 items-center justify-between pl-4 pr-2 sm:px-6 py-2 sm:gap-4 bg-white':
              true,
            'rounded-full': !openFilters && !showSuggestion,
            'sm:rounded-t-3xl sm:rounded-b-none':
              showSuggestion || openFilters || showActiveFilters,
          })}
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
                <Icon icon={SearchIcon} className="w-7 h-7 text-green-dark" />
              </Button>
              {(openFilters || searchInputValue) && (
                <Button
                  theme="naked"
                  size="smallest"
                  className="text-gray-900 sm:hidden focus-visible:outline-green-dark"
                  onClick={handleClickClose}
                  aria-label={
                    openFilters
                      ? formatMessage({ defaultMessage: 'Close filters', id: '78vrMq' })
                      : formatMessage({ defaultMessage: 'Close search', id: 'NjD8y3' })
                  }
                >
                  <Icon icon={ArrowLeftIcon} className="w-6 h-6 text-green-dark mr-2.5" />
                  {openFilters && <FormattedMessage defaultMessage="Filters" id="zSOvI0" />}
                </Button>
              )}
              <label htmlFor="header-search" className="sr-only">
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </label>
              <input
                id="header-search"
                type="search"
                value={searchInputValue}
                className={cx(
                  'w-full h-full placeholder:overflow-hidden overflow-hidden text-ellipsis text-lg outline-none autofill:bg-transparent whitespace-nowrap placeholder:whitespace-nowrap placeholder:text-sm sm:placeholder:text-base placeholder:text-ellipsis',
                  {
                    'hidden sm:block': openFilters,
                  }
                )}
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
                  className={cx('focus-visible:outline-green-dark p', {
                    'hidden sm:inline-block': openFilters,
                  })}
                  icon={() => (
                    <Icon
                      className="text-white sm:text-black fill-gray-600 sm:fill-transparent"
                      icon={isMobile ? CloseCircleIcon : CloseIcon}
                    />
                  )}
                />
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
                    className="!px-2.5 !py-2.5 sm:!px-6 sm:!py-2"
                  >
                    <span className="sm:hidden">
                      <Icon icon={FilterIcon} className="text-white" />
                    </span>
                    {!!activeFiltersLength && (
                      <span className="ml-2.5 w-[22px] h-[22px] text-sm rounded-full sm:hidden bg-green-light text-green-dark">
                        {activeFiltersLength}
                      </span>
                    )}
                    <span className="text-sm leading-[22px] sr-only sm:not-sr-only">
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
              setSearchInputValue('');
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
