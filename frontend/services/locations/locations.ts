import { useMemo } from 'react';

import { useQuery, UseQueryResult } from 'react-query';

import { groupBy } from 'lodash-es';

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

/** Get the locations with location_type = region */
export const getMosaics = async () => {
  return await getLocations({ 'filter[location_type]': LocationsTypes.Region });
};

/** Hook to use the locations with location_type = region */
export const useMosaics = (): UseQueryResult<Locations[], ErrorResponse> => {
  const query = useQuery<Locations[], ErrorResponse>(
    [Queries.Mosaics],
    getMosaics,
    staticDataQueryOptions
  );

  return useMemo(
    () => ({
      ...query,
      mosaic: query.data,
    }),
    [query]
  );
};

/** Hook to use the locations grouped by location_type */
export const useGroupedLocations = (
  includes?: string
): UseQueryResult<Locations[], ErrorResponse> & {
  locations?: { [key in LocationsTypes]: Locations[] };
} => {
  const query = useQuery<Locations[], ErrorResponse>(
    [Queries.Locations, includes],
    () => getLocations({ includes }),
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
