import { useIntl } from 'react-intl';

import { object, string, array, number } from 'yup';

import { getPartialUrlTransform, getSocialMediaLinksRegex } from 'helpers/pages';

export default (page: number) => {
  const { formatMessage } = useIntl();
  const messages = {
    picture: {
      required: formatMessage({
        defaultMessage: 'You need to upload a profile picture',
        id: 'gLT/Md',
      }),
      format: 'The profile picture must be an image',
    },
    name: formatMessage({ defaultMessage: 'You need to enter a profile name', id: 'X9irAo' }),
    projectDeveloperType: formatMessage({
      defaultMessage: 'You need to select a project developer type',
      id: 'l2C1SN',
    }),
    entityLegalRegistrationNumber: {
      invalidFormat: formatMessage({
        defaultMessage:
          'Invalid entity legal registration number format. It must be a 10 digit number.',
        id: 'nGC2oX',
      }),
      required: formatMessage({
        defaultMessage: 'You need enter the entity legal registration number',
        id: 'TJSbSS',
      }),
    },
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
    categories: formatMessage({
      defaultMessage: 'You need to select one or more categories',
      id: 'ora/x9',
    }),
    impacts: formatMessage({
      defaultMessage: 'You need to select one or more expected impact',
      id: 'lwv2DP',
    }),
    language: formatMessage({ defaultMessage: 'You need to select a language', id: 'Cise0r' }),
    maxTextLength: formatMessage({
      defaultMessage: 'It must have a maximum of 600 characters',
      id: 'frm1UB',
    }),
    website: formatMessage({ defaultMessage: 'Website must be a valid URL', id: 'Dm4fJl' }),
    social_medias: formatMessage({ defaultMessage: 'It should be a valid account', id: 'mOUwuv' }),
  };

  const firstPageSchema = object().shape({
    language: string().ensure().required(messages.language).length(2),
  });

  const { linkedin, facebook, instagram, twitter } = getSocialMediaLinksRegex();

  const secondPageSchema = object().shape({
    picture: string().required(messages.picture.required),
    name: string().required(messages.name),
    project_developer_type: string().ensure().required(messages.projectDeveloperType),
    entity_legal_registration_number: number()
      .typeError(messages.entityLegalRegistrationNumber.invalidFormat)
      .min(Math.pow(10, 9), messages.entityLegalRegistrationNumber.invalidFormat)
      .max(Math.pow(10, 12), messages.entityLegalRegistrationNumber.invalidFormat)
      .required(messages.entityLegalRegistrationNumber.required),
    about: string().max(600, messages.maxTextLength).required(messages.about),
    mission: string().max(600, messages.maxTextLength).required(messages.mission),
    contact_email: string()
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
  });

  const thirdPageSchema = object().shape({
    categories: array().of(string()).min(1, messages.categories),
    impacts: array().of(string()).min(1, messages.impacts),
    priority_landscape_ids: array().of(string()),
  });

  // We're concatenating all the schemas up to the one representing the current page so that we can
  // apply all the eventual transforms on all the attributes of the current and previous pages
  return [firstPageSchema, secondPageSchema, thirdPageSchema].reduce((res, schema, index) => {
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
