import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { BiLogOut } from 'react-icons/bi';
import { HiOutlineChevronDoubleLeft, HiOutlineMenu } from 'react-icons/hi';

import Button from '@/components/buttons/Button';
import UnstyledLink from '@/components/links/UnstyledLink';
import Logo from '@/components/Logo';
import NextImage from '@/components/NextImage';
import Typography from '@/components/Typography';
import Navigation from '@/layouts/dashboard/Navigation';
import useAuthStore from '@/store/useAuthStore';

export default function MobileNavigation() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const user = useAuthStore.useUser();
  const logout = useAuthStore.useLogout();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <>
      <div className='bg-typo-primary sticky top-0 z-10 flex h-20 flex-shrink-0 justify-between lg:hidden'>
        <button
          type='button'
          className='absolute top-[50%] -translate-y-[50%] h-20 text-white px-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-main lg:hidden'
          onClick={() => setSidebarOpen(true)}
        >
          <span className='sr-only '>Open sidebar</span>
          <HiOutlineMenu className='h-6 w-6 text-white' aria-hidden='true' />
        </button>
        <div className='flex items-center justify-center flex-1'>
          <UnstyledLink href='/'>
            <Logo className='w-16' />
          </UnstyledLink>
        </div>
      </div>

      {/* Navigation Dialog */}
      <Transition.Root show={sidebarOpen} as={React.Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-40 flex lg:hidden bg-typo-primary'
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-background-liteCream bg-opacity-75' />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='-translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='-translate-x-full'
          >
            <div className='relative flex w-full max-w-full flex-1 flex-col pt-5 pb-4'>
              <Transition.Child
                as={React.Fragment}
                enter='ease-in-out duration-300'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='ease-in-out duration-300'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <div className='absolute top-0 right-0 mr-0 pt-8'>
                  <Button
                    variant='primary'
                    className='hover:bg-transparent active:bg-transparent'
                    onClick={() => setSidebarOpen(false)}
                  >
                    <HiOutlineChevronDoubleLeft className='text-xl text-white' />
                    <span className='sr-only'>Close sidebar</span>
                  </Button>
                </div>
              </Transition.Child>
              <div className='flex flex-shrink-0 items-center justify-center gap-2 px-4'>
                <section className='flex flex-start gap-4 items-center w-full px-4 md:px-6 mt-16'>
                  <NextImage
                    src='/images/profile.png'
                    width={50}
                    height={50}
                    alt='profile'
                  />
                  <div className='text-white'>
                    <Typography
                      variant='c1'
                      className='font-bold text-typo-white'
                    >
                      {user?.username ?? 'Testing Testing'}
                    </Typography>
                    <Typography variant='c2' className='text-typo-white'>
                      {user?.email ?? 'testing@gmail.com'}
                    </Typography>
                  </div>
                </section>
              </div>
              <div className='mt-5 h-0 flex-1 overflow-y-auto'>
                <Navigation className='text-white' />
              </div>
              <div className='w-full'>
                <button
                  className='relative flex bottom-8 justify-center mx-auto text-white hover:brightness-90 bg-danger-30 py-2 px-10 rounded-md'
                  onClick={handleLogout}
                >
                  <BiLogOut width={20} height={20} className='w-6 h-6' />
                  <Typography
                    className='ml-2.5 font-medium text-typo-white'
                    variant='c1'
                  >
                    Log Out
                  </Typography>
                </button>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </>
  );
}
