import { yupResolver } from '@hookform/resolvers/yup';

import projectSchema from 'schemas/project';
import { ProjectForm } from 'types/project';

export default (section: number) => {
  return yupResolver(projectSchema(section));
};

export const formPageInputs: (keyof ProjectForm)[][] = [
  [
    'name',
    'country_id',
    'municipality_id',
    'department_id',
    'project_gallery',
    'location',
    'involved_project_developer_ids',
  ],
  [
    'development_stage',
    'estimated_duration_in_months',
    'category',
    'problem',
    'solution',
    'target_groups',
    'expected_impact',
  ],
  ['impact_areas', 'sdgs'],
  [
    'looking_for_funding',
    'ticket_size',
    'instrument_types',
    'funding_plan',
    'received_funding',
    'received_funding_amount_usd',
    'received_funding_investor',
  ],
  ['replicability', 'sustainability', 'progress_impact_tracking'],
  ['description', 'relevant_links'],
];
