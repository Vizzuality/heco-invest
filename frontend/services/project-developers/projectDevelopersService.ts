import { useMemo } from 'react';

import { UseQueryResult, useQuery } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { stringify } from 'query-string';

<<<<<<< HEAD
import { Queries, UserRoles } from 'enums';
import { ProjectDeveloper } from 'types/projectDeveloper';
import { User } from 'types/user';

import API from 'services/api';
import { PagedResponse, ErrorResponse, PagedRequest, ResponseData } from 'services/types';
=======
import { Queries } from 'enums';
import { ProjectDeveloper } from 'types/projectDeveloper';

import API from 'services/api';
import { PagedResponse, ErrorResponse, PagedRequest } from 'services/types';
>>>>>>> 6fb14f66ec5cfef3c1a90406b0affe67f946ca57

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

/** Get the Current Project Developer if the UserRole is project_developer */
export const useCurrentProjectDeveloper = (user: User): UseQueryResult<ProjectDeveloper> => {
  const getCurrentProjectDeveloper = async (): Promise<ProjectDeveloper> =>
    await API.get('/api/v1/account/project_developer').then(
      (response: AxiosResponse<ResponseData<ProjectDeveloper>>) => response.data.data
    );

  const query = useQuery([Queries.Account, user], getCurrentProjectDeveloper, {
    // Creates the conditional to only fetch the data if the user is a project developer user
    enabled: user?.attributes?.role === UserRoles.ProjectDeveloper,
    refetchInterval: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return useMemo(() => query, [query]);
};
