import { useMemo } from 'react';

import { UseQueryResult, UseQueryOptions } from 'react-query';

import { AxiosRequestConfig } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Queries } from 'enums';
import { Investor } from 'types/investor';
import { OpenCall } from 'types/open-calls';
import { Project } from 'types/project';
import { ProjectDeveloper } from 'types/projectDeveloper';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { PagedRequest, PagedResponse } from 'services/types';

/** ============================================================ */
/** ========================= PROJECTS ========================= */
/** ============================================================ */

/** Get a paged list of favorited projects */
export const getFavoriteProjects = async (
  params?: PagedRequest
): Promise<PagedResponse<Project>> => {
  const { search, page, includes, fields, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/account/projects/favourites',
    method: 'GET',
    params: {
      ...rest,
      includes: includes?.join(','),
      'page[number]': page,
      'fields[project]': fields?.join(','),
    },
  };

  return await API.request(config).then((result) => {
    return result.data;
  });
};

/** Hook to use getFavoriteProjects */
export function useFavoriteProjectsList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<Project>>
): UseQueryResult<PagedResponse<Project>> & { projects: Project[] } {
  const query = useLocalizedQuery(
    [Queries.FavoriteProjectsList, params],
    () => getFavoriteProjects(params),
    {
      ...staticDataQueryOptions,
      ...options,
    }
  );

  return useMemo(
    () => ({
      ...query,
      projects: query?.data?.data || [],
    }),
    [query]
  );
}

/** ============================================================ */
/** ========================= INVESTORS ======================== */
/** ============================================================ */

/** Get a paged list of favorited investors */
export const getFavoriteInvestors = async (
  params?: PagedRequest
): Promise<PagedResponse<Investor>> => {
  const { search, page, includes, fields, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/account/investors/favourites',
    method: 'GET',
    params: {
      ...rest,
      includes: includes?.join(','),
      'page[number]': page,
      'fields[project]': fields?.join(','),
    },
  };

  return await API.request(config).then((result) => {
    return result.data;
  });
};

/** Hook to use getFavoriteInvestors */
export function useFavoriteInvestorsList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<Investor>>
): UseQueryResult<PagedResponse<Investor>> & { investors: Investor[] } {
  const query = useLocalizedQuery(
    [Queries.FavoriteInvestorsList, params],
    () => getFavoriteInvestors(params),
    {
      ...staticDataQueryOptions,
      ...options,
    }
  );

  return useMemo(
    () => ({
      ...query,
      investors: query?.data?.data || [],
    }),
    [query]
  );
}

/** ============================================================ */
/** ==================== PROJECT DEVELOPERS ==================== */
/** ============================================================ */

/** Get a paged list of favorited project developers */
export const getFavoriteProjectDevelopers = async (
  params?: PagedRequest
): Promise<PagedResponse<ProjectDeveloper>> => {
  const { search, page, includes, fields, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/account/project_developers/favourites',
    method: 'GET',
    params: {
      ...rest,
      includes: includes?.join(','),
      'page[number]': page,
      'fields[project]': fields?.join(','),
    },
  };

  return await API.request(config).then((result) => {
    return result.data;
  });
};

/** Hook to use getFavoriteProjectDevelopers */
export function useFavoriteProjectDevelopersList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<ProjectDeveloper>>
): UseQueryResult<PagedResponse<ProjectDeveloper>> & { projectDevelopers: ProjectDeveloper[] } {
  const query = useLocalizedQuery(
    [Queries.FavoriteProjectDevelopersList, params],
    () => getFavoriteProjectDevelopers(params),
    {
      ...staticDataQueryOptions,
      ...options,
    }
  );

  return useMemo(
    () => ({
      ...query,
      projectDevelopers: query?.data?.data || [],
    }),
    [query]
  );
}

/** ============================================================ */
/** ======================== OPEN CALLS ======================== */
/** ============================================================ */

/** Get a paged list of favorited open calls */
export const getFavoriteOpenCalls = async (
  params?: PagedRequest
): Promise<PagedResponse<OpenCall>> => {
  const { search, page, includes, fields, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/account/open_calls/favourites',
    method: 'GET',
    params: {
      ...rest,
      includes: includes?.join(','),
      'page[number]': page,
      'fields[project]': fields?.join(','),
    },
  };

  return await API.request(config).then((result) => {
    return result.data;
  });
};

/** Hook to use getFavoriteOpenCalls */
export function useFavoriteOpenCallsList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<OpenCall>>
): UseQueryResult<PagedResponse<OpenCall>> & { openCalls: OpenCall[] } {
  const query = useLocalizedQuery(
    [Queries.FavoriteOpenCallsList, params],
    () => getFavoriteOpenCalls(params),
    {
      ...staticDataQueryOptions,
      ...options,
    }
  );

  return useMemo(
    () => ({
      ...query,
      openCalls: query?.data?.data || [],
    }),
    [query]
  );
}
