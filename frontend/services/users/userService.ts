import { useMemo } from 'react';

import {
  UseQueryResult,
  useQuery,
  useMutation,
  UseMutationResult,
  UseQueryOptions,
} from 'react-query';

import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { Queries } from 'enums';
import DOROTHY_CAMPBELL_PNG from 'public/images/mock/dorothy-campbell.png';
import { ResetPassword } from 'types/sign-in';
import { SignupDto, User, UserInvited } from 'types/user';

import { staticDataQueryOptions } from 'services/helpers';
import { ErrorResponse, ResponseData, PagedResponse, PagedRequest } from 'services/types';

import API from '../api';

export function useSignup(): UseMutationResult<
  AxiosResponse<SignupDto>,
  AxiosError<ErrorResponse>,
  SignupDto,
  unknown
> {
  const signup = async (dto: SignupDto): Promise<AxiosResponse<SignupDto>> => {
    return await API.post('/api/v1/user', dto);
  };
  return useMutation(signup);
}

export function useResetPassword(): UseMutationResult<AxiosResponse, AxiosError, ResetPassword> {
  const resetPassword = async (dto: ResetPassword) => await API.post('/api/v1/reset_password', dto);
  return useMutation(resetPassword);
}

/** Get the logged user */
export const getCurrentUser = (): Promise<AxiosResponse<ResponseData<User>>> =>
  API.request({
    method: 'GET',
    url: '/api/v1/user',
  });

/** Hook to use the the Users Invited to User Account */
// TODO: Remove project_developers once we have the endpoint and add sort by params
const getUsersInvited = async (params?: PagedRequest): Promise<PagedResponse<UserInvited>> => {
  const { fields, search, page, perPage, ...rest } = params || {};

  const config: AxiosRequestConfig = {
    url: '/api/v1/project_developers',
    method: 'GET',
    params: {
      ...rest,
      'fields[project_developer]': fields?.join(','),
      'filter[full_text]': search,
      'page[number]': page,
      'page[size]': perPage,
    },
  };

  const MOCK_DATA = {
    data: [
      {
        first_name: 'Dorothy',
        last_name: 'Campbell',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'dorothy.campbell@nesst.com',
        id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
        role: 'Owner',
        confirmed: 'Accepted',
      },
      {
        first_name: 'Savannah',
        last_name: 'Nguyen',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'savannah.nguyen@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Robert',
        last_name: 'Fox',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'robert.fox@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: true,
      },
      {
        first_name: 'Cameron',
        last_name: 'Williamson',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'cameron.williamson@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Dorothy',
        last_name: 'Campbell',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'dorothy.campbell@nesst.com',
        id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
        role: 'Owner',
        confirmed: true,
      },
      {
        first_name: 'Savannah',
        last_name: 'Nguyen',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'savannah.nguyen@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Robert',
        last_name: 'Fox',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'robert.fox@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: true,
      },
      {
        first_name: 'Dorothy',
        last_name: 'Campbell',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'dorothy.campbell@nesst.com',
        id: 'cba6a23c-d100-46aa-b691-352eeec200cd',
        role: 'Owner',
        confirmed: true,
      },
      {
        first_name: 'Savannah',
        last_name: 'Nguyen',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'savannah.nguyen@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: false,
      },
      {
        first_name: 'Robert',
        last_name: 'Fox',
        picture: DOROTHY_CAMPBELL_PNG,
        email: 'robert.fox@nesst.com',
        id: 'f07a3edc-20a4-4a6e-b55e-2d8b492951ca',
        role: 'User',
        confirmed: true,
      },
    ],
    meta: {
      page: page,
      size: perPage,
      totalItems: 10,
      totalPages: 4,
    },
    links: [],
  };

  // return await API.request(config).then(() => MOCK_DATA);
  return;
};

export function useUsersInvitedList(
  params?: PagedRequest,
  options?: UseQueryOptions<PagedResponse<UserInvited>>
): UseQueryResult<PagedResponse<UserInvited>> & { users: UserInvited[] } {
  const query = useQuery([Queries.ProjectDeveloperList, params], () => getUsersInvited(params), {
    ...staticDataQueryOptions,
    ...options,
  });

  return useMemo(
    () => ({
      ...query,
      users: query?.data?.data || [],
      meta: query?.data?.meta || {},
    }),
    [query]
  );
}
