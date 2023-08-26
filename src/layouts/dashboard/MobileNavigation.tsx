import { useRouter } from 'next/router';
import * as React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { HiOutlineChevronDoubleLeft, HiOutlineMenu } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/Logo';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import Navigation from '@/layouts/dashboard/Navigation';
import clsxm from '@/lib/clsxm';
import useAuthStore from '@/store/useAuthStore';

type NavigationProps = {
  action?: ((index: number) => void) | undefined;
};

export default function MobileNavigation({ action }: NavigationProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const logout = useAuthStore.useLogout();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <>
      <div className='bg-white sticky top-0 z-10 flex h-15 flex-shrink-0 justify-between lg:hidden items-center py-2'>
        <button
          type='button'
          className='absolute top-[50%] -translate-y-[50%] h-20 text-cyan px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-main md:hidden'
          onClick={() => setIsOpen(true)}
        >
          <span className='sr-only '>Open sidebar</span>
          <HiOutlineMenu className='h-6 w-6 text-cyan' aria-hidden='true' />
        </button>
        <div className='flex items-center justify-center flex-1'>
          <UnstyledLink href='/' className='flex items-center gap-2'>
            <Logo className='w-12' />
            <Typography variant='b1' font='ubuntu' color='cyan'>
              Seticket 2023
            </Typography>
          </UnstyledLink>
        </div>
      </div>

      {/* Navigation Dialog */}
      <div
        className={clsxm(
          'fixed left-0 top-0 flex flex-col items-center gap-12',
          'w-full h-screen px-4 py-10 md:hidden bg-white',
          'transition ease-in-out duration-300 z-20',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className='flex justify-between w-full'>
          <UnstyledLink
            href='/'
            className='flex flex-row items-center gap-2 md:gap-4'
          >
            <NextImage
              src='/images/logo.png'
              alt='logo'
              width={42}
              height={42}
            />
            <Typography font='ubuntu' variant='h4' color='cyan'>
              SeTicket 2023
            </Typography>
          </UnstyledLink>

          <IconButton
            variant='label'
            icon={HiOutlineChevronDoubleLeft}
            size='lg'
            className='border-transparent bg-transparent rounded-full sm:hidden'
            iconClassName='text-gray-500 hover:text-slate-800'
            onClick={() => setIsOpen(false)}
          />
        </div>

        <nav className='flex-1 w-full'>
          <div className='space-y-4 flex flex-col justify-between h-full'>
            <Navigation
              className=''
              action={action}
              onClick={() => setIsOpen(false)}
            />
            <div className='flex flex-col px-10'>
              <Button
                size='lg'
                variant='danger'
                className='text-white border-0 text-lg'
                onClick={handleLogout}
              >
                <BiLogOut
                  className='inline-block text-lg'
                  width={20}
                  height={20}
                />{' '}
                Log Out
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
