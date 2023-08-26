import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';

import IconButton from '@/components/buttons/IconButton';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import { showToast, SUCCESS_TOAST } from '@/components/Toast';
import Typography from '@/components/Typography';
import Popover from '@/layouts/dashboard/PopoverMenu';
import MobileNavbar from '@/layouts/MobileNavbar';
import { getToken } from '@/lib/cookies';
import { removeToken } from '@/lib/cookies';
import { ApiReturn } from '@/types/api';

type UserResponse = {
  username: string;
  id: string;
  role: string;
};

export default function Navbar() {
  const token = getToken();
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenPopover, setisOpenPopover] = useState(false);
  const user = useQuery<ApiReturn<UserResponse>>(['/auth/me']);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  const handleLogout = () => {
    removeToken();
    setIsLogin(false);
    showToast('Sampai jumpa lagi!, semoga harimu menyenangkan', SUCCESS_TOAST);
    setIsOpen(!isOpen);
  };

  const toggleShowNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='flex md:block px-5 md:px-0 sticky top-0 z-[100] w-full bg-typo-white font-primary'>
      <div className='flex flex-row items-center h-14 md:h-20 justify-between layout'>
        <UnstyledLink
          href='/'
          className='flex flex-row items-center gap-2 md:gap-4'
        >
          <NextImage
            src='/images/logo.png'
            alt='logo'
            width='42'
            height='37'
            className='w-10'
          />
          <Typography
            font='ubuntu'
            variant='h4'
            color='cyan'
            className='text-lg'
          >
            SeTicket 2023
          </Typography>
        </UnstyledLink>

        {/* Desktop Navbar */}
        <nav className='hidden md:block'>
          <ul
            className='flex flex-row gap-10 justify-center items-center text-base'
            onClick={toggleShowNav}
          >
            <li>
              <UnstyledLink href='/' className='flex p-2.5'>
                <Typography
                  font='inter'
                  color='cyan'
                  variant='p2'
                  weight='semibold'
                  className='hover:text-cyan-600'
                >
                  Home
                </Typography>
              </UnstyledLink>
            </li>
            <li>
              <UnstyledLink href='/events' className='flex p-2.5'>
                <Typography
                  font='inter'
                  color='cyan'
                  variant='p2'
                  weight='semibold'
                  className='hover:text-cyan-600'
                >
                  Event
                </Typography>
              </UnstyledLink>
            </li>
            {user.data?.data?.role === 'CUSTOMER' && (
              <li>
                <UnstyledLink href='/mytickets' className='flex p-2.5'>
                  <Typography
                    font='inter'
                    color='cyan'
                    variant='p2'
                    weight='semibold'
                    className='hover:text-cyan-600'
                  >
                    My Tickets
                  </Typography>
                </UnstyledLink>
              </li>
            )}
            {user.data?.data?.role === 'EVENTORGANIZER' && (
              <li>
                <UnstyledLink href='/myevents' className='flex p-2.5'>
                  <Typography
                    font='inter'
                    color='cyan'
                    variant='p2'
                    weight='semibold'
                    className='hover:text-cyan-600'
                  >
                    My Events
                  </Typography>
                </UnstyledLink>
              </li>
            )}

            <li>
              <UnstyledLink href='/about' className='flex p-2.5'>
                <Typography
                  font='inter'
                  color='cyan'
                  variant='p2'
                  weight='semibold'
                  className='hover:text-cyan-600'
                >
                  About Us
                </Typography>
              </UnstyledLink>
            </li>
          </ul>
        </nav>

        <nav className='hidden md:block'>
          <ul className='flex flex-row gap-10 justify-center items-center text-base'>
            <div className='flex flex-row gap-4'>
              {!isLogin ? (
                <>
                  <ButtonLink
                    href='/login'
                    size='sm'
                    variant='primary'
                    className='border-0 text-white'
                  >
                    Login
                  </ButtonLink>
                  <ButtonLink
                    href='/register'
                    size='sm'
                    variant='secondary'
                    className='border-0 text-white'
                  >
                    Sign Up
                  </ButtonLink>
                </>
              ) : (
                <>
                  <Image
                    src='/images/avatar.png'
                    width={40}
                    height={40}
                    alt='avatar.png'
                    className='aspect-square'
                    onMouseEnter={() => setisOpenPopover(true)}
                    onMouseLeave={() => setisOpenPopover(false)}
                  />
                </>
              )}
              {isOpenPopover && isLogin && (
                <div className='absolute z-[110] end-7'>
                  <Popover
                    onMouseEnter={() => setisOpenPopover(true)}
                    onMouseLeave={() => setisOpenPopover(false)}
                    handleLogOutNavbar={handleLogout}
                  />
                </div>
              )}
            </div>
          </ul>
        </nav>
      </div>

      {/* Mobile Nav */}
      <MobileNavbar
        handleLogout={handleLogout}
        toggleShowNav={toggleShowNav}
        isOpen={isOpen}
        isLogin={isLogin}
      />

      <IconButton
        variant='label'
        icon={AiOutlineMenu}
        size='lg'
        className='border-transparent bg-transparent rounded-full md:hidden'
        iconClassName='text-cyan-800'
        onClick={toggleShowNav}
      />
    </header>
  );
}
