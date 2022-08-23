import { useMemo } from 'react';

import { useMutation, UseMutationResult, useQueryClient, UseQueryResult } from 'react-query';

import { useRouter } from 'next/router';

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

/** Get an Open call using an id and, optionally, the wanted fields */
export const getOpenCall = async (
  id: string,
  params?: {
    'fields[open_call]'?: string;
    includes?: string[];
    locale?: string;
  }
): Promise<{
  data: OpenCall;
  included: any[]; // TODO
}> => {
  const { includes, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: `/api/v1/open_calls/${id}`,
    method: 'GET',
    params: {
      includes: includes?.join(','),
      ...rest,
    },
  };
  return await API.request(config).then((response) => response.data);
};

/** Use query for a single OpenCall */
export function useOpenCall(
  id: string,
  params?: Parameters<typeof getOpenCall>[1],
  initialData?: OpenCall
) {
  const query = useLocalizedQuery([Queries.OpenCall, id], () => getOpenCall(id, params), {
    refetchOnWindowFocus: false,
    initialData: { data: initialData, included: [] },
  });

  return useMemo(
    () => ({
      ...query,
      openCall: query.data,
    }),
    [query]
  );
}

export const useCreateOpenCall = (params: {
  locale?: Languages;
}): UseMutationResult<OpenCall, AxiosError<ErrorResponse>, OpenCallCreationPayload> => {
  return useMutation((data: OpenCallCreationPayload) =>
    API.post('/api/v1/account/open_calls', data, {
      params: { ...params, includes: 'investor' },
    }).then((response) => response.data.data)
  );
};

export const updateOpenCall = async (
  data: OpenCallUpdatePayload,
  params?: {
    locale?: Languages;
  }
): Promise<OpenCall> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/open_calls/${data.id}`,
    method: 'PUT',
    data,
    params,
  };

  return await API(config).then((response) => response.data.data);
};

export function useUpdateOpenCall(
  params?: Parameters<typeof updateOpenCall>[1]
): UseMutationResult<OpenCall, AxiosError<ErrorResponse>, OpenCallUpdatePayload> {
  const queryClient = useQueryClient();

  return useMutation((data) => updateOpenCall(data, params), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(Queries.OpenCall);
      queryClient.invalidateQueries(Queries.OpenCallList);
      queryClient.invalidateQueries(Queries.AccountOpenCallsList);
      queryClient.setQueryData([Queries.OpenCall, data.id], data);
    },
  });
}

export const deleteOpenCall = async (
  id: OpenCall['id']
): Promise<AxiosResponse<ResponseData<OpenCall>>> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/open_calls/${id}`,
    method: 'DELETE',
    data: { id },
  };

  return await API(config);
};

export function useDeleteOpenCall(): UseMutationResult<
  AxiosResponse<ResponseData<OpenCall>>,
  AxiosError<ErrorResponse>,
  OpenCall['id']
> {
  const queryClient = useQueryClient();

  return useMutation((id) => deleteOpenCall(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(Queries.OpenCall);
      queryClient.invalidateQueries(Queries.OpenCallList);
      queryClient.invalidateQueries(Queries.AccountOpenCallsList);
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

/**
 * Hook with mutation that handles the favorite state.
 * If favorite is false, it creates a POST request to set favorite to true, and
 * if favorite is true, creates a DELETE request that set favorite to false.
 **/
export const useFavoriteOpenCall = () => {
  const { locale } = useRouter();
  const queryClient = useQueryClient();

  const favoriteOrUnfavoriteOpenCall = (
    openCallId: string,
    isFavourite: boolean
  ): Promise<OpenCall> => {
    const config: AxiosRequestConfig = {
      method: isFavourite ? 'DELETE' : 'POST',
      url: `/api/v1/open-calls/${openCallId}/favourite_open_call`,
      data: { open_call_id: openCallId },
    };

    return API.request(config).then((response) => response.data.data);
  };

  return useMutation(
    ({ id, isFavourite }: { id: string; isFavourite: boolean }) =>
      favoriteOrUnfavoriteOpenCall(id, isFavourite),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(Queries.OpenCall);
        queryClient.invalidateQueries(Queries.OpenCallList);
        queryClient.invalidateQueries(Queries.FavoriteOpenCallsList);
        queryClient.setQueryData([Queries.OpenCall, data.id], data);
      },
    }
  );
};
