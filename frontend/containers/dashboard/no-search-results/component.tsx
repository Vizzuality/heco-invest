import { FC } from 'react';

import { FormattedMessage } from 'react-intl';

import { useRouter } from 'next/router';

import { useQueryParams } from 'helpers/pages';

import Button from 'components/button';

import { NoSearchResultsProps } from './types';

export const NoSearchResults: FC<NoSearchResultsProps> = ({ className }: NoSearchResultsProps) => {
  const router = useRouter();
  const queryParams = useQueryParams();

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
      <div className="flex flex-col items-center mt-10 lg:mt-20">
        <p className="text-lg text-gray-800 lg:text-xl">
          <FormattedMessage defaultMessage="No search results matching the criteria." id="C1dyBg" />
        </p>
        <Button className="mt-8" onClick={handleClearSearch}>
          <FormattedMessage defaultMessage="Clear search" id="4YJHut" />
        </Button>
      </div>
    </div>
  );
};

export default NoSearchResults;
