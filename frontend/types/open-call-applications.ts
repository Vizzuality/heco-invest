import { Investor } from 'types/investor';
import { OpenCall } from 'types/open-calls';
import { Project } from 'types/project';

export type OpenCallApplication = {
  id: string;
  type: 'open_call_application';
  created_at: string;
  updated_at: string;
  message: string;
  funded: boolean;
  investor: Investor;
  project: Project;
  open_call: OpenCall;
};

export type OpenCallApplicationParams = {
  fields?: string[];
  includes?: string[];
  filter?: string;
};

export type OpenCallApplicationForm = {
  project_id: string;
  message: string;
};

export type OpenCallApplicationPayload = OpenCallApplicationForm & {
  open_call_id: string;
};
