import { yupResolver } from '@hookform/resolvers/yup';

import projectDeveloperSchema from 'schemas/project-developer';

export default (section: number) => {
  return yupResolver(projectDeveloperSchema(section));
};

export const formPageInputs = [
  ['languages'],
  [
    'picture',
    'name',
    'project_developer_type',
    'entity_legal_registration_number',
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
