import { useMemo } from 'react';

import { useMutation, UseMutationResult, useQuery, useQueryClient } from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { Queries, UserRoles } from 'enums';
import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import { User, UserAccount } from 'types/user';

import API from 'services/api';
import { getProjectDeveloper } from 'services/project-developers/projectDevelopersService';
import { ErrorResponse } from 'services/types';

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
      queryClient.setQueryData('project_developer', result.data);
    },
  });
}

export function useAccount(user?: User) {
  const getAccount = async (): Promise<UserAccount> => {
    switch (user.attributes.role) {
      case UserRoles.ProjectDeveloper:
        return await getProjectDeveloper('9271bfb2-a68e-4a05-8c7a-af0003a66ead', 'name,slug');
      case UserRoles.Investor:
        // Change to get investor function
        return await getProjectDeveloper('9271bfb2-a68e-4a05-8c7a-af0003a66ead', 'name,slug');
      default:
        return null;
    }
  };

  const query = useQuery([Queries.Account, user], getAccount, {
    enabled: !!user?.attributes?.role,
  });

  return useMemo(
    () => ({
      ...query,
      account: query?.data?.attributes,
    }),
    [query]
  );
}
