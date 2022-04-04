import { useMemo } from 'react';

import { useQuery } from 'react-query';

import API from 'services/api';

export default function useMe() {
  const query = useQuery(
    'user',
    () =>
      API.request({
        method: 'GET',
        url: '/user',
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
