import { useMemo } from 'react';

import { UseQueryOptions } from 'react-query';

import { groupBy } from 'lodash-es';

import { useLocalizedQuery } from 'hooks/query';

import { Queries, EnumTypes } from 'enums';
import { Enum } from 'types/enums';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { ErrorResponse } from 'services/types';

export const getEnums = async (): Promise<Enum[]> => {
  const enums = await API.get('/api/v1/enums');
  return enums.data.data;
};

export const useEnums = (options?: UseQueryOptions<Enum[], ErrorResponse>) => {
  const query = useLocalizedQuery<Enum[], ErrorResponse>(Queries.EnumList, getEnums, {
    ...staticDataQueryOptions,
    ...options,
  });

  return useMemo(() => {
    /** Enums grouped by type property */
    const enumsGroupedByTypes = groupBy(query?.data, 'type') as {
      [key in EnumTypes]: Enum[];
    };
    return {
      ...query,
      data: enumsGroupedByTypes,
    };
  }, [query]);
};
