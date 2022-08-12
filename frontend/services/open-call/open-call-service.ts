import { OpenCall } from 'types/open-calls';

import API from 'services/api';
import { ResponseData } from 'services/types';

export const getOpenCall = async (id: string) => {
  const response = await API.get<ResponseData<OpenCall>>(`/api/v1/open_calls/${id}`);
  return response.data.data;
};
