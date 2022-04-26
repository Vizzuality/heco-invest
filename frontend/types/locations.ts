import { LocationsTypes } from 'enums';

export type LocationsParams = {
  location_type?: LocationsTypes;
  parent_id?: string;
  fields?: string;
  includes?: string;
};

export type Locations = {
  id: string;
  type: 'location';
  name: string;
  location_type: LocationsTypes;
};
