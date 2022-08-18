import { Languages, OpenCallStatus } from 'enums';
import { Picture } from 'types';
import { Locations } from 'types/locations';

import { Investor } from './investor';

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
  investor: Investor;
  country: Locations;
  municipality: Locations;
  department: Locations;
  status: OpenCallStatus;
  favourite: boolean;
};

export type OpenCallForm = {
  picture: string;
  name: string;
  description: string;
  country_id: string;
  municipality_id: string;
  department_id: string;
  impact_description: string;
  maximum_funding_per_project: number;
  funding_priorities: string;
  funding_exclusions: string;
  closing_at: Date;
  sdgs: number[];
  instrument_types: string[];
  status: string;
};

export type OpenCallDto = Omit<OpenCallForm, 'closing_at'> & {
  closing_at: string;
};
