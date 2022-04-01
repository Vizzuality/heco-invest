import { useMemo } from 'react';

import { useQuery } from 'react-query';

import USERS from 'services/users';

export default function useMe() {
  const query = useQuery(
    'user',
    () =>
      USERS.request({
        method: 'GET',
        url: '/',
      }).then((response) => response.data),
    {
      retry: 1,
    }
  );

  const { data } = query;

  return useMemo(
    () => ({
      ...query,
      user: data?.data,
    }),
    [query, data?.data]
  );
}
