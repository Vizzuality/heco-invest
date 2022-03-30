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
    'projectDeveloperType',
    'entityLegalRegistrationNumber',
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
