import { Languages, ReviewStatus } from 'enums';
import { Picture } from 'types';

import { CategoryType } from './category';
import { Enum } from './enums';
import { Project } from './project';

export type ProjectDeveloperPicture = {
  small: string;
  medium: string;
  original: string;
};

export type ProjectDeveloper = {
  about: string;
  categories: CategoryType[];
  contact_email: string;
  contact_phone?: string;
  entity_legal_registration_number: string;
  facebook?: string;
  favourite: boolean;
  id: string;
  impacts: string[];
  instagram?: string;
  involved_projects?: Project[];
  language: Languages;
  linkedin?: string;
  mission: string;
  mosaics: string[];
  name: string;
  owner?: { id: string; type: 'user' };
  picture: ProjectDeveloperPicture;
  project_developer_type: string;
  projects?: any[]; // Cannot use ProjectType because linting will complain about circular references
  relationshipNames?: string[];
  review_status: ReviewStatus;
  slug: string;
  twitter?: string;
  type: 'project_developer';
  website?: string;
};

export type ProjectDeveloperSetupForm = Omit<
  ProjectDeveloper,
  'picture' | 'id' | 'type' | 'favorite' | 'relationshipNames' | 'projects'
> & {
  picture: string;
  mosaics?: string[];
};

export type InterestItem = { name: string; id: string; color?: string; infoText?: string };

export type Interest = {
  name: keyof ProjectDeveloperSetupForm;
  title: string;
  items: Enum[];
  infoText?: string;
  required?: boolean;
};
