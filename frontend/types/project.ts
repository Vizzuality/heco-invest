import { DevelopmentStages, Languages, TicketSizes } from 'enums';

export type ProjectBase = {
  ticket_size?: TicketSizes;
  received_funding: boolean;
  received_funding_amount_usd?: number;
  received_funding_investor?: string;
  replicability: string;
  sustainability: string;
  progress_impact_tracking: string;
  description: string;
  relevant_links?: string;
  categories: string;
  target_groups: string[];
  impact_areas: string[];
  sdgs: number[];
  instrument_types: string[];
  name: string;
  development_stage: DevelopmentStages;
  estimated_duration_in_months: number;
  involved_project_developer_not_listed: boolean;
  problem: string;
  solution: string;
  expected_impact: string;
  looking_for_funding: boolean;
};

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

export type ProjectForm = ProjectBase & {
  country_id: string;
  municipality_id: string;
  department_id: string;
  involved_project_developer_ids: string[];
  funding_plan: string;

  /** Not part of the payload */
  project_gallery?: FileList;
  location: File;
};
