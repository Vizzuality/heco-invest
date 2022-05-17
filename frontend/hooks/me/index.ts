import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import { Paths, Queries, UserRoles } from 'enums';
import { User } from 'types/user';

import API from 'services/api';
import { ErrorResponse } from 'services/types';

const NOT_SIGNED_USER_ERROR_CODE = '401';

export default function useMe(withProtection?: { protectedPage?: boolean; roles?: UserRoles[] }) {
  const { replace, back } = useRouter();
  const query = useQuery<User, AxiosError<ErrorResponse>>(
    Queries.User,
    () =>
      API.request({
        method: 'GET',
        url: '/api/v1/user',
      }).then((response) => response.data.data),
    {
      // If the user is not signed in, it will no retry, else (other error causes), it will retry 2 times.
      retry: (count, error) => error.code !== NOT_SIGNED_USER_ERROR_CODE && count < 3,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // Changing the defaults to those configurations will reduce the fetchings and prevent the unecessary retries
      onError: (error) => {
        if (withProtection?.protectedPage && error.code === NOT_SIGNED_USER_ERROR_CODE) {
          // User is not signed in
          replace(Paths.SignIn);
        }
      },
      onSuccess: (user) => {
        if (withProtection?.protectedPage && !withProtection?.roles.includes(user.role)) {
          // User is signed in but doesn't have permission
          back();
        }
      },
    }
  );

  const { data } = query;

  return useMemo(
    () => ({
      ...query,
      user: data,
    }),
    [query, data]
  );
}
