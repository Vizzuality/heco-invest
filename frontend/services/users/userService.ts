import { useMutation, UseMutationResult } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { SignupDto, User } from 'types/user';

import { ErrorResponse, ResponseData } from 'services/types';

import API from '../api';

export function useSignup(): UseMutationResult<
  AxiosResponse<ResponseData<User>>,
  AxiosError<ErrorResponse>,
  SignupDto,
  unknown
> {
  const signup = async (dto: SignupDto): Promise<AxiosResponse<ResponseData<User>>> => {
    return await API.post('/api/v1/user', dto);
  };
  return useMutation(signup);
}

/** Get the logged user */
export const getCurrentUser = (): Promise<AxiosResponse<ResponseData<User>>> =>
  API.request({
    method: 'GET',
    url: '/api/v1/user',
  });
