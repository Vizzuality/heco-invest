import { useMemo } from 'react';

import { useMutation, UseMutationResult, UseQueryResult } from 'react-query';

import { AxiosError, AxiosRequestConfig } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Languages, Queries } from 'enums';
import { OpenCall, OpenCallDto, OpenCalParams } from 'types/open-calls';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';

export const useCreateOpenCall = (): UseMutationResult<
  OpenCall,
  AxiosError<ErrorResponse>,
  { dto: OpenCallDto; locale: Languages }
> => {
  return useMutation(({ dto, locale }) =>
    API.post('/api/v1/account/open_calls', dto, { params: { locale, includes: 'investor' } }).then(
      (response) => response.data.data
    )
  );
};
const getAccountOpenCallsList = async ({
  fields,
  filter,
  includes,
}: OpenCalParams): Promise<OpenCall[]> => {
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
  params: OpenCalParams
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
export const getOpenCall = async (id: string): Promise<OpenCall> => {
  const response = await API.get<ResponseData<OpenCall>>(`/api/v1/open_calls/${id}`, {
    params: {
      includes: 'investor,country,department,municipality',
    },
  });
  return response.data.data;
};

export const useOpenCall = (
  id: string,
  initialData?: OpenCall
): Omit<UseQueryResult, 'data'> & { openCall: OpenCall } => {
  const { data, ...rest } = useLocalizedQuery([Queries.OpenCall, id], () => getOpenCall(id), {
    initialData,
  });

  return useMemo(() => {
    return { ...rest, openCall: data };
  }, [data, rest]);
};
