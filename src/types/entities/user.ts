export interface User {
  role: 'CUSTOMER' | 'ADMIN' | 'EVENTORGANIZER';
  id: string;
  username: string;
}

export interface withToken {
  token: string;
}
