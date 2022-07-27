import { useMemo } from 'react';

import { UseMutationResult, useMutation, useQueryClient } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { useLocalizedQuery } from 'hooks/query';

import { Queries } from 'enums';
import { InviteUsersDto, InvitedUserInfo } from 'types/invitation';
import { User } from 'types/user';

import API, { RawApi } from 'services/api';
import { staticDataQueryOptions } from 'services/helpers';
import { ErrorResponse, ResponseData } from 'services/types';

export const getInvitedUser = async (invitation_token: string): Promise<InvitedUserInfo> => {
  const result = await RawApi.post('/api/v1/invitation/info', { invitation_token });
  return result.data;
};

/** Uses the invited user info it there is a invitation token */
export const useInvitedUser = (invitation_token: string) => {
  const query = useLocalizedQuery(
    [Queries.InvitedUser, invitation_token],
    () => getInvitedUser(invitation_token),
    {
      enabled: !!invitation_token,
      retry: 1,
      ...staticDataQueryOptions,
    }
  );

  return useMemo(() => ({ ...query, invitedUser: query.data }), [query]);
};

/** Invite user to project developer account */
export function useInviteUsers(): UseMutationResult<
  AxiosResponse<{ [key: string]: number }>,
  AxiosError<ErrorResponse>,
  InviteUsersDto
> {
  const inviteUsers = async (
    dto: InviteUsersDto
  ): Promise<AxiosResponse<{ [key: string]: number }>> => {
    const { emails } = dto;
    return RawApi.post('/api/v1/invitation', { emails }).then((response) => response.data);
  };

  return useMutation(inviteUsers);
}

export const useAcceptInvitation = (): UseMutationResult<
  AxiosResponse<any>,
  AxiosError<ErrorResponse>,
  string
> => {
  const queryClient = useQueryClient();

  const acceptInvitation = async (
    invitation_token: string
  ): Promise<AxiosResponse<ResponseData<User>>> => {
    return await API.put('/api/v1/invitation', { invitation_token });
  };

  return useMutation(acceptInvitation, {
    onSuccess: () => {
      queryClient.removeQueries(Queries.InvitedUser);
    },
  });
};
