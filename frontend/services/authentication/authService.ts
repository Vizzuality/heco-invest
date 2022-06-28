import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { AxiosResponse, AxiosError } from 'axios';

import { Queries } from 'enums';
import { SignIn } from 'types/sign-in';
import { User } from 'types/user';

import API from '../api';

export function useSignOut(): UseMutationResult<AxiosResponse, AxiosError> {
  const { locale } = useRouter();
  const signOut = async () =>
    await API.request({
      method: 'DELETE',
      url: '/api/v1/session',
      data: {},
    });
  const queryClient = useQueryClient();
  return useMutation(signOut, {
    onSuccess: () => {
      queryClient.setQueryData([Queries.User, locale], undefined);
    },
  });
}

export function useSignIn(): UseMutationResult<AxiosResponse<User>, AxiosError, SignIn> {
  const { locale } = useRouter();
  const queryClient = useQueryClient();
  const signIn = async (dto: SignIn): Promise<AxiosResponse<User>> => {
    const user = await API.post('/api/v1/session', dto);
    queryClient.setQueryData([Queries.User, locale], user);
    return user;
  };
  return useMutation(signIn);
}
