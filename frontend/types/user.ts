import { InvitationStatus, Languages, UserRoles } from 'enums';
import { Picture } from 'types';

export interface SignupFormI {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  accept_terms: boolean;
}

export interface SignupDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  ui_language: string;
  invitation_token?: string;
}

export interface User {
  id: string;
  type: 'user';
  first_name: string;
  last_name: string;
  email: string;
  role: UserRoles;
  created_at: string;
  ui_language: Languages;
  account_language: Languages;
  confirmed: boolean;
  approved: boolean;
  invitation: InvitationStatus;
  owner: boolean;
  avatar: Picture;
  otp_required_for_login: boolean;
}

export type UserAccount = {
  id: string;
  name: string;
  slug: string;
  type: 'project_developer' | 'investor';
};

export interface AccountUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  picture: string;
  confirmed: boolean;
}

export type ChangePassword = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export type UpdateUserDto = {
  first_name: string;
  last_name: string;
  otp_required_for_login?: boolean;
};
