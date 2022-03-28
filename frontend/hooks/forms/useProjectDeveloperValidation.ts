import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, array } from 'yup';

export default (section: number) => {
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
    entityLegalRegistrationNumber: formatMessage({
      defaultMessage: 'You need enter the entity legal registration number',
      id: 'TJSbSS',
    }),
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
  };

  const firstSchema = object().shape({
    language: string().required(messages.language),
  });

  const secondSchema = object().shape({
    picture: string().min(10, messages.picture.format).required(messages.picture.required),
    profile: string().required(messages.profile),
    projectDeveloperType: string().required(messages.projectDeveloperType),
    entityLegalRegistrationNumber: string().required(messages.entityLegalRegistrationNumber),
    about: string().required(messages.about),
    mission: string().required(messages.mission),
    website: string(),
    facebook: string(),
    linkedin: string(),
    instagram: string(),
    twitter: string(),
  });

  const thirdSchema = object().shape({
    categories: array().of(string()).min(1, messages.categories),
    mosaics: array().of(string()),
    impacts: array().of(string()).min(1, messages.impacts),
  });

  const schemas = [firstSchema, secondSchema, thirdSchema];

  return yupResolver(schemas[section]);
};

// /(?:[A-Za-z\d+/]{4})*(?:[A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)?/
