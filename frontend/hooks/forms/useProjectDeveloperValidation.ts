import { useIntl } from 'react-intl';

import { yupResolver } from '@hookform/resolvers/yup';
import { ObjectSchema, object, string, array, ArraySchema, number, SchemaOf } from 'yup';

import { Category, ProjectDeveloperSetupForm } from 'types/projectDeveloper';

export default () => {
  const { formatMessage } = useIntl();

  const schema: SchemaOf<ProjectDeveloperSetupForm> = object().shape({
    picture: string().required(),
    profile: string().required(),
    projectDeveloperType: string().required(),
    about: string().required(),
    mission: string().required(),
    categories: array<ProjectDeveloperSetupForm['categories']>(),
    mosaics: array<ProjectDeveloperSetupForm['mosaics']>(),
    impact: array<ProjectDeveloperSetupForm['impact']>(),
    language: string().required(),
    website: string(),
    facebook: string(),
    linkedin: string(),
    instagram: string(),
    twitter: string(),
  });

  return yupResolver(schema);
};
