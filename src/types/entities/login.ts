/**
 * POST /login_user
 */
export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  email: string;
  no_telp: string;
  password: string;
}
