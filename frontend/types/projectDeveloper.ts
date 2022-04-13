import { SocialContactInputs } from 'containers/social-contact/inputs-social-contact/types';

import { Languages } from 'enums';

import { CategoryType } from './category';

import { Enum } from './enums';

type ProjectDeveloperBase = SocialContactInputs & {
  name: string;
  about: string;
  mission: string;
  project_developer_type: string;
  categories: Category[];
  impacts: Impact[];
  language: Languages;
  entity_legal_registration_number: string;
};

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

export type ProjectDeveloperSetupForm = ProjectDeveloperBase & {
    picture: File;
    mosaics?: Mosaic[];
  };

export type Category =
  | 'sustainable-agrosystems'
  | 'tourism-and-recreation'
  | 'forestry-and-agroforestry'
  | 'non-timber-forest-production'
  | 'human-capital-and-inclusion';

export type Impact = 'biodiversity' | 'climate' | 'water' | 'community';

export type Mosaic =
  | 'Piedemonte Amazónico Macizo'
  | 'Heart of Amazonia'
  | 'Andean Amazonian Piedmont';

export type InterestItem = { name: string; id: string; color?: string; infoText?: string };

export type Interest = {
  name: keyof ProjectDeveloperSetupForm;
  title: string;
  items: Enum[];
  infoText?: string;
  required?: boolean;
};
