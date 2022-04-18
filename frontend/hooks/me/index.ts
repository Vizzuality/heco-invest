import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { Queries } from 'enums';
import { User } from 'types/user';

import API from 'services/api';

export default function useMe() {
  const query = useQuery<User>(
    Queries.User,
    () =>
      API.request({
        method: 'GET',
        url: '/api/v1/user',
      }).then((response) => response.data.data),
    {
      retry: 0,
      staleTime: Infinity,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchInterval: Infinity,
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
