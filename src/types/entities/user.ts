export interface User {
  role: 'CUSTOMER' | 'ADMIN' | 'EO';
  id: string;
  username: string;
}

export interface withToken {
  token: string;
}
