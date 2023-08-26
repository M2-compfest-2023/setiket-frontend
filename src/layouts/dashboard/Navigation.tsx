import * as React from 'react';

import Typography from '@/components/Typography';
import { navigations } from '@/constants/navigations';
import clsxm from '@/lib/clsxm';
import type { Navigation } from '@/types/navigate';

type NavigationProps = {
  action?: ((index: number) => void) | undefined;
} & React.ComponentPropsWithoutRef<'nav'>;

export default function Navigation({
  className,
  action,
  ...rest
}: NavigationProps) {
  return (
    <nav className={clsxm('', className)} {...rest}>
      <div className='space-y-1.5'>
        {navigations.map((nav) => (
          <NavigationControl key={nav.name} navigation={nav} action={action} />
        ))}
      </div>
    </nav>
  );
}

function NavigationControl({
  navigation,
  className,
  action,
}: {
  navigation: Navigation;
  className?: string;
  action?: ((index: number) => void) | undefined;
}) {
  return (
    <div
      onClick={() => action && action(navigation.componentIndex)}
      className={clsxm(
        'hover:bg-gradient-to-r hover:from-gradient-100 hover:to-gradient-200',
        'group flex flex-1 items-center px-6 py-2 transition-opacity',
        className
      )}
    >
      <navigation.icon className='mr-3 flex-shrink-0 text-lg text-cyan-800 group-hover:text-white' />
      <Typography
        variant='p2'
        weight='semibold'
        color='cyan'
        className='group-hover:text-white hidden md:block'
      >
        {navigation.name}
      </Typography>
      <Typography
        variant='p1'
        weight='semibold'
        color='cyan'
        className='group-hover:text-white md:hidden'
      >
        {navigation.name}
      </Typography>
    </div>
  );
}
