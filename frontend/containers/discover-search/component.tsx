import { FC, useState } from 'react';

import { Search as SearchIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { noop } from 'lodash-es';

import Button from 'components/button';
import Icon from 'components/icon';

import { DiscoverSearchProps } from './types';

export const DiscoverSearch: FC<DiscoverSearchProps> = ({
  className,
  defaultValue = '',
  onSearch = noop,
}: DiscoverSearchProps) => {
  const [searchText, setSearchText] = useState<string>(defaultValue);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchText);
  };

  return (
    <div className={className}>
      <div className="z-10 flex items-center w-full h-16 gap-4 py-3 pl-6 pr-3 text-black bg-white border rounded-full xl:h-20 drop-shadow-xl">
        <Icon aria-hidden={true} icon={SearchIcon} className="w-8 h-8 text-green-dark" />
        <form role="search" className="flex w-full h-full gap-3" onSubmit={handleSearch}>
          <label htmlFor="header-search" className="sr-only">
            <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
          </label>
          <input
            id="header-search"
            type="search"
            defaultValue={defaultValue}
            className="w-full h-full px-2 text-lg rounded-full outline-none autofill:bg-transparent"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="submit" className="h-full" theme="primary-orange">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DiscoverSearch;
