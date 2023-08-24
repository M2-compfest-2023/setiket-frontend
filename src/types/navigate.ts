import { IconType } from 'react-icons';

export type Navigation = {
  name: string;
  href: string;
  icon: IconType;
  componentIndex: number;
  /**
   * Use this when the route is also used as a nested route
   * @example Use exactMatch for '/dashboard' to avoid both navigation links active when visiting '/dashboard/edit'
   */
  exactMatch?: boolean;
  children?: Navigation[];
  activeClassName?: string;
  className?: string;
  permissions?: 'user' | 'admin';
};
