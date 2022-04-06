import { useIntl } from 'react-intl';

import { object, string, array, number, mixed } from 'yup';

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
    website: formatMessage({ defaultMessage: 'Website must be a valid URL', id: 'Dm4fJl' }),
    social_medias: formatMessage({ defaultMessage: 'It should be a valid account', id: 'mOUwuv' }),
  };

  const firstPageSchema = object().shape({
    language: string().ensure().required(messages.language).length(2),
  });

  const secondPageSchema = object().shape({
    picture: mixed()
      .required(messages.picture.required)
      .test('haveOneFile', messages.picture.required, (value) => value?.length === 1)
      .test(
        'fileFormat',
        messages.picture.format,
        (value: FileList) => value.length && !!value[0].type.match(/image\/*/gi)
      ),
    name: string().required(messages.name),
    project_developer_type: string().ensure().required(messages.projectDeveloperType),
    entity_legal_registration_number: number()
      .typeError(messages.entityLegalRegistrationNumber.invalidFormat)
      .min(Math.pow(10, 9), messages.entityLegalRegistrationNumber.invalidFormat)
      .max(Math.pow(10, 12), messages.entityLegalRegistrationNumber.invalidFormat)
      .required(messages.entityLegalRegistrationNumber.required),
    about: string().max(500, messages.maxTextLength).required(messages.about),
    mission: string().max(500, messages.maxTextLength).required(messages.mission),
    website: string().url(messages.website),
    facebook: string().test(
      'isSocialMediaLink',
      messages.social_medias,
      (value) => !value || !!value.match(/https:\/\/facebook.com\/.*/)
    ),
    linkedin: string().test(
      'isSocialMediaLink',
      messages.social_medias,
      (value) => !value || !!value.match(/https:\/\/linkedin.com\/.*/)
    ),
    instagram: string().test(
      'isSocialMediaLink',
      messages.social_medias,
      (value) => !value || !!value.match(/https:\/\/instagram.com\/.*/)
    ),
    twitter: string().test(
      'isSocialMediaLink',
      messages.social_medias,
      (value) => !value || !!value.match(/https:\/\/twitter.com\/.*/)
    ),
  });

  const thirdPageSchema = object().shape({
    categories: array().of(string()).min(1, messages.categories),
    impacts: array().of(string()).min(1, messages.impacts),
    mosaics: array().of(string()),
  });

  return [firstPageSchema, secondPageSchema, thirdPageSchema][page];
};
