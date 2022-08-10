import { useMutation, UseMutationResult, UseQueryResult } from 'react-query';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { Languages, Queries } from 'enums';
import { OpenCall, OpenCallDto, OpenCalParams } from 'types/open-calls';

import API from 'services/api';
import { ErrorResponse, PagedResponse, ResponseData } from 'services/types';
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

const getOpenCallsList = async ({
  fields,
  filter,
  includes,
}: OpenCalParams): Promise<OpenCall[]> => {
  const params = {};
  fields?.length && (params['fields[open_call]'] = fields.join(','));
  includes?.length && (params['includes'] = includes.join(','));
  filter && (params['filter[full_text]'] = filter);
  const options: AxiosRequestConfig = {
    url: '/api/v1/open_calls',
    params,
  };
  const response = await API.request<PagedResponse<OpenCall>>(options);
  return response.data.data;
};

export const useGetOpenCallList = (
  params: OpenCalParams
): UseQueryResult<OpenCall[], ErrorResponse> => {
  const query = useLocalizedQuery<OpenCall[], ErrorResponse>(
    Queries.OpenCallsList,
    () => getOpenCallsList(params),
    {
      refetchOnWindowFocus: false,
    }
  );

  return query;
};
