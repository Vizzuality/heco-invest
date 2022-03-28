import { yupResolver } from '@hookform/resolvers/yup';

import projectDeveloperSchema from 'schemas/projectDeveloper';

export default (section: number) => {
  return yupResolver(projectDeveloperSchema(section));
};
