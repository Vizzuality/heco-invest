import { UseMutationResult, useMutation } from 'react-query';

import { AxiosResponse, AxiosError } from 'axios';

import { ForgotPassword, ResetPassword } from 'types/sign-in';
import { User } from 'types/user';

import API from 'services/api';
import { ResponseData } from 'services/types';

/** Sends an email to the user with the reset-passord link */
export const useForgotPassword = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  ForgotPassword
> => {
  const forgotPassword = async (dto: ForgotPassword) =>
    await API.post('/api/v1/reset_password', dto);
  return useMutation(forgotPassword);
};

/** Creates a new password using a reset_password token */
export const useResetPassword = (): UseMutationResult<
  AxiosResponse<ResponseData<User>>,
  AxiosError,
  ResetPassword
> => {
  const resetPassword = async (dto: ResetPassword) => await API.put('/api/v1/reset_password', dto);
  return useMutation(resetPassword);
};
