import { Languages, OpenCallStatus } from 'enums';
import { Picture } from 'types';
import { Locations } from 'types/locations';

export type OpenCall = {
  id: string;
  type: 'open_call';
  name: string;
  slug: string;
  description: string;
  instrument_types: string[];
  sdgs: number[];
  funding_priorities: string;
  funding_exclusions: string;
  impact_description: string;
  maximum_funding_per_project: number;
  closing_at: string;
  language: Languages;
  account_language: Languages;
  trusted: boolean;
  created_at: string;
  picture: Picture;
  investor: {
    id: string;
    type: 'investor';
  };
  country: Locations;
  municipality: Locations;
  department: Locations;
  status: OpenCallStatus;
};
