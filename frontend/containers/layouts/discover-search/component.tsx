import { FC, SyntheticEvent, useEffect, useState } from 'react';

import { Search as SearchIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import cx from 'classnames';

import { noop } from 'lodash-es';

import Filters from 'containers/forms/filters';

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
        className={cx('z-10 w-full sm:h-16 text-black bg-white border drop-shadow-xl', {
          'rounded-full': !openFilters,
          'rounded-t-4xl': openFilters,
        })}
      >
        <div className="flex items-center justify-between sm:gap-4 py-3 px-6">
          <form
            role="search"
            className="items-center sm:justify-between w-full h-full gap-1 sm:gap-3 flex sm:flex-row flex-col justify-end"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex gap-2 items-center">
              <Icon
                aria-hidden={true}
                icon={SearchIcon}
                className="w-6 h-6 sm:w-8 sm:h-8 mr-2 text-green-dark"
              />
              <label htmlFor="header-search" className="sr-only">
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </label>
              <input
                id="header-search"
                type="search"
                value={searchText}
                className="w-full h-full text-lg rounded-full outline-none autofill:bg-transparent"
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-4 sm:gap-6 sm:justify-self-end items-center">
              {/* Filters accordion header https://www.w3.org/WAI/ARIA/apg/example-index/accordion/accordion.html */}
              <h3>
                <Button
                  className="inline font-normal bg-white text-green-dark px-0"
                  id="filters-button"
                  theme="primary-green"
                  onClick={() => setOpenFilters(!openFilters)}
                  aria-expanded={openFilters}
                  aria-controls="filters"
                >
                  <FormattedMessage defaultMessage="Filters" id="zSOvI0" />
                  <span
                    className={cx(
                      'flex items-center justify-center w-6 h-6 ml-2 px-0 py-0 rounded-full border border-bg-green-light bg-green-light bg-opacity-30 text-green-dark font-bold text-xs transition-opacity ease-in',
                      {
                        'opacity-100': !!filtersQuantity,
                        'opacity-0': !filtersQuantity,
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
      </div>
    </div>
  );
};

export default DiscoverSearch;
