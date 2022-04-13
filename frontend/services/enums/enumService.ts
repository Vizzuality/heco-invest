import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { groupBy } from 'lodash-es';

import { Queries, EnumTypes } from 'enums';
import { Enum } from 'types/enums';

import API from 'services/api';

export const getEnums = async (): Promise<Enum[]> => {
  const enums = await API.get('/api/v1/enums');
  return enums.data.data;
};

export const useEnums = () => {
  const query = useQuery(Queries.EnumList, getEnums);

  /** Enums grouped by type property */
  const enumsGroupedByTypes = groupBy(query?.data, 'type') as { [key in EnumTypes]: Enum[] };

  return useMemo(
    () => ({
      ...query,
      data: enumsGroupedByTypes,
    }),
    [query, enumsGroupedByTypes]
  );
};
