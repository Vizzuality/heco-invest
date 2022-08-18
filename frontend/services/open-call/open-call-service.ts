import { useMemo } from 'react';

import { useMutation, UseMutationResult, UseQueryResult } from 'react-query';

import { AxiosError } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Languages, Queries } from 'enums';
import { OpenCall, OpenCallDto } from 'types/open-calls';

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
