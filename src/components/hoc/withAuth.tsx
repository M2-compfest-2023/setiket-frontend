/* eslint-disable unused-imports/no-unused-vars */
import { useRouter } from 'next/router';
import * as React from 'react';
import { toast } from 'react-hot-toast';
import { ImSpinner8 } from 'react-icons/im';

import Forbidden from '@/components/Forbidden';
import api from '@/lib/api';
import { getToken, removeToken } from '@/lib/cookies';
import useAuthStore from '@/store/useAuthStore';
import { ApiReturn } from '@/types/api';
import { User } from '@/types/entities/user';

export interface WithAuthProps {
  user: User;
}

const USER_ROUTE = '/';
const ADMIN_ROUTE = '/admin';
const LOGIN_ROUTE = '/login';

export enum RouteRole {
  /**
   Dapat diakses hanya ketika user belum login (Umum)
   */
  public,
  /**
   * Dapat diakses semuanya
   */
  optional,
  /**
   * For all authenticated user
   * will push to login if user is not authenticated
   */
  user,
  /**
   * For all authenticated admin
   * will push to login if user is not authenticated
   */
  ADMIN,
  /**
   * For all authenticated forda
   * will push to login if user is not authenticated
   * */
  EO,
  /**
   * For all authenticated forda
   * will push to login if user is not authenticated
   * */
  CUSTOMER,
}

/**
 * Add role-based access control to a component
 *
 * @see https://react-typescript-cheatsheet.netlify.app/docs/hoc/full_example/
 * @see https://github.com/mxthevs/nextjs-auth/blob/main/src/components/withAuth.tsx
 */
export default function withAuth<T>(
  Component: React.ComponentType<T>,
  routeRole: keyof typeof RouteRole,
  options: {
    withCache?: boolean;
  } = {
    withCache: true,
  }
) {
  const ComponentWithAuth = (props: Omit<T, keyof WithAuthProps>) => {
    const router = useRouter();
    const { query } = router;

    //#region  //*=========== STORE ===========
    const isAuthenticated = useAuthStore.useIsAuthenticated();
    const isLoading = useAuthStore.useIsLoading();
    const login = useAuthStore.useLogin();
    const logout = useAuthStore.useLogout();
    const stopLoading = useAuthStore.useStopLoading();
    const user = useAuthStore.useUser();
    //#endregion  //*======== STORE ===========

    const checkAuth = React.useCallback(() => {
      const token = getToken();
      if (!token) {
        isAuthenticated && logout();
        stopLoading();
        return;
      }
      const loadUser = async () => {
        try {
          const res = await api.post<ApiReturn<User>>('/auth/me');

          if (!res.data.data) {
            toast.error('Sesi login tidak valid');
            throw new Error('Sesi login tidak valid');
          }

          login({
            token: token,
            ...res.data.data,
          });
        } catch (err) {
          logout();
          removeToken();
        } finally {
          stopLoading();
        }
      };

      if (!isAuthenticated || options.withCache) {
        loadUser();
      }
    }, [isAuthenticated, login, logout, stopLoading]);

    React.useEffect(() => {
      checkAuth();

      window.addEventListener('focus', checkAuth);
      return () => {
        window.removeEventListener('focus', checkAuth);
      };
    }, [checkAuth]);

    React.useEffect(() => {
      const Redirect = async () => {
        if (isAuthenticated) {
          // Jika ada user yang login akses public maka akan dipindah ke admin, user, atau forda
          if (routeRole === 'public') {
            if (query?.redirect) {
              router.replace(query.redirect as string);
            } else {
              if (user?.role === 'ADMIN') {
                router.replace(
                  `${ADMIN_ROUTE}?redirect=${router.asPath}`,
                  `${ADMIN_ROUTE}`
                );
              } else {
                router.replace(
                  `${USER_ROUTE}?redirect=${router.asPath}`,
                  `${USER_ROUTE}`
                );
              }
            }
            // Admin
          }
          if (user?.role === 'EO') {
            if (routeRole === 'ADMIN') {
              router.replace(USER_ROUTE);
            }
          }
          if (user?.role === 'CUSTOMER') {
            if (routeRole === 'ADMIN') {
              router.replace(USER_ROUTE);
            }
          }
          if (user?.role === 'ADMIN') {
            if (routeRole === 'user') {
              router.replace(ADMIN_ROUTE);
            }
          }
        } else {
          if (
            routeRole !== 'public' &&
            routeRole !== 'optional' &&
            routeRole !== 'ADMIN' &&
            routeRole !== 'user' &&
            routeRole !== 'EO' &&
            routeRole !== 'CUSTOMER'
          ) {
            router.replace(
              `${LOGIN_ROUTE}?redirect=${router.asPath}`,
              `${LOGIN_ROUTE}`
            );
          } else {
            if (
              routeRole !== 'public' &&
              routeRole !== 'optional' &&
              routeRole !== 'ADMIN' &&
              routeRole !== 'user' &&
              routeRole !== 'EO' &&
              routeRole !== 'CUSTOMER'
            ) {
              router.replace(
                `${LOGIN_ROUTE}?redirect=${router.asPath}`,
                `${LOGIN_ROUTE}`
              );
            } else if (
              routeRole === 'ADMIN' ||
              routeRole === 'user' ||
              routeRole === 'EO' ||
              routeRole === 'CUSTOMER'
            ) {
              router.replace(
                `${LOGIN_ROUTE}?redirect=${router.asPath}`,
                `${LOGIN_ROUTE}`
              );
            }
          }
        }
      };

      if (!isLoading) {
        Redirect();
      }
    }, [isAuthenticated, isLoading, query, router, user]);

    if (
      (isLoading || !isAuthenticated) &&
      routeRole !== 'public' &&
      routeRole !== 'optional'
    ) {
      return (
        <div className='flex min-h-screen flex-col items-center justify-center text-gray-800'>
          <ImSpinner8 className='mb-4 animate-spin text-4xl' />
          <p>Loading...</p>
        </div>
      );
    }

    if (isAuthenticated) {
      if (routeRole === 'ADMIN' && user?.role !== 'ADMIN') {
        return <Forbidden />;
      }
      if (routeRole === 'EO' && user?.role !== 'EO') {
        return <Forbidden />;
      }
      if (routeRole === 'CUSTOMER' && user?.role !== 'CUSTOMER') {
        return <Forbidden />;
      }
    }

    return <Component {...(props as T)} user={user} />;
  };

  return ComponentWithAuth;
}
