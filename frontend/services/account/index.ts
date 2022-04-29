import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';

import API from 'services/api';
import { ErrorResponse } from 'services/types';

const createProjectDeveloper = async (
  data: ProjectDeveloperSetupForm
): Promise<AxiosResponse<ProjectDeveloper>> => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/api/v1/account/project_developer',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
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
      queryClient.setQueryData('project_developer', result.data);
    },
  });
}
