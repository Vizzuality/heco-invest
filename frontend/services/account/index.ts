import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { Queries } from 'enums';
import { Investor, InvestorForm } from 'types/investor';
import { Project, ProjectCreationPayload } from 'types/project';
import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';

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

export function useCreateInvestor(): UseMutationResult<
  AxiosResponse<ResponseData<Investor>>,
  AxiosError<ErrorResponse>,
  InvestorForm
> {
  const createInvestor = async (
    data: InvestorForm
  ): Promise<AxiosResponse<ResponseData<Investor>>> =>
    API.post('/api/v1/account/investor', { ...data, how_do_you_work: 'test' });

  const queryClient = useQueryClient();

  return useMutation(createInvestor, {
    onSuccess: (result) => {
      queryClient.setQueryData(Queries.Investor, result.data.data);
    },
  });
}
