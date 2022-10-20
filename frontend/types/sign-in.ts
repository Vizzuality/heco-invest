export type SignIn = {
  email: string;
  password: string;
  otp_attempt?: string;
};

export type ForgotPassword = {
  email: string;
};

export type ResetPassword = {
  password: string;
  password_confirmation: string;
  reset_password_token: string;
};

export type SignInCodeForm = {
  otp_attempt: {
    [key: string]: string;
  };
};
