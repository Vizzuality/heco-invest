import { useMemo } from 'react';

import { UseQueryResult, useQuery } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { stringify } from 'query-string';

import { QUERIES } from 'enums';

import API from 'services/api';
import { PagedResponse, ErrorResponse, PagedRequest } from 'services/types';

/** Use query for the Investors list */
export function useInvestorsList(
  params: PagedRequest
): UseQueryResult<AxiosResponse<PagedResponse<any>>, AxiosError<ErrorResponse>> {
  const getInvestors = async (params: PagedRequest) => {
    const parameters = stringify({ params });
    const config: AxiosRequestConfig = {
      url: `/api/v1/investors?${parameters}`,
      method: 'GET',
    };
    return await API.request(config).then((response) => response.data.data);
  };

  return useQuery([QUERIES.INVESTORS, params], () => getInvestors(params));
}

/** Get a Investor using an id and, optionally, the wanted fields */
export const getInvestor = async (id: string, fields?: string): Promise<any> => {
  const params = stringify({ 'fields[project_developer]': fields });
  const config: AxiosRequestConfig = {
    url: `/api/v1/project_developers/${id}${params ? '?' + params : ''}`,
    method: 'GET',
  };
  return await API.request(config).then((response) => response.data.data);
};

/** Use query for a single Investor */
export function useInvestor(id: string) {
  const query = useQuery([QUERIES.INVESTOR, id], () => getInvestor(id));

  return useMemo(
    () => ({
      ...query,
      investor: query.data,
    }),
    [query]
  );
}
