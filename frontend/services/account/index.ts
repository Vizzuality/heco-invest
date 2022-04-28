import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { Queries } from 'enums';
import { Project, ProjectCreationPayload } from 'types/project';
import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';

import API from 'services/api';
import { ErrorResponse, ResponseData } from 'services/types';

const createProjectDeveloper = async (
  data: ProjectDeveloperSetupForm
): Promise<AxiosResponse<ProjectDeveloper>> => {
  const formData = new FormData();

  const { picture, ...rest } = data;
  formData.append('picture', data.picture[0]);
  Object.entries(rest).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`${key}[]`, v));
    } else {
      formData.append(key, value);
    }
  });

  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/api/v1/account/project_developer',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: formData,
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
  const createProject = async (data: ProjectCreationPayload): Promise<AxiosResponse<Project>> =>
    API.post('/api/v1/account/projects', data).then((response) => response.data);

  const queryClient = useQueryClient();

  return useMutation(createProject, {
    onSuccess: (result) => {
      queryClient.setQueryData(Queries.Project, result.data);
    },
  });
}
