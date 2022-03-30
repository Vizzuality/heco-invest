import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import Router, { useRouter } from 'next/router';

import { AxiosResponse, AxiosError } from 'axios';

import { SignInDto } from 'types/sign-in';

import AUTHENTICATION from '.';

export function signIn() {}

export async function signOut() {
  await AUTHENTICATION.request({
    method: 'DELETE',
    url: '/',
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
    const user = await AUTHENTICATION.post('/', dto);
    queryClient.setQueryData('me', user);
    router.push((router.query.callbackUrl as string) || '/');
    return user;
  };
  return useMutation(signIn);
}
