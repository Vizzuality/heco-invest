export interface SignupFormI {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface SignupDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  locale: string;
}
