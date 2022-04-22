import { useMemo } from 'react';

import { useQuery, UseQueryResult } from 'react-query';

import { Queries, LocationsTypes } from 'enums';
import { Locations, LocationsParams } from 'types/locations';

import API from 'services/api';

export const getLocations = async (params: LocationsParams): Promise<Locations[]> => {
  const locations = await API.get('/api/v1/locations', { params });
  return locations.data.data;
};

export const getMosaics = async () => {
  return await getLocations({ location_type: LocationsTypes.Region });
};

export const useMosaics = (): UseQueryResult<Locations[]> => {
  const query = useQuery([Queries.Mosaics], getMosaics);

  return useMemo(
    () => ({
      ...query,
      mosaic: query.data,
    }),
    [query]
  );
};
