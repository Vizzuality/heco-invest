import { useMemo } from 'react';

import { useMutation, UseMutationResult } from 'react-query';

import { AxiosResponse } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Queries } from 'enums';
import { User } from 'types/user';

import API from 'services/api';
import { ResponseData } from 'services/types';

/** Function that sends email confirmation */
const sendEmailConfirmation = (email: string) => {
  return API.post('/api/v1/email_confirmation', { email });
};

/** Hook to send email to confirm user */
export const useSendEmailConfirmation = (): UseMutationResult<
  AxiosResponse<any>,
  unknown,
  string
> => {
  return useMutation(Queries.EmailConfirmation, sendEmailConfirmation);
};

/** Function to validate email confirmation token */
export const confirmEmail = async (confirmation_token: string) => {
  const result = await API.get<ResponseData<User>>('/api/v1/email_confirmation', {
    params: { confirmation_token },
  });
  return result.data.data;
};

/** Hook to validate email confirmation token */
export const useConfirmEmail = (confirmation_token: string) => {
  const { data, ...rest } = useLocalizedQuery(
    'confirmed-user',
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
