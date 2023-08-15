import { useRouter } from 'next/router';
import * as React from 'react';
import { BiLogOut } from 'react-icons/bi';

import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/Logo';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import Navigation from '@/layouts/dashboard/Navigation';
import useAuthStore from '@/store/useAuthStore';

export default function DesktopNavigation() {
  const logout = useAuthStore.useLogout();
  const user = useAuthStore.useUser();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-typo-primary lg:pt-[56px] lg:pb-4'>
      {/* <IconButton
				icon={HiOutlineChevronDoubleLeft}
				className="absolute right-6 top-5"
				iconClassName="text-[#9AA2B1] text-2xl"
			/> */}
      <div className='relative flex flex-col items-center justify-center mt-8'>
        <div className='flex items-center justify-center'>
          <UnstyledLink
            href='/'
            className='flex flex-row items-center gap-2 md:gap-4'
          >
            <Logo className='object-contain' />
            <Typography
              variant='c1'
              className='text-white ml-2.5'
              font='atmospheric'
            >
              SeTicket 2023
            </Typography>
          </UnstyledLink>
        </div>
        {user && (
          <section className='flex flex-start gap-4 items-center md:mx-20 md:px-6 md:py-3 mt-8 bg-typo-white bg-opacity-5 rounded-lg'>
            <NextImage
              src='/images/profile.png'
              width={50}
              height={50}
              alt='profile'
              className=''
            />

            <div className='text-typo-white'>
              <Typography variant='bt' className='font-bold text-typo-white'>
                {user.name}
              </Typography>
              <Typography
                variant='c2'
                className='md:leading-tight text-typo-white'
              >
                {user.email}
              </Typography>
            </div>
          </section>
        )}
      </div>

      {/* Sidebar component */}
      <div className='mt-8 flex h-0 flex-1 flex-col overflow-y-auto'>
        {/* Navigation */}
        <Navigation className='text-white' />
      </div>

      <div className='mb-16 w-full'>
        <button
          className='relative flex w-3/4 justify-center mx-auto text-typo-white hover:brightness-90 bg-danger-30 rounded-md py-2 bg-opacity-10'
          onClick={handleLogout}
        >
          <BiLogOut
            width={20}
            height={20}
            className='w-6 h-6 text-danger-30 hover:opacity-100'
          />
          <Typography
            className='ml-2.5 font-medium text-danger-30 hover:opacity-100'
            variant='c1'
          >
            Log Out
          </Typography>
        </button>
      </div>
    </div>
  );
}
