import { useMemo } from 'react';

import { useQuery } from 'react-query';

import { User } from 'types/user';

import API from 'services/api';

export default function useMe() {
  const query = useQuery<User>(
    'user',
    () =>
      API.request({
        method: 'GET',
        url: '/api/v1/user',
      }).then((response) => response.data.data),
    {
      retry: 1,
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
