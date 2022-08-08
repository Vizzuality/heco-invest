import { useIntl } from 'react-intl';

import { object, string, array, date, number } from 'yup';

export default (page: number) => {
  const { formatMessage } = useIntl();
  const maxTextLength = formatMessage({
    defaultMessage: 'It must have a maximum of 600 characters',
    id: 'frm1UB',
  });

  const messages = {
    name: formatMessage({ defaultMessage: 'You need to insert a name', id: 'XvwE2r' }),
    picture: formatMessage({
      defaultMessage: 'You need to upload a profile picture',
      id: 'gLT/Md',
    }),
    country_id: formatMessage({ defaultMessage: 'You need to select a country', id: 'cappSj' }),
    description: formatMessage({
      defaultMessage: 'You need enter a description of the open call',
      id: 'Km6ekR',
    }),

    instrument_types: formatMessage({
      defaultMessage: 'You need to select the types of financing are you can provide',
      id: 'cFytiP',
    }),
    expected_impact: formatMessage({
      defaultMessage: 'You need to enter impact that the project is expected to generate.',
      id: 'ir/b1N',
    }),
    max_funding: formatMessage({
      defaultMessage: 'You need to enter the max funding value',
      id: 'k5J7dK',
    }),
    funding_priorities: formatMessage({
      defaultMessage: 'You need to enter the funding priorities',
      id: 'wf8svn',
    }),
    funding_exclusions: formatMessage({
      defaultMessage: 'You need to enter the funding exclusions',
      id: 'p8jXrR',
    }),
    closing_at: formatMessage({
      defaultMessage: 'You need to select the closing date',
      id: '4EYr7Q',
    }),
  };

  const schemas = [
    object().shape({
      name: string().required(messages.name),
      picture: string(),
      country_id: string().required(messages.country_id),
      department_id: string(),
      municipality_id: string(),
      description: string().max(600, maxTextLength).required(messages.description),
    }),
    object().shape({
      expected_impact: string().max(600, maxTextLength).required(messages.expected_impact),
      sdgs: array().of(string()).ensure(),
    }),
    object().shape({
      max_funding: number().min(1).required(messages.max_funding),
      instrument_types: array()
        .of(string())
        .min(1, messages.instrument_types)
        .typeError(messages.instrument_types),
      funding_priorities: string().max(600, maxTextLength).required(messages.funding_priorities),
      funding_exclusions: string().max(600, maxTextLength).required(messages.funding_exclusions),
    }),
    object().shape({
      closing_at: date().required(messages.closing_at),
    }),
  ];
  return schemas[page];
};
