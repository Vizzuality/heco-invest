import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import Router, { useRouter } from 'next/router';

import { AxiosResponse, AxiosError } from 'axios';

import { SignInDto } from 'types/signin';

import API from '../api';

export function signIn() {}

export async function signOut() {
  await API.request({
    method: 'DELETE',
    url: '/session',
  });

  Router.push('/sign-in');
}

export function useSignIn(): UseMutationResult<
  AxiosResponse<SignInDto>,
  AxiosError,
  SignInDto,
  unknown
> {
  const queryClient = useQueryClient();
  const router = useRouter();
  const signIn = async (dto: SignInDto): Promise<AxiosResponse<SignInDto>> => {
    const user = await API.post('/session', dto);
    queryClient.setQueryData('me', user);
    router.push((router.query.callbackUrl as string) || '/');
    return user;
  };
  return useMutation(signIn);
}
