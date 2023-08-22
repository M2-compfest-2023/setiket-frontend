/**
 * POST /login_user
 */
export interface Login {
  email: string;
  password: string;
}

export interface Register {
  username: string;
  email: string;
  role: string;
  password: string;
}
