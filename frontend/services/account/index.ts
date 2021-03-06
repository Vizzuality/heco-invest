import { useMemo } from 'react';

import {
  useMutation,
  UseMutationResult,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from 'react-query';

import { useRouter } from 'next/router';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import useMe from 'hooks/me';
import { useLocalizedQuery } from 'hooks/query';

import { Queries, UserRoles } from 'enums';
import { Investor, InvestorForm } from 'types/investor';
import { Project, ProjectCreationPayload, ProjectUpdatePayload } from 'types/project';
import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import { AccountUser } from 'types/user';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { ErrorResponse, PagedRequest, PagedResponse, ResponseData } from 'services/types';

// Create PD
const getProjectDeveloper = async (includes?: string): Promise<ProjectDeveloper> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/project_developer`,
    method: 'GET',
    params: { includes },
  };
  return await API.request(config).then((response) => response.data.data);
};

export function useProjectDeveloper(
  options: UseQueryOptions<ProjectDeveloper>,
  includes?: string
): UseQueryResult<ProjectDeveloper> & { projectDeveloper: ProjectDeveloper } {
  const query = useLocalizedQuery(
    [Queries.CurrentProjectDeveloper, includes],
    () => getProjectDeveloper(includes),
    {
      refetchOnWindowFocus: false,
      ...options,
    }
  );
  return useMemo(() => ({ ...query, projectDeveloper: query.data }), [query]);
}

const createProjectDeveloper = async (
  data: ProjectDeveloperSetupForm
): Promise<AxiosResponse<ResponseData<ProjectDeveloper>>> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/api/v1/account/project_developer',
    data,
  };
  return await API(config);
};

export function useCreateProjectDeveloper(): UseMutationResult<
  AxiosResponse<ResponseData<ProjectDeveloper>>,
  AxiosError<ErrorResponse>,
  ProjectDeveloperSetupForm
> {
  const { locale } = useRouter();
  const queryClient = useQueryClient();

  return useMutation(createProjectDeveloper, {
    onSuccess: (result) => {
      queryClient.setQueryData([Queries.ProjectDeveloper, locale], result.data.data);
    },
  });
}

// Update PD
const updateProjectDeveloper = async (
  data: ProjectDeveloperSetupForm
): Promise<AxiosResponse<ResponseData<ProjectDeveloper>>> => {
  return await API.put('/api/v1/account/project_developer', data);
};

export function useUpdateProjectDeveloper(): UseMutationResult<
  AxiosResponse<ResponseData<ProjectDeveloper>>,
  AxiosError<ErrorResponse>,
  ProjectDeveloperSetupForm
> {
  return useMutation(updateProjectDeveloper);
}

// Create Project
export function useCreateProject(): UseMutationResult<
  AxiosResponse<ResponseData<Project>>,
  AxiosError<ErrorResponse>,
  ProjectCreationPayload
> {
  const queryClient = useQueryClient();

  const createProject = async (
    data: ProjectCreationPayload
  ): Promise<AxiosResponse<ResponseData<Project>>> => {
    return await API.post('/api/v1/account/projects', data);
  };

  return useMutation(createProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(Queries.AccountProjectList);
    },
  });
}

export function useUpdateProject(): UseMutationResult<
  AxiosResponse<ResponseData<Project>>,
  AxiosError<ErrorResponse>,
  ProjectUpdatePayload
> {
  const queryClient = useQueryClient();

  const updateProject = async (
    project: ProjectUpdatePayload
  ): Promise<AxiosResponse<ResponseData<Project>>> => {
    return API.put(`/api/v1/account/projects/${project.id}`, project);
  };

  return useMutation(updateProject, {
    onSuccess: () => {
      queryClient.invalidateQueries(Queries.Project);
      queryClient.invalidateQueries(Queries.AccountProjectList);
    },
  });
}

const getInvestor = async (includes?: string): Promise<Investor> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/investor`,
    method: 'GET',
    params: { includes },
  };
  return await API.request(config).then((response) => response.data.data);
};

export function useInvestor(options: UseQueryOptions<Investor>, includes?: string) {
  const query = useLocalizedQuery(
    [Queries.CurrentInvestor, includes],
    () => getInvestor(includes),
    {
      refetchOnWindowFocus: false,
      ...options,
    }
  );
  return useMemo(() => ({ ...query, investor: query.data }), [query]);
}

export function useCreateInvestor(): UseMutationResult<
  AxiosResponse<ResponseData<Investor>>,
  AxiosError<ErrorResponse>,
  InvestorForm
> {
  const { locale } = useRouter();
  const queryClient = useQueryClient();

  const createInvestor = async (
    data: InvestorForm
  ): Promise<AxiosResponse<ResponseData<Investor>>> => API.post('/api/v1/account/investor', data);

  return useMutation(createInvestor, {
    onSuccess: (result) => {
      queryClient.setQueryData([Queries.Investor, locale], result.data.data);
    },
  });
}

export function useUpdateInvestor(): UseMutationResult<
  AxiosResponse<ResponseData<Investor>>,
  AxiosError<ErrorResponse>,
  InvestorForm
> {
  const updateInvestor = async (
    data: InvestorForm
  ): Promise<AxiosResponse<ResponseData<Investor>>> => API.put('/api/v1/account/investor', data);

  return useMutation(updateInvestor);
}

export function useAccount(includes?: string) {
  const { user, isLoading, isError: userIsError } = useMe();
  const isProjectDeveloper = user?.role === UserRoles.ProjectDeveloper;
  const isInvestor = user?.role === UserRoles.Investor;

  const {
    data: projectDeveloperData,
    isLoading: isLoadingProjectDeveloperData,
    isError: projectDeveloperIsError,
  } = useProjectDeveloper(
    {
      enabled: isProjectDeveloper && !userIsError,
    },
    includes
  );

  const {
    data: investorData,
    isLoading: isLoadingInvestorData,
    isError: investorIsError,
  } = useInvestor({ enabled: isInvestor && !userIsError }, includes);

  const userAccount = isProjectDeveloper ? projectDeveloperData : investorData;
  const userAccountLoading = isLoadingProjectDeveloperData || isLoadingInvestorData;
  const accountIsError = isProjectDeveloper ? projectDeveloperIsError : investorIsError;

  return {
    user: user,
    userIsLoading: isLoading,
    userIsError,
    userAccount,
    userAccountLoading,
    accountIsError,
  };
}

/** Hook with mutation to delete a project from the account */
export const useDeleteAccountProject = () => {
  const queryClient = useQueryClient();

  const deleteAccountProject = (id: string): Promise<Project> => {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: `/api/v1/account/projects/${id}`,
      data: { id },
    };

    return API.request(config).then((response) => response.data.data);
  };

  return useMutation(({ id }: { id: string }) => deleteAccountProject(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(Queries.Project);
      queryClient.invalidateQueries(Queries.ProjectList);
      queryClient.invalidateQueries(Queries.AccountProjectList);
    },
  });
};

const getAccountProjects = async (params?: PagedRequest): Promise<PagedResponse<Project>> => {
  const { search, page, includes, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/account/projects',
    method: 'GET',
    params: {
      ...rest,
      includes: includes?.join(','),
      'filter[full_text]': search,
    },
  };

  return await API.request(config).then((result) => result.data);
};

export function useAccountProjectsList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<Project>>
): UseQueryResult<PagedResponse<Project>> & { projects: Project[] } {
  const query = useLocalizedQuery(
    [Queries.AccountProjectList, params],
    () => getAccountProjects(params),
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

/** Hook to use the the Users Invited to User Account */
const getAccountUsers = async (params?: PagedRequest): Promise<PagedResponse<AccountUser>> => {
  const { search, includes, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/account/users',
    method: 'GET',
    params: {
      ...rest,
      includes: includes?.join(','),
      'filter[full_text]': search,
    },
  };

  return await API.request(config).then((result) => result.data);
};

export function useAccountUsersList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<AccountUser>>
): UseQueryResult<PagedResponse<AccountUser>> & { users: AccountUser[] } {
  const query = useLocalizedQuery(
    [Queries.AccountUsersList, params],
    () => getAccountUsers(params),
    {
      ...staticDataQueryOptions,
      ...options,
    }
  );

  return useMemo(
    () => ({
      ...query,
      users: query?.data?.data,
    }),
    [query]
  );
}

export const useDeleteUser = (): UseMutationResult<{}, ErrorResponse> => {
  const deleteUser = async (id: string) =>
    await API.delete(`/api/v1/account/users/${id}`, { data: {} });

  return useMutation(deleteUser);
};
