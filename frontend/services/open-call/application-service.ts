import { useMemo } from 'react';

import { useMutation, UseMutationResult, useQueryClient, UseQueryResult } from 'react-query';

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Queries } from 'enums';
import {
  OpenCallApplication,
  OpenCallApplicationParams,
  OpenCallApplicationPayload,
} from 'types/open-call-applications';
import { OpenCall } from 'types/open-calls';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';

/**
 * Get a list of open call applications
 **/
const getAccountOpenCallApplicationsList = async ({
  fields,
  filter,
  includes,
}: OpenCallApplicationParams): Promise<OpenCallApplication[]> => {
  const params = {
    'fields[open_call]': fields?.join(','),
    includes: includes?.join(','),
    'filter[full_text]': filter,
  };

  const options: AxiosRequestConfig = {
    url: '/api/v1/account/open_call_applications',
    params,
  };

  const response = await API.request<ResponseData<OpenCallApplication[]>>(options);
  return response.data.data;
};

/**
 * Hook to use the open call applications list belonging to the current Investor account
 **/
export const useAccountOpenCallApplicationsList = (
  params: OpenCallApplicationParams
): Omit<UseQueryResult, 'data'> & { openCallApplications: OpenCallApplication[] } => {
  const { data, ...rest } = useLocalizedQuery<OpenCallApplication[], ErrorResponse>(
    [Queries.AccountOpenCallApplicationsList, params],
    () => getAccountOpenCallApplicationsList(params),
    {
      refetchOnWindowFocus: false,
    }
  );

  return useMemo(
    () => ({
      ...rest,
      openCallApplications: data || [],
    }),
    [data, rest]
  );
};

/**
 * Hook to apply to an open call
 **/
export const useApplyToOpenCall = (): UseMutationResult<
  AxiosResponse<ResponseData<OpenCall>>,
  AxiosError<ErrorResponse>,
  OpenCallApplicationPayload
> => {
  const queryClient = useQueryClient();

  const applyToOpenCall = (
    projectId: string,
    openCallId: string,
    message: string
  ): Promise<AxiosResponse<ResponseData<OpenCall>>> => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `/api/v1/account/open_call_applications`,
      data: { project_id: projectId, open_call_id: openCallId, message },
    };

    return API(config);
  };

  return useMutation(
    ({ project_id, open_call_id, message }: OpenCallApplicationPayload) =>
      applyToOpenCall(project_id, open_call_id, message),
    {
      onSuccess() {
        queryClient.invalidateQueries(Queries.AccountOpenCallApplicationsList);
      },
    }
  );
};

/**
 * Hook to withdraw from an open call
 **/
export const useDeleteOpenCallApplication = (): UseMutationResult<
  AxiosResponse,
  AxiosError<ErrorResponse>
> => {
  const queryClient = useQueryClient();

  const deleteOpenCallApplication = (openCallId: string): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/api/v1/account/open_call_applications/${openCallId}`,
      data: { open_call_id: openCallId },
    };

    return API(config);
  };

  return useMutation((openCallId: string) => deleteOpenCallApplication(openCallId), {
    onSuccess() {
      queryClient.invalidateQueries(Queries.AccountOpenCallApplicationsList);
    },
  });
};
