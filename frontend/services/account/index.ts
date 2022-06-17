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

import { Queries } from 'enums';
import { Investor, InvestorForm } from 'types/investor';
import { Project, ProjectCreationPayload } from 'types/project';
import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';

// Create PD
const getProjectDeveloper = async (): Promise<ProjectDeveloper> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/project_developer`,
    method: 'GET',
  };
  return await API.request(config).then((response) => decycle(response.data.data));
};

export function useProjectDeveloper(
  options: UseQueryOptions<ProjectDeveloper>
): UseQueryResult<ProjectDeveloper> & { projectDeveloper: ProjectDeveloper } {
  const query = useQuery([Queries.CurrentProjectDeveloper], () => getProjectDeveloper(), {
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

// Create Investor

const getInvestor = async (): Promise<Investor> => {
  const config: AxiosRequestConfig = {
    url: `/api/v1/account/investor`,
    method: 'GET',
  };
  return await API.request(config).then((response) => decycle(response.data.data));
};

export function useInvestor(options: UseQueryOptions<Investor>) {
  const query = useQuery([Queries.CurrentInvestor], () => getInvestor(), {
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
