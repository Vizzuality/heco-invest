import { ValidGeometryType } from 'containers/forms/geometry/types';
import { ProjectGalleryImageType } from 'containers/forms/project-gallery/project-gallery-image/types';

import {
  DevelopmentStages,
  Languages,
  TicketSizes,
  ProjectStatus,
  ImpactAreas,
  Impacts,
} from 'enums';

import { Locations } from './locations';

/** Project images on responses */
export type ProjectImageType = {
  id?: string;
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
  country: Locations;
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
  climate_change_risks_identified: boolean;
  climate_change_risks_details?: string;
  positive_financial_returns?: string;
  last_year_sales_revenue?: number;
  replicability: string;
  sdgs: number[];
  solution: string;
  sustainability: string;
  target_groups: string[];
  ticket_size?: TicketSizes;
  language: Languages;
  municipality: Locations;
  department: Locations;
  project_images: ProjectImageType[];
  trusted?: boolean;
  favourite?: boolean;
  status?: ProjectStatus;
  project_developer?: any; // Cannot use ProjectDeveloperType because linting will complain about circular references
  involved_project_developers?: any[]; // Cannot use ProjectDeveloperType because linting will complain about circular references
  /**
   * Whether the logged in investor has marked the project as funded. `null` if the user is not
   * logged in or not an investor.
   **/
  funded?: boolean;
};

/** Project impact properties  */
export type ProjectImpacts = {
  impact_calculated: boolean;
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
    priority_landscape: Locations;
    created_at: string;
    updated_at: string;
  };

/** Project Form inputs */
export type ProjectForm = ProjectBase & {
  country_id: string;
  department_id: string;
  involved_project_developer_ids: string[];
  municipality_id: string;
  project_images_attributes: ProjectImageGallery[];

  // Not part of the payload
  involved_project_developer: number;
  project_gallery?: FileList;
};

/** Project images for creation/edition */
export type ProjectImagesAttributes = {
  file?: string;
  cover: boolean;
  id?: string;
  _destroy?: boolean;
};

/** Project creation/edition payload */
export type ProjectCreationPayload = Omit<
  ProjectForm,
  'involved_project_developer' | 'project_gallery' | 'slug' | 'project_images_attributes'
> & {
  project_images_attributes: ProjectImagesAttributes[];
};

export type ProjectUpdatePayload = ProjectCreationPayload & {
  id: string;
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
  //'filter[only_verified]'?: string; VERIFICATION FILTERS: HIDDEN
  'filter[full_text]'?: string;
};

export type ProjectImpactScores = {
  biodiversity: number | null;
  climate: number | null;
  water: number | null;
  community: number | null;
  total: number | null;
};

export type ProjectImpactAreasScores = {
  municipality: ProjectImpactScores;
  hydrobasin: ProjectImpactScores;
  priority_landscape: ProjectImpactScores;
};
