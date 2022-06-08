import { PointFeature } from 'supercluster';
import { string } from 'yup';

import { ValidGeometryType } from 'containers/forms/geometry/types';
import { ProjectGalleryImageType } from 'containers/forms/project-gallery/project-gallery-image/types';

import { DevelopmentStages, Languages, TicketSizes } from 'enums';

/** Project images on responses */
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
  category: string;
  country: {
    id: string;
    location_type: 'country';
    name: string;
  };
  description: string;
  development_stage: DevelopmentStages;
  estimated_duration_in_months: number;
  expected_impact: string;
  geometry: ValidGeometryType;
  impact_areas: string[];
  instrument_types: string[];
  involved_project_developer_not_listed: boolean;
  looking_for_funding: boolean;
  funding_plan: string;
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
  municipality: {
    id: string;
    location_type: 'municipality';
    name: string;
    parent: {
      id: string;
      location_type: 'depatment';
      name: string;
    };
  };
  project_images: ProjectImageType[];
  trusted?: boolean;
  project_developer?: any; // Cannot use ProjectDeveloperType because linting will complain about circular references
  involved_project_developers?: any[]; // Cannot use ProjectDeveloperType because linting will complain about circular references
};

/** Project impact properties  */
export type ProjectImpacts = {
  municipality_biodiversity_impact?: number;
  municipality_climate_impact?: number;
  municipality_water_impact?: number;
  municipality_community_impact?: number;
  municipality_total_impact?: number;
  hydrobasin_biodiversity_impact?: number;
  hydrobasin_climate_impact?: number;
  hydrobasin_water_impact?: number;
  hydrobasin_community_impact?: number;
  hydrobasin_total_impact?: number;
  priority_landscape_biodiversity_impact?: number;
  priority_landscape_climate_impact?: number;
  priority_landscape_water_impact?: number;
  priority_landscape_community_impact?: number;
  priority_landscape_total_impact?: number;
};

/** Project entity structure, received on get requests */
export type Project = ProjectBase &
  ProjectImpacts & {
    // Properties especific form Project(s) responses
    id: string;
    latitude: number;
    longitude: number;
    project_images: ProjectImageType[];
    slug: string;
    trusted?: boolean;
    type: 'project';
  };

/** Project Form inputs */
export type ProjectForm = ProjectBase & {
  country_id: string;
  department_id: string;
  involved_project_developer_ids: string[];
  municipality_id: string;
  project_images_attributes: ProjectImageGallery[];
  project_images_attributes_cover: string;

  // Not part of the payload
  involved_project_developer: boolean;
  project_gallery?: FileList;
};

/** Project images for creation/edition */
export type ProjectImagesAttributes = {
  file: File | string;
  cover: boolean;
};

/** Project creation/edition payload */
export type ProjectCreationPayload = Omit<
  ProjectForm,
  'involved_project_developer' | 'project_gallery' | 'slug' | 'project_images_attributes_cover'
> & {
  project_images_attributes: ProjectImagesAttributes[];
};

export type ProjectImageGallery = ProjectImagesAttributes & ProjectGalleryImageType;

export type ProjectsMapGeojson = {
  type: 'FeatureCollection';
  features: {
    type: 'Feature';
    id: string;
    geometry: {
      type: 'Point';
      coordinates: number[];
    };
    properties: {
      id: string;
      type: string;
      trusted: boolean;
      category: string;
    };
  }[];
};

export type ProjectsMap = {
  id: string;
  type: string;
  trusted: boolean;
  category: string;
  latitude: number;
  longitude: number;
};

export type ProjectMapParams = {
  'filter[category]'?: string;
  'filter[sdg]'?: number;
  'filter[instrument_type]'?: string;
  'filter[ticket_size]'?: string;
  'filter[only_verified]'?: string;
  'filter[full_text]'?: string;
};
