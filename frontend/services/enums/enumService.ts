import { useMemo } from 'react';

import { useQuery, UseQueryResult } from 'react-query';

import { groupBy } from 'lodash-es';

import { Queries, EnumTypes } from 'enums';
import { Enum, GroupedEnums } from 'types/enums';

import API from 'services/api';
import { ErrorResponse } from 'services/types';

export const getEnums = async (): Promise<Enum[]> => {
  const enums = await API.get('/api/v1/enums');
  return enums.data.data;
};

export const useEnums = () => {
  const query = useQuery<Enum[], ErrorResponse>(Queries.EnumList, getEnums, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  /** Enums grouped by type property */
  const enumsGroupedByTypes = groupBy(query?.data, 'type') as {
    [key in EnumTypes]: Enum[];
  };

  return useMemo(
    () => ({
      ...query,
      data: enumsGroupedByTypes,
    }),
    [query, enumsGroupedByTypes]
  );
};
