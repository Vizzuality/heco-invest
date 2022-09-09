import { useMemo } from 'react';

import {
  useMutation,
  UseMutationResult,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
  useQuery,
} from 'react-query';

import { useRouter } from 'next/router';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import useMe from 'hooks/me';
import { useLocalizedQuery } from 'hooks/query';

import { Paths, Queries, UserRoles } from 'enums';
import { Investor, InvestorForm } from 'types/investor';
import { Project, ProjectCreationPayload, ProjectUpdatePayload } from 'types/project';
import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import { AccountUser } from 'types/user';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { ErrorResponse, PagedRequest, PagedResponse, ResponseData } from 'services/types';

// Get Account PD
export const getProjectDeveloper = async (params?: {
  includes?: string[];
  locale?: string;
}): Promise<ProjectDeveloper> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/project_developer`,
    method: 'GET',
    params: {
      ...(params ?? {}),
      includes: params?.includes?.join(','),
    },
  };

  return await API.request(config).then((response) => response.data.data);
};

export const useProjectDeveloper = (
  params?: Parameters<typeof getProjectDeveloper>[0],
  options?: UseQueryOptions
): UseQueryResult<ProjectDeveloper> => {
  const query = useLocalizedQuery<any>(
    [Queries.CurrentProjectDeveloper, params],
    () => getProjectDeveloper(params),
    {
      refetchOnWindowFocus: false,
      ...options,
    }
  );

  return query;
};

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
      queryClient.invalidateQueries(Queries.ProjectDeveloper);
      queryClient.invalidateQueries(Queries.ProjectDeveloperList);
      queryClient.setQueryData([Queries.ProjectDeveloper, locale], result.data.data);
    },
  });
}

export const updateProjectDeveloper = async (
  data: ProjectDeveloperSetupForm,
  params?: {
    locale?: string;
  }
): Promise<AxiosResponse<ResponseData<ProjectDeveloper>>> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/project_developer`,
    method: 'PUT',
    data: data,
    params: params || {},
  };

  return await API(config);
};

export function useUpdateProjectDeveloper(
  params?: Parameters<typeof updateProjectDeveloper>[1]
): UseMutationResult<
  AxiosResponse<ResponseData<ProjectDeveloper>>,
  AxiosError<ErrorResponse>,
  ProjectDeveloperSetupForm
> {
  const queryClient = useQueryClient();

  return useMutation((data) => updateProjectDeveloper(data, params), {
    onSuccess: (result) => {
      const { data } = result.data;
      queryClient.invalidateQueries(Queries.ProjectDeveloper);
      queryClient.invalidateQueries(Queries.ProjectDeveloperList);
      queryClient.setQueryData([Queries.ProjectDeveloper, data.id], data);
    },
  });
}

// Create Project
export const createProject = async (
  data: ProjectCreationPayload,
  params?: {
    locale?: string;
  }
): Promise<AxiosResponse<ResponseData<Project>>> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/projects`,
    method: 'POST',
    data: data,
    params: params || {},
  };

  return await API(config);
};

export function useCreateProject(
  params?: Parameters<typeof updateProject>[1]
): UseMutationResult<
  AxiosResponse<ResponseData<Project>>,
  AxiosError<ErrorResponse>,
  ProjectCreationPayload
> {
  const queryClient = useQueryClient();

  return useMutation((data) => createProject(data, params), {
    onSuccess: (result) => {
      const { data } = result.data;
      queryClient.invalidateQueries(Queries.Project);
      queryClient.invalidateQueries(Queries.ProjectList);
      queryClient.invalidateQueries(Queries.AccountProjectList);
      queryClient.setQueryData([Queries.Project, data.id], data);
    },
  });
}

export const updateProject = async (
  data: ProjectUpdatePayload,
  params?: {
    locale?: string;
  }
): Promise<AxiosResponse<ResponseData<Project>>> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/projects/${data.id}`,
    method: 'PUT',
    data: data,
    params: params || {},
  };

  return await API(config);
};

export function useUpdateProject(
  params?: Parameters<typeof updateProject>[1]
): UseMutationResult<
  AxiosResponse<ResponseData<Project>>,
  AxiosError<ErrorResponse>,
  ProjectUpdatePayload
> {
  const queryClient = useQueryClient();

  return useMutation((data) => updateProject(data, params), {
    onSuccess: (result) => {
      const { data } = result.data;
      queryClient.invalidateQueries(Queries.Project);
      queryClient.invalidateQueries(Queries.ProjectList);
      queryClient.invalidateQueries(Queries.AccountProjectList);
      queryClient.setQueryData([Queries.Project, data.id], data);
    },
  });
}

// Get Account Investor
export const getInvestor = async (params?: {
  includes?: string[];
  locale?: string;
}): Promise<Investor> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/investor`,
    method: 'GET',
    params: {
      ...(params ?? {}),
      includes: params?.includes?.join(','),
    },
  };

  return await API.request(config).then((response) => response.data.data);
};

export const useInvestor = (
  params?: Parameters<typeof getInvestor>[0],
  options?: UseQueryOptions
): UseQueryResult<Investor> => {
  const query = useLocalizedQuery<any>(
    [Queries.CurrentInvestor, params],
    () => getInvestor(params),
    {
      refetchOnWindowFocus: false,
      ...options,
    }
  );

  return query;
};

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
      queryClient.invalidateQueries(Queries.Investor);
      queryClient.invalidateQueries(Queries.InvestorList);
      queryClient.setQueryData([Queries.Investor, locale], result.data.data);
    },
  });
}

export const updateInvestor = async (
  data: InvestorForm,
  params?: {
    locale?: string;
  }
): Promise<AxiosResponse<ResponseData<Investor>>> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/investor`,
    method: 'PUT',
    data: data,
    params: params || {},
  };

  return await API(config);
};

export function useUpdateInvestor(
  params?: Parameters<typeof updateProjectDeveloper>[1]
): UseMutationResult<
  AxiosResponse<ResponseData<Investor>>,
  AxiosError<ErrorResponse>,
  InvestorForm
> {
  const queryClient = useQueryClient();

  return useMutation((data) => updateInvestor(data, params), {
    onSuccess: (result) => {
      const { data } = result.data;
      queryClient.invalidateQueries(Queries.Investor);
      queryClient.invalidateQueries(Queries.InvestorList);
      queryClient.setQueryData([Queries.ProjectDeveloper, data.id], data);
    },
  });
}

export function useAccount(params = {}) {
  const { user, isLoading, isError: userIsError } = useMe();
  const isProjectDeveloper = user?.role === UserRoles.ProjectDeveloper;
  const isInvestor = user?.role === UserRoles.Investor;

  const {
    data: projectDeveloperData,
    isLoading: isLoadingProjectDeveloperData,
    isError: projectDeveloperIsError,
  } = useProjectDeveloper(params, { enabled: isProjectDeveloper && !userIsError });

  const {
    data: investorData,
    isLoading: isLoadingInvestorData,
    isError: investorIsError,
  } = useInvestor(params, { enabled: isInvestor && !userIsError });

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

export const transferOwnership = async (userId: string) => {
  return await API.post('/api/v1/account/users/transfer_ownership', {
    user_id: userId,
  });
};

/** Hook with mutation to delete an account */
export const useDeleteAccount = (): UseMutationResult<AxiosResponse, AxiosError> => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteAccount = async (): Promise<AxiosResponse> => {
    const config: AxiosRequestConfig = {
      method: 'DELETE',
      url: '/api/v1/account/users/account',
      data: {},
    };

    return API(config);
  };

  return useMutation(deleteAccount, {
    onSuccess: () => {
      queryClient.removeQueries();
      router.push(`${Paths.HiddenPage}?page=${Paths.AccountDeleted}`, Paths.AccountDeleted);
    },
  });
};
