import { useMemo } from 'react';

import { UseQueryResult, useQuery } from 'react-query';

import { AxiosRequestConfig } from 'axios';

import { Queries } from 'enums';
import { Project } from 'types/project';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { PagedResponse, ErrorResponse, PagedRequest, ResponseData } from 'services/types';

/** Get a paged list of project developers */
const getProjects = async (params?: PagedRequest): Promise<PagedResponse<Project>> => {
  const { search, page, ...rest } = params;
  const config: AxiosRequestConfig = {
    url: '/api/v1/projects',
    method: 'GET',
    params: { ...rest, 'filter[full_text]': params.search, 'page[number]': params.page },
  };
  return await API.request(config).then((result) => result.data);
};

/** Hook to use the the Project Developers list */
export function useProjectsList(
  params?: PagedRequest
): UseQueryResult<PagedResponse<Project>> & { projects: Project[] } {
  const query = useQuery(
    [Queries.ProjectDeveloperList, params],
    () => getProjects(params),
    staticDataQueryOptions
  );

  return useMemo(
    () => ({
      ...query,
      projects: query?.data?.data || [],
    }),
    [query]
  );
}

/** Get a Project using an id and, optionally, the wanted fields */
export const getProject = async (
  id: string,
  params?: {
    fields?: string;
    includes?: string;
  }
): Promise<{
  data: Project;
  included: any[]; // TODO
}> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/projects/${id}`,
    method: 'GET',
    params: params,
  };
  return await API.request(config).then((response) => response.data);
};

/** Use query for a single Project */
export function useProject(id: string, params) {
  const query = useQuery([Queries.ProjectQuery, id], () => getProject(id, params));

  return useMemo(
    () => ({
      ...query,
      project: query.data,
    }),
    [query]
  );
}
