import { Menu } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { AiOutlineMenu } from 'react-icons/ai';
import { HiChevronDown } from 'react-icons/hi';

import IconButton from '@/components/buttons/IconButton';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { categories } from '@/contents/categories';
import clsxm from '@/lib/clsxm';
import { getToken } from '@/lib/cookies';

export default function Navbar() {
  const token = getToken();
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  // const handleLogout = () => {
  //   removeToken();
  //   setIsLogin(false);
  //   showToast("Sampai jumpa lagi!, semoga harimu menyenangkan", SUCCESS_TOAST);
  // };

  const toggleShowNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='sticky top-0 z-[100] w-full bg-typo-white font-primary'>
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
            className='w-7 md:w-10'
          />
          <Typography
            font='ubuntu'
            variant='h4'
            color='cyan'
            className='text-sm'
          >
            SeTicket 2023
          </Typography>
        </UnstyledLink>

        {/* Desktop Navbar */}
        <nav className='hidden md:block'>
          <ul className='flex flex-row gap-10 justify-center items-center text-base'>
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
            <li>
              <UnstyledLink href='/about' className='flex p-2.5'>
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
                <ButtonLink
                  href='/dashboard'
                  size='base'
                  variant='netral'
                  className='border-typo-white text-typo-white bg-transparent'
                >
                  Dashboard
                </ButtonLink>
              )}
            </div>
          </ul>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div
        className={clsxm(
          'fixed left-0 top-0 flex flex-col items-center gap-12',
          'w-full h-screen px-4 pt-10 pb-24 md:hidden bg-typo-primary',
          'transition ease-in-out duration-300',
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
            width='42'
            height='37'
            className='w-7 md:w-10'
          />
          <Typography
            font='ubuntu'
            variant='h4'
            color='white'
            className='text-lg'
          >
            SeTicket 2023
          </Typography>
        </UnstyledLink>

        <IconButton
          variant='label'
          icon={CgClose}
          size='lg'
          className='border-transparent bg-transparent rounded-full sm:hidden'
          iconClassName='text-white hover:text-blue-200'
          onClick={toggleShowNav}
        />
        </div>

        <nav className='flex-1 w-full'>
          <ul className='space-y-4'>
            <div className='space-y-4 w-full text-base p-2.5'>
              <li>
                <Menu className='relative' as='div'>
                  <Menu.Button className='outline-none'>
                    {({ open }) => (
                      <Typography
                        font='inter'
                        color='inline'
                        variant='p2'
                        weight='semibold'
                        className='hover:text-typo-white flex flex-row gap-2.5 items-center'
                      >
                        Events
                        <HiChevronDown
                          className={clsxm(
                            'text-xl transition ease-in-out duration-200',
                            open && 'rotate-180 '
                          )}
                        />
                      </Typography>
                    )}
                  </Menu.Button>

                  <Menu.Items
                    className={clsxm(
                      'w-max mt-2 px-4 origin-top',
                      'text-start focus:outline-none'
                    )}
                  >
                    {categories.map(({ name, href, color}) => (
                      <Menu.Item
                        key={name}
                        as='button'
                        className='flex flex-col gap-2'
                      >
                        <UnstyledLink
                          href={href}
                          className={clsxm('py-2.5 rounded-xl')}
                        >
                          <Typography
                            color='inline'
                            variant='p3'
                            weight='semibold'
                            className='text-xs hover:text-typo-white'
                          >
                            SeTicket&nbsp;
                            <span className={`${color}`}>{name}</span>
                          </Typography>
                        </UnstyledLink>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </li>
              <li>
                <UnstyledLink href='/about' className='flex'>
                  <Typography
                    font='inter'
                    color='inline'
                    variant='p2'
                    weight='semibold'
                    className='hover:text-typo-white'
                  >
                    Tentang Kami
                  </Typography>
                </UnstyledLink>
              </li>
            </div>
            <div className='flex flex-col gap-4'>
              {!isLogin ? (
                <>
                  <ButtonLink
                    href='/login'
                    size='base'
                    variant='primary'
                    className='border-0 bg-typo-white'
                  >
                    Login
                  </ButtonLink>
                  <ButtonLink
                    href='/register'
                    size='base'
                    variant='netral'
                    className='border-typo-white text-typo-white bg-transparent'
                  >
                    Sign Up
                  </ButtonLink>
                </>
              ) : (
                <ButtonLink
                  href='/dashboard'
                  size='base'
                  variant='netral'
                  className='border-typo-white text-typo-white bg-transparent'
                >
                  Dashboard
                </ButtonLink>
              )}
            </div>
          </ul>
        </nav>

      </div>
        <IconButton
          variant='label'
          icon={AiOutlineMenu}
          size='lg'
          className='border-transparent bg-transparent rounded-full sm:hidden'
          iconClassName='text-cyan-800'
          onClick={toggleShowNav}
        />
    </header>
  );
}
