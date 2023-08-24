import { useRouter } from 'next/router';
import { BiLogOut } from 'react-icons/bi';

import Button from '@/components/buttons/Button';
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
    <div className='hidden lg:fixed lg:inset-y-0 lg:flex lg:w-60 lg:flex-col bg-gray-100 lg:pt-[30px] lg:pb-4'>
      <div className='relative flex flex-col items-center justify-center mt-8'>
        <div className='flex items-center justify-center'>
          <UnstyledLink
            href='/'
            className='flex flex-row items-center gap-1 md:gap-2 group'
          >
            <Logo className='object-contain group-hover:scale-110 duration-300' />
            <Typography
              variant='b1'
              className='hover:text-blue-600'
              color='cyan'
              font='ubuntu'
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

            <div className=''>
              <Typography variant='bt' className='font-bold '>
                {user.username}
              </Typography>

              <Typography variant='c2' className='md:leading-tight '>
                {user.username}
              </Typography>
            </div>
          </section>
        )}
      </div>

      {/* Sidebar component */}
      <div className='mt-8 flex h-0 flex-1 flex-col overflow-y-auto'>
        {/* Navigation */}
        <Navigation />
      </div>

      <div
        className='mb-10 px-10 w-full flex justify-center'
        onClick={handleLogout}
      >
        <Button
          className='mx-auto rounded-md w-full'
          size='sm'
          variant='danger'
        >
          <BiLogOut className='text-white h-full mx-1 hover:opacity-100 inline-block' />
          Log Out
        </Button>
      </div>
    </div>
  );
}
