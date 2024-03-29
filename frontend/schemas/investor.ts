import { useIntl } from 'react-intl';

import { object, string, array, boolean } from 'yup';

import { getPartialUrlTransform, getSocialMediaLinksRegex } from 'helpers/pages';

export default (page: number) => {
  const { formatMessage } = useIntl();
  const maxTextLength = formatMessage({
    defaultMessage: 'It must have a maximum of 600 characters',
    id: 'frm1UB',
  });

  const messages = {
    language: formatMessage({ defaultMessage: 'You need to select a language', id: 'Cise0r' }),
    picture: formatMessage({
      defaultMessage: 'You need to upload a profile picture',
      id: 'gLT/Md',
    }),
    name: formatMessage({ defaultMessage: 'You need to insert a name', id: 'XvwE2r' }),
    investor_type: formatMessage({
      defaultMessage: 'You need to select the investor/funder type',
      id: 'iTkO2x',
    }),
    about: formatMessage({ defaultMessage: 'You need to enter an "about" text', id: 'Tymdwj' }),
    mission: formatMessage({ defaultMessage: 'You need to enter a "mission" text', id: 'laO/jL' }),
    contactEmail: {
      required: formatMessage({
        defaultMessage: 'You need to enter an email',
        id: 'GkDTfx',
      }),
      isValid: formatMessage({
        defaultMessage: 'Invalid email format.',
        id: '05q+7T',
      }),
    },
    contactPhone: formatMessage({ defaultMessage: 'Invalid phone number', id: 'HhjmvS' }),
    website: formatMessage({ defaultMessage: 'Website must be a valid URL', id: 'Dm4fJl' }),
    social_medias: formatMessage({ defaultMessage: 'It should be a valid account', id: 'mOUwuv' }),
    ticket_sizes: formatMessage({
      defaultMessage: 'You need to select the amount of money you can provide',
      id: 'khRkg/',
    }),
    instrument_types: formatMessage({
      defaultMessage: 'You need to select the type of financing are you can provide',
      id: 'hRZo+X',
    }),
    previously_invested: formatMessage({
      defaultMessage: 'You need to select if you have previously invested in impact',
      id: 'biZCxW',
    }),
    impacts: formatMessage({
      defaultMessage: 'You need to select one or more impact areas that you prioritize',
      id: 'LAmop5',
    }),
    other_information: formatMessage({
      defaultMessage: 'You need to write other relevant information',
      id: 'eG1BWC',
    }),
  };

  const { linkedin, facebook, instagram, twitter } = getSocialMediaLinksRegex();

  const schemas = [
    object().shape({
      language: string().ensure().required(messages.language),
    }),
    object().shape({
      picture: string().required(messages.picture),
      name: string().required(messages.name),
      investor_type: string().typeError(messages.investor_type).required(messages.investor_type),
      about: string().max(600, maxTextLength).required(messages.about),
      mission: string().max(600, maxTextLength).required(messages.mission),
      contact_email: string()
        .ensure()
        .email(messages.contactEmail.isValid)
        .required(messages.contactEmail.required),
      contact_phone: string()
        .nullable()
        .test(
          'isValid',
          messages.contactPhone,
          (value) => !value || !!value.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)
        ),
      website: string().url(messages.website).transform(getPartialUrlTransform),
      facebook: string()
        .test(
          'isSocialMediaLink',
          messages.social_medias,
          (value) => !value || !!value.match(facebook)
        )
        .transform(getPartialUrlTransform),
      linkedin: string()
        .test(
          'isSocialMediaLink',
          messages.social_medias,
          (value) => !value || !!value.match(linkedin)
        )
        .transform(getPartialUrlTransform),
      instagram: string()
        .test(
          'isSocialMediaLink',
          messages.social_medias,
          (value) => !value || !!value.match(instagram)
        )
        .transform(getPartialUrlTransform),
      twitter: string()
        .test(
          'isSocialMediaLink',
          messages.social_medias,
          (value) => !value || !!value.match(twitter)
        )
        .transform(getPartialUrlTransform),
    }),
    object().shape({
      categories: array().of(string()).ensure(),
      ticket_sizes: array()
        .of(string())
        .min(1, messages.ticket_sizes)
        .typeError(messages.ticket_sizes),
      instrument_types: array()
        .of(string())
        .min(1, messages.instrument_types)
        .typeError(messages.instrument_types),
    }),
    object().shape({
      previously_invested: boolean()
        .required(messages.previously_invested)
        .typeError(messages.previously_invested),
      impacts: array().of(string()).min(1, messages.impacts).typeError(messages.impacts),
      sdgs: array().of(string()).ensure(),
    }),
    object().shape({
      prioritized_projects_description: string().max(600, maxTextLength),
    }),
    object().shape({
      other_information: string().max(600, maxTextLength).required(messages.other_information),
    }),
  ];

  // We're concatenating all the schemas up to the one representing the current page so that we can
  // apply all the eventual transforms on all the attributes of the current and previous pages
  return schemas.reduce((res, schema, index) => {
    const isSchemaForFuturePage = index > page;

    // When editing, we're skipping the first page so we exclude the corresponding schema from the
    // concatenation
    const isFirstPageSchemaExcluded = page > 0 && index === 0;

    if (isSchemaForFuturePage || isFirstPageSchemaExcluded) {
      return res;
    }

    return res.concat(schema);
  }, object());
};
