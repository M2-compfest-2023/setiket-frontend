export type ForgotPasswordRequest = {
  email: string;
};

export type ForgotPassword = {
  password: string;
  token: string;
  re_password: string;
};
