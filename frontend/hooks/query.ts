import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from 'react-query';

import { useRouter } from 'next/router';

export const useLocalizedQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
): UseQueryResult<TData, TError> => {
  const { locale } = useRouter();

  const key =
    typeof queryKey === 'string'
      ? [queryKey, locale]
      : ([...Array.from(queryKey), locale] as QueryKey);

  return useQuery(key, queryFn, options);
};
