export type ProjectDeveloperSetupFormOnline = {
  website?: string;
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
};

export type ProjectDeveloperSetupForm = ProjectDeveloperSetupFormOnline & {
  picture: string;
  profile: string;
  projectDeveloperType: string;
  entityLegalRegistrationNumber: string;
  about: string;
  mission: string;
  categories: Category[];
  mosaics?: Mosaic[];
  impacts: Impact[];
  language: string;
};

export type Category =
  | 'sustainable_agrosystems'
  | 'tourism_and_recreation'
  | 'forestry_and_agroforestry'
  | 'non_timber_forest_production'
  | 'human_capital_and_inclusion';

export type Impact = 'biodiversity' | 'climate' | 'water' | 'community';

export type Mosaic =
  | 'Piedemonte Amazónico Macizo'
  | 'Heart of Amazonia'
  | 'Andean Amazonian Piedmont';
