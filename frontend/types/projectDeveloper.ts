import { Languages } from 'enums';

import { CategoryType } from './category';
import { Enum } from './enums';

export type SocialContactInputs = {
  website?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
};

type ProjectDeveloperBase = SocialContactInputs & {
  name: string;
  about: string;
  mission: string;
  project_developer_type: string;
  contact_email: string;
  contact_phone?: string;
  categories: string[];
  impacts: string[];
  language: Languages;
  entity_legal_registration_number: string;
};

export type ProjectDeveloperSetupForm = ProjectDeveloperBase & {
  picture: File;
  mosaics?: string[];
};

export enum Language {
  'en',
  'es',
  'pt',
}

export enum Impact {
  'biodiversity',
  'climate',
  'water',
  'community',
}

export type ProjectDeveloper = {
  id: string;
  type: 'project_developer';
  attributes: ProjectDeveloperBase & {
    slug: string;
    review_status: 'approved';
    picture: {
      small: string;
      medium: string;
      original: string;
    };
  };
  relationships: {
    owner: {
      data: {
        id: string;
        type: 'user';
      };
    };
    locations: {
      data: {
        id: string;
        type: 'location';
      }[];
    };
  };
};

export type InterestItem = { name: string; id: string; color?: string; infoText?: string };

export type Interest = {
  name: keyof ProjectDeveloperSetupForm;
  title: string;
  items: Enum[];
  infoText?: string;
  required?: boolean;
};
