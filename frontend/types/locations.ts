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
  attributes: {
    name: string;
    location_type: LocationsTypes;
  };
  relationships: {
    parent: {
      data: {
        id: string;
        type: 'location';
      };
    };
    regions: {
      data: { id: string; type: 'location' }[];
    };
  };
};
