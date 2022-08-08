import { Languages, ProjectStatus } from 'enums';

export type OpenCall = {
  name: string;
  slug: string;
  description: string;
  instrument_types: string;
  sdgs: number[];
  closing_at: string;
  language: Languages;
  max_funding: number;
  funding_priorities: string;
  funding_exclusions: string;
  status: ProjectStatus;
  expected_impact: string;
  // ticket_size: string;
  // money_distribution: string;
  // impact_description: string;
};

export type OpenCallForm = Omit<OpenCall, 'closing_at' | 'language' | 'slug'> & {
  closing_at: Date;
  picture?: string;
  country_id: string;
  department_id?: string;
  municipality_id?: string;
};

export type OpenCallFormDto = Omit<OpenCallForm, 'created_at'> & {
  closing_at: string;
};
