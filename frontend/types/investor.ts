import { Languages } from 'enums';
import { Picture } from 'types';

export type InvestorForm = {
  language: Languages;
  picture: string;
  name: string;
  about?: string;
  mission?: string;
  website?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  investor_type: string;
  how_do_you_work: string;
  what_makes_the_difference?: string;
  other_information: string;
  previously_invested: boolean;
  previously_invested_description?: string;
  contact_email: string;
  contact_phone: string;
  categories?: string[];
  ticket_sizes: string[];
  instrument_types: string[];
  impacts: string[];
  sdgs: number[];
};

export type Investor = InvestorForm & {
  id: string;
  type: 'investor';
  slug: string;
  picture: Picture;
  review_status: string;
  relationships: {
    owner: {
      data: {
        id: string;
        type: string;
      };
    };
  };
};
