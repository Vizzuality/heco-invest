import { Languages } from 'enums';
import { Picture } from 'types';

import { CategoryType } from './category';
import { Enum } from './enums';
import { Project } from './project';

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
  picture: Picture;
  entity_legal_registration_number: string;
  projects?: Project[];
};

export type ProjectDeveloperSetupForm = Omit<ProjectDeveloper, 'picture' | 'id' | 'type'> & {
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
