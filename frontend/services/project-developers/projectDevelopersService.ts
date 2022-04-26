import { useMemo } from 'react';

import { UseQueryResult, useQuery } from 'react-query';

import { AxiosResponse, AxiosRequestConfig } from 'axios';

import { Queries, UserRoles } from 'enums';
import { ProjectDeveloper } from 'types/projectDeveloper';
import { User } from 'types/user';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { PagedResponse, ErrorResponse, PagedRequest, ResponseData } from 'services/types';

/** Get a paged list of project developers */
const getProjectDevelopers = async (
  params?: PagedRequest
): Promise<PagedResponse<ProjectDeveloper>> => {
  const { fields, ...rest } = params;
  const config: AxiosRequestConfig = {
    url: '/api/v1/project_developers',
    method: 'GET',
    params: { ...rest, 'fields[project_developer]': params.fields.join(',') },
  };
  return await API.request(config).then((result) => result.data);
};

/** Hook to use the the Project Developers list */
export function useProjectDevelopersList(
  params?: PagedRequest
): UseQueryResult<PagedResponse<ProjectDeveloper>> & { projectDevelopers: ProjectDeveloper[] } {
  const query = useQuery([Queries.ProjectDeveloperList, params], () =>
    getProjectDevelopers(params)
  );
  return useMemo(
    () => ({
      ...query,
      projectDevelopers: query?.data?.data || [],
    }),
    [query]
  );
}

/** Get a Project Developer using an id and, optionally, the wanted fields */
export const getProjectDeveloper = async (id: string): Promise<ProjectDeveloper> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/project_developers/${id}`,
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

/** Get the Current Project Developer if the UserRole is project_developer */
export const useCurrentProjectDeveloper = (user: User) => {
  const getCurrentProjectDeveloper = async (): Promise<ProjectDeveloper> =>
    await API.get('/api/v1/account/project_developer').then(
      (response: AxiosResponse<ResponseData<ProjectDeveloper>>) => response.data.data
    );

  const query = useQuery([Queries.Account, user], getCurrentProjectDeveloper, {
    // Creates the conditional to only fetch the data if the user is a project developer user
    enabled: user?.role === UserRoles.ProjectDeveloper,
    ...staticDataQueryOptions,
  });

  return useMemo(
    () => ({
      ...query,
      projectDeveloper: query.data,
    }),
    [query]
  );
};
