import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { Search as SearchIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import cx from 'classnames';

import { noop } from 'lodash-es';

import Filters from 'containers/forms/filters';
import SearchAutoSuggestion from 'containers/search-auto-suggestion';

import Button from 'components/button';
import Icon from 'components/icon';

import { DiscoverSearchProps } from './types';

export const DiscoverSearch: FC<DiscoverSearchProps> = ({
  className,
  searchText: searchTextProp = '',
  onSearch = noop,
  onSearchChange = noop,
  filtersQuantity,
}: DiscoverSearchProps) => {
  const [searchText, setSearchText] = useState<string>(searchTextProp);
  const [openFilters, setOpenFilters] = useState(false);
  const [openSuggestions, setOpenSuggestions] = useState(false);
  const { formatMessage } = useIntl();

  useEffect(() => {
    setSearchText(searchTextProp);
  }, [searchTextProp]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSearch(searchText);
  };

  const handleChange = (e: SyntheticEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    onSearchChange(e.currentTarget.value);
  };

  return (
    <div className={className}>
      <div
        className={cx('z-10 relative w-full sm:h-16 text-black bg-white border drop-shadow-xl', {
          'rounded-full': !openFilters && !openSuggestions,
          'rounded-t-4xl': openFilters || openSuggestions,
        })}
      >
        <div className="flex items-center justify-between px-6 py-3 sm:gap-4">
          <form
            role="search"
            className="flex flex-col items-center justify-end w-full h-full gap-1 sm:justify-between sm:gap-3 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center w-full gap-2">
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
                value={searchText}
                className="w-full h-full text-lg outline-none autofill:bg-transparent"
                onChange={handleChange}
                placeholder={formatMessage({
                  defaultMessage: 'Search for projects, investors, open calls...',
                  id: 'BZG0d+',
                })}
              />
            </div>
            <div className="flex items-center gap-4 sm:gap-6 sm:justify-self-end">
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
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </Button>
            </div>
          </form>
        </div>
        {/* Filters accordion pannel */}
        <div
          id="filters"
          role="region"
          aria-labelledby="filters-button"
          className={cx(
            'h-0 w-full bg-white -mt-1 rounded-b-4xl drop-shadow-xl transition-all ease-in',
            {
              'h-fit border-t-gray-200 border-t-2 overflow-hidden': openFilters,
            }
          )}
        >
          {openFilters && <Filters closeFilters={() => setOpenFilters(false)} />}
        </div>
        {!openFilters && (
          <SearchAutoSuggestion
            onChangeOpenSuggestion={setOpenSuggestions}
            searchText={searchText}
          />
        )}
      </div>
    </div>
  );
};

export default DiscoverSearch;
