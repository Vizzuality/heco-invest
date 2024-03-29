import { useMemo } from 'react';

import { UseQueryResult } from 'react-query';

import { groupBy } from 'lodash-es';

import { useLocalizedQuery } from 'hooks/query';

import { Queries, LocationsTypes } from 'enums';
import { Locations, LocationsParams } from 'types/locations';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { ErrorResponse } from 'services/types';

/** Get the locations */
export const getLocations = async (params?: LocationsParams): Promise<Locations[]> => {
  const locations = await API.get('/api/v1/locations', { params });
  return locations.data.data;
};

/** Hook to use the locations grouped by location_type */
export const useGroupedLocations = (
  params?: LocationsParams
): UseQueryResult<Locations[], ErrorResponse> & {
  locations?: { [key in LocationsTypes]: Locations[] };
} => {
  const query = useLocalizedQuery<Locations[], ErrorResponse>(
    [Queries.Locations, params],
    () => getLocations(params),
    staticDataQueryOptions
  );

  const locations = groupBy(query.data, 'location_type') as {
    [key in LocationsTypes]: Locations[];
  };

  return useMemo(
    () => ({
      ...query,
      locations,
    }),
    [query, locations]
  );
};

export const getPriorityLandscapes = async () => {
  return await getLocations({ 'filter[location_type]': LocationsTypes.PriorityLandscapes });
};

export const usePriorityLandscapes = () => {
  const query = useLocalizedQuery<Locations[], ErrorResponse>(
    [Queries.PriorityLandscapes],
    () => getPriorityLandscapes(),
    staticDataQueryOptions
  );

  return useMemo(
    () => ({
      ...query,
      priorityLandscapes: query.data,
    }),
    [query]
  );
};
