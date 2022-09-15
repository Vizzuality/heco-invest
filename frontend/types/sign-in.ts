export type SignIn = {
  email: string;
  password: string;
};

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  password: string;
  password_confirmation: string;
  reset_password_token: string;
};
