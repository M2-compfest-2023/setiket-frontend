export interface User {
  role: 'user' | 'admin' | 'event_organizer';
  username: string;
  email: string;
}

export interface withToken {
  token: string;
}
