import { useMutation, UseMutationResult } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';

import api from 'services/api';

export function useCreateProjectDeveloper(): UseMutationResult<
  AxiosResponse<ProjectDeveloperSetupForm>,
  AxiosError,
  ProjectDeveloperSetupForm,
  unknown
> {
  const createProjectDeveloper = async (data: ProjectDeveloperSetupForm) =>
    await api.post('/account/project_developer', data);
  return useMutation(createProjectDeveloper);
}
