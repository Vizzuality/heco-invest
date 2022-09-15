import { useMutation, UseMutationResult, useQueryClient } from 'react-query';

import { useRouter } from 'next/router';

import { AxiosResponse, AxiosError } from 'axios';

import { Queries } from 'enums';
import { SignupDto, User, ChangePassword } from 'types/user';

import { ErrorResponse, ResponseData } from 'services/types';

import API from '../api';

export function useSignup(): UseMutationResult<
  AxiosResponse<ResponseData<User>>,
  AxiosError<ErrorResponse>,
  SignupDto,
  unknown
> {
  const signup = async (dto: SignupDto): Promise<AxiosResponse<ResponseData<User>>> => {
    return await API.post('/api/v1/user', dto);
  };
  return useMutation(signup);
}

/** Get the logged user */
export const getCurrentUser = (): Promise<AxiosResponse<ResponseData<User>>> =>
  API.request({
    method: 'GET',
    url: '/api/v1/user',
  });

export const changePassword = (dto: ChangePassword) => {
  return API.request({
    method: 'POST',
    url: '/api/v1/user/change_password',
    data: dto,
  });
};

/** Hook to change the user password */
export const useChangePassword = (): UseMutationResult<
  AxiosResponse<any>,
  ErrorResponse,
  ChangePassword
> => {
  return useMutation(changePassword);
};

export const deleteFavorites = () => {
  return API.request({
    method: 'DELETE',
    url: '/api/v1/account/users/favourites',
    data: {},
  });
};

export const useDeleteFavorites = (): UseMutationResult<
  AxiosResponse<any>,
  ErrorResponse,
  void
> => {
  const { locale } = useRouter();
  const queryClient = useQueryClient();

  return useMutation(deleteFavorites, {
    onSuccess: (data) => {
      queryClient.setQueryData([Queries.Project, locale], data);
      queryClient.invalidateQueries([Queries.Project], {});
      queryClient.invalidateQueries([Queries.ProjectList], {});
      queryClient.invalidateQueries([Queries.FavoriteProjectsList, {}]);

      queryClient.setQueryData([Queries.OpenCall, locale], data);
      queryClient.invalidateQueries([Queries.OpenCall], {});
      queryClient.invalidateQueries([Queries.OpenCallList], {});
      queryClient.invalidateQueries([Queries.FavoriteOpenCallsList, {}]);

      queryClient.setQueryData([Queries.ProjectDeveloper, locale], data);
      queryClient.invalidateQueries([Queries.ProjectDeveloper], {});
      queryClient.invalidateQueries([Queries.ProjectDeveloperList], {});
      queryClient.invalidateQueries([Queries.FavoriteProjectDevelopersList, {}]);

      queryClient.setQueryData([Queries.Investor, locale], data);
      queryClient.invalidateQueries([Queries.Investor], {});
      queryClient.invalidateQueries([Queries.InvestorList], {});
      queryClient.invalidateQueries([Queries.FavoriteInvestorsList], {});
    },
  });
};
