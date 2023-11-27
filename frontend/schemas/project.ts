import { useIntl } from 'react-intl';

import { object, string, array, number, mixed, boolean } from 'yup';

export default (page: number) => {
  const { formatMessage } = useIntl();
  const maxTextLength = formatMessage({
    defaultMessage: 'It must have a maximum of 600 characters',
    id: 'frm1UB',
  });
  const booleanField = formatMessage({
    defaultMessage: 'You need to select an option',
    id: 'm4AGCI',
  });

  const messages = {
    name: formatMessage({ defaultMessage: 'You need to insert a name', id: 'XvwE2r' }),
    country_id: formatMessage({ defaultMessage: 'You need to select a country', id: 'cappSj' }),
    department_id: formatMessage({ defaultMessage: 'You need to select a state', id: '9a4/mT' }),
    municipality_id: formatMessage({
      defaultMessage: 'You need to select a municipality',
      id: '+m/R6q',
    }),
    geometry: formatMessage({
      defaultMessage: 'Upload a geometry or draw on the map',
      id: '1+wwRC',
    }),
    project_images_attributes: {
      max_length: formatMessage({ defaultMessage: 'Upload a maximum of six images', id: 'U6/vVg' }),
      max_picture_size: formatMessage({
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
        defaultMessage: 'The max development duration is 36 months',
        id: 'KjV4yK',
      }),
      required: formatMessage({
        defaultMessage: 'You need to enter the estimated duration of the project',
        id: '9+IpyL',
      }),
    },
    category: formatMessage({
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
    ticket_size: formatMessage({
      defaultMessage: 'You need to select the amount of money you need for the project',
      id: 'rtG8sS',
    }),
    instrument_types: formatMessage({
      defaultMessage: 'You need to select what type of financing are you looking for',
      id: 'zBO3fW',
    }),
    funding_plan: formatMessage({
      defaultMessage: 'You need to enter a text for the funding plan',
      id: 'dOO/qA',
    }),
    received_funding_amount_usd: formatMessage({
      defaultMessage: 'The received amount must be greater than 0',
      id: '/i6bRr',
    }),
    replicability: formatMessage({
      defaultMessage: 'You need to enter a text for the replicability of the project',
      id: 'lr5x1P',
    }),
    sustainability: formatMessage({
      defaultMessage: 'You need to enter a text for the sustainability of the project',
      id: 'TCb/DD',
    }),
    progress_impact_tracking: formatMessage({
      defaultMessage: 'You need to enter a text for the progress and impact tracking',
      id: '0dbfpr',
    }),
    description: formatMessage({
      defaultMessage: 'You need to enter a text with a short description of your project',
      id: 'GC4Ve3',
    }),
  };

  let patternTwoDigisAfterComma = /^\d+(\.\d{0,2})?$/;

  const schemas = [
    object().shape({
      name: string().required(messages.name),
      country_id: string().required(messages.country_id),
      department_id: string().required(messages.department_id),
      municipality_id: string().required(messages.municipality_id),
      project_images_attributes: array()
        .ensure()
        .test(
          'have six or less valid images',
          { message: messages.project_images_attributes.max_length },
          (images) => images.filter((image) => !image._destroy).length <= 6
        ),
      geometry: mixed().required(messages.geometry),
      involved_project_developer: number()
        .min(0)
        .max(1)
        .required(messages.involved_project_developer)
        .typeError(messages.involved_project_developer),
      involved_project_developer_ids: array().when('involved_project_developer', {
        is: 1,
        then: array()
          .of(string())
          .min(1, messages.involved_project_developer_ids)
          .required(messages.involved_project_developer_ids),
        otherwise: array().notRequired().nullable(),
      }),
      involved_project_developer_not_listed: boolean(),
    }),
    object().shape({
      development_stage: string().required(messages.development_stage),
      estimated_duration_in_months: number()
        .typeError(messages.estimated_duration_in_months.required)
        .min(1, messages.estimated_duration_in_months.min)
        .max(36, messages.estimated_duration_in_months.max)
        .required(messages.estimated_duration_in_months.required),
      category: string().ensure().required(messages.category),
      problem: string().min(1, messages.problem).max(600, maxTextLength),
      solution: string().min(1, messages.solution).max(600, maxTextLength),
      target_groups: array().ensure().of(string()).min(1, messages.target_groups),
      expected_impact: string().min(1, messages.expected_impact).max(600, maxTextLength),
    }),
    object().shape({
      impact_areas: array()
        .typeError(messages.impact_areas)
        .of(string())
        .min(1, messages.impact_areas),
      sdgs: array().typeError(messages.sdgs).of(string()).min(1, messages.sdgs),
    }),
    object().shape({
      looking_for_funding: boolean().typeError(booleanField).required(booleanField),
      ticket_size: string().when('looking_for_funding', {
        is: true,
        then: string().required(messages.ticket_size),
        otherwise: string().nullable(),
      }),
      instrument_types: array().when('looking_for_funding', {
        is: true,
        then: array()
          .required()
          .typeError(messages.instrument_types)
          .min(1, messages.instrument_types),
        otherwise: array().nullable(),
      }),
      funding_plan: string().when('looking_for_funding', {
        is: true,
        then: string()
          .min(1, messages.funding_plan)
          .max(600, maxTextLength)
          .required(messages.funding_plan),
        otherwise: string().ensure().nullable(),
      }),
      received_funding: boolean().typeError(booleanField).required(booleanField),
      received_funding_amount_usd: mixed().test(
        'is-number',
        messages.received_funding_amount_usd,
        (value) => !value || Number(value) > 0
      ),
      received_funding_investor: string().nullable().max(600, maxTextLength),
    }),
    object().shape({
      replicability: string().max(600, maxTextLength).required(messages.replicability),
      sustainability: string().max(600, maxTextLength).required(messages.sustainability),
      progress_impact_tracking: string()
        .max(600, maxTextLength)
        .required(messages.progress_impact_tracking),
    }),
    object().shape({
      description: string().max(600, maxTextLength).required(messages.description),
      relevant_links: string().max(600, maxTextLength).nullable(),
      positive_financial_returns: string().max(600, maxTextLength).nullable(),
      last_year_sales_revenue: number()
        .positive()
        .test(
          'is-decimal',
          'The amount should be a decimal with maximum two digits after comma',
          (val: any) => {
            if (val != undefined) {
              return patternTwoDigisAfterComma.test(val);
            }
            return true;
          }
        )
        .min(0)
        .max(999999999.99)
        .nullable(),
      climate_change_risks_identified: boolean().typeError(booleanField).required(booleanField),
      climate_change_risks_details: string().max(600, maxTextLength),
    }),
  ];
  return schemas[page];
};
