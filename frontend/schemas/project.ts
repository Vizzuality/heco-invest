import { useIntl } from 'react-intl';

import { object, string, array, number, mixed, boolean } from 'yup';

export default (page: number) => {
  const { formatMessage } = useIntl();
  const maxTextLength = formatMessage({
    defaultMessage: 'It must have a maximum of 600 characters',
    id: 'frm1UB',
  });

  const messages = {
    name: formatMessage({ defaultMessage: 'You need to insert a name', id: 'XvwE2r' }),
    country_id: formatMessage({ defaultMessage: 'You need to select a country', id: 'cappSj' }),
    department_id: formatMessage({ defaultMessage: 'You need to select a state', id: '9a4/mT' }),
    municipality_id: formatMessage({
      defaultMessage: 'You need to select a municipality',
      id: '+m/R6q',
    }),
    project_gallery: {
      min_lenth: formatMessage({ defaultMessage: 'Upload at least one picture', id: 'BG1UW6' }),
      max_length: formatMessage({ defaultMessage: 'Upload a maximum of six images', id: 'U6/vVg' }),
      max_pitcure_size: formatMessage({
        defaultMessage: 'The pictures must have a maximum size of 5 MB',
        id: 'TfAnzZ',
      }),
    },
    involved_project_developer: formatMessage({
      defaultMessage: 'Select if there are other project developers involved on the project',
      id: '2RaCKb',
    }),
    involved_project_developer_ids: formatMessage({
      defaultMessage: 'Select at least one project developer involved on the project',
      id: 'M+H+u+',
    }),
    development_stage: formatMessage({
      defaultMessage: 'You need to select the development of the project',
      id: 'JpLZrZ',
    }),
    estimated_duration_in_months: {
      min: formatMessage({
        defaultMessage: 'The min development duration is 1 month',
        id: 'pQMwQ7',
      }),
      max: formatMessage({
        defaultMessage: 'The max development durations is 24 months',
        id: 'eL1UbG',
      }),
      required: formatMessage({
        defaultMessage: 'You need to enter the estimated duration of the project',
        id: '9+IpyL',
      }),
    },
    categories: formatMessage({
      defaultMessage: 'You need to select the project category',
      id: 'rsKPyl',
    }),
    problem: formatMessage({
      defaultMessage: 'You need to enter a text for the problems you are solving',
      id: 'wasfcn',
    }),
    solution: formatMessage({
      defaultMessage: 'You need to enter a text for the solution proposed',
      id: 'NeZ5aL',
    }),
    target_groups: formatMessage({
      defaultMessage: 'You need to select the target groups',
      id: 'kGJlX6',
    }),
    expected_impact: formatMessage({
      defaultMessage: 'You need to enter a text for the expected impact',
      id: 'Vddg/J',
    }),
    impact_areas: formatMessage({
      defaultMessage: 'Select at least one impact area',
      id: 'gFz7AV',
    }),
    sdgs: formatMessage({ defaultMessage: 'Select at least one SDG', id: 'Oh6Jeq' }),
  };

  const schemas = [
    object().shape({
      name: string().required(messages.name),
      country_id: string().required(messages.country_id),
      department_id: string().required(messages.department_id),
      municipality_id: string().required(messages.municipality_id),
      project_gallery: mixed<FileList>()
        .test('max_length', messages.project_gallery.max_length, (value) => value?.length <= 6)
        .test('max_picture_size', messages.project_gallery.max_pitcure_size, (value) => {
          let oversize = false;
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > 5 * 1024 * 1024) {
              oversize = true;
            }
          }
          return !oversize;
        }),
      location: mixed(),
      involved_project_developer: number()
        .min(0)
        .max(1)
        .required(messages.involved_project_developer)
        .typeError(messages.involved_project_developer),
      involved_project_developer_ids: array()
        .of(string())
        .min(1, messages.involved_project_developer_ids)
        .when('involved_project_developer', {
          is: 1,
          then: array().required(messages.involved_project_developer_ids),
          otherwise: array().notRequired(),
        }),
      involved_project_developer_not_listed: boolean(),
    }),
    object().shape({
      development_stage: string().required(messages.development_stage),
      estimated_duration_in_months: number()
        .typeError(messages.estimated_duration_in_months.required)
        .min(1, messages.estimated_duration_in_months.min)
        .max(24, messages.estimated_duration_in_months.max)
        .required(messages.estimated_duration_in_months.required),
      categories: string().ensure().required(messages.categories),
      problem: string().min(1, messages.problem).max(600, maxTextLength),
      solution: string().min(1, messages.solution).max(600, maxTextLength),
      target_groups: array().ensure().of(string()).min(1, messages.target_groups),
      expected_impact: string().min(1, messages.expected_impact).max(600, maxTextLength),
    }),
    object().shape({
      impact_areas: array().ensure().of(string()).min(1, messages.impact_areas),
      sdgs: array().ensure().of(string()).min(1, messages.sdgs),
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
