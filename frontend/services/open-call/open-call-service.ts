import { useMutation, UseMutationResult } from 'react-query';

import { AxiosError, AxiosResponse } from 'axios';

import { OpenCall, OpenCallFormDto } from 'types/open-calls';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';

export const useCreateOpenCall = (): UseMutationResult<
  AxiosResponse<ResponseData<OpenCall>>,
  AxiosError<ErrorResponse>,
  OpenCallFormDto
> => {
  return useMutation((dto: OpenCallFormDto) => API.post('/api/v1/account/open_calls', dto));
};
