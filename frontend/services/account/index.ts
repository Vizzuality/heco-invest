import { useMutation, UseMutationResult } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { ProjectDeveloperSetupForm } from 'types/projectDeveloper';

import api from 'services/api';

export function useCreateProjectDeveloper(): UseMutationResult<
  AxiosResponse<ProjectDeveloperSetupForm>,
  AxiosError<{ message: { title: string }[] }>,
  ProjectDeveloperSetupForm,
  unknown
> {
  const createProjectDeveloper = async (data: ProjectDeveloperSetupForm) => {
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
    return await api(config);
  };
  return useMutation(createProjectDeveloper);
}
