import { yupResolver } from '@hookform/resolvers/yup';

import projectDeveloperSchema from 'schemas/projectDeveloper';

export default (section: number) => {
  return yupResolver(projectDeveloperSchema(section));
};

export const formPageInputs = [
  ['languages'],
  [
    'picture',
    'name',
    'project-developer-type',
    'entity-legal-registration-number',
    'about',
    'mission',
    'contact_phone',
    'contact_email',
    'website',
    'facebook',
    'linkedin',
    'instagram',
    'twitter',
  ],
  ['categories', 'mosaics', 'impacts'],
];
