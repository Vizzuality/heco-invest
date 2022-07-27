import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { Queries } from 'enums';
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
    const data = await API.post('/api/v1/user', dto);
    queryClient.invalidateQueries(Queries.User);
    return data;
  };
  return useMutation(signup);
}

/** Get the logged user */
export const getCurrentUser = (): Promise<AxiosResponse<ResponseData<User>>> =>
  API.request({
    method: 'GET',
    url: '/api/v1/user',
  });
