import { useMutation, UseMutationResult } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { SignupDto } from 'types/signup';

import USERS from '.';

export function useSignup(): UseMutationResult<
  AxiosResponse<SignupDto>,
  AxiosError,
  SignupDto,
  unknown
> {
  const signup = async (dto: SignupDto): Promise<AxiosResponse<SignupDto>> => {
    return await USERS.post('', dto);
  };
  return useMutation(signup);
}
