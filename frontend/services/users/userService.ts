import { useMutation, UseMutationResult } from 'react-query';

import { AxiosResponse } from 'axios';

import { SignupDto } from 'types/signup';

import USERS from '.';

export function useSignup(): UseMutationResult<
  AxiosResponse<SignupDto>,
  unknown,
  SignupDto,
  unknown
> {
  const signup = async (dto: SignupDto): Promise<AxiosResponse<SignupDto>> => {
    try {
      return await USERS.post('/signup', dto);
    } catch (message) {
      console.log('response error');
    }
  };
  return useMutation(signup);
}
