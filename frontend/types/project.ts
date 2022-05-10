import { ValidGeometryType } from 'containers/forms/geometry/types';
import { ProjectGalleryImageType } from 'containers/forms/project-gallery/project-gallery-image/types';

import { DevelopmentStages, Languages, TicketSizes } from 'enums';

import { ProjectDeveloper as ProjectDeveloperType } from './projectDeveloper';

export type ProjectImageType = {
  cover: boolean;
  file: {
    small: string;
    medium: string;
    original: string;
  };
};

/** Common Project types */
export type ProjectBase = {
  id: string;
  type: 'project';
  slug: string;
  category: string;
  description: string;
  development_stage: DevelopmentStages;
  estimated_duration_in_months: number;
  expected_impact: string;
  impact_areas: string[];
  instrument_types: string[];
  involved_project_developer_not_listed: boolean;
  looking_for_funding: boolean;
  name: string;
  problem: string;
  progress_impact_tracking: string;
  received_funding: boolean;
  received_funding_amount_usd?: number;
  received_funding_investor?: string;
  relevant_links?: string;
  replicability: string;
  sdgs: number[];
  solution: string;
  sustainability: string;
  target_groups: string[];
  ticket_size?: TicketSizes;
  language: Languages;
  project_images: ProjectImageType[];
  verified?: boolean;
  project_developer?: any; // Cannot use ProjectDeveloperType because linting will complain about circular references
};

/** Project entity structure */
export type Project = ProjectBase & {
  slug: string;
  language: Languages;
};

/** Project Form inputs */
export type ProjectForm = ProjectBase & {
  country_id: string;
  department_id: string;
  funding_plan: string;
  involved_project_developer_ids: string[];
  municipality_id: string;
  geometry: ValidGeometryType;
  project_images_attributes: ProjectImageGallery[];
  project_images_attributes_cover: string;

  // Not part of the payload
  involved_project_developer: boolean;
  project_gallery?: FileList;
};

export type ProjectImagesAttributes = {
  file: File | string;
  cover: boolean;
};

export type ProjectCreationPayload = Omit<
  ProjectForm,
  'involved_project_developer' | 'project_gallery' | 'slug' | 'project_images_attributes_cover'
> & {
  project_images_attributes: ProjectImagesAttributes[];
};

export type ProjectImageGallery = ProjectImagesAttributes & ProjectGalleryImageType;
