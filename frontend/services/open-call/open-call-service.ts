import { useMutation, UseMutationResult } from 'react-query';

import { AxiosError, AxiosResponse } from 'axios';

import { Languages, Queries } from 'enums';
import { OpenCall, OpenCallDto } from 'types/open-calls';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';
import { useLocalizedQuery } from 'hooks/query';

export const useCreateOpenCall = (): UseMutationResult<
  AxiosResponse<ResponseData<OpenCall>>,
  AxiosError<ErrorResponse>,
  { dto: OpenCallDto; locale: Languages }
> => {
  return useMutation(({ dto, locale }) =>
    API.post('/api/v1/account/open_calls', dto, { params: { locale } })
  );
};

const getOpenCallsList = async () => {
  const response = await API.get('/api/v1/open_calls');
  return response.data.data;
};

export const useGetOpenCallList = () => {
  const { data, ...rest } = useLocalizedQuery(Queries.OpenCallsList, getOpenCallsList, {
    refetchOnWindowFocus: false,
  });

  console.log(data);

  return {
    openCalls: data,
    ...rest,
  };
};
