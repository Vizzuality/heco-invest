import { LocationsTypes } from 'enums';

export type LocationsParams = {
  'filter[location_type]'?: LocationsTypes;
  'filter[parent_id]'?: string;
  fields?: string;
  includes?: string;
};

export type Locations = {
  id: string;
  type: 'location';
  name: string;
  location_type: LocationsTypes;
};
