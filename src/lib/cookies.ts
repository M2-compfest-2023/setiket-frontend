import Cookies from 'universal-cookie';

const cookies = new Cookies();

// Login
export const getToken = (): string => {
  return cookies.get('@setickets/token');
};

export const setToken = (token: string) => {
  cookies.set('@setickets/token', token, {
    path: '/',
  });
};

export const removeToken = () => {
  cookies.remove('@setickets/token', {
    path: '/',
  });
};
