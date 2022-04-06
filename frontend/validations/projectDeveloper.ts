import { yupResolver } from '@hookform/resolvers/yup';

import projectDeveloperSchema from 'schemas/projectDeveloper';

export default (section: number) => {
  return yupResolver(projectDeveloperSchema(section));
};

export const formPageInputs = [
  ['languages'],
  [
    'picture',
    'profile',
    'project-developer-type',
    'entity-legal-registration-number',
    'about',
    'mission',
    'website',
    'facebook',
    'linkedin',
    'instagram',
    'twitter',
  ],
  ['categories', 'mosaics', 'impacts'],
];
