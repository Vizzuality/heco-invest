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
  about: string;
  mission: string;
  categories: string[];
  mosaics: string[];
  impact?: string[];
  language: string;
};

export enum category {
  sustainable_agrosystems = 0,
  tourism_and_recreation = 1,
  forestry_and_agroforestry = 2,
  non_timber_forest_production = 3,
}

export enum impact {
  biodiversity = 0,
  climate = 1,
  water = 2,
  community = 3,
}

export type Mosaic =
  | 'Piedemonte Amazónico Macizo'
  | 'Heart of Amazonia'
  | 'Andean Amazonian Piedmont'[];
