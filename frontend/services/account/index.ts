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
import { Project, ProjectCreationPayload, ProjectUpdatePayload } from 'types/project';
import { ProjectDeveloper, ProjectDeveloperSetupForm } from 'types/projectDeveloper';
import { AccountUser } from 'types/user';

import API from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { PagedResponse, PagedRequest, ResponseData, ErrorResponse } from 'services/types';

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

/** Hook to use the the Users Invited to User Account */
const getAccountUsers = async (params?: PagedRequest): Promise<PagedResponse<AccountUser>> => {
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

  const MOCK_DATA = {
    data: [
      {
        first_name: 'Dorothy',
        last_name: 'Campbell',
        picture: null,
        email: 'dorothy.campbell@nesst.com',
        id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
        role: 'Owner',
        confirmed: true,
      },
      {
        first_name: 'Savannah',
        last_name: 'Nguyen',
        picture: null,
        email: 'savannah.nguyen@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Robert',
        last_name: 'Fox',
        picture: null,
        email: 'robert.fox@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: true,
      },
      {
        first_name: 'Cameron',
        last_name: 'Williamson',
        picture: null,
        email: 'cameron.williamson@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Dorothy',
        last_name: 'Campbell',
        picture: null,
        email: 'dorothy.campbell@nesst.com',
        id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
        role: 'Owner',
        confirmed: true,
      },
      {
        first_name: 'Savannah',
        last_name: 'Campbell',
        picture: null,
        email: 'savannah.nguyen@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Robert',
        last_name: 'Fox',
        picture: null,
        email: 'robert.fox@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: true,
      },
      {
        first_name: 'Dorothy',
        last_name: 'Campbell',
        picture: null,
        email: 'dorothy.campbell@nesst.com',
        id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
        role: 'Owner',
        confirmed: true,
      },
      {
        first_name: 'Savannah',
        last_name: 'Nguyen',
        picture: null,
        email: 'savannah.nguyen@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Robert',
        last_name: 'Fox',
        picture: null,
        email: 'robert.fox@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: true,
      },
    ],
    meta: {
      from: 1,
      page: 1,
      pages: 2,
      per_page: 5,
      to: 10,
      total: 10,
    },
    links: [],
  };

  return await API.request(config).then(() => MOCK_DATA as any);
};

export function useAccountUsersList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<AccountUser>>
): UseQueryResult<PagedResponse<AccountUser>> & { users: AccountUser[] } {
  const query = useQuery([Queries.AccountUsersList, params], () => getAccountUsers(params), {
    ...staticDataQueryOptions,
    ...options,
  });

  return useMemo(
    () => ({
      ...query,
      users: query?.data?.data || [],
    }),
    [query]
  );
}
