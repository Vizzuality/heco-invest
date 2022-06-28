import { useMemo } from 'react';

import { UseMutationResult, useQueryClient, useMutation } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Queries } from 'enums';
import { InviteUsersDto, InvitedUserInfo } from 'types/invitation';
import { User } from 'types/user';

import API, { NO_SERIALIZED_API } from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { ErrorResponse } from 'services/types';

export const getInvitedUser = async (invitation_token: string): Promise<InvitedUserInfo> => {
  const result = await NO_SERIALIZED_API.post('/api/v1/invitation/info', { invitation_token });
  return result.data;
};

/** Uses the invited user info it there is a invitation token */
export const useInvitedUser = (invitation_token: string) => {
  const query = useLocalizedQuery(
    [Queries.InvitedUser, invitation_token],
    () => getInvitedUser(invitation_token),
    {
      enabled: !!invitation_token,
      ...staticDataQueryOptions,
    }
  );

  return useMemo(() => ({ ...query, invitedUser: query.data }), [query]);
};

/** Invite user to project developer account */
export function useInviteUsers(): UseMutationResult<
  AxiosResponse<User>,
  AxiosError<ErrorResponse>,
  InviteUsersDto
> {
  const inviteUsers = async (data: InviteUsersDto): Promise<AxiosResponse<User>> => {
    return API.post('/api/v1/invitation', data).then((response) => response.data);
  };

  const queryClient = useQueryClient();

  return useMutation(inviteUsers, {
    onSuccess: (result) => {
      queryClient.setQueryData(Queries.User, result.data);
    },
  });
}

export const useAcceptInvitation = (): UseMutationResult<
  AxiosResponse<any>,
  AxiosError<ErrorResponse>,
  string
> => {
  return useMutation((data) => {
    return API.put('/api/v1/invitation', data);
  });
};
