import { useIntl } from 'react-intl';

import { object, string, array, number, setLocale } from 'yup';

// const base64Regex = new RegExp(/src=\"data:image\/([a-zA-Z]*);base64,([^\"]*)\"/);

// const pictureName = new RegExp(/\.(jpg|png)$/i);

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
    profile: formatMessage({ defaultMessage: 'You need to enter a profile name', id: 'X9irAo' }),
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
    about: formatMessage({ defaultMessage: 'You need enter a "about" text', id: 'tzSubd' }),
    mission: formatMessage({ defaultMessage: 'You need to enter a "mission" text', id: 'laO/jL' }),
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
      defaultMessage: 'It must have a maximum of 500 characters',
      id: 'iS0axe',
    }),
  };

  const firstPageSchema = object().shape({
    language: string().ensure().required(messages.language).length(2),
  });

  const secondPageSchema = object().shape({
    picture: string().ensure(),
    // .matches(base64Regex, { message: messages.picture.format })
    // .required(messages.picture.required),
    profile: string().required(messages.profile),
    project_developer_type: string().ensure().required(messages.projectDeveloperType),
    entity_legal_registration_number: number()
      .typeError(messages.entityLegalRegistrationNumber.invalidFormat)
      .min(Math.pow(10, 9), messages.entityLegalRegistrationNumber.invalidFormat)
      .max(Math.pow(10, 12), messages.entityLegalRegistrationNumber.invalidFormat)
      .required(messages.entityLegalRegistrationNumber.required),
    about: string().max(500, messages.maxTextLength).required(messages.about),
    mission: string().max(500, messages.maxTextLength).required(messages.mission),
    website: string(),
    facebook: string(),
    linkedin: string(),
    instagram: string(),
    twitter: string(),
  });

  const thirdPageSchema = object().shape({
    categories: array().of(string()).min(1, messages.categories),
    impacts: array().of(string()).min(1, messages.impacts),
    mosaics: array().of(string()),
  });

  return [firstPageSchema, secondPageSchema, thirdPageSchema][page];
};
