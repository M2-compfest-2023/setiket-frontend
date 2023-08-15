export interface User {
  role: 'user' | 'admin';
  name: string;
  email: string;
  no_telp: string;
}

export interface withToken {
  token: string;
}
