import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { AxiosError } from 'axios';

import { Queries } from 'enums';
import { User } from 'types/user';

import API from 'services/api';
import { ErrorResponse } from 'services/types';

export default function useMe() {
  const query = useQuery<User, AxiosError<ErrorResponse>>(
    Queries.User,
    () =>
      API.request({
        method: 'GET',
        url: '/api/v1/user',
      }).then((response) => response.data.data),
    {
      // If the user is not signed in, it will no retry, else (other error causes), it will retry 2 times.
      retry: (count, error) => error.code !== '401' && count < 3,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      // Changing the defaults to those configurations will reduce the fetchings and prevent the unecessary retries
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
