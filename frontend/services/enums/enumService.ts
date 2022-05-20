import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { groupBy } from 'lodash-es';

import { Queries, EnumTypes } from 'enums';
import mockedEnums from 'mockups/enums.json';
import { Enum } from 'types/enums';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { ErrorResponse } from 'services/types';

export const getEnums = async (): Promise<Enum[]> => {
  const enums = await API.get('/api/v1/enums');
  return enums.data.data;
};

export const useEnums = () => {
  const query = useQuery<Enum[], ErrorResponse>(Queries.EnumList, getEnums, {
    ...staticDataQueryOptions,
    initialData: mockedEnums.data as Enum[],
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
