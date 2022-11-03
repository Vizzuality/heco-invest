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

export const useEnums = (
  options?: UseQueryOptions<Enum[], ErrorResponse, Record<EnumTypes, Enum[]>>
) => {
  return useLocalizedQuery<Enum[], ErrorResponse, Record<EnumTypes, Enum[]>>(
    Queries.EnumList,
    getEnums,
    {
      ...staticDataQueryOptions,
      ...options,
      placeholderData: [],
      select: (data) => {
        return groupBy(data, 'type') as Record<EnumTypes, Enum[]>;
      },
    }
  );
};
