import { useMemo } from 'react';

import { UseQueryResult, useQuery, UseQueryOptions } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { Queries } from 'enums';
import { Investor } from 'types/investor';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { PagedResponse, PagedRequest } from 'services/types';

const getInvestors = async (params?: PagedRequest) => {
  const { fields, search, page, perPage, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/investors',
    method: 'GET',
    params: {
      ...rest,
      'fields[investor]': fields?.join(','),
      'filter[full_text]': search,
      'page[number]': page,
      'page[size]': perPage,
    },
  };

  return await API.request(config).then((result) => result.data);
};

/** Use query for the Investors list */
export function useInvestorsList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<Investor>>
): UseQueryResult<PagedResponse<Investor>> & { investors: Investor[] } {
  const query = useQuery([Queries.InvestorList, params], () => getInvestors(params), {
    ...staticDataQueryOptions,
    ...options,
  });

  return useMemo(
    () => ({
      ...query,
      investors: query?.data?.data || [],
    }),
    [query]
  );
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
