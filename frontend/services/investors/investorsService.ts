import { useMemo } from 'react';

import { UseQueryResult, useQuery } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { Queries } from 'enums';

import API from 'services/api';
import { PagedResponse, ErrorResponse, PagedRequest } from 'services/types';

/** Use query for the Investors list */
export function useInvestorsList(
  params: PagedRequest
): UseQueryResult<AxiosResponse<PagedResponse<any>>, AxiosError<ErrorResponse>> {
  const getInvestors = async (params: PagedRequest) => {
    const config: AxiosRequestConfig = {
      url: '/api/v1/investors',
      method: 'GET',
      params,
    };
    return await API.request(config).then((response) => response.data.data);
  };

  return useQuery([Queries.InvestorList, params], () => getInvestors(params));
}

/** Get a Investor using an id and, optionally, the wanted fields */
export const getInvestor = async (id: string): Promise<any> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/investors/${id}`,
    method: 'GET',
  };
  return await API.request(config).then((response) => {
    return response.data;
  });
};

/** Use query for a single Investor */
export function useInvestor(id: string) {
  const query = useQuery([Queries.Investor, id], () => getInvestor(id));

  return useMemo(
    () => ({
      ...query,
      investor: query.data,
    }),
    [query]
  );
}
