import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { Queries } from 'enums';
import { ResetPassword } from 'types/sign-in';
import { SignupDto, User, InviteUsersDto, InvitedUser } from 'types/user';

import { ErrorResponse, ResponseData } from 'services/types';

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

/** Invite user to project developer account */
//TODO: Replace endpoint by correct one
export function useInviteUsers(): UseMutationResult<
  AxiosResponse<User>,
  AxiosError<ErrorResponse>,
  InviteUsersDto
> {
  const inviteUsers = async (data: InviteUsersDto): Promise<AxiosResponse<User>> => {
    return API.post('/api/v1/account/projects', data).then((response) => response.data);
  };

  const queryClient = useQueryClient();

  return useMutation(inviteUsers, {
    onSuccess: (result) => {
      queryClient.setQueryData(Queries.User, result.data);
    },
  });
}

export const getInvitedUser = async (token: string): Promise<InvitedUser> => {
  // const response = await API.get<ResponseData<InvitedUser>>('/api/v1/user/invitation', {
  //   params: token,
  // });
  // return response.data.data;
  console.log('get invited user token =' + token);
  return Promise.resolve({
    id: '1234ewfqwfe',
    email: 'email@gmail.com',
    signed_up: false,
    account_name: 'Project developer account',
  });
};
