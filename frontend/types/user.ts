import { UserRoles } from 'enums';

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
}

export interface User {
  id: string;
  type: 'user';
  first_name: string;
  last_name: string;
  email: string;
  role: UserRoles;
  confirmed: boolean;
}

export type UserAccount = {
  id: string;
  name: string;
  slug: string;
  type: 'project_developer' | 'investor';
};

export type UsersInvitationForm = {
  email: string;
  emails: string[];
};

export type InviteUsersDto = {
  data: string[];
};

export type InvitedUser = {
  id: string;
  email: string;
  signed_up: boolean;
  account_name: string;
};
