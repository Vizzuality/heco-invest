import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { AxiosResponse, AxiosError } from 'axios';

import { Queries } from 'enums';
import { ResetPassword } from 'types/sign-in';
import { SignupDto, User } from 'types/user';

import { ErrorResponse, ResponseData } from 'services/types';

import API from '../api';

export function useSignup(): UseMutationResult<
  AxiosResponse<SignupDto>,
  AxiosError<ErrorResponse>,
  SignupDto,
  unknown
> {
  const queryClient = useQueryClient();
  const signup = async (dto: SignupDto): Promise<AxiosResponse<SignupDto>> => {
    queryClient.invalidateQueries(Queries.User);
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
