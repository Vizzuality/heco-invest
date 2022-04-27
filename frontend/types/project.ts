import { DevelopmentStages, Languages, TicketSizes } from 'enums';

/** Common Project types */
export type ProjectBase = {
  categories: string;
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
};

/** Project entity structure */
export type Project = {
  id: string;
  type: 'project';
  attributes: ProjectBase & {
    slug: string;
    language: Languages;
  };
  relationships: {
    project_developer: {
      data: {
        id: string;
        type: 'project_developer';
      };
    };
    involved_project_developers: {
      data: {
        id: string;
        type: 'project_developer';
      }[];
    };
  };
};

/** Project Form inputs */
export type ProjectForm = ProjectBase & {
  country_id: string;
  department_id: string;
  funding_plan: string;
  involved_project_developer_ids: string[];
  municipality_id: string;

  // Not part of the payload
  involved_project_developer: boolean;
  project_gallery?: FileList;
  // TO UPDATE LATER
  location: File;
};
