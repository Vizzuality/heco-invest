import { Locations, LocationsParams, LocationsTypes } from 'types/locations';

import API from 'services/api';

export const getLocations = async (params: LocationsParams): Promise<Locations[]> => {
  const locations = await API.get('/api/v1/locations', { params });
  return locations.data.data;
};

export const getMosaics = async (): Promise<Locations[]> => {
  return getLocations({ location_type: LocationsTypes.region });
};
