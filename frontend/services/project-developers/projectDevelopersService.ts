import { useMemo } from 'react';

import { UseQueryResult, useQuery, useMutation, QueryClient, UseQueryOptions } from 'react-query';

import { AxiosResponse, AxiosRequestConfig } from 'axios';
import { decycle } from 'cycle';

import { Queries, UserRoles } from 'enums';
import { ProjectDeveloper } from 'types/projectDeveloper';
import { User } from 'types/user';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { PagedResponse, PagedRequest, ResponseData } from 'services/types';

/** Get a paged list of project developers */
const getProjectDevelopers = async (
  params?: PagedRequest
): Promise<PagedResponse<ProjectDeveloper>> => {
  const { fields, search, page, perPage, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/project_developers',
    method: 'GET',
    params: {
      ...rest,
      'fields[project_developer]': fields?.join(','),
      'filter[full_text]': search,
      'page[number]': page,
      'page[size]': perPage,
    },
  };

  return await API.request(config).then((result) => result.data);
};

/** Hook to use the the Project Developers list */
export function useProjectDevelopersList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<ProjectDeveloper>>
): UseQueryResult<PagedResponse<ProjectDeveloper>> & { projectDevelopers: ProjectDeveloper[] } {
  const query = useQuery(
    [Queries.ProjectDeveloperList, params],
    () => getProjectDevelopers(params),
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

/** Get a Project Developer using an id and, optionally, the wanted fields */
export async function getProjectDeveloper(
  id: string,
  params?: {
    fields?: string;
    includes?: string;
  }
): Promise<ProjectDeveloper> {
  const config: AxiosRequestConfig = {
    url: `/api/v1/project_developers/${id}`,
    method: 'GET',
    params: params,
  };
  return await API.request(config).then((response) => decycle(response.data.data));
}

/** Use query for a single Project Developer */
export function useProjectDeveloper(
  id: string,
  params?: {
    fields?: string;
    includes?: string;
  },
  initialData?: ProjectDeveloper
) {
  const query = useQuery([Queries.ProjectDeveloper, id], () => getProjectDeveloper(id, params), {
    initialData,
    refetchOnWindowFocus: false,
  });

  return useMemo(
    () => ({
      ...query,
      projectDeveloper: query.data,
    }),
    [query]
  );
}

const getCurrentProjectDeveloper = async (): Promise<ProjectDeveloper> =>
  await API.get('/api/v1/account/project_developer').then(
    (response: AxiosResponse<ResponseData<ProjectDeveloper>>) => response.data.data
  );
/** Get the Current Project Developer if the UserRole is project_developer */
export const useCurrentProjectDeveloper = (user?: User, useQueryOptions?: UseQueryOptions) => {
  const query = useQuery([Queries.Account, user], getCurrentProjectDeveloper, {
    // Creates the conditional to only fetch the data if the user is a project developer user
    enabled: user ? user?.role === UserRoles.ProjectDeveloper : useQueryOptions?.enabled,
    ...staticDataQueryOptions,
    ...useQueryOptions,
  });

  return useMemo(
    () => ({
      ...query,
      projectDeveloper: query.data,
    }),
    [query]
  );
};

/** Hook with mutation that handle favorite state. If favorite is false, creates a POST request to set favorite to true, and if favorite is true, creates a DELETE request that set favorite to false. */
export const useFavoriteProjectDeveloper = () => {
  const favoriteOrUnfavoriteProjectDeveloper = (
    projectDeveloperId: string,
    isFavourite: boolean
  ): Promise<ProjectDeveloper> => {
    const config: AxiosRequestConfig = {
      method: isFavourite ? 'DELETE' : 'POST',
      url: `/api/v1/project_developers/${projectDeveloperId}/favourite_project_developer`,
      data: { project_developer_id: projectDeveloperId },
    };

    return API.request(config).then((response) => decycle(response.data.data));
  };
  const queryClient = new QueryClient();
  return useMutation(
    ({ id, isFavourite }: { id: string; isFavourite: boolean }) =>
      favoriteOrUnfavoriteProjectDeveloper(id, isFavourite),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(Queries.ProjectDeveloper, data);
      },
    }
  );
};
