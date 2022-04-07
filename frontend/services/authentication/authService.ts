import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import Router from 'next/router';

import { AxiosResponse, AxiosError } from 'axios';

import { SignIn } from 'types/sign-in';

import API from '../api';

export function signIn() {}

export async function signOut() {
  await API.request({
    method: 'DELETE',
    url: '/api/v1/session',
  });

  Router.push('/sign-in');
}

export function useSignIn(): UseMutationResult<AxiosResponse<SignIn>, AxiosError, SignIn> {
  const queryClient = useQueryClient();
  const signIn = async (dto: SignIn): Promise<AxiosResponse<SignIn>> => {
    const user = await API.post('/api/v1/session', dto);
    queryClient.setQueryData('me', user);
    return user;
  };
  return useMutation(signIn);
}
