import { useMutation, UseMutationResult } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { ResetPassword } from 'types/sign-in';
import { SignupDto } from 'types/user';

import { ErrorResponse } from 'services/types';

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
