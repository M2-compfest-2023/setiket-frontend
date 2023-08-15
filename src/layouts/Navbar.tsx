import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import { HiChevronDown, HiOutlineMenuAlt3 } from 'react-icons/hi';

import IconButton from '@/components/buttons/IconButton';
import ButtonLink from '@/components/links/ButtonLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import { events } from '@/contents/event';
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
    <header className='sticky top-0 z-[100] w-full bg-typo-primary font-primary'>
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
            font='atmospheric'
            variant='p'
            color='white'
            className='text-xs'
          >
            SeTicket 2023
          </Typography>
        </UnstyledLink>

        {/* Desktop Navbar */}
        <nav className='hidden md:block'>
          <ul className='flex flex-row gap-6 justify-between items-center text-base'>
            <li>
              <Menu className='relative' as='div'>
                <Menu.Button className='outline-none p-2.5'>
                  {({ open }) => (
                    <Typography
                      font='inter'
                      color='inline'
                      variant='bt'
                      weight='semibold'
                      className='hover:text-typo-white flex flex-row gap-2.5 items-center'
                    >
                      Events
                      <HiChevronDown
                        className={clsxm(
                          'text-xl transition ease-in-out duration-200',
                          open && 'rotate-180'
                        )}
                      />
                    </Typography>
                  )}
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items
                    className={clsxm(
                      'absolute w-max p-4 mt-2 shadow-80 bg-typo-white rounded-xl origin-top',
                      'grid grid-rows-2 grid-cols-2 gap-y-4 gap-x-5',
                      'left-1/2 -translate-x-1/2 focus:outline-none'
                    )}
                  >
                    {events.map(({ name, href, color, description }) => (
                      <Menu.Item
                        key={name}
                        as='button'
                        className='flex space-y-3 rounded-md hover:bg-typo-surface'
                      >
                        {({ active }) => (
                          <UnstyledLink
                            href={href}
                            className={clsxm(
                              'p-3 text-start space-y-3 max-w-xs rounded-xl',
                              active && 'bg-typo-surface'
                            )}
                          >
                            <Typography variant='c1' weight='semibold'>
                              SeTicket&nbsp;
                              <span className={color}>{name}</span>
                            </Typography>
                            <Typography variant='btn' color='secondary'>
                              {description}
                            </Typography>
                          </UnstyledLink>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            </li>
            <li>
              <UnstyledLink href='/about' className='flex p-2.5'>
                <Typography
                  font='inter'
                  color='inline'
                  variant='bt'
                  weight='semibold'
                  className='hover:text-typo-white'
                >
                  Tentang Kami
                </Typography>
              </UnstyledLink>
            </li>
            <div className='flex flex-row gap-4'>
              {!isLogin ? (
                <>
                  <ButtonLink
                    href='/login'
                    size='base'
                    variant='primary'
                    className='border-0 bg-typo-white'
                  >
                    Masuk
                  </ButtonLink>
                  <ButtonLink
                    href='/register'
                    size='base'
                    variant='netral'
                    className='border-typo-white text-typo-white bg-transparent'
                  >
                    Daftar
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

        {!isOpen && (
          <IconButton
            variant='none'
            icon={HiOutlineMenuAlt3}
            className='md:hidden'
            iconClassName='text-typo-white'
            onClick={toggleShowNav}
          />
        )}
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
            font='atmospheric'
            variant='p'
            color='white'
            className='text-xs'
          >
            SeTicket 2023
          </Typography>
        </UnstyledLink>

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
                        variant='bt'
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
                    {events.map(({ name, href, color, hover }) => (
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
                            variant='c1'
                            weight='semibold'
                            className='text-xs hover:text-typo-white'
                          >
                            SeTicket&nbsp;
                            <span className={`${color} ${hover}`}>{name}</span>
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
                    variant='bt'
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
                    Masuk
                  </ButtonLink>
                  <ButtonLink
                    href='/register'
                    size='base'
                    variant='netral'
                    className='border-typo-white text-typo-white bg-transparent'
                  >
                    Daftar
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

        <IconButton
          variant='label'
          icon={CgClose}
          size='lg'
          className='border-typo-white bg-transparent rounded-full'
          iconClassName='text-typo-white'
          onClick={toggleShowNav}
        />
      </div>
    </header>
  );
}
