import { useMemo } from 'react';

import {
  useQuery,
  useMutation,
  UseMutationResult,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
} from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { decycle } from 'cycle';

import useMe from 'hooks/me';

import { Queries, UserRoles } from 'enums';
import { Investor, InvestorForm } from 'types/investor';
import { Project, ProjectCreationPayload, ProjectUpdatePayload } from 'types/project';
import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';

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
  return await API.request(config).then((response) => decycle(response.data.data));
};

export function useProjectDeveloper(
  options: UseQueryOptions<ProjectDeveloper>,
  includes?: string
): UseQueryResult<ProjectDeveloper> & { projectDeveloper: ProjectDeveloper } {
  const query = useQuery([Queries.CurrentProjectDeveloper], () => getProjectDeveloper(includes), {
    refetchOnWindowFocus: false,
    ...options,
  });
  return useMemo(() => ({ ...query, projectDeveloper: query.data }), [query]);
}

const createProjectDeveloper = async (
  data: ProjectDeveloperSetupForm
): Promise<AxiosResponse<ProjectDeveloper>> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/api/v1/account/project_developer',
    data,
  };
  return await API(config);
};

export function useCreateProjectDeveloper(): UseMutationResult<
  AxiosResponse<ProjectDeveloper>,
  AxiosError<ErrorResponse>,
  ProjectDeveloperSetupForm
> {
  const queryClient = useQueryClient();

  return useMutation(createProjectDeveloper, {
    onSuccess: (result) => {
      queryClient.setQueryData(Queries.ProjectDeveloper, result.data);
    },
  });
}

// Update PD
const updateProjectDeveloper = async (
  data: ProjectDeveloperSetupForm
): Promise<AxiosResponse<ProjectDeveloper>> => {
  return await API.put('/api/v1/account/project_developer', data);
};

export function useUpdateProjectDeveloper(): UseMutationResult<
  AxiosResponse<ProjectDeveloper>,
  AxiosError<ErrorResponse>,
  ProjectDeveloperSetupForm
> {
  return useMutation(updateProjectDeveloper);
}

// Create Project
export function useCreateProject(): UseMutationResult<
  AxiosResponse<Project>,
  AxiosError<ErrorResponse>,
  ProjectCreationPayload
> {
  const createProject = async (data: ProjectCreationPayload): Promise<AxiosResponse<Project>> => {
    return API.post('/api/v1/account/projects', data).then((response) => response.data);
  };

  const queryClient = useQueryClient();

  return useMutation(createProject, {
    onSuccess: (result) => {
      queryClient.setQueryData(Queries.ProjectQuery, result.data);
    },
  });
}

export function useUpdateProject(): UseMutationResult<
  AxiosResponse<Project>,
  AxiosError<ErrorResponse>,
  ProjectUpdatePayload
> {
  const updateProject = async (project: ProjectUpdatePayload): Promise<AxiosResponse<Project>> => {
    return API.put(`/api/v1/account/projects/${project.id}`, project);
  };

  return useMutation(updateProject);
}

const getInvestor = async (includes?: string): Promise<Investor> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/investor`,
    method: 'GET',
    params: { includes },
  };
  return await API.request(config).then((response) => decycle(response.data.data));
};

export function useInvestor(options: UseQueryOptions<Investor>, includes?: string) {
  const query = useQuery([Queries.CurrentInvestor], () => getInvestor(includes), {
    refetchOnWindowFocus: false,
    ...options,
  });
  return useMemo(() => ({ ...query, investor: query.data }), [query]);
}

export function useCreateInvestor(): UseMutationResult<
  AxiosResponse<ResponseData<Investor>>,
  AxiosError<ErrorResponse>,
  InvestorForm
> {
  const createInvestor = async (
    data: InvestorForm
  ): Promise<AxiosResponse<ResponseData<Investor>>> => API.post('/api/v1/account/investor', data);

  const queryClient = useQueryClient();

  return useMutation(createInvestor, {
    onSuccess: (result) => {
      queryClient.setQueryData(Queries.Investor, result.data.data);
    },
  });
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

const getAccountProjects = async (params?: PagedRequest): Promise<PagedResponse<Project>> => {
  const { search, page, includes, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    // TODO: Change to the correct endpoint
    url: '/api/v1/projects',
    method: 'GET',
    params: {
      ...rest,
      includes: includes?.join(','),
      'filter[full_text]': search,
      'page[number]': page,
    },
  };

  return await API.request(config).then((result) => result.data);
};

export function useAccountProjectsList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<Project>>
): UseQueryResult<PagedResponse<Project>> & { projects: Project[] } {
  const query = useQuery([Queries.AccountProjectList, params], () => getAccountProjects(params), {
    ...staticDataQueryOptions,
    ...options,
  });

  return useMemo(
    () => ({
      ...query,
      projects: query?.data?.data || [],
    }),
    [query]
  );
}
