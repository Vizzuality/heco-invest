import { useMutation, UseMutationResult } from 'react-query';

import { AxiosError, AxiosResponse } from 'axios';

import { Languages } from 'enums';
import { OpenCall, OpenCallDto } from 'types/open-calls';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';

export const useCreateOpenCall = (): UseMutationResult<
  AxiosResponse<ResponseData<OpenCall>>,
  AxiosError<ErrorResponse>,
  { dto: OpenCallDto; locale: Languages }
> => {
  return useMutation(({ dto, locale }) =>
    API.post('/api/v1/account/open_calls', dto, { params: { locale } })
  );
};
