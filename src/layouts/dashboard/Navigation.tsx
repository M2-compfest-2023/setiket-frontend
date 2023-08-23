import { Disclosure } from '@headlessui/react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import * as React from 'react';
import { FiChevronDown } from 'react-icons/fi';

import UnstyledLink from '@/components/links/UnstyledLink';
import { navigations } from '@/constants/navigations';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/store/useAuthStore';
import type { Navigation } from '@/types/navigate';
import Typography from '@/components/Typography';

type NavigationProps = React.ComponentPropsWithoutRef<'nav'>;

export default function Navigation({ className, ...rest }: NavigationProps) {
  return (
    <nav className={clsxm('', className)} {...rest}>
      <div className='space-y-1.5'>
        {navigations.map((nav) =>
          nav.children ? (
            <NestedNavigation navigation={nav} key={nav.name} gen={0} />
          ) : (
            <NavigationLink key={nav.name} navigation={nav} gen={0} />
          )
        )}
      </div>
    </nav>
);
}

function NestedNavigation({
  navigation: navChildren,
  gen,
}: {
  navigation: Navigation;
  gen: number;
}) {
  const router = useRouter();

  function getChildrenPermission(nav?: Navigation[]) {
    return nav
      ? nav?.flatMap((n) => {
          return n.permissions;
        })
      : '';
  }

  const user = useAuthStore.useUser();
  const navChildrenWithPermission = getChildrenPermission(navChildren.children);
  const hasPermission =
    navChildrenWithPermission && navChildrenWithPermission.length > 0
      ? navChildrenWithPermission.some((p) => user?.role.includes(p as string))
      : true;

  if (!hasPermission) return null;
  // Recursively check if any children is active

  function checkActive(nav?: Navigation[]): boolean {
    if (!nav) return false;

    return nav.some((n) => {
      if (!n.children) {
        const isActive = n.exactMatch
          ? router.pathname === n.href
          : router.pathname.startsWith(n.href);

        return isActive;
      }

      return checkActive(n.children);
    });
  }

  return (
    <Disclosure as='div' defaultOpen={checkActive(navChildren.children)}>
      {({ open }) => (
        <div>
          <Disclosure.Button
            className={clsx(
              'md:hover:bg-[#687083]',
              'text-typo-white',
              'group flex w-full items-center px-6 py-2.5 text-sm font-mediumm',
              'focus-visible:ring-offset-secondary-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500'
            )}
            style={{ paddingLeft: gen > 0 ? `${24 * (gen + 1)}px` : '' }}
          >
            <navChildren.icon
              className={clsx(
                'mr-3 flex-shrink-0',
                'text-typo-white text-lg',
                open && 'mt-[1px] self-start'
              )}
              aria-hidden='true'
            />
            <span
              className={clsx(
                'text-left font-primary font-semibold text-[14px]',
                !open && 'truncate'
              )}
            >
              {navChildren.name}
            </span>
            <FiChevronDown
              className={clsx(
                'flex-shrink-0',
                'text-[#9AA2B1] ml-auto text-xl transition-transform duration-300 ease-in-out',
                open && 'mt-[1px] self-start rotate-180'
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel className='mt-1'>
            {navChildren.children?.map((nav) =>
              nav.children ? (
                <NestedNavigation
                  key={nav.name}
                  navigation={nav}
                  gen={gen + 1}
                />
              ) : (
                <NavigationLink key={nav.name} navigation={nav} gen={gen + 1} />
              )
            )}
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}

function NavigationLink({
  navigation,
  className,
  gen,
}: {
  navigation: Navigation;
  className?: string;
  gen: number;
}) {
  const router = useRouter();
  const isActive = navigation.exactMatch
    ? router.pathname === navigation.href
    : router.pathname.startsWith(navigation.href);

  // check if user has permission to access the route
  const user = useAuthStore.useUser();

  if (user?.role !== navigation.permissions) return null;
  return (
    <UnstyledLink
      href={navigation.href}
      className={clsxm(
        !isActive ? 'md:hover:bg-gradient-to-r md:hover:from-gradient-100 md:hover:to-gradient-200' : navigation.activeClassName? navigation.activeClassName: 'md:hover:bg-[#687083]/90 ',
        'group flex flex-1 items-center px-6 py-2 transition-opacity',

        navigation.className,
        className
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      <navigation.icon className='mr-3 flex-shrink-0 text-lg text-cyan-800 group-hover:text-white'/>
      <Typography
        variant='p2'
        weight='semibold'
        color='cyan'
        className='group-hover:text-white'
      >
        {navigation.name}
      </Typography>

    </UnstyledLink>
  );
}
