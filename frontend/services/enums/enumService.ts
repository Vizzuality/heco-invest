import { Enum } from 'types/enums';

import API from 'services/api';

export const getEnums = async (): Promise<Enum[]> => {
  const enums = await API.get('api/v1/enums');
  return enums.data.data;
};
