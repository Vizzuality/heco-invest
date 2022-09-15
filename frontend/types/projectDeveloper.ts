import { Languages, ReviewStatus } from 'enums';

import { CategoryType } from './category';
import { Enum } from './enums';
import { Locations } from './locations';
import { Project } from './project';
import { User } from './user';

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
  created_at: string;
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
  priority_landscapes: Locations[];
  name: string;
  owner?: User;
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
  'picture' | 'id' | 'type' | 'favorite' | 'relationshipNames' | 'projects' | 'priority_landscapes'
> & {
  picture: string;
  priority_landscape_ids?: string[];
};

export type InterestItem = { name: string; id: string; color?: string; infoText?: string };

export type Interest = {
  name: keyof ProjectDeveloperSetupForm;
  title: string;
  items: Enum[] | Locations[];
  infoText?: string;
  required?: boolean;
};
