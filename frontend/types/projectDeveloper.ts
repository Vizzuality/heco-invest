import { SocialContactInputs } from 'containers/social-contact/inputs-social-contact/types';
import { Enum } from './enums';

export type ProjectDeveloperSetupForm = SocialContactInputs & {
  language: Language;
  picture: File;
  name: string;
  project_developer_type: string;
  entity_legal_registration_number: string;
  about: string;
  mission: string;
  categories: Category[];
  impacts: Impact[];
  mosaics?: Mosaic[];
};

export enum Language {
  'en',
  'es',
  'pt',
}

export enum Category {
  'sustainable-agrosystems',
  'tourism-and-recreation',
  'forestry-and-agroforestry',
  'non-timber-forest-production',
  'human-capital-and-inclusion',
}

export enum Impact {
  'biodiversity',
  'climate',
  'water',
  'community',
}

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
