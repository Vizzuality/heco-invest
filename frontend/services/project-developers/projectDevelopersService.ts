import { useMemo } from 'react';

import { UseQueryResult, useQuery } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { stringify } from 'query-string';

import { Queries } from 'enums';
import { ProjectDeveloper } from 'types/projectDeveloper';

import API from 'services/api';
import { PagedResponse, ErrorResponse, PagedRequest } from 'services/types';

/** Use query for the Project Developers list */
export function useProjectDevelopersList(
  params: PagedRequest
): UseQueryResult<AxiosResponse<PagedResponse<ProjectDeveloper>>, AxiosError<ErrorResponse>> {
  const getProjectDevelopers = async (params: PagedRequest) => {
    const parameters = stringify({ params });
    const config: AxiosRequestConfig = {
      url: `/api/v1/project_developers?${parameters}`,
      method: 'GET',
    };
    return await API.request(config).then((response) => response.data.data);
  };

  return useQuery([Queries.ProjectDeveloperList, params], () => getProjectDevelopers(params));
}

/** Get a Project Developer using an id and, optionally, the wanted fields */
export const getProjectDeveloper = async (
  id: string,
  fields?: string
): Promise<ProjectDeveloper> => {
  const params = stringify({ 'fields[project_developer]': fields });
  const config: AxiosRequestConfig = {
    url: `/api/v1/project_developers/${id}${params ? '?' + params : ''}`,
    method: 'GET',
  };
  return await API.request(config).then((response) => response.data.data);
};

/** Use query for a single Project Developer */
export function useProjectDeveloper(id: string) {
  const query = useQuery([Queries.ProjectDeveloper, id], () => getProjectDeveloper(id));

  return useMemo(
    () => ({
      ...query,
      projectDeveloper: query.data,
    }),
    [query]
  );
}
