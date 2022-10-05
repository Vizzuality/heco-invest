import { useMemo } from 'react';

import { useMutation, UseMutationResult } from 'react-query';

import { AxiosResponse } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Queries } from 'enums';
import { User } from 'types/user';

import API from 'services/api';
import { ResponseData } from 'services/types';

const sendEmailConfirmation = (email: string) => {
  return API.post('/api/v1/email_confirmation', { email });
};

export const useSendEmailConfirmation = (): UseMutationResult<
  AxiosResponse<any>,
  unknown,
  string
> => {
  return useMutation(Queries.EmailConfirmation, sendEmailConfirmation);
};

export const confirmEmail = async (confirmation_token: string) => {
  const result = await API.get<ResponseData<User>>('/api/v1/email_confirmation', {
    params: { confirmation_token },
  });
  return result.data.data;
};

export const useConfirmEmail = (confirmation_token: string) => {
  const { data, ...rest } = useLocalizedQuery(
    Queries.User,
    () => confirmEmail(confirmation_token),
    {
      enabled: !!confirmation_token,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  return useMemo(
    () => ({
      ...rest,
      confirmedUser: data,
    }),
    [data, rest]
  );
};
