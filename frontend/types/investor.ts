import { Languages } from 'enums';
import { Picture } from 'types';

import { User } from './user';

export type InvestorForm = {
  language: Languages;
  picture: string;
  name: string;
  contact_email: string;
  contact_phone?: string;
  created_at?: string;
  investor_type: string;
  website?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  about: string;
  mission: string;
  previously_invested: boolean;
  categories?: string[];
  impacts: string[];
  sdgs?: number[];
  ticket_sizes: string[];
  instrument_types: string[];
  prioritized_projects_description?: string;
  other_information: string;
};

export type Investor = Omit<InvestorForm, 'picture'> & {
  id: string;
  type: 'investor';
  slug: string;
  picture: Picture;
  review_status: string;
  owner: User;
  favourite?: boolean;
};
