import { yupResolver } from '@hookform/resolvers/yup';

import invitedUsersSchema from 'schemas/invitedUsers';

export default (section: number) => {
  return yupResolver(invitedUsersSchema(section));
};

export const formPageInputs = [['contact_email']];
