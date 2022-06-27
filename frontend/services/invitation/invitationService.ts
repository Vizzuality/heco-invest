import { UseMutationResult, useQueryClient, useMutation } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { Queries } from 'enums';
import { InviteUsersDto } from 'types/invitation';
import { User } from 'types/user';

import API from 'services/api';
import { ErrorResponse } from 'services/types';

export const getInvitedUser = async (invitation_token: string) => {
  const result = await API.post('/api/v1/invitation/info', { invitation_token });
  return result.data.data;
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
  return useMutation((invitation_token: string) => {
    return API.put('/api/v1/invitation', { invitation_token });
  });
};
