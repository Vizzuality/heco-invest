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
        <div className="flex items-center justify-between gap-4 py-3 pl-6 pr-3">
          <Icon aria-hidden={true} icon={SearchIcon} className="w-8 h-8 text-green-dark" />
          <form
            role="search"
            className="items-center justify-between w-full h-full gap-3 sm:flex"
            onSubmit={handleSubmit}
          >
            <div className="w-full">
              <label htmlFor="header-search" className="sr-only">
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </label>
              <input
                id="header-search"
                type="search"
                value={searchText}
                className="w-full h-full px-2 text-lg rounded-full outline-none autofill:bg-transparent"
                onChange={handleChange}
              />
            </div>
            <div className="flex">
              <Button
                theme="primary-green"
                className="font-normal bg-white text-green-dark"
                onClick={() => setOpenFilters(!openFilters)}
              >
                <FormattedMessage defaultMessage="Filters" id="zSOvI0" />
              </Button>
              <Button type="submit" className="h-full font-normal" theme="primary-orange">
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </Button>
            </div>
          </form>
        </div>
        <div
          className={cx('h-0 w-full bg-white rounded-b-4xl drop-shadow-xl transition-all ease-in', {
            'h-fit border-t-gray-200 border-t-2': openFilters,
          })}
        >
          {openFilters && <Filters closeFilters={() => setOpenFilters(false)} />}
        </div>
      </div>
    </div>
  );
};

export default DiscoverSearch;
