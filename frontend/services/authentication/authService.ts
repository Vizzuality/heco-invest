import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { AxiosResponse, AxiosError } from 'axios';

import { Queries } from 'enums';
import { SignIn } from 'types/sign-in';
import { User } from 'types/user';

import API, { RawApi } from '../api';

export function useSignOut(): UseMutationResult<AxiosResponse, AxiosError> {
  const signOut = async () =>
    await API.request({
      method: 'DELETE',
      url: '/api/v1/session',
      data: {},
    });
  const queryClient = useQueryClient();
  return useMutation(signOut, {
    onSuccess: () => {
      queryClient.removeQueries();
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

const getRequire2FA = async (dto: SignIn) => {
  const resp = await RawApi.post<AxiosResponse<{ data: boolean }>>(
    '/api/v1/session/two_factor_auth',
    dto
  );
  return resp.data.data;
};

export const useRequire2FA = () => {
  return useMutation([Queries.Session2FA], getRequire2FA);
};
