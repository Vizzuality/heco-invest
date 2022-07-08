import { FC, FormEvent, SyntheticEvent, useState, useEffect } from 'react';

import { Search as SearchIcon } from 'react-feather';
import { FormattedMessage, useIntl } from 'react-intl';

import { useRouter } from 'next/router';

import { useQueryParams } from 'helpers/pages';

import Icon from 'components/icon';

import REMOVE_SVG from 'svgs/ui/remove-search.svg';

import { SearchAndInfoProps } from './types';

export const SearchAndInfo: FC<SearchAndInfoProps> = ({
  className,
  children,
}: SearchAndInfoProps) => {
  const intl = useIntl();
  const router = useRouter();
  const queryParams = useQueryParams();

  const [searchValue, setSearchValue] = useState<string>(queryParams.search);

  useEffect(() => {
    setSearchValue(queryParams.search);
  }, [queryParams.search]);

  const handleSearchValueChange = (e: FormEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value);
  };

  const handleSearchOnBlur = () => {
    if (searchValue !== queryParams.search) {
      setSearchValue(queryParams.search);
    }
  };

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push({
      query: {
        // ? Endpoints don't support filtering, sorting
        // ...queryParams,
        search: e.target[0].value || '',
      },
    });
  };

  const handleClearSearch = () => {
    router.push({
      query: {
        ...queryParams,
        search: '',
      },
    });
  };

  return (
    <div className={className}>
      <div className="flex flex-col justify-between pl-2 pr-6 md:flex-row lg:gap-4">
        <div className="text-gray-800 lg:w-1/3">
          <form role="search" className="" onSubmit={handleSearch}>
            <div className="relative flex items-center w-full">
              <Icon aria-hidden={true} icon={SearchIcon} className="absolute w-6 h-6 left-4" />
              <label htmlFor="search" className="sr-only">
                <FormattedMessage defaultMessage="Search" id="xmcVZ0" />
              </label>
              <input
                id="search"
                type="search"
                value={searchValue}
                placeholder={intl.formatMessage({ defaultMessage: 'Search', id: 'xmcVZ0' })}
                onChange={handleSearchValueChange}
                onBlur={handleSearchOnBlur}
                className="w-full p-2 bg-transparent border border-transparent rounded-md outline-none pl-14 placeholder:text-gray-800 text-md autofill:bg-transparent focus:border-green-dark"
              />
              {searchValue && (
                <button className="absolute right-4" onClick={handleClearSearch} type="button">
                  <Icon aria-hidden={true} icon={REMOVE_SVG} className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="flex items-center justify-center text-gray-800">{children}</div>
      </div>
    </div>
  );
};

export default SearchAndInfo;
