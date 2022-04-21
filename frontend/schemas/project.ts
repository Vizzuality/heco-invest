import { useIntl } from 'react-intl';

import { object, string, array, number, mixed, boolean } from 'yup';

export default (page: number) => {
  const { formatMessage } = useIntl();
  const schemas = [
    object().shape({
      name: string().required(),
      country_id: string().required(),
      municipality_id: string().required(),
      department_id: string().required(),
      project_gallery: mixed(),
      location: mixed(),
      involved_project_developer_ids: array().of(string()).nullable(),
    }),
    object().shape({
      development_stage: string().required(),
      estimated_duration_in_months: number().min(1).required(),
      categories: string().required(),
      problem: string().max(600),
      solution: string().max(600),
      target_groups: array().of(string()).required(),
      expected_impact: string().max(600),
    }),
    object().shape({
      impact_areas: array().of(string()).required(),
      sdgs: array().of(number().min(1)),
    }),
    object().shape({
      looking_for_funding: boolean(),
      ticket_size: string(),
      instrument_types: array().of(string()).required(),
      funding_plan: string().max(600).required(),
      received_funding: boolean(),
      received_funding_amount_usd: number().min(0),
      received_funding_investor: string(),
    }),
    object().shape({
      replicability: string().max(600),
      sustainability: string().max(600),
      progress_impact_tracking: string().max(600),
    }),
    object().shape({
      description: string().max(600),
      relevant_links: string(),
    }),
  ];
  return schemas[page];
};
