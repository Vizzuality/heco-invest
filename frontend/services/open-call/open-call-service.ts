import { useMemo } from 'react';

import { useMutation, UseMutationResult, useQueryClient, UseQueryResult } from 'react-query';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Languages, Queries } from 'enums';
import {
  OpenCall,
  OpenCallCreationPayload,
  OpenCallParams,
  OpenCallUpdatePayload,
} from 'types/open-calls';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';

export const useCreateOpenCall = (): UseMutationResult<
  OpenCall,
  AxiosError<ErrorResponse>,
  { dto: OpenCallCreationPayload; locale: Languages }
> => {
  return useMutation(({ dto, locale }) =>
    API.post('/api/v1/account/open_calls', dto, { params: { locale } }).then(
      (response) => response.data.data
    )
  );
};

export const updateOpenCall = async (
  data: OpenCallUpdatePayload,
  params?: {
    locale?: string;
  }
): Promise<AxiosResponse<ResponseData<OpenCall>>> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/open_calls/${data.id}`,
    method: 'PUT',
    data: data,
    params: params || {},
  };

  return await API(config);
};

export function useUpdateOpenCall(
  params?: Parameters<typeof updateOpenCall>[1]
): UseMutationResult<
  AxiosResponse<ResponseData<OpenCall>>,
  AxiosError<ErrorResponse>,
  OpenCallUpdatePayload
> {
  const queryClient = useQueryClient();

  return useMutation((data) => updateOpenCall(data, params), {
    onSuccess: (result) => {
      const { data } = result.data;
      queryClient.invalidateQueries(Queries.OpenCall);
      queryClient.invalidateQueries(Queries.OpenCallList);
      queryClient.invalidateQueries(Queries.AccountOpenCallsList);
      queryClient.setQueryData([Queries.OpenCall, data.id], data);
    },
  });
}

const getAccountOpenCallsList = async ({
  fields,
  filter,
  includes,
}: OpenCallParams): Promise<OpenCall[]> => {
  const params = {
    'fields[open_call]': fields?.join(','),
    includes: includes?.join(','),
    'filter[full_text]': filter,
  };

  const options: AxiosRequestConfig = {
    url: '/api/v1/account/open_calls',
    params,
  };

  const response = await API.request<ResponseData<OpenCall[]>>(options);
  return response.data.data;
};

/** Hook to use the open calls list belonging to the current Investor account  */
export const useAccountOpenCallList = (
  params: OpenCallParams
): Omit<UseQueryResult, 'data'> & { openCalls: OpenCall[] } => {
  const { data, ...rest } = useLocalizedQuery<OpenCall[], ErrorResponse>(
    [Queries.AccountOpenCallsList, params],
    () => getAccountOpenCallsList(params),
    {
      refetchOnWindowFocus: false,
    }
  );
  return useMemo(
    () => ({
      ...rest,
      openCalls: data || [],
    }),
    [data, rest]
  );
};
