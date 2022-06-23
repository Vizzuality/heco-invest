import { useMemo } from 'react';

import { UseQueryResult, UseQueryOptions } from 'react-query';

import { AxiosResponse, AxiosRequestConfig } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Queries, UserRoles } from 'enums';
import { Investor } from 'types/investor';
import { User } from 'types/user';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { PagedResponse, PagedRequest, ResponseData, SingleRequestParams } from 'services/types';

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
  const query = useLocalizedQuery([Queries.InvestorList, params], () => getInvestors(params), {
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
export const getInvestor = async (id: string, params?: SingleRequestParams): Promise<Investor> => {
  const response = await API.get<ResponseData<Investor>>(`/api/v1/investors/${id}`);
  return response.data.data;
};

/** Use query for a single Investor */
export function useInvestor(id: string, initialData?: Investor, params?: SingleRequestParams) {
  const query = useLocalizedQuery([Queries.Investor, id], () => getInvestor(id, params), {
    initialData,
  });

  return useMemo(
    () => ({
      ...query,
      investor: query.data,
    }),
    [query]
  );
}

/** Get the Current Investor if the UserRole is investor */
export const useCurrentInvestor = (user: User) => {
  const getCurrentInvestor = async (): Promise<Investor> =>
    await API.get('/api/v1/account/investor').then(
      (response: AxiosResponse<ResponseData<Investor>> & { investor: Investor }) =>
        response.data.data
    );

  const query = useLocalizedQuery([Queries.Account, user], getCurrentInvestor, {
    // Creates the conditional to only fetch the data if the user is a project developer user
    enabled: user?.role === UserRoles.Investor,
    ...staticDataQueryOptions,
  });

  return useMemo(
    () => ({
      ...query,
      investor: query.data,
    }),
    [query]
  );
};
