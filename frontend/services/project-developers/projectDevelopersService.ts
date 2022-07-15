import { useMemo } from 'react';

import {
  UseQueryResult,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  QueryFunction,
} from 'react-query';

import { useRouter } from 'next/router';

import { AxiosRequestConfig } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

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
  const query = useLocalizedQuery(
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
export const getProjectDeveloper = async (
  id: string,
  params?: {
    fields?: string;
    includes?: string[];
  }
): Promise<{
  data: ProjectDeveloper;
  included: any[]; // TODO
}> => {
  const { includes, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: `/api/v1/project_developers/${id}`,
    method: 'GET',
    params: {
      includes: includes?.join(','),
      ...rest,
    },
  };
  return await API.request(config).then((response) => response.data);
};

/** Use query for a single Project Developer */
export function useProjectDeveloper(
  id: string,
  params?: Parameters<typeof getProjectDeveloper>[1],
  initialData?: ProjectDeveloper
) {
  const query = useLocalizedQuery(
    [Queries.ProjectDeveloper, id],
    () => getProjectDeveloper(id, params),
    {
      initialData: { data: initialData, included: [] },
    }
  );

  return useMemo(
    () => ({
      ...query,
      projectDeveloper: query.data,
    }),
    [query]
  );
}

const getCurrentProjectDeveloper: QueryFunction<ProjectDeveloper> = async () =>
  await API.get<ResponseData<ProjectDeveloper>>('/api/v1/account/project_developer').then(
    (response) => response.data.data
  );
/** Get the Current Project Developer if the UserRole is project_developer */
export const useCurrentProjectDeveloper = (user?: User) => {
  const query = useLocalizedQuery<ProjectDeveloper, any, ProjectDeveloper, any>(
    [Queries.ProjectDeveloper, user],
    getCurrentProjectDeveloper,
    {
      // Creates the conditional to only fetch the data if the user is a project developer user
      enabled: !user || user?.role === UserRoles.ProjectDeveloper,
      ...staticDataQueryOptions,
    }
  );

  return useMemo<UseQueryResult<ProjectDeveloper> & { projectDeveloper: ProjectDeveloper }>(
    () => ({
      ...query,
      projectDeveloper: query.data,
    }),
    [query]
  );
};

/** Hook with mutation that handle favorite state. If favorite is false, creates a POST request to set favorite to true, and if favorite is true, creates a DELETE request that set favorite to false. */
export const useFavoriteProjectDeveloper = () => {
  const queryClient = useQueryClient();
  const { locale } = useRouter();

  const favoriteOrUnfavoriteProjectDeveloper = (
    projectDeveloperId: string,
    isFavourite: boolean
  ): Promise<ProjectDeveloper> => {
    const config: AxiosRequestConfig = {
      method: isFavourite ? 'DELETE' : 'POST',
      url: `/api/v1/project_developers/${projectDeveloperId}/favourite_project_developer`,
      data: { project_developer_id: projectDeveloperId },
    };

    return API.request(config).then((response) => response.data.data);
  };

  return useMutation(
    ({ id, isFavourite }: { id: string; isFavourite: boolean }) =>
      favoriteOrUnfavoriteProjectDeveloper(id, isFavourite),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([Queries.ProjectDeveloper, locale], data);
        queryClient.invalidateQueries([Queries.ProjectDeveloper], {});
        queryClient.invalidateQueries([Queries.ProjectDeveloperList], {});
      },
    }
  );
};
