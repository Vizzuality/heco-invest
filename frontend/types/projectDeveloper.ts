import { SocialContactInputs } from 'containers/social-contact/inputs-social-contact/types';

import { Languages } from 'enums';

import { CategoryType } from './category';
import { Enum } from './enums';
import { Project } from './project';

export type ProjectDeveloperPicture = {
  small: string;
  medium: string;
  large: string;
};

export type ProjectDeveloper = {
  id: string;
  type: 'project_developer';
  name: string;
  about: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  mission: string;
  contact_email: string;
  contact_phone?: string;
  project_developer_type: string;
  categories: CategoryType[];
  impacts: string[];
  mosaics: string[];
  language: Languages;
  picture: ProjectDeveloperPicture;
  entity_legal_registration_number: string;
  projects?: Project[];
};

export type ProjectDeveloperSetupForm = ProjectDeveloper & {
  picture: File;
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
