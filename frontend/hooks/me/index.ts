import { useMemo } from 'react';

import { AxiosError, AxiosResponse } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Queries } from 'enums';
import { User } from 'types/user';

import { ErrorResponse, ResponseData } from 'services/types';
import { getCurrentUser } from 'services/users/userService';

export default function useMe() {
  const query = useLocalizedQuery<AxiosResponse<ResponseData<User>>, AxiosError<ErrorResponse>>(
    Queries.User,
    getCurrentUser,
    {
      retry: 1,
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
      user: data?.data?.data,
    }),
    [query, data]
  );
}
