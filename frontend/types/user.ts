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
  attributes: {
    first_name: string;
    last_name: string;
    email: string;
    role: UserRole;
    confirmed: boolean;
  };
}

export enum UserRole {
  LIGHT = 'light',
  INVESTOR = 'investor',
  PROJECT_DEVELOPER = 'project_developer',
}
