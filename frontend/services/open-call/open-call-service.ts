import { useMutation, UseMutationResult } from 'react-query';

import { AxiosError } from 'axios';

import { Languages } from 'enums';
import { OpenCall, OpenCallDto } from 'types/open-calls';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';

export const useCreateOpenCall = (): UseMutationResult<
  OpenCall,
  AxiosError<ErrorResponse>,
  { dto: OpenCallDto; locale: Languages }
> => {
  return useMutation(({ dto, locale }) =>
    API.post('/api/v1/account/open_calls', dto, { params: { locale } }).then(
      (response) => response.data.data
    )
  );
};

export const getOpenCall = async (id: string) => {
  const response = await API.get<ResponseData<OpenCall>>(`/api/v1/open_calls/${id}`);
  return response.data.data;
};
