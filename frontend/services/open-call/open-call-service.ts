import { useMemo } from 'react';

import { useMutation, UseMutationResult, UseQueryResult } from 'react-query';

import { AxiosError } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Languages, Queries } from 'enums';
import { OpenCall, OpenCallDto } from 'types/open-calls';

import API, { RawApi } from 'services/api';
import { getInvestor } from 'services/investors/investorsService';
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

export const getOpenCall = async (id: string) => {
  const response = await RawApi.get(`/api/v1/open_calls/${id}`);
  const {
    investor: {
      data: { id: investorId },
    },
    country: {
      data: { id: countryId },
    },
    municipality: {
      data: { id: municipalityId },
    },
    department: {
      data: { id: departmentId },
    },
  } = response.data.data.relationships;
  const investor = await getInvestor(investorId);
  const country = await API.get(`/api/v1/locations/${countryId}`);
  const department = await API.get(`/api/v1/locations/${departmentId}`);
  const municipality = await API.get(`/api/v1/locations/${municipalityId}`);

  const openCall = {
    id: response.data.data.id,
    ...response.data.data.attributes,
    investor,
    country: country?.data?.data,
    department: department?.data?.data,
    municipality: municipality?.data?.data,
  };

  return openCall;
};

export const useOpenCall = (
  id: string,
  initialData?: OpenCall
): UseQueryResult & { openCall: OpenCall } => {
  const query = useLocalizedQuery([Queries.OpenCall, id], () => getOpenCall(id), {
    initialData,
  });

  return useMemo(() => {
    return { ...query, openCall: query.data };
  }, [query]);
};
